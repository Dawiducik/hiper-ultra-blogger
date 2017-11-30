<template lang="pug">
  div.container-fluid
    .alert.alert-success.alert-dismissible.fade.show(role='alert', v-if="success")
      button.close(type='button', data-dismiss='alert', aria-label='Close')
        span(aria-hidden='true') ×
      strong Usunięto!
        |  Post został pomyślnie usunięty.
    router-link(to="posty/dodaj")
      a.btn.btn-primary(role="button", href="#dodaj") Dodaj post
    div(v-if="isLoading") Loading...
    div(v-if="error") {{ error }}
    div(v-if="posts")
      table.table.table-striped.table-hover
        thead.thead-inverse
          tr 
            th #
            th Tytuł
            th Przyjazny adres
            th Utworzono
            th Autor
            th Akcje
        tbody 
          tr(v-for="(post, index) in posts")
            th(scope="row") {{ index + 1 }}
            td {{ post.title }}
            td {{ post.friendlyUrl }} 
            td {{ post.createdAt | prettyDate }} 
            td {{ post['User.username'] }}
            td 
              button.btn.btn-danger(@click="deletePost(post.id)") Usuń

</template>
<script>
import http from '@/providers/http';

export default {
  name: 'index',
  data() {
    return {
      posts: null,
      isLoading: false,
      error: null,
      success: null,
      postAdded: null,
    };
  },
  methods: {
    loadPosts() {
      this.isLoading = true;
      http({
        url: `${this.$store.getters.apiUrl}/posts`,
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
    deletePost(id) {
      const postToDeleteID = id;
      http({
        url: `${this.$store.getters.apiUrl}/posts/${postToDeleteID}`,
        method: 'delete',
        data: {
          postID: postToDeleteID,
        },
      })
      .then((res) => {
        const data = res.data;
        if (data.success) {
          this.success = true;
          this.posts = this.posts.filter(obj => obj.id !== postToDeleteID);
        } else {
          this.error = true;
        }
      })
      .catch(() => {
        this.error = 'Wystąpił błąd.';
      });
    },
  },
  beforeMount() {
    this.loadPosts();
  },
};
</script>