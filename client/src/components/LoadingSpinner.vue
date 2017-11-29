<template lang="pug">
  div.fixed-top.d-flex.justify-content-center.align-items-center.mvh-100
    div.d-flex.flex-column.justify-content-center.align-items-center
      icon(name="circle-o-notch", scale="3", spin) 
      h1.mt-5.font-weight-normal(v-if="this.resource") {{ resource }}
    
</template>
<script>
export default {
  name: 'spinnerLoader',
  props: ['resource'],
};
</script>
<style scoped>
.mvh-100 {
  height: 100vh;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>

