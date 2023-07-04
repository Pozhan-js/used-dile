import Vue from "vue";
import storage from "../common/function/storage";
import helper from "../common/helper";
import constants from "../common/constants";

// u-view
uni.$u.props.loadingIcon.color = constants.THEME_COLOR;

// 全局方法
import {
  message,
  goToPath,
  stringify,
  sendRequestModel,
  openModel,
} from "../common/function";

Vue.prototype.$message = message;
Vue.prototype.$jump = goToPath;
Vue.prototype.$request = sendRequestModel;
Vue.prototype.$storage = storage;
Vue.prototype.$helper = helper;
Vue.prototype.$model = openModel;
Vue.prototype.$photo = helper.filterCover; //图片过滤器
Vue.prototype.$constants = constants;

//兼容structuredClone函数
if (typeof structuredClone !== "function") {
  globalThis.structuredClone = target => JSON.parse(stringify(target));
}
