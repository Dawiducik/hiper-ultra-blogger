<template lang="pug">
  #app
    div(v-if="this.$store.getters.isLoading")
      loading-spinner(v-if="this.isLoading", :resource="this.loadingResource")
    transition
      router-view
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'app',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'isLoading',
      'loadingResource',
      'isAuthenticated',
      'userProfile',
    ]),
  },
  beforeMount() {
    if (this.isAuthenticated && !this.userProfile.username) {
      this.$store.dispatch('LOAD_USER_PROFILE');
    }
  },

};
</script>

<style>

</style>
