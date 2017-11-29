<template lang="pug">
.container
  .row
    .col-3
    .col-6
      form.lg-form
        .form-group
          input.form-control.form-control-lg(
            v-model="postId",
            type="text", 
            placeholder="Wprowadź id posta", 
            autocomplete="off", 
            required
          )
        .form-group 
          button#submit.btn.btn-block.btn-primary.btn-lg(
              type="submit", 
              @click.prevent="loadPost(postId)",

            ) Podglądnij post
  .row
    post(
      v-if="latestPost",
      :title="latestPost.title",
      :body="latestPost.body",
      :createdAt="latestPost.createdAt",
      :author="Dawiducik",
      :friendlyUrl="latestPost.friendlyUrl"
    )
    div(v-else) Nie znaleziono posta :(

</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Post from '@/components/Post';

export default {
  name: 'loadPostById',
  components: {
    Post,
  },
  data() {
    return {
      postId: null,
    };
  },
  methods: {
    ...mapActions({
      loadPost: 'LOAD_POST_BY_ID',
    }),
  },
  computed: {
    ...mapGetters([
      'latestPost',
    ]),
  },

};
</script>
