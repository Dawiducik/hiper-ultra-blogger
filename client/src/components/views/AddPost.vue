<template lang="pug">
  div.container-fluid
    form
    .form-group
      label(for="titleInput") Tytuł
      input#titleInput.form-control(type="text", name="title", v-model="title", required)
    .form-group
      label(for="bodyInput") Treść
      quill-editor#bodyInput(:content="body", :options="editorOption", @change="onEditorChange($event)", required)
    .form-group
      label(for="friendlyUrlInput") Przyjazny adres
      input#friendlyUrlInput.form-control(type="text", name="friendlyUrl", v-model="friendlyUrl")
    .form-group
      button.btn.btn-primary.btn-block(@click.prevent="savePost")
        span(v-if="isLoading") Rejestruję... 
          icon(v-if="isLoading", name="circle-o-notch", scale="1", spin) 
        span(v-else) Dodaj post!
      div(v-if="error")
        div.alert.alert-danger.alert-dismissible.fade.show.mt-3(role="alert") 
          button.close(type="button", data-dismiss="alert", aria-label="Close alert")
            span(aria-hidden="true") &times;
          span {{ error }}
      div(v-if="success")
        div.alert.alert-success.alert-dismissible.fade.show.mt-3(role="alert") 
          button.close(type="button", data-dismiss="alert", aria-label="Close alert")
            span(aria-hidden="true") &times;
          span Post został dodany 
            b pomyślnie!
</template>
<script>
import http from '@/providers/http';

export default {
  name: 'AddPost',
  data() {
    return {
      error: null,
      success: null,
      isLoading: false,
      title: '',
      body: '',
      friendlyUrl: '',
    };
  },
  methods: {
    savePost() {
      this.isLoading = true;
      http({
        url: 'http://localhost:8081/api/posts',
        method: 'post',
        data: {
          title: this.title,
          body: this.body,
          friendlyUrl: this.friendlyUrl,
        },
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization-Token': localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (!res.data.success) {
          this.error = res.data.message;
        } else {
          this.success = true;
        }
      })
      .catch((res) => {
        this.error = res;
      });
      this.isLoading = false;
    },
    onEditorChange({ html }) {
      this.body = html;
    },
  },
  computed: {
    editorOption() {
      return {
        placeholder: 'Wprowadź treść posta...',
        theme: 'snow',
      };
    },
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
};
</script>
