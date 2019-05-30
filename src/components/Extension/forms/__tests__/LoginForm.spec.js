import { shallowMount } from '@vue/test-utils';
import LoginForm from '../LoginForm.vue';

const userCredentials = {
  email: 'user@email.com',
  password: 'password'
};

describe('LoginForm.vue', () => {
  let propsData = { hasError: false };
  let wrapper;
  let submitButton;
  let spinner;

  beforeEach(() => { 
    wrapper = shallowMount(LoginForm, { propsData });
    submitButton = wrapper.find('button[type="submit"]');
    spinner = wrapper.find('.spinner');
  });

  test("Le spinner n'est pas visible à l'initialisation", () => {
    expect(spinner.isVisible()).toBe(false);
  });

  test('Une addresse email est valide', () => {
    wrapper.setData(userCredentials);

    expect(wrapper.vm.isEmailValid).toBe(true);
  });

  test("Une addresse email n'est pas valide", () => {
    wrapper.setData({ email: 'addresse_invalide' });

    expect(wrapper.vm.isEmailValid).toBe(false);
  });

  test('Le formulaire ne peut pas être soumis sans email et mot de passe valides', () => {
    // ... email et password vides

    wrapper.find('form').trigger('submit');

    // le bouton de soumission est disabled
    expect(submitButton.attributes().disabled).toBeTruthy();

    // l'évènement 'formSubmitted' n'a pas été soumis
    expect(wrapper.emitted().formSubmitted).toBeFalsy();
  });

  test("Le bouton de soumission n'est pas disabled quand les identifiants sont valides", () => {
    wrapper.setData(userCredentials);

    expect(submitButton.attributes().disabled).toBeUndefined();
  });

  test('Le bouton de soumission est à nouveau disabled après la soumission du formulaire', () => {
    wrapper.setData(userCredentials);
    wrapper.find('form').trigger('submit');

    expect(submitButton.attributes().disabled).toBeTruthy();
  });

  test('Le spinner est visible à la soumission du formulaire', () => {
    wrapper.setData(userCredentials);
    wrapper.find('form').trigger('submit');

    expect(spinner.isVisible()).toBe(true);
  });

  test("L'évènement formSubmitted est émit avec les identifiants en payload", () => {
    wrapper.setData(userCredentials);
    wrapper.find('form').trigger('submit');

    // l'évènement 'formSubmitted' a été soumis
    expect(wrapper.emitted().formSubmitted).toBeTruthy();

    // l'email et le mot de passe ont été fournis en payload
    expect(wrapper.emitted().formSubmitted[0]).toEqual([userCredentials]);
  });
});
