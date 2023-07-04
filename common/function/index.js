import { isObject, isFunction } from "./validate";
import { getByteLength } from "./string";

export * from "./array";
export * from "./filter";
export * from "./object";
export * from "./string";
export * from "./project";
export * from "./validate";

let hideMessage = null;

/**
 * @description: 弹出消息框
 * @param {String} title 消息标题
 * @param {String|Boolean} icon 状态(布尔类型时只有成功与失败状态,字符串类型时自定义)
 * @param {String|Object} info 信息([字符串]用于处理无message时显示空白问题,[对象]:配置强制内容显示,用于替换不需要的message)
 * @return {Object} 返回result对象,包含close,success,error,finally方法
 */
export function message(msg = "", state = true, info) {
  let config = {};
  let isIcon = typeof state === "string"; //是否为图标类型
  const Enum = ["success", "error", "info", "warning", "none"]; //支持的类型
  if (isIcon && !Enum.includes(state)) state = Enum[2]; //不符合规则则默认为info
  else if (!isIcon) state = state ? Enum[0] : Enum[1]; //计算类型值
  if (isObject(info)) {
    //如果info是配置对象则进行处理
    //(process加工文本函数,auto自动填充后缀,request请求时的msg)
    let { auto, request, process, ..._config } = info;
    msg = request || autoSuffix(info[state] || msg); //(请求时的msg,状态配置的msg,默认msg)
    function autoSuffix(msg) {
      return msg + (auto ? (state == "success" ? "成功" : "失败") : "");
    }
    if (isFunction(process)) {
      const _msg = process(msg, state);
      if (_msg) {
        if (typeof _msg === "string") msg = _msg;
        else if (_msg?.[state]) msg = _msg[state]; //最后提示文本加工处理功还是失败后缀
      }
    }
    config = _config || {};
  }
  if (getByteLength(msg) > 14) state = "none"; //超过14个字节时,不显示图标
  let params = { title: msg, icon: state, duration: 1500, ...config };
  if (hideMessage) hideMessage(); //小程序提示框只显示一个观感较好,所以关闭上一个消息框
  uni.showToast(params);
  let result = {
    //前半部分为状态判断并调用回调函数,
    //使用||true是为了防止回调函数返回false时导致后面的代码不执行
    //这样保证了最后返回的是result对象,用于链式调用
    close: () => (params = result = null) || uni.hideToast(),
    success: cb => ((state == "success" && cb(params)) || true) && result,
    error: cb => ((state == "error" && cb(params)) || true) && result,
    finally: cb => (cb(state, params) || true) && result,
  };
  hideMessage = result.close;
  return result; //返回结果
}

/**
 * @description: 跳转路径
 * @param {String} path 路径地址
 * @param {Object=} query 路径query参数
 * @param {Object=} events 路径打开时需要通信的事件
 * @param {String} [method='navigateTo']  转跳方法
 * @return {Promise}
 */
export function goToPath(
  path,
  { query, events, method = "navigateTo", duration = 0 } = {}
) {
  if (typeof path !== "string") return Promise.reject("参数路径不合法!");
  if (!uni[method] instanceof Function)
    return Promise.reject("method传入错误,没有该方法!");
  return new Promise((res, rej) => {
    setTimeout(() => {
      uni[method]({
        url: join(path.trim(), query),
        events,
        success() {
          res(...arguments);
        },
        fail({ errMsg }) {
          rej(errMsg);
        },
      });
    }, duration);
  });

  function join(path, query = {}) {
    if (typeof query === "string") return path + "?query=" + query;
    path += "?";
    for (const key in query) {
      path += key + "=" + query[key] + "&";
    }
    return path.substr(0, path.length - 1);
  }
}

/**
 * @description: 创建定时器
 * @example let Timer=createTimer();
 * Timer.openTimer(()=>{console.log(0)},500);==>500毫秒后输出0;
 * Timer.clearTimer();==>关闭定时器
 * 在创建前调用关闭,可以实现防抖功能
 * @param {Boolean} isTimeOut 是否为setTimeOut
 * @param {Boolean} isAutoClear 是否自动清除原定时器
 * @return {Object:{openTimer:function,clearTimer:function}}
 */
export function createTimer(isTimeOut = true) {
  let timer = null;
  return {
    openTimer: function (fn, time) {
      //打开定时器
      clearTimer();
      if (typeof time != "number") time = time >> 0 || 5000; //确保数字
      if (isTimeOut) {
        timer = setTimeout(fn.bind(this, (timer = null)), time);
      } else {
        timer = setInterval(fn.bind(this, clearTimer), time);
      }
      return useFn;
    },
    clearTimer,
  };

  function useFn(fn) {
    //使用fn
    if (fn instanceof Function) fn(clearTimer, timer);
  }

  function clearTimer(fn) {
    //关闭定时器
    if (timer) {
      isTimeOut ? clearTimeout(timer) : clearInterval(timer);
      timer = null;
      useFn(fn);
    }
  }
}

/**
 * @description: 函数上锁(未解锁时不执行,节流功能)
 * @param {Number} unlockTime 自动解锁时间
 * @return {Boolean} 锁状态
 */
export function lockFunction(unlockTime = 0) {
  let _lock = false;
  let Timer = null;
  return function (fn, lockFn) {
    if (fn === "close") return close(); //传入close字符串关闭函数
    if (fn === "unlock") return unlock(); //传入unlock字符串解锁函数
    if (_lock) return isFunction(lockFn, true); //上锁时才触发
    lock(); //上锁
    fn(unlock, close); //传入解锁函数
    if (unlockTime) {
      if (Timer === null) Timer = createTimer();
      Timer.openTimer(unlock, unlockTime >> 0);
    }
    return close;
  };

  function close() {
    //关闭函数
    if (Timer) Timer.clearTimer();
    _lock = Boolean((Timer = null));
  }

  function lock() {
    //上锁函数
    _lock = true;
  }

  function unlock() {
    //解锁函数
    _lock = false;
    if (Timer) Timer.clearTimer();
  }
}

export function sleep(fn, time = 0) {
  //休眠函数
  if (typeof fn === "number") {
    time = fn;
    fn = null;
  }
  return new Promise(res =>
    setTimeout(() => res(isFunction(fn, true)), time >> 0 || 300)
  );
}

export function getNextDayTimestamp(num = 1, isDiff = false) {
  //获取次日凌晨时间戳
  // 距离天数,默认一天也就是次日;是否作差值
  let nowTime = new Date(),
    nowTimestamp = nowTime.getTime();
  let _time = new Date(nowTime.toLocaleDateString()).getTime(); //获取当天凌晨时间戳
  if (typeof num === "number" && num > 0) _time += num * 86400000;
  else if (typeof num === "boolean") {
    // 第一参数为布尔值则赋值给isDiff
    isDiff = num;
  }
  // 作差值,为次日(1)/多日(n)差值.
  if (isDiff) _time -= nowTimestamp;
  return {
    timestamp: _time, //时间戳计算结果
    nowTime, //计算时的当前时间
    nowTimestamp, //计算时的当前时间戳
  };
}
