import { message } from "./index";

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
  { params, msg = "", request = false } = {}
) {
  let state = false;
  try {
    const data = await api(params);
    state = data.code === 200;
    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  } finally {
    //request为true时,使用接口返回的msg
    message(msg, state, { auto: true, request: request && data.msg });
  }
}
