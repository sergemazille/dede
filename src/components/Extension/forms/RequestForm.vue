<template>
  <form
    @submit.prevent="submitForm"
    :class="{ error: hasError, success: hasSuccess }"
    autocomplete="off"
  >
    <div class="formGroup">
      <label for="requestReferenceInput">
        Référence "<span v-text="webPageForm.id"></span>" :
      </label>

      <input
        id="requestReferenceInput"
        ref="requestReferenceInput"
        type="text"
        placeholder="référence"
        v-model="requestReference"
      />
    </div>

    <button type="submit" :disabled="!isFormValid || isLoading">
      VALIDER
      <Spinner v-show="isLoading" class="spinner" />
    </button>

    <p class="logout">
      <span v-text="userEmail"></span>
      <a href="#" @click.prevent="logout">déconnexion</a>
    </p>
  </form>
</template>

<script>
import Spinner from 'components/Extension/ui/Spinner.vue';

export default {
  components: {
    Spinner
  },

  props: {
    hasError: {
      type: Boolean,
      required: true
    },

    hasSuccess: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      requestReference: '',
      isLoading: false
    };
  },

  computed: {
    userEmail() {
      return this.$store.getters.userEmail;
    },

    webPageForm() {
      return this.$store.getters.webPageForm;
    },

    isFormValid() {
      return this.requestReference.length > 3;
    }
  },

  methods: {
    submitForm() {
      if (!this.isFormValid) {
        return;
      }

      this.isLoading = true;

      this.$emit('formSubmitted', {
        requestReference: this.requestReference
      });
    },

    logout() {
      this.$emit('logoutClicked');
    }
  },

  mounted() {
    this.$refs.requestReferenceInput.focus();
  },

  updated() {
    if (this.hasError || this.hasSuccess) {
      this.isLoading = false;
    }
  }
};
</script>

<style scoped lang="scss">
@import './commonStyle.scss';

.logout {
  display: flex;
  flex-direction: column;
  padding: 6px 0 0;
  margin: 8px 0 0;
  text-align: right;
  border-top: 1px solid lightgrey;

  span {
    margin-bottom: 5px;
  }
}
</style>
