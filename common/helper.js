//适用本项目的通用方法
import config from "./config";
import { verifyEmpty } from "./function";
export default {
  verifyRule: {
    phone:
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
    password: /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,16}$/,
    name: /^[\u4e00-\u9fa5]{2,4}$/,
  },
  /**
   * @description: 过滤数据(脱壳)
   * @param {Object} data 把请求成功的res数据传入进来,或者直接await 请求接口()
   * @param {Function|Boolean} filterFn 可以再传入一个回调函数对返回的数据进行二次处理
   * @param {String} key 可以控制返回的字段
   * @return {Array|Object} 返回值
   */
  filterData(data, filterFn, key) {
    //filterFn为布尔值true时,仅返回data,不获取list
    data = data?.data;
    let list = data?.[key || "list"] || [];
    if (!Array.isArray(list) || typeof filterFn != "function")
      return filterFn ? data || {} : list || [];
    return list.map(res => filterFn(res));
  },
  filterCover(data, isUrl = true) {
    if (verifyEmpty(data)) return "";
    else if (typeof data === "string") {
      if (uni.$u.test.url(data)) return data;
      else return config.baseURL + data;
    }
    return config.baseURL + (isUrl ? data[0]?.url : data[0]);
  },
  getAvatar(url) {
    //获取头像
    return url ? config.baseURL + url : "/static/image/default-avatar.png";
  },
  getImage(tenement = "", fileName = "", port) {
    if (tenement && !fileName) {
      fileName = tenement;
      tenement = "";
    } else if (tenement) {
      tenement += "/";
    }
    const url = port
      ? config.fileURL.replace(/:\d+$/, ":" + port)
      : config.fileURL;
    if (fileName.lastIndexOf(".") === -1) fileName += ".png"; //默认png后缀
    return url + "/api/file/Image/systemicon/" + tenement + fileName;
  },
  rollback({ timeout = 0, home = {}, back = {} } = {}) {
    const pages = getCurrentPages();
    let method = "navigateBack";
    if (pages.length <= 1) {
      back = { url: "/pages/index/index", ...home };
      method = "reLaunch";
    }
    setTimeout(() => uni[method](back), timeout);
  },
};
