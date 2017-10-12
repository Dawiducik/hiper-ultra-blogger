// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import VueQuillEditor from 'vue-quill-editor';
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/circle-o-notch';
import 'vue-awesome/icons/newspaper-o';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import router from './router';
import prettyDate from './filters/prettyDate';


Vue.component('icon', Icon);

Vue.filter('prettyDate', prettyDate);

Vue.use(Vuex);
Vue.use(VueQuillEditor);

Vue.config.productionTip = false;

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
