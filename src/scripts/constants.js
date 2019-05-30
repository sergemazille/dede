export const BASE_URL = process.env.BASE_URL;
export const LOGIN_URL = `${BASE_URL}/login`;
export const API_URL = `${BASE_URL}/api`;

// Notifications à afficher côté page du formulaire à pré-remplir
export const NOTIFICATIONS = {
  CLASS_NAME: 'dede-notification',

  STATUS: {
    ERROR: 'error',
    SUCCESS: 'success'
  },

  MESSAGES: {
    DEFAULT_ERROR: 'Une erreur est survenue...',
    REQUEST_ERROR: "La référence n'a pas pu être trouvée...",
    SERVER_ERROR: 'Le serveur ne répond pas...',
    FILL_FORM_ERROR: 'Le pré-remplissage du formulaire a échoué...',
    FORM_FILLED: 'Formulaire pré-rempli !',
    LOGIN_ERROR: 'Identifiants incorrects...',
    NO_MATCHING_FORM: "Cette page n'est pas configurée...",
    TOKEN_EXPIRED: 'La session a expiré, veuillez vous reconnecter',
    AUTHENTIFICATION_SUCCESS: 'Vous êtes connecté !'
  }
};

export const EVENTS = {
  WEB_PAGE_FORM_REQUEST: 'form-origin-request',
  REQUESTED_DATA: 'requested-data',
  NOTIFICATION: 'notification'
};

export const SCRIPT_TYPES = {
  CONTENT: 'content',
  BACKGROUND: 'background'
};
