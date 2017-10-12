import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: null,
    userProfile: null,
  },
  mutations: {
    SET_TOKEN(state, token) {
      this.state.token = token;
    },
    SET_USER_PROFILE(state, profile) {
      this.state.userProfile = profile;
    },
  },
  getters: {
    userProfile: state => state.userProfile,
    token: state => state.token,
  },
});

export default store;
