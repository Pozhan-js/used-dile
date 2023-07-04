import Vue from "vue";
import Vuex from "vuex";

//需要时再引入
import user from "./module/user";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { user },
  getters: {
    isLogin: state => Boolean(state.user.token),
  },
});

export default store;
