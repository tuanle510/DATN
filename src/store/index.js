import { createStore } from "vuex";
const store = createStore({
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    LOGOUT(state) {
      state.user = null;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("SET_USER", user);
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
  },
  getters: {
    getUser: (state) => state.user,
  },
});

export default store;
