import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: false,
  },
  mutations: {
    updateUser(state, newUser) {
      state.user = newUser;
      console.log(newUser);
    },
  },
  getters: {},
  actions: {},
  modules: {},
});
