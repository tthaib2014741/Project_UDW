import { createStore } from 'vuex';

const store = createStore({
  state: {
    adminLoggedInUser: JSON.parse(localStorage.getItem('adminLoggedInUser')) || null,
    userLoggedInUser: JSON.parse(localStorage.getItem('userLoggedInUser')) || null
  },
  mutations: {
    setAdminLoggedInUser(state, user) {
      state.adminLoggedInUser = user;
    },
    setUserLoggedInUser(state, user) {
      state.userLoggedInUser = user;
    },
    clearAdminLoggedInUser(state) {
      state.adminLoggedInUser = null;
    },
    clearUserLoggedInUser(state) {
      state.userLoggedInUser = null;
    }
  },
  actions: {
    setAdminLoggedInUser({ commit }, user) {
      localStorage.setItem('adminLoggedInUser', JSON.stringify(user));
      commit('setAdminLoggedInUser', user);
    },
    setUserLoggedInUser({ commit }, user) {
      localStorage.setItem('userLoggedInUser', JSON.stringify(user));
      commit('setUserLoggedInUser', user);
    },
    logoutAdmin({ commit }) {
      localStorage.removeItem('adminLoggedInUser');
      commit('clearAdminLoggedInUser');
    },
    logoutUser({ commit }) {
      localStorage.removeItem('userLoggedInUser');
      commit('clearUserLoggedInUser');
    }
  },
  getters: {
    adminLoggedInUser: state => state.adminLoggedInUser,
    userLoggedInUser: state => state.userLoggedInUser
  }
});

export default store;
