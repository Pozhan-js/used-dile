import { message } from "./index";
import storage from "./storage";

/**
 * @description: 发送请求模块(抽出公共部分)
 * @param {function} api 接口
 * @param {object} params 参数
 * @param {string} msg 提示信息
 * @param {boolean} request 是否使用接口msg
 * @return {Promise}
 */
export async function sendRequestModel(
  api,
  { params, msg = "请求", request = false, ...config } = {}
) {
  let state = false;
  let data = null;
  if (config.auto === undefined) config.auto = true;
  try {
    data = (await api(params)) || {};
    state = data?.code === 200;
    if (state) return Promise.resolve(data);
    else throw data;
  } catch (e) {
    //超时文本处理
    if (e.timeout) msg += (config.auto = false) || "超时";
    return Promise.reject(e);
  } finally {
    //request为true时,使用接口返回的msg
    if (request && !["Success"].includes(data?.msg)) config.request = data?.msg;
    if (msg || config.request) message(msg, state, config);
  }
}

export function openModel(title, content, config = {}) {
  return new Promise((success, fail) => {
    uni.showModal({
      title,
      content,
      ...config,
      success,
      fail,
    });
  });
}

/**
 * @description: 获取查询时的过滤条件
 * @param {object} data 查询条件({key:value})
 * @param {string} method 查询方法(eq,like,gt,lt,ge,le)
 * @param {string} type 查询类型(custom,or,and)
 * @return {array}
 */
export function getSearchFilter(
  data = {},
  { method = "eq", type = "custom" } = {}
) {
  const list = [];
  const get = val => (Array.isArray(val) ? val : [val]);
  for (const key in data) {
    list.push({ key, method, type, value: get(data[key]) });
  }
  return list;
}

export function verifyUserInfo() {
  const user = storage.get("UserData") || {};
  if (user._id) return Promise.resolve();
  else
    return verifyError(
      "请先填写资料后再操作",
      "/subPages/user/settings/userInfo"
    );
}

export function verifyLogin() {
  const token = storage.get("Token") || null;
  if (token) return Promise.resolve();
  else return verifyError("请登录后再操作!", "/subPages/user/login/login");
}

function verifyError(msg, url) {
  const duration = 650;
  message(msg, "none", { duration });
  return Promise.reject(function (fn) {
    setTimeout(() => {
      if (fn instanceof Function) fn();
      uni.navigateTo({ url });
    }, duration);
  });
}
