export const users = {
  // retourne l'identifiant unique
  id: 'users',

  // retourne true si le formulaire de la page web correspond
  isCurrent() {
    const formId = document.querySelector('form').id;
    return formId === 'users';
  },

  // pré-rempli le formulaire
  fillForm(data) {
    const firstNameEl = document.querySelector('#firstName');
    const lastNameEl = document.querySelector('#lastName');
    const emailEl = document.querySelector('#email');
    const websiteEl = document.querySelector('#website');

    firstNameEl.value = data.username;
    lastNameEl.value = data.name;
    emailEl.value = data.email;
    websiteEl.value = data.website;
  }
};
