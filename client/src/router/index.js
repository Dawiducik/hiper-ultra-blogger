import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import AddPost from '@/components/AddPost';
import ShowPost from '@/components/ShowPost';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/post/dodaj',
      name: 'AddPost',
      component: AddPost,
    },
    {
      path: '/:friendlyUrl',
      name: 'ShowPost',
      component: ShowPost,
    },
  ],
});
