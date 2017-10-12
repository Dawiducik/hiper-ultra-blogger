<template lang="pug">
  div.container
    div(v-if="isLoading") Loading...
    div(v-if="error") {{ error }}
    div(v-if="posts")
      a.btn.btn-block.btn-primary(href="./panel/posty/dodaj") Dodaj postaa
      .row(v-for="post in posts")
        .col-md-12
          post(
            :title="post.title",
            :body="post.body",
            :createdAt="post.createdAt",
            :author="post['User.username']",
            :friendlyUrl="post.friendlyUrl"
          )
    div 
      a.btn.btn-primary(href="./zaloguj") Zaloguj się
      a.btn.btn-success(href="./panel") Dashboard
</template>
<script>
import Post from '@/components/Post';
import http from '@/providers/http';

export default {
  name: 'index',
  components: {
    Post,
  },
  data() {
    return {
      posts: null,
      isLoading: false,
      error: null,
    };
  },
  methods: {
    loadPosts() {
      this.isLoading = true;
      http({
        url: 'http://localhost:8081/api/posts',
        method: 'get',
      })
      .then((res) => {
        this.posts = res.data;
      })
      .catch(() => {
        this.error = 'Błąd przy wczytywaniu postów';
      });

      this.isLoading = false;
    },
  },
  created() {
    this.loadPosts();
  },
};
</script>