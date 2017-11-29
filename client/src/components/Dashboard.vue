<template lang="pug">
  div 
    nav.navbar.navbar-dark.bg-dark.navbar-expand-lg.d-flex.justify-content-between
        router-link.navbar-brand(to="/panel") Panel sterowania
        div.profile.d-flex.align-items-center
          //- div.text-white
          h3.p-0.text-white.pr-3 {{ userProfile.username }}
          div.pr-1
            img.rounded-0.avatar(src="../assets/example-avatar.png")
          button.btn.btn-outline-light(role="button", @click="logout") Wyloguj
    .row 
      .col-md-2.mh-100.bg-dark.text-white.sidebar-height.p-0.m-0
        ol.sidebar-menu 
          router-link.sidebar-menu-item(tag="li", to="/panel") 
            a
              span Panel
          router-link.sidebar-menu-item(tag="li", to="/") 
            a 
              span Strona główna
          router-link.sidebar-menu-item(tag="li", to="/panel/profil") 
            a 
              icon(name="user", scale="2")
              span.pl-2 Profil
          router-link.sidebar-menu-item(tag="li", to="/panel/posty") 
            a 
              icon(name="newspaper-o", scale="2")
              span.pl-2 Posty
      .col-md-10.pl-0.pt-3
        router-view

</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'indexPanel',
  methods: {
    ...mapActions({
      logoutUser: 'LOGOUT_USER',
      loadProfile: 'LOAD_USER_PROFILE',
    }),
    logout() {
      this.logoutUser()
      .then(() => {
        this.$router.push({ name: 'Index', force: true });
      });
    },
  },
  computed: {
    ...mapGetters([
      'isLoading',
      'loadingResource',
      'isAuthenticated',
      'userProfile',
    ]),
  },
  async mounted() {
    if (this.isAuthenticated && !this.userProfile.username && !this.isLoading) {
      await this.loadProfile();
    }
  },
};
</script>
<style lang="scss">
  body {
    overflow-x: hidden;
  }
  .sidebar-height {
    min-height: calc(100vh - 56px);
  }
  .mvh-100 { 
    min-height: 100vh !important;
  }
  .profile {
    .avatar {
      height: 56px;
    }
  }
  
  .sidebar-menu {
    list-style: none;
    padding-left: 0;
    background-color: darken(#212529, 1%);
    .sidebar-menu-item {
      a {
        display: flex;
        width: 100%;
        padding: 0.75rem 1.5rem;
        color: #fff;
        text-decoration: none;
        flex-flow: row nowrap;
        align-items: center;
        &:hover {
          background-color: lighten(#212529, 10%);
        }
      }
    }
  }
</style> 
