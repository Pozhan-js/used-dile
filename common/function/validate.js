import { getTypeof } from "./string";

export function isObject(data) {
  //判断是否为对象
  return getTypeof(data) == "Object";
}

/**
 * @description: 判断是否为函数
 * @param {any} fn 待校验参数是否为函数
 * @param {Boolean} useFn 校验通过时是否调用函数
 * @param {any} params 调用函数时传入的参数
 * @param {any} defaultVal 如果函数执行后并没有返回值,且不需要返回的布尔值,可以设置默认值
 * @return {Boolean|any} 不执行函数则返回布尔值
 */
export function isFunction(fn, useFn = false, { params, defaultVal } = {}) {
  let isFn = fn instanceof Function;
  return useFn ? get(isFn ? fn.call(this, params) : null) : isFn;

  function get(val) {
    return val ?? defaultVal ?? null;
  }
}

/**
 * @description: 判断参数是否为空(null,undefined),第二参数开启则而外判断空字符串('')
 * @param {Object} val 待判断参数
 * @param {Boolean} isVerifyEmptyString 是否判断空字符串
 * @return {Boolean} 为空才返回true
 */
export function isEmpty(val, isVerifyEmptyString = false) {
  return Array.isArray(val) ? val.some((res) => get(res)) : get(val);

  function get(val) {
    if (isVerifyEmptyString && val === "") return true;
    return [null, undefined].includes(val);
  }
}

/**
 * @description: 校验值是否为空(支持[数组,数字,布尔,字符串,map,set,object])
 * @return {Boolean}
 */
export function verifyEmpty(val) {
  if (val === null || val == undefined) return true;
  if (["boolean", "number"].includes(typeof val)) return false;
  switch (getTypeof(val)) {
    case "String":
    case "Array":
      return !val.length;
    case "Map":
    case "Set":
      return !val.size;
    case "Object":
      return !Object.keys(val).length;
  }
  return false;
}
