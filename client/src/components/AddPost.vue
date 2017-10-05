<template lang="pug">
  div.container
    form
    .form-group
      label(for="titleInput") Tytuł
      input#titleInput.form-control(type="text", name="title", v-model="title", required)
    .form-group
      label(for="titleInput") Treść
      textarea#bodyInput.form-control(name="body", v-model="body", required)
    .form-group
      label(for="friendlyUrlInput") Przyjazny adres
      input#friendlyUrlInput.form-control(type="text", name="friendlyUrl", v-model="friendlyUrl")
    input.btn.btn-primary(type="submit", @click.prevent="savePost", value="Zapisz")

</template>
<script>
export default {
  data() {
    return {
      title: '',
      body: '',
      friendlyUrl: '',
    };
  },
  methods: {
    savePost() {
      this.$http.post('http://localhost:8081/api/posts', {
        title: this.title,
        body: this.body,
        friendlyUrl: this.friendlyUrl,
      })
      .then((response) => {
        console.log(response);
        this.$router.push('/');
      }, (response) => {
        console.log('cos nie tak', response);
      });
    },
  },
};
</script>
