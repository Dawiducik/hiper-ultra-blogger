import Vue from 'vue';
import Vuex from 'vuex';
import Http from '@/providers/http';

Vue.use(Vuex);
function getCoffee() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 0);
  });
}
const API_URL = 'https://hub-server.herokuapp.com/api';
// const API_URL = 'http://localhost:8081/api';
const store = new Vuex.Store({
  state: {
    API_URL,
    isLoading: false,
    loadingResource: '',
    post: null,
    user: {
      profile: {
        username: '',
      },
      token: null,
    },
  },
  mutations: {
    TOGGLE_LOADING() {
      this.state.isLoading = !this.state.isLoading;
    },
    SET_LOADING_RESOURCE(state, resource) {
      this.state.loadingResource = resource;
    },
    SET_LATEST_POST(state, post) {
      this.state.post = post;
    },
    SET_USER_PROFILE(state, profile) {
      this.state.user.profile = profile;
    },
    REMOVE_USER_PROFILE() {
      this.state.user.profile = {};
    },
    SET_USER_TOKEN(state, token) {
      console.log('zapisuje token uzytkownika');
      this.state.user.token = token;
    },
    REMOVE_USER_TOKEN() {
      this.state.user.token = null;
    },
  },
  actions: {
    LOAD_POST_BY_FRIENDLYURL({ commit, state }, furl) {
      console.log('wywoluje akcje load post by id ', furl);
      Http({
        url: `${API_URL}/posts/furl/${furl}`,
        method: 'get',
      })
      .then((res) => {
        commit('SET_LATEST_POST', res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    },
    async LOAD_USER_PROFILE({ getters, commit }) {
      console.log(' laduje profil');
      try {
        commit('TOGGLE_LOADING');
        commit('SET_LOADING_RESOURCE', 'ŁADUJĘ PROFIL UŻYTKOWNIKA');
        await getCoffee();
        const requestOptions = {
          url: `${API_URL}/users/profile`,
          method: 'get',
          headers: {
            'Authorization-Token': getters.userToken,
          },
        };
        const profile = await Http(requestOptions);
        console.log('skonczylem ladowac profil');
        if (!profile.data.success) {
          throw new Error(profile.data.message);
        }
        commit('SET_USER_PROFILE', profile.data.user);
        return true;
      } catch (e) {
        console.log(e);
        console.log('blad przy ladowaniu profilu');
        return false;
      } finally {
        this.commit('TOGGLE_LOADING');
      }
    },
    async LOGIN_USER({ commit }, credentials) {
      console.log('pobieram token uzytkownika (loguje)');
      try {
        commit('TOGGLE_LOADING');
        commit('SET_LOADING_RESOURCE', 'LOGUJĘ UŻYTKOWNIKA');
        await getCoffee();
        const request = await Http({
          url: `${API_URL}/users/login`,
          method: 'post',
          data: credentials,
        });
        console.log(request.data);
        if (!request.data.success) {
          throw new Error(request.data.message);
        }
        console.log('skonczylem pobierac token');
        commit('SET_USER_TOKEN', request.data.token);
        localStorage.setItem('token', request.data.token);
        return request.data;
      } catch (e) {
        console.log('blad przy logowaniu');
        console.log(e);
        return {
          success: false,
          message: e.message,
        };
      } finally {
        commit('TOGGLE_LOADING');
      }
    },
    async LOAD_POSTS_BY_TAGNAME({ commit }, tagName) {
      console.log('laduje posty');
      try {
        commit('TOGGLE_LOADING');
        commit('SET_LOADING_RESOURCE', 'ŁADUJĘ POSTY');
        await getCoffee();
        const request = await Http({
          url: `${API_URL}/posts/tag/${tagName}`,
        });
        console.log(request.data);
        console.log(request);
        if (!request.data) {
          throw new Error(request.data.message);
        }
        return request.data;
      } catch (e) {
        return {
          success: false,
          message: e.message,
        };
      } finally {
        commit('TOGGLE_LOADING');
        console.log('skonczylem ladowac posty');
      }
    },
    LOGOUT_USER({ commit }) {
      console.log('wylogowuje uzytkownika');
      return new Promise((resolve) => {
        commit('REMOVE_USER_PROFILE');
        commit('REMOVE_USER_TOKEN');
        localStorage.removeItem('token');
        resolve();
      });
    },
  },
  getters: {
    isLoading: state => state.isLoading,
    loadingResource: state => state.loadingResource,
    latestPost: state => state.post,
    userProfile: state => state.user.profile,
    userToken: state => state.user.token,
    isAuthenticated: state => !!state.user.token,
    isUserLoaded: state => !!state.user.token && !!state.user.profile.username,
    apiUrl: state => state.API_URL,
  },
});

if (localStorage.getItem('token')) {
  store.commit('SET_USER_TOKEN', localStorage.getItem('token'));
}
export default store;
