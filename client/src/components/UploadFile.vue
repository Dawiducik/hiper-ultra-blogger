<template lang="pug">
  div.container
    form(enctype="multipart/form-data")
      .form-group
        label(for='exampleFormControlFile1') Dodaj plik
        input#exampleFormControlFile1.form-control-file(
          type='file',
          accept="image/*",
          name="avatar",
          @change='filesChange($event.target.name, $event.target.files)'
        )

      .form-group
        button.btn.btn-primary.btn-block(type='submit', @click.prevent="uploadFile") Dodaj

</template>
<script>
import axios from 'axios';

export default {
  name: 'UploadFile',
  data() {
    return {
      formData: null,
    };
  },
  methods: {
    uploadFile() {
      // upload data to the server
      const formData = this.formData;
      console.log(formData);
      return axios.post(`${this.$store.getters.apiUrl}/upload`, formData)
      .then((x) => {
        console.log(x);
        return x;
      })
      .then(x => x.data)
      .then((x) => {
        console.log(x);
      });
    },

    filesChange(fieldName, fileList) {
      // handle file changes
      console.log('dodano plik');
      const formData = new FormData();

      if (!fileList.length) return;

      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => formData.append(fieldName, fileList[x], fileList[x].name));
      console.log(formData.getAll('fileUploadInput'));
      this.formData = formData;
    },
  },
};
// export default {
//   name: 'UploadFile',
//   methods: {
//     uploadFile(fileForm) {
//       return axios.post(`${this.$store.getters.apiUrl}/upload`, {
//       })
//     },
//   }
// };
</script>