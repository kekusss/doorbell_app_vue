import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from "@/services/auth.service";

Vue.use(Vuex)

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export default new Vuex.Store({
  state: initialState,
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    }
  },
  actions: {
      login({ commit }, authData) {
      return AuthService.login(authData.email, authData.password).then(
          user => {
            commit("loginSuccess", user);
            return Promise.resolve(user);
          },
          error => {
            console.log(error.message);
            commit("loginFailure");
            return Promise.reject(error.message);
          }
      );
    },
    logout({ commit }) {
        AuthService.logout();
        commit("logout");
    }
  },
  modules: {
  }
})
