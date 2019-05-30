<template>
  <div :class="{ rootWrapper: !hasWebPageError, pageError: hasWebPageError }">
    <Extension v-if="!hasWebPageError" />
  </div>
</template>

<script>
import { getCurrentTabId, requestWebPageForm } from 'scripts/messaging';
import { SCRIPT_TYPES } from 'scripts/constants';
import Extension from 'components/Extension/Extension.vue';

export default {
  name: 'ExtensionIndex', // facilite le debug

  components: {
    Extension
  },

  data() {
    return {
      hasWebPageError: false
    };
  },

  methods: {
    getUserData() {
      return JSON.parse(localStorage.getItem('userData'));
    },

    setScriptType() {
      this.$store.dispatch('setScriptType', SCRIPT_TYPES.BACKGROUND);
    },

    getCurrentTabId() {
      return getCurrentTabId();
    },

    async setCurrentTabId() {
      const currentTabId = await this.getCurrentTabId();
      this.$store.dispatch('setCurrentTabId', currentTabId);

      return Promise.resolve();
    },

    requestWebPageForm() {
      return requestWebPageForm();
    },

    async setWebPageForm() {
      const webPageForm = await this.requestWebPageForm();

      if (!webPageForm) {
        this.hasWebPageError = true;
      }

      this.$store.dispatch('setWebPageForm', webPageForm);
    },

    setIsUserAuthenticated() {
      const userData = this.getUserData();

      if (userData) {
        const { email, token } = userData;

        this.$store.dispatch('logUserIn', { email, token });
      }
    }
  },

  async created() {
    this.setScriptType();
    this.setIsUserAuthenticated();

    await this.setCurrentTabId();
    this.setWebPageForm();
  }
};
</script>

<style scoped lang="scss">
.rootWrapper {
  padding: 16px;
  border: 4px solid rgb(124, 124, 146);
  border-radius: 5px;
}

.pageError {
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  background-color: red;

  &::after {
    content: '!';
    padding: 10px;
  }
}
</style>
