import store from "../store";
import configApp from "../common/config";
import { message } from "../common/function";
module.exports = vm => {
  // 初始化请求配置
  uni.$u.http.setConfig(config => {
    /* config 为默认全局配置*/
    config.timeout = 5000; /* 超时时间 */
    config.baseURL = configApp.baseURL; /* 根域名 */
    return config;
  });
  // 请求拦截
  uni.$u.http.interceptors.request.use(config => {
    config.data = config.data || {};
    const { token, openToken } = store.state.user;
    if (token) {
      config.header.Authorization = token;
    } else if (config.url.includes("OpenApi")) {
      config.header.Authorization = openToken;
    }
    return config;
  });

  // 响应拦截
  uni.$u.http.interceptors.response.use(
    ({ data }) => {
      if (data.code === 400) message(data.msg || "请求失败", false);
      else if (![200, 400, 500].includes(data.code)) {
        store.dispatch("user/logout");
        if (data.msg) message(data.msg, false);
        setTimeout(() => {
          uni.reLaunch({ url: "/subPages/user/login/login" });
        }, 300);
      }
      return data ?? {};
    },
    response => {
      const timeout = /request:fail (.*)/.exec(response.errMsg)?.[1];
      if (["", "timeout"].includes(timeout)) response.timeout = true;
      return Promise.reject(response);
    }
  );
};
