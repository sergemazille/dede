import store from 'store';
import { SCRIPT_TYPES, NOTIFICATIONS } from 'scripts/constants';
import { sendNotification } from 'scripts/messaging';

function getNotificationElement() {
  return document.querySelector(`.${NOTIFICATIONS.CLASS_NAME}`);
}

function setNotification(notification) {
  store.dispatch('setNotification', notification);
}

export default function(notification) {
  const scriptType = store.getters.scriptType;

  if (scriptType === SCRIPT_TYPES.CONTENT) {
    // vérifie que le composant de notification a déjà été injecté dans le DOM...
    if (getNotificationElement()) {
      setNotification(notification);
      return;
    }

    // ...sinon attend que ce soit le cas
    const intervalHandle = setInterval(() => {
      if (getNotificationElement()) {
        setNotification(notification);
        clearInterval(intervalHandle);
      }
    }, 100);
  } else {
    sendNotification(notification);
  }
}
