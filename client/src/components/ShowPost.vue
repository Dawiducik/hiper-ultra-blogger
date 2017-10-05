<template lang="pug">
  div
    .jumbotron
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
export default {
  name: 'showPost',
  data() {
    return {
      post: {},
    };
  },
  methods: {
    loadPost() {
      const friendlyUrl = this.$route.params.friendlyUrl;
      this.$http.get(`http://localhost:8081/api/posts/${friendlyUrl}`)
      .then(response => response.json())
      .then((post) => {
        this.post = post;
      });
    },
  },
  beforeMount() {
    this.loadPost();
  },
};
</script>