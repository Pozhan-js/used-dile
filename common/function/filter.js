import { isObject, isFunction } from "./validate";

/**
 * @description: 获取对象属性值
 * @param {object} origin 原始对象
 * @param {array} attrs 属性名
 * @param {*|function} defaultValue 默认值
 * @return {object}
 * @example
 * 根据attrs,获取对象对应属性值,如果属性值不存在,则使用默认值,|分割属性名和别名
 * getObjectAssignProperty({a:1,b:2},["a|num","b","c"],"df"):==>{num:1,b:2,c:"df"}
 */
export function getObjectAssignProperty(origin = {}, attrs = [], defaultValue) {
  var getDefaultValue = function () {
    //获取默认值(函数执行后会获取一个固定函数)
    let fn = () => defaultValue;
    if (isObject(defaultValue)) {
      fn = key => {
        const val = defaultValue[key];
        return isFunction(val) ? val(origin) : val;
      };
    } else if (isFunction(defaultValue)) {
      fn = defaultValue;
    }
    getDefaultValue = fn;
    return fn.apply(this, arguments);
  };
  return attrs.reduce((val, key) => {
    let [keyName, alias] = key.split("|"); //(目标属性名|返回属性名)
    let value;
    if (keyName.includes(".")) {
      //支持对象属性选择
      const keys = keyName.split(".");
      keyName = keys[0];
      value = optionalChain(origin, keys);
    } else {
      value = origin[keyName] ?? getDefaultValue(keyName);
    }
    val[alias ?? keyName] = value;
    return val;
  }, {});
}
/**
 * @description: 获取引用对象属性值
 * @param {object} raw 原始对象
 * @param {object} target 目标对象
 * @return {object}
 * @example
 * 根据原始对象的属性值,获取目标对象的属性值,如果目标对象没有该属性,则使用原始对象的属性值
 * getReferenceObjectProperty({a:1,b:2},{b:3,c:1}):==>{a:1,b:3}
 */
export function getReferenceObjectProperty(raw = {}, target = {}) {
  if ([raw, target].some(o => !isObject(o)))
    throw "The parameter is illegal! This is not a object";
  return Object.entries(raw).reduce((obj, [key, val]) => {
    const [keyName, alias] = key.split("|"); //(目标属性名|返回属性名)
    obj[alias ?? keyName] = target[keyName] ?? val;
    return obj;
  }, {});
}

/**
 * @description: 可选链操作
 * @param {object} target 目标对象
 * @param {array|string} keys 属性名
 * @param {*} def 默认值
 * @return {*}
 */
export function optionalChain(target, keys, def) {
  if (typeof keys === "string") keys = keys.split(".");
  if (!Array.isArray(keys)) return def;
  for (const key of keys) {
    if ([null, undefined].includes(target)) return def;
    target = target[key];
  }
  return target;
}
