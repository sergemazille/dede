<template>
  <Notification v-if="!componentAlreadyExists" :notification="notification" />
</template>

<script>
import Notification from 'components/WebPage/ui/Notification.vue';
import { NOTIFICATIONS } from 'scripts/constants';

export default {
  components: {
    Notification
  },

  computed: {
    // workaround au fait que le script soit injecté côté page web,
    // afin de ne pas recréer d'instance de "Notification" (éviter un doublon)
    componentAlreadyExists() {
      return document.querySelector(`.${NOTIFICATIONS.CLASS_NAME}`);
    },

    notification() {
      return this.$store.getters.notification;
    }
  }
};
</script>
