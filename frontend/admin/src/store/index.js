import { createStore } from 'vuex';

const store = createStore({
  state: {
    loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')) || null
  },
  mutations: {
    setLoggedInUser(state, user) {
      state.loggedInUser = user;
    },
    clearLoggedInUser(state) {
      state.loggedInUser = null;
    }
  },
  actions: {
    setLoggedInUser({ commit }, user) {
      commit('setLoggedInUser', user);
    },
    logout({ commit }) {
      localStorage.removeItem('loggedInUser');
      commit('clearLoggedInUser');
    }
  },
  getters: {
    loggedInUser: state => state.loggedInUser
  }
});

export default store;
