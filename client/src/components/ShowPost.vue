<template lang="pug">
  div
    div(v-if="isLoading") Loading... 
    div(v-if="error") Error {{ error }}
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
import http from '@/providers/http';

export default {
  name: 'showPost',
  data() {
    return {
      isLoading: false,
      error: null,
      post: null,
    };
  },
  methods: {
    loadPost() {
      this.loading = true;
      const friendlyUrl = this.$route.params.friendlyUrl;
      http({
        url: `http://localhost:8081/api/posts/${friendlyUrl}`,
        method: 'get',
      })
      .then((res) => {
        this.post = res.data;
      })
      .catch((res) => {
        this.error = res.data.message;
      });
      this.isLoading = false;
    },
  },
  created() {
    this.loadPost();
  },
};
</script>