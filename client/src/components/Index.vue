<template lang="pug">
  div
    nav.navbar.navbar-expand-lg.navbar-light.bg-light
      a.navbar-brand(href="#")
        img(src="../assets/logo.png", height="30")
      button.navbar-toggler(type="button", data-toggle="collapse", data-target="#navbarSupportedContent", aria-controls="navbarSupportedContent", aria-expanded="false", aria-label="Toggle navigation")
        span.navbar-toggler-icon
      #navbarSupportedContent.collapse.navbar-collapse
        ul.navbar-nav.mr-auto
          li.nav-item.active
            router-link(to="/")
              a.nav-link Strona główna
        div(v-if="isAuthenticated")
          .btn-group
            button.btn.btn-outline-primary.dropdown-toggle(type="button", data-toggle="dropdown", aria-haspopup="true", aria-expanded="false")
              icon(v-if="isLoading", name="circle-o-notch", scale="1", spin)
              span(v-else) {{ userProfile.username }}
            .dropdown-menu.dropdown-menu-right
              router-link(to="/panel/profil")
                button.dropdown-item(type="button") Profil
              router-link(to="/")
                button.dropdown-item(type="button", @click="logout") Wyloguj
          router-link(to="/panel")
            button.btn.btn-outline-success.mx-2(type="button") Panel sterowania
        div(v-else)
          router-link(to="/zaloguj")
            a.nav-link Zaloguj
            
    div(v-if="error") {{ error }}
    .container 
      .row
          .col-md-12
            form
              .form-group
                input#searchInput.form-control.form-control-lg(
                    name="searchPhrase", 
                    type="text", 
                    placeholder="Wyszukiwana fraza...", 
                    autocomplete="off",
                    v-model="searchPhrase",
                    @keyup.prevent="search()",
                  ) 
    div.container(v-if="posts")
      
      .row(v-for="post in posts")
        .col-md-12
          post(
            :title="post.title",
            :body="post.body",
            :createdAt="post.createdAt",
            :author="post.User.username",
            :friendlyUrl="post.friendlyUrl",
            :tags="post.Tags"
          )
</template>
<script>
import Post from '@/components/Post';
import http from '@/providers/http';
import { mapGetters } from 'vuex';

export default {
  name: 'index',
  components: {
    Post,
  },
  data() {
    return {
      posts: null,
      error: null,
      searchPhrase: '',
    };
  },
  computed: {
    // isAuthenticated() {
    //   return Auth.isAuthenticated();
    // },
    ...mapGetters([
      'userProfile',
      'isAuthenticated',
      'isLoading',
      'apiUrl',
    ]),
  },
  methods: {
    loadPosts() {
      http({
        url: `${this.apiUrl}/posts`,
        method: 'get',
      })
      .then((res) => {
        this.posts = res.data;
      })
      .catch(() => {
        this.error = 'Błąd przy wczytywaniu postów';
      });
    },
    search() {
      console.log(this.searchPhrase);
      if (this.searchPhrase.length < 2) return;
      http({
        url: `${this.apiUrl}/posts/contains/${this.searchPhrase}`,
      })
      .then((res) => {
        this.posts = res.data;
      })
      .catch(() => {
        this.posts = null;
        this.error = 'Błąd';
      });
    },
    logout() {
      this.$router.push({ name: 'Index', force: true });
    },
  },
  created() {
    this.loadPosts();
  },
};
</script>