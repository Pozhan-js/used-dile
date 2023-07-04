import Vue from "vue";

import uView from "uview-ui";
Vue.use(uView); //先挂载uView,以防下面使用$u.http时找不到方法

import App from "./App";
import store from "./store";

import { router, RouterMount } from "./router"; //路径换成自己的
Vue.use(router);

Vue.config.productionTip = false;
require("./utils/custom.js"); //引入自定义方法

const app = new Vue({ ...App, store });

// #ifdef H5
RouterMount(app, router, "#app");
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif

// 引入请求封装，将app参数传递到配置中
require("./utils/request.js")(app);
