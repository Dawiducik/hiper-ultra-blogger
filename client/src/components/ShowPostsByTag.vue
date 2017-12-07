<template lang="pug">
  div.container 
    .row(v-for="post in posts")
      .col-md-12
        post(
          :title="post.title",
          :body="post.body",
          :createdAt="post.createdAt",
          :author="post.User['username']",
          :friendlyUrl="post.friendlyUrl",
          :tags="post.Tags"
        )

</template>
<script>
import Post from '@/components/Post';
import { mapActions } from 'vuex';

export default {
  name: 'showPost',
  components: {
    Post,
  },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    ...mapActions({
      loadPosts: 'LOAD_POSTS_BY_TAGNAME',
    }),
  },
  async created() {
    this.posts = await this.loadPosts(this.$route.params.name);
  },
};
</script>