<template lang="pug">
  .container
    .row
      .col-3
      .col-6.mvh-100.d-flex.align-items-center
        .card.p-3.col-12
          .card-body 
           form.lg-form
            h2.text-center Zarejestruj się!
            .form-group
              label(for="loginInput") Login:
              input#loginInput.form-control.form-control-lg(
                v-model="user.username",
                name="username", type="text", 
                placeholder="Login", 
                autocomplete="off", 
                required
              ) 
            .form-group
              label(for="passwordInput") Hasło:
              input#passwordInput.form-control.form-control-lg(
                v-model="user.password",
                name="password", 
                type="password", 
                placeholder="Hasło", 
                autocomplete="off", 
                required
              )
            button#submit.btn.btn-block.btn-primary.btn-lg(
                type="submit", 
                @click.prevent="registerUser",
              ) 
              span(v-if="isLoading") Rejestruję... 
                icon(v-if="isLoading", name="circle-o-notch", scale="1", spin) 
              span(v-else) Zarejestruj!
            div(v-if="error")
              div.alert.alert-danger.alert-dismissible.fade.show.mt-3(role="alert") 
                button.close(type="button", data-dismiss="alert", aria-label="Close alert")
                  span(aria-hidden="true") &times;
                span {{ error }}
            div(v-if="success")
              div.alert.alert-success.alert-dismissible.fade.show.mt-3(role="alert") 
                button.close(type="button", data-dismiss="alert", aria-label="Close alert")
                  span(aria-hidden="true") &times;
                span Pomyślnie zarejestrowano!
              
</template>
<script>
import Auth from '@/services/auth';

export default {
  name: 'register',
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
    registerUser() {
      const credentials = {
        username: this.user.username,
        password: this.user.password,
      };
      Auth.register(credentials)
      .then((res) => {
        this.isLoading = true;
        return res;
      })
      .then((res) => {
        if (res.data.success) {
          this.success = true;
        } else {
          this.error = res.data.message;
        }
        // this.$router.push('/zaloguj');
      })
      .catch(() => {
        this.error = 'An error occured';
      })
      .then(() => {
        this.isLoading = false;
      });
    },
  },
};
</script>
<style>
.mvh-100 {
  min-height: 100vh;
}
</style>
