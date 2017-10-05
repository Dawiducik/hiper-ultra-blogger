<template lang="pug">
  div.container
    div(v-if="isApiOnline")
      a.btn.btn-block.btn-primary(href="./post/dodaj") Dodaj postaa
      .row(v-for="post in posts")
        .col-md-12
          post(
            :title="post.title",
            :body="post.body",
            :createdAt="post.createdAt",
            :author="post['User.username']",
            :friendlyUrl="post.friendlyUrl"
          )
    div(v-else) api offline
</template>
<script>
import Post from '@/components/Post';

export default {
  name: 'index',
  components: {
    Post,
  },
  data() {
    return {
      isApiOnline: true,
      posts: [],
    };
  },
  methods: {
    loadPosts() {
      this.$http.get('http://localhost:8081/api/posts')
      .then(response => response.json())
      .then((posts) => {
        this.posts = posts;
        console.log(this.posts);
      }, (response) => {
        this.isApiOnline = false;
        console.log(response);
      });
    },
  },
  beforeMount() {
    this.loadPosts();
  },
};
</script>