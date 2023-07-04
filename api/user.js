const http = uni.$u.http;
import { API } from "./index";
import config from "@/common/config";
const THIRD_HEAD = "/api/third/MiniApp";

// 获取用户信息
export const getUserInfo = () => http.get(`${API.system}Users/get`);

//用户登录
export const userLogin = data =>
  http.post("/api/mongoOauth/Login", data, {
    params: {
      client_id: "admin",
      client_secret: 123456,
      scope: "all",
      grant_type: "password",
    },
  });

//发送验证码
export const sendCode = phone =>
  http.get(
    `https://kindoucloud.com:8011/api/oauth/sendMsg/${phone}/login/${config.tenantId}`
  );

//jsApi下单
export const userCreateOrder = data =>
  http.post(`${THIRD_HEAD}Pay/JsapiCreateOrder`, data);

//获取用户openid
export const getUserOpenId = code =>
  http.get(`${THIRD_HEAD}/${config.tenantId}/${code}/Openid`);
