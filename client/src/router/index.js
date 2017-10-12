import Vue from 'vue';
import Router from 'vue-router';
import DashboardLayout from '@/components/Dashboard';

import Index from '@/components/Index';
import ShowPost from '@/components/ShowPost';
import Login from '@/components/Login';
import Register from '@/components/Register';

import AddPost from '@/components/views/AddPost';
import ShowPosts from '@/components/views/ShowPosts';
import Dashboard from '@/components/views/Dashboard';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/zaloguj',
      name: 'Login',
      component: Login,
    },
    {
      path: '/zarejestruj',
      name: 'Register',
      component: Register,
    },
    {
      path: '/panel',
      component: DashboardLayout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          name: 'IndexPanel',
          component: Dashboard,
        },
        {
          path: 'posty',
          name: 'ShowPosts',
          component: ShowPosts,
        },
        {
          path: 'posty/dodaj',
          name: 'AddPost',
          component: AddPost,
        },
      ],
    },
    {
      path: '/:friendlyUrl/',
      name: 'ShowPost',
      component: ShowPost,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({
        path: '/zaloguj',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
