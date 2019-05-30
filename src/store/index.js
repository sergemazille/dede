import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentTabId: '',
    availableWebPageForms: [],
    webPageForm: '',
    userEmail: '',
    token: '',
    isUserAuthenticated: false,
    notification: {
      status: '',
      message: ''
    },
    scriptType: ''
  },

  mutations: {
    setCurrentTabId(state, currentTabId) {
      state.currentTabId = currentTabId;
    },

    setAvailableWebPageForms(state, availableWebPageForms) {
      state.availableWebPageForms = availableWebPageForms;
    },

    setWebPageForm(state, webPageForm) {
      state.webPageForm = webPageForm;
    },

    setUserEmail(state, email) {
      state.userEmail = email;
    },

    setToken(state, token) {
      state.token = token;
    },

    setIsUserAuthenticated(state, isUserAuthenticated) {
      state.isUserAuthenticated = isUserAuthenticated;
    },

    setNotification(state, notification) {
      state.notification = notification;
    },

    setScriptType(state, scriptType) {
      state.scriptType = scriptType;
    }
  },

  actions: {
    setCurrentTabId({ commit }, currentTabId) {
      commit('setCurrentTabId', currentTabId);
    },

    setAvailableWebPageForms({ commit }, availableWebPageForms) {
      commit('setAvailableWebPageForms', availableWebPageForms);
    },

    setWebPageForm({ commit }, webPageForm) {
      commit('setWebPageForm', webPageForm);
    },

    logUserIn({ commit }, { email, token }) {
      commit('setIsUserAuthenticated', true);
      commit('setUserEmail', email);
      commit('setToken', token);

      localStorage.setItem('userData', JSON.stringify({ email, token }));
    },

    logUserOut({ commit }) {
      commit('setUserEmail', '');
      commit('setToken', '');
      commit('setIsUserAuthenticated', false);

      localStorage.clear();
    },

    setNotification({ commit }, notification) {
      commit('setNotification', notification);
    },

    setScriptType({ commit }, scriptType) {
      commit('setScriptType', scriptType);
    }
  },

  getters: {
    currentTabId(state) {
      return state.currentTabId;
    },

    availableWebPageForms(state) {
      return state.availableWebPageForms;
    },

    webPageForm(state) {
      return state.webPageForm;
    },

    userEmail(state) {
      return state.userEmail;
    },

    token(state) {
      return state.token;
    },

    isUserAuthenticated(state) {
      return state.isUserAuthenticated;
    },

    notification(state) {
      return state.notification;
    },

    scriptType(state) {
      return state.scriptType;
    }
  }
});
