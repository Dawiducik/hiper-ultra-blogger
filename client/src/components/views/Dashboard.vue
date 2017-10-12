<template lang="pug">
  div Użytkownik 
    strong {{ user.username }} 
    span ID: 
    strong {{ user.id }}

</template>
<script>
import Auth from '@/services/auth';

export default {
  name: 'indexPanel',
  computed: {
    user() {
      return Auth.getProfile();
    },
  },
};
</script>
<style lang="scss">

</style>