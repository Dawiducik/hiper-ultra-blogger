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
import Profile from '@/components/views/Profile';

import LoadPost from '@/components/LoadPost';

import LoadingSpinner from '@/components/LoadingSpinner';
import store from '@/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/spinner',
      name: 'Spinner',
      component: LoadingSpinner,
    },
    {
      path: '/loadpost',
      name: 'LoadPost',
      component: LoadPost,
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
        {
          path: 'profil',
          name: 'Profile',
          component: Profile,
        },
      ],
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: ':friendlyUrl',
          name: 'ShowPost',
          component: ShowPost,
        },
        {
          path: '/tag/:name',
        },
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
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
