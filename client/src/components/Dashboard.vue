<template lang="pug">
  div 
    nav.navbar.navbar-dark.bg-dark.navbar-expand-lg.d-flex.justify-content-between
        a.navbar-brand(href='#') Panel sterowania
        div.profile.d-flex.align-items-center
          //- div.text-white
          h3.p-0.text-white.pr-3 {{ username }}
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
          router-link.sidebar-menu-item(tag="li", to="/panel/posty") 
            a 
              icon(name="newspaper-o", scale="1")
              span Posty
      .col-md-10.pl-0.pt-3
        router-view

</template>
<script>
import Auth from '@/services/auth';

export default {
  name: 'indexPanel',
  methods: {
    logout() {
      this.$router.push({ name: 'Index' });
      return Auth.logout();
    },
  },
  computed: {
    username() {
      return Auth.getProfile().username;
    },
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
        display: block;
        width: 100%;
        padding: 0.75rem 1.5rem;
        color: #fff;
        text-decoration: none;
        &:hover {
          background-color: lighten(#212529, 10%);
        }
      }
    }
  }
</style>