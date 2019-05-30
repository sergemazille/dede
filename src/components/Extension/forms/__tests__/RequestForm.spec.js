/* eslint-disable */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import RequestForm from '../RequestForm';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('RequestForm', () => {
  const testEmail = 'user@email.com';
  const testWebPageFormType = { id: 'whatever' };
  let getters;
  let store;

  let propsData = { hasError: false, hasSuccess: false };
  let wrapper;
  let submitButton;
  let spinner;

  beforeEach(() => {
    getters = {
      userEmail: jest.fn(() => testEmail),
      webPageForm: jest.fn(() => testWebPageFormType)
    };

    store = new Vuex.Store({ getters });

    wrapper = shallowMount(RequestForm, { store, localVue, propsData });
    submitButton = wrapper.find('button[type="submit"]');
    spinner = wrapper.find('.spinner');
  });

  test("Le spinner n'est pas visible à l'initialisation", () => {
    expect(spinner.isVisible()).toBe(false);
  });

  test('Le formulaire ne peut pas être soumis sans référence', () => {
    // ... référence vide

    wrapper.find('form').trigger('submit');

    // le bouton de soumission est disabled
    expect(submitButton.attributes().disabled).toBeTruthy();

    // l'évènement 'formSubmitted' n'a pas été soumis
    expect(wrapper.emitted().formSubmitted).toBeFalsy();
  });

  test("Le bouton de soumission n'est pas disabled quand une référence est valide", () => {
    wrapper.setData({ requestReference: 'abcd' }); // > 3 caractères

    expect(submitButton.attributes().disabled).toBeUndefined();
  });

  test('Le bouton de soumission est à nouveau disabled après la soumission du formulaire', () => {
    wrapper.setData({ requestReference: 'abcd' });
    wrapper.find('form').trigger('submit');

    expect(submitButton.attributes().disabled).toBeTruthy();
  });

  test('Le spinner est visible à la soumission du formulaire', () => {
    wrapper.setData({ requestReference: 'abcd' });
    wrapper.find('form').trigger('submit');

    expect(spinner.isVisible()).toBe(true);
  });

  test("L'évènement formSubmitted est émit avec la référence en payload", () => {
    wrapper.setData({ requestReference: 'abcd' });
    wrapper.find('form').trigger('submit');

    // l'évènement 'formSubmitted' a été soumis
    expect(wrapper.emitted().formSubmitted).toBeTruthy();

    // la référence a été passée en payload
    expect(wrapper.emitted().formSubmitted[0]).toEqual([
      { requestReference: 'abcd' }
    ]);
  });

  test('RequestForm affiche le type de formulaire à pré-remplir', () => {
    expect(wrapper.text()).toContain(testWebPageFormType.id);
  });

  test("RequestForm affiche l'email de l'utilisateur", () => {
    expect(wrapper.text()).toContain(testEmail);
  });

  test("RequestForm est détruit à la déconnexion de l'utilisateur", () => {
    const logout = wrapper.find('.logout a');
    logout.trigger('click');

    // l'évènement 'logoutClicked' a été soumis
    expect(wrapper.emitted().logoutClicked).toBeTruthy();
  });
});
