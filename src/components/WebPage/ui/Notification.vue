<template>
  <div class="wrapper">
    <!-- Le nom de la transition ('name') génère dynamiquement des noms de classes (voir partie style) -->
    <transition
      name="notify"
      @after-leave="notificationHidden"
      @after-enter="notificationDisplayed"
    >
      <div
        class="dede-notification"
        :class="{
          error: hasError,
          success: hasSuccess
        }"
        v-show="show"
      >
        <span>{{ messageText }}</span>
        <div class="close" v-if="!msBeforeAutoHide">
          <span @click="hideNotification"></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { NOTIFICATIONS } from 'scripts/constants';

export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      messageText: '',
      status: '',
      msBeforeAutoHide: 0,

      isHidden: true,
      show: false // permet l'animation de transition (entrée et sortie)
    };
  },

  computed: {
    hasError() {
      return this.status === NOTIFICATIONS.STATUS.ERROR;
    },

    hasSuccess() {
      return this.status === NOTIFICATIONS.STATUS.SUCCESS;
    }
  },

  watch: {
    notification() {
      if (this.isHidden) {
        this.showNotification();
      }

      // supprime l'ancienne notification et affiche la nouvelle après l'animation de transition
      this.hideNotification();
      const intervalHandler = setInterval(() => {
        if (this.isHidden) {
          clearInterval(intervalHandler);
          this.showNotification();
        }
      }, 100);
    }
  },

  methods: {
    showNotification() {
      this.messageText = this.notification.message;
      this.status = this.notification.status;
      this.msBeforeAutoHide = this.notification.msBeforeAutoHide || 0;
      this.show = true;

      // méchanisme d'autoHide
      if (this.msBeforeAutoHide) {
        setTimeout(() => {
          this.hideNotification();
        }, this.msBeforeAutoHide);
      }
    },

    hideNotification() {
      this.show = false;
    },

    notificationHidden() {
      this.messageText = '';
      this.status = '';
      this.msBeforeAutoHide = 0;
      this.isHidden = true;
    },

    notificationDisplayed() {
      this.isHidden = false;
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: center;

  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;

  .dede-notification {
    position: relative;
    opacity: 0.8;

    min-width: 280px;
    max-width: 33%;

    color: white;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.1rem;
    padding: 20px;

    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;

    &.error {
      background-color: red;
    }

    &.success {
      background-color: green;
    }

    .close {
      margin-top: 20px;

      span {
        display: flex;
        align-items: center;

        padding: 5px;
        width: 10px;
        height: 10px;

        position: absolute;
        bottom: 10px;
        right: 10px;

        border: 1px solid currentColor;
        border-radius: 50%;

        cursor: pointer;

        &::before {
          content: '\d7'; // représente une croix
          cursor: pointer;
        }

        &:hover {
          border: 1px solid grey;
          background-color: grey;
        }

        &:active {
          border: 1px solid white;
          background-color: white;
          color: black;
        }
      }
    }
  }
}

.notify-enter-active,
.notify-leave-active {
  transform: translate3d(0, 0, 0);
  transition: transform 0.6s ease-in-out;
}

.notify-enter,
.notify-leave-to {
  transform: translate3d(0, -500px, 0);
}
</style>
