import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Extension from '../Extension';
import LoginForm from '../forms/LoginForm';
import RequestForm from '../forms/RequestForm'; // eslint-disable-line

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Extension.vue', () => {
  describe('Initialisation de LoginForm', () => {
    let getters;
    let store;

    beforeEach(() => {
      getters = {
        webPageForm: () => '',
        token: () => '',

        isUserAuthenticated: () => false
      };

      store = new Vuex.Store({ getters });
    });

    test("Extension n'initialise PAS RequestForm si l'utilisateur n'est pas connecté", () => {
      const wrapper = shallowMount(Extension, { store, localVue });

      expect(wrapper.find(RequestForm).exists()).toBe(false);
    });

    test("Extension initialise LoginForm quand l'utilisateur n'est pas connecté", () => {
      const wrapper = shallowMount(Extension, { store, localVue });

      expect(wrapper.find(LoginForm).exists()).toBe(true);
    });

    test('Extension initialise LoginForm avec la props { hasError: false }', () => {
      const wrapper = shallowMount(Extension, { store, localVue });

      const loginForm = wrapper.find(LoginForm);

      expect(loginForm.props().hasError).toBe(false);
    });
  });

  describe('Initialisation de RequestForm', () => {
    let getters;
    let store;

    beforeEach(() => {
      getters = {
        webPageForm: () => '',
        token: () => '',

        isUserAuthenticated: () => true
      };

      store = new Vuex.Store({ getters });
    });

    test("Extension n'initialise PAS LoginForm si l'utilisateur est connecté", () => {
      const wrapper = shallowMount(Extension, { store, localVue });

      expect(wrapper.find(LoginForm).exists()).toBe(false);
    });

    test("Extension initialise RequestForm quand l'utilisateur est connecté", () => {
      const wrapper = shallowMount(Extension, { store, localVue });

      expect(wrapper.find(RequestForm).exists()).toBe(true);
    });

    test('Extension initialise RequestForm avec les bonnes valeurs de props', () => {
      const wrapper = shallowMount(Extension, { store, localVue });

      const requestForm = wrapper.find(RequestForm);

      expect(requestForm.props().hasError).toBe(false);
      expect(requestForm.props().hasSuccess).toBe(false);
    });
  });
});
