<template>
  <WebPage v-if="!hasWebPageError" />
</template>

<script>
import WebPage from 'components/WebPage/WebPage.vue';
import getAvailableWebPageForms from 'scripts/webPageForms';
import {
  listenWebPageFormRequest,
  listenRequestedData,
  listenNotification
} from 'scripts/messaging';
import { SCRIPT_TYPES, NOTIFICATIONS } from 'scripts/constants';
import notify from 'scripts/notify';

export default {
  components: {
    WebPage
  },

  data() {
    return {
      hasWebPageError: false
    };
  },

  methods: {
    setScriptType() {
      this.$store.dispatch('setScriptType', SCRIPT_TYPES.CONTENT);
    },

    setWebPageForm() {
      const availableWebPageForms = getAvailableWebPageForms();
      const keys = Object.keys(availableWebPageForms);

      const currentKey = keys.find(key => {
        let currentKey;

        try {
          currentKey = availableWebPageForms[key].isCurrent();
        } catch (error) {
          this.hasWebPageError = true;
        }

        return currentKey;
      });

      if (!currentKey) {
        const notification = {
          status: NOTIFICATIONS.STATUS.ERROR,
          message: NOTIFICATIONS.MESSAGES.NO_MATCHING_FORM,
          msBeforeAutoHide: 4000
        };

        notify(notification);
      }

      this.$store.dispatch('setWebPageForm', availableWebPageForms[currentKey]);
    },

    handleRequestedData(requestedData) {
      // pré-rempli le formulaire avec les données reçues
      const webPageForm = this.$store.getters.webPageForm;

      try {
        webPageForm.fillForm(requestedData);
      } catch (error) {
        // message d'erreur
        const notification = {
          status: NOTIFICATIONS.STATUS.ERROR,
          message: NOTIFICATIONS.MESSAGES.FILL_FORM_ERROR
        };

        return notify(notification);
      }

      // message de succès
      const notification = {
        status: NOTIFICATIONS.STATUS.SUCCESS,
        message: NOTIFICATIONS.MESSAGES.FORM_FILLED,
        msBeforeAutoHide: 3000
      };

      notify(notification);
    }
  },

  created() {
    this.setScriptType();
    this.setWebPageForm();

    listenWebPageFormRequest();
    listenRequestedData(this.handleRequestedData);
    listenNotification();
  }
};
</script>
