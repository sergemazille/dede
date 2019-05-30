export const comments = {
  // retourne l'identifiant unique
  id: 'comments',

  // retourne true si le formulaire de la page web correspond
  isCurrent() {
    const title = document.querySelector('h3').innerText;
    return title.includes('Comments');
  },

  // pré-rempli le formulaire
  fillForm(data) {
    const nameEl = document.querySelector('#name');
    const emailEl = document.querySelector('#email');
    const bodyEl = document.querySelector('#body');

    nameEl.value = data.name;
    emailEl.value = data.email;
    bodyEl.value = data.body;
  }
};
