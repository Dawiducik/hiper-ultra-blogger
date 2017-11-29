<template lang="pug">
  div.container-fluid
    .row 
      strong Nazwa - 
      span {{ userProfile.username }}
    .row 
      strong Utworzono - 
      span {{ userProfile.createdAt|prettyDate }}
    .row 
      strong Zmodyfikowano - 
      span {{ userProfile.updatedAt|prettyDate }}
    .row 
      strong Token -
      span {{ userToken }}

</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Profile',
  computed: {
    ...mapGetters([
      'userProfile',
      'userToken',
    ]),
  },
};
</script>
