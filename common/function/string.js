/**
 * @description: 获取数据的具体类型
 * @param {Object} data 数据对象
 * @return {string} 对象类型字符串
 */
export function getTypeof(data) {
  return Object.prototype.toString.call(data).slice(8, -1);
}

export function stringify(target) {
  let cache = [];
  const res = JSON.stringify(target, (_, value) => {
    //去除循环引用
    if (typeof value === "object" && value !== null) {
      if (cache.includes(value)) return;
      cache.push(value);
    }
    return value;
  });
  cache = null;
  return res;
}

/**
 * @description: 字符空白去除(可选参数[left,right,center,all,不传参])
 * @param {string} val 待处理值
 * @param {string} type 去除类型
 * @return {string} 处理后值
 */
export function trimString(val, type) {
  if (!val) return "";
  val += ""; //保证为字符串
  switch (type) {
    case "left": //去除左空白
      return val.replace(/^\s*/, "");
    case "right": //去除右空白
      return val.replace(/\s*$/g, "");
    case "all": //去除全部空白
      return val.replace(/\s/g, "");
    default: //去除两边空白
      return val.trim();
  }
}
/**
 * @description: 字节长度限制(8个中文限制16字节)
 * @param {String} string 字符串
 * @param {Number} length 限制字节长度
 * @return {String} 处理后值
 */
export function stringLimit(string, length = 8) {
  if (!string) return "";
  string = trimString(string, "all");
  const byte = [];
  const obj = { len: 0, index: 0 };
  for (const char of string) {
    let num = (char.charCodeAt(0) > 127 || char.charCodeAt(0) == 94) + 1;
    byte.push(num);
    obj.len += num;
    if (obj.len > length) {
      if (byte.at(-1) === 2 && byte.at(-2) === 1) obj.index++; //处理最后一个字符为中文的情况
      return string.substring(0, obj.index);
    } else obj.index++;
  }
  return string;
}

//获取字节长度
export function getByteLength(string) {
  if (!string) return 0;
  return [...string].reduce((pre, cur) => {
    let is = cur.charCodeAt(0) > 127 || cur.charCodeAt(0) == 94;
    return (pre += is ? 2 : 1);
  }, 0);
}
