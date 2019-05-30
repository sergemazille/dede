<template>
  <div>
    <div class="isDev" v-if="isDev">Env. de développement</div>

    <LoginForm
      v-if="!isUserAuthenticated"
      @formSubmitted="handleLoginFormSubmission"
      :hasError="loginFormHasError"
    />

    <RequestForm
      v-if="isUserAuthenticated"
      @logoutClicked="handleLogout"
      @formSubmitted="handleRequestFormSubmission"
      :hasError="requestFormHasError"
      :hasSuccess="requestFormHasSuccess"
    />
  </div>
</template>

<script>
import LoginForm from 'components/Extension/forms/LoginForm.vue';
import RequestForm from 'components/Extension/forms/RequestForm.vue';
import notify from 'scripts/notify';
import { sendFormData } from 'scripts/messaging';
import { mapGetters } from 'vuex';
import { LOGIN_URL, NOTIFICATIONS } from 'scripts/constants';

export default {
  name: 'Extension',

  components: {
    LoginForm,
    RequestForm
  },

  data() {
    return {
      hasWebPageError: false,

      // états de départ des formulaires
      loginFormHasError: false,
      requestFormHasError: false,
      requestFormHasSuccess: false
    };
  },

  computed: {
    // permet d'utiliser directement les valeurs du state en tant que "computed" (ex. : "this.token")
    ...mapGetters(['isUserAuthenticated', 'webPageForm', 'token']),

    isDev() {
      return process.env.NODE_ENV !== 'production';
    }
  },

  methods: {
    // récupère et stoke un token d'authorization pour les futures requêtes auprès de l'API
    handleLoginFormSubmission(credentials) {
      this.$axios
        .post(LOGIN_URL, credentials)

        .then(({ data: { token } }) => {
          this.loginFormHasError = false;

          this.$store.dispatch('logUserIn', {
            email: credentials.email,
            token
          });

          // notification de succès d'authentification
          let notification = {
            status: NOTIFICATIONS.STATUS.SUCCESS,
            message: NOTIFICATIONS.MESSAGES.AUTHENTIFICATION_SUCCESS,
            msBeforeAutoHide: 3000
          };

          notify(notification);
        })

        .catch(error => {
          this.loginFormHasError = true;

          let notification = {
            status: NOTIFICATIONS.STATUS.ERROR
          };

          // le serveur ne répond pas
          if (!error.response) {
            notification.message = NOTIFICATIONS.MESSAGES.SERVER_ERROR;

            // les identifiants sont incorrects
          } else {
            notification.message = NOTIFICATIONS.MESSAGES.LOGIN_ERROR;
          }

          notify(notification);
        });
    },

    handleRequestFormSubmission({ requestReference }) {
      const header = `Bearer ${this.token}`;

      this.$axiosApi
        .get(`/${this.webPageForm.id}/${requestReference}`, {
          headers: { Authorization: header }
        })

        .then(({ data }) => {
          this.requestFormHasError = false;
          this.requestFormHasSuccess = true;

          sendFormData(data.response);
        })

        .catch(error => {
          // feedback visuel sur le formulaire de la requête
          this.requestFormHasError = true;
          this.requestFormHasSuccess = false;

          let notification = {
            status: NOTIFICATIONS.STATUS.ERROR
          };

          // le serveur ne répond pas
          if (!error.response) {
            notification.message = NOTIFICATIONS.MESSAGES.SERVER_ERROR;

            // le serveur répond avec une erreur
          } else {
            const message = error.response.data.message;
            const status = error.response.status;

            switch (status) {
              // la référence n'a pas été trouvée
              case 400:
                notification.message = NOTIFICATIONS.MESSAGES.REQUEST_ERROR;
                break;

              // erreur d'authentification, token non valide
              case 403:
                notification.message =
                  message || NOTIFICATIONS.MESSAGES.TOKEN_EXPIRED;
                this.$store.dispatch('logUserOut'); // retourne au formulaire de login
                break;

              // erreur générique
              default:
                notification.message = NOTIFICATIONS.MESSAGES.DEFAULT_ERROR;
                break;
            }
          }

          notify(notification);
        });
    },

    handleLogout() {
      this.$store.dispatch('logUserOut');
    }
  }
};
</script>

<style lang="scss" scoped>
.isDev {
  text-align: right;
  margin: -10px -10px 10px 0;
  font-size: 0.65rem;
  color: grey;
  font-family: 'Courier New', Courier, monospace;
}
</style>
