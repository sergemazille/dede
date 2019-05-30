import store from 'store';
import { EVENTS } from 'scripts/constants';
import notify from 'scripts/notify';

// retourne currentTabId du state
function fetchCurrentTabId() {
  return store.getters.currentTabId;
}

// retourne webPageForm du state
function fetchWebPageForm() {
  return store.getters.webPageForm;
}

// -- côté extension

export function getCurrentTabId() {
  return new Promise(resolve => {
    return chrome.tabs.query(
      {
        currentWindow: true,
        active: true
      },
      tabsArray => resolve(tabsArray[0].id)
    );
  });
}

export function requestWebPageForm() {
  const currentTabId = fetchCurrentTabId();
  return new Promise(resolve => {
    const message = {
      event: EVENTS.WEB_PAGE_FORM_REQUEST
    };

    return chrome.tabs.sendMessage(currentTabId, message, webPageForm => {
      return resolve(webPageForm);
    });
  });
}

export function sendFormData(requestedData) {
  const currentTabId = fetchCurrentTabId();

  const message = {
    event: EVENTS.REQUESTED_DATA,
    data: requestedData
  };

  return chrome.tabs.sendMessage(currentTabId, message);
}

export function sendNotification(notification) {
  const currentTabId = fetchCurrentTabId();

  const message = {
    event: EVENTS.NOTIFICATION,
    data: notification
  };

  return chrome.tabs.sendMessage(currentTabId, message);
}

// -- côté page web

export function listenWebPageFormRequest() {
  const webPageForm = fetchWebPageForm();

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.event !== EVENTS.WEB_PAGE_FORM_REQUEST) {
      return;
    }

    return sendResponse(webPageForm);
  });
}

export function listenRequestedData(handleRequestData) {
  chrome.runtime.onMessage.addListener(message => {
    if (message.event !== EVENTS.REQUESTED_DATA) {
      return;
    }

    return handleRequestData(message.data);
  });
}

export function listenNotification() {
  chrome.runtime.onMessage.addListener(message => {
    if (message.event !== EVENTS.NOTIFICATION) {
      return;
    }

    return notify(message.data);
  });
}
