import storage from "@/common/function/storage";
import {
  verifyEmpty,
  getNextDayTimestamp,
  getReferenceObjectProperty,
} from "@/common/function";
import constants from "@/common/constants";
import { getUserInfo } from "@/api/user";

function updateStorage(key, val) {
  if (verifyEmpty(val)) storage.remove(key);
  else storage.set(key, val);
}
const state = (() => {
  let lastLoginTime = uni.getStorageSync("lastLoginTime") || 0;
  let diffTime = lastLoginTime - getNextDayTimestamp(0).timestamp;
  const data = {};
  data.openToken = storage.get("OpenToken");
  if (diffTime >= 0 && diffTime < constants.LOGIN_EXPIRATION_TIME) {
    //登录时间戳没有过期
    data.token = storage.get("Token");
    if (data.token) {
      data.userInfo = storage.get("UserInfo");
    }
  } else if (lastLoginTime) {
    storage.clear();
  }
  return getStateDefaultValue(data);
})();

function getStateDefaultValue(state) {
  //获取state默认值
  return getReferenceObjectProperty(
    {
      token: null,
      openToken: null,
      userInfo: {},
    },
    state
  );
}
function setStateData(stateKey, storageKey) {
  // commit只能接收两个参数
  return function (state, { $assign = false, ...data }) {
    if ($assign) Object.assign(state[stateKey], data); //合并
    else state[stateKey] = data;
    updateStorage(storageKey, state[stateKey]);
  };
}
export default {
  namespaced: true,
  state,
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      uni.setStorageSync("lastLoginTime", Date.now());
      updateStorage("Token", token);
    },
    SET_USER_INFO: setStateData("userInfo", "UserInfo"),
    SET_OPEN_TOKEN(state, token) {
      state.openToken = token;
      updateStorage("OpenToken", token);
    },
    CLEAR_ALL_DATA(state) {
      Object.assign(state, getStateDefaultValue({}));
      storage.clear();
    },
  },
  actions: {
    async updateUserInfo({ commit }, token) {
      if (token) commit("SET_TOKEN", token);
      try {
        const info = await getUserInfo();
        if (info?.code !== 200) throw null;
        commit("SET_USER_INFO", info?.data);
        return info;
      } catch {
        return Promise.reject({ code: 400 });
      }
    },
    logout({ commit }) {
      commit("CLEAR_ALL_DATA");
    },
  },
};
