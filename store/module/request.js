export default {
  state() {
    return {
      timer: null,
    };
  },
  mutations: {
    SET_TIMER(state, timer) {
      state.timer = timer;
    },
  },
  actions: {
    // 加载开始
    loadStart({ state, dispatch }) {
      dispatch("loadEnd");
      state.timer = setTimeout(() => {
        uni.showLoading({ title: "加载中..." });
        dispatch("loadEnd");
      }, 800);
    },
    // 加载结束
    loadEnd({ commit, state }) {
      if (state.timer === null) return;
      uni.hideLoading();
      clearTimeout(state.timer);
      commit("STE_TIMER", null);
    },
  },
};
