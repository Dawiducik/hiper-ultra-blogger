<template lang="pug">
  div
    //- div(v-if="isLoading") Loading... 
    //- div(v-if="error") Error {{ error }}
    .jumbotron(v-if="post")
      h1.display-3 {{ post.title }}
      p.lead
        div(v-html="post.body")
      hr.my-4
      p
        div Utworzono: {{ post.createdAt }}
        div Zmodyfikowano: {{ post.updatedAt }}
        div ID posta: {{ post.id }}
        div Autor: {{ post.User.username }} z id {{ post.UserId }}
      p.lead
        a.btn.btn-primary.btn-lg(href='#', role='button') Daj suba gut gut


</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'showPost',
  // data() {
  //   return {
  //     isLoading: false,
  //     error: null,
  //     post: null,
  //   };
  // },
  methods: {
    ...mapActions({
      loadPost: 'LOAD_POST_BY_FRIENDLYURL',
    }),
  },
  created() {
    this.loadPost(this.$route.params.friendlyUrl);
  },
  computed: {
    ...mapGetters({
      post: 'latestPost',
    }),
  },
};
</script>