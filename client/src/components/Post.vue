<template lang="pug">
  div
    .post.card
      h4.card-header {{ title }}
      .card-body
        div(v-html="body")
        a(:href="friendlyUrl") Czytaj dalej
        blockquote.blockquote.mb-0
          footer.blockquote-footer
            | Autor: {{ author }} | utworzono: {{ createdAt }}

</template>
<script>
export default {
  name: 'post',
  props: ['title', 'body', 'createdAt', 'author', 'friendlyUrl'],
};
</script>
