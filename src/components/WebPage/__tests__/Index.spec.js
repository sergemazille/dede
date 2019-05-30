import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import Index from '../Index';
import WebPage from '../WebPage';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('WebPage/Index.vue', () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      setScriptType: jest.fn(),
      setWebPageForm: jest.fn()
    };

    store = new Vuex.Store({ actions });
  });

  test("Fait le rendu du composant 'WebPage'", () => {
    const wrapper = shallowMount(Index, { store, localVue });
    wrapper.setData({ hasWebPageError: false });

    expect(wrapper.find(WebPage).exists()).toBe(true);
  });

  test("Ne fait PAS le rendu du composant 'WebPage' si la page web est en erreur", () => {
    const wrapper = shallowMount(Index, { store, localVue });
    wrapper.setData({ hasWebPageError: true });

    expect(wrapper.find(WebPage).exists()).toBe(false);
  });

  test("Les actions 'setScriptType' et 'setWebPageForm' sont dispatchées à l'initialisation", () => {
    shallowMount(Index, { store, localVue });

    expect(actions.setScriptType).toHaveBeenCalled();
    expect(actions.setWebPageForm).toHaveBeenCalled();
  });
});
