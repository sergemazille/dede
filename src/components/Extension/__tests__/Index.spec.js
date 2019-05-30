import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';

import Index from '../Index.vue';
import Extension from '../Extension.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Extension/Index.vue', () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      setScriptType: jest.fn(),
      setCurrentTabId: jest.fn(),
      setWebPageForm: jest.fn(),
      logUserIn: jest.fn()
    };

    store = new Vuex.Store({ actions });
  });

  test("Fait le rendu du composant 'Extension'", () => {
    const wrapper = shallowMount(Index, { store, localVue });

    expect(wrapper.find(Extension).exists()).toBe(true);
  });

  test("Ne fait PAS le rendu du composant 'Extension' si la page web est en erreur", () => {
    const wrapper = shallowMount(Index, { store, localVue });
    wrapper.setData({ hasWebPageError: true });

    expect(wrapper.find(Extension).exists()).toBe(false);
  });

  test("Les actions synchrones sont exécutées à l'initialisation", () => {
    const methods = {
      getUserData: jest.fn(() => ({}))
    };

    shallowMount(Index, { store, localVue, methods });

    expect(actions.setScriptType).toHaveBeenCalled();
    expect(actions.logUserIn).toHaveBeenCalled();
  });

  test("L'action asynchrone 'setCurrentTabId' est exécutée à l'initialisation", async () => {
    const methods = {
      getCurrentTabId: jest.fn()
    };

    shallowMount(Index, { store, localVue, methods });
    await flushPromises();

    expect(actions.setCurrentTabId).toHaveBeenCalled();
  });

  test("L'action asynchrone 'setWebPageForm' est exécutée à l'initialisation", async () => {
    const methods = {
      getCurrentTabId: jest.fn(),
      requestWebPageForm: jest.fn()
    };

    shallowMount(Index, { store, localVue, methods });
    await flushPromises();

    expect(actions.setWebPageForm).toHaveBeenCalled();
  });
});
