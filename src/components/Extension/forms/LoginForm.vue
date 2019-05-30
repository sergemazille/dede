<template>
  <form
    @submit.prevent="submitForm"
    :class="{ error: hasError }"
    autocomplete="off"
  >
    <div class="formGroup">
      <label for="emailInput">Email :</label>
      <input
        id="emailInput"
        ref="emailInput"
        type="text"
        placeholder="user@email.com"
        v-model="email"
      />
    </div>

    <div class="formGroup">
      <label id="passwordLabel" for="passwordInput">Mot de passe :</label>
      <input
        id="passwordInput"
        type="password"
        placeholder="password"
        v-model="password"
      />
    </div>

    <button type="submit" :disabled="!isFormValid || isLoading">
      LOGIN
      <Spinner v-show="isLoading" class="spinner" />
    </button>
  </form>
</template>

<script>
import Spinner from 'components/Extension/ui/Spinner.vue';

// pour l'autocomplétion en env. de développement
const devUser =
  process.env.NODE_ENV !== 'production'
    ? {
        email: process.env.USER_EMAIL,
        password: process.env.USER_PASSWORD
      }
    : {};

export default {
  components: {
    Spinner
  },

  props: {
    hasError: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      email: devUser.email || '',
      password: devUser.password || '',
      isLoading: false
    };
  },

  computed: {
    isEmailValid() {
      const validEmailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return validEmailPattern.test(this.email);
    },

    isPasswordValid() {
      return this.password.length > 3;
    },

    isFormValid() {
      return this.isEmailValid && this.isPasswordValid;
    }
  },

  methods: {
    submitForm() {
      if (!this.isFormValid) {
        return;
      }

      this.isLoading = true;

      this.$emit('formSubmitted', {
        email: this.email,
        password: this.password
      });
    }
  },

  mounted() {
    this.$refs.emailInput.focus();
  },

  updated() {
    if (this.hasError) {
      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import './commonStyle.scss';
</style>
