<template lang="pug">
  .container
    .row
      .col-3
      .col-6.mvh-100.d-flex.align-items-center
        .card.p-3.col-12
          .card-body 
           form.lg-form
            h2.text-center Zaloguj się!
            .form-group
              label(for="loginInput") Login:
              input#loginInput.form-control.form-control-lg(
                v-model="user.username",
                name="username", type="text", 
                placeholder="Wprowadź login do konta", 
                autocomplete="off", 
                required
              ) 
            .form-group
              label(for="passwordInput") Hasło:
              input#passwordInput.form-control.form-control-lg(
                v-model="user.password",
                name="password", 
                type="password", 
                placeholder="Wprowadź hasło do konta", 
                autocomplete="off", 
                required
              )
            button#submit.btn.btn-block.btn-primary.btn-lg(
                type="submit", 
                @click.prevent="loginUser",
              ) 
              span(v-if="isLoading") Loguję... 
                icon(v-if="isLoading", name="circle-o-notch", scale="1", spin) 
              span(v-else) Zaloguj!
            div(v-if="error")
              div.alert.alert-danger.mt-3(role="alert") 
                span {{ error }}
            div(v-if="success")
              div.alert.alert-success.mt-3(role="alert") 
                span Pomyślnie zarejestrowano!
              
</template>
<script>

export default {
  name: 'login',
  data() {
    return {
      isLoading: false,
      error: null,
      success: null,
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async loginUser() {
      const credentials = {
        username: this.user.username,
        password: this.user.password,
      };
      const isLogged = await this.$store.dispatch('LOGIN_USER', credentials);
      if (isLogged.success) {
        console.log('xDDDDDDDDD przenosze');
        this.$router.push({ name: 'IndexPanel' });
      } else {
        console.log('xDDDDD błond');
        this.error = isLogged.message;
      }
    },
  },
};
</script>
<style>
.mvh-100 {
  min-height: 100vh;
}
</style>
