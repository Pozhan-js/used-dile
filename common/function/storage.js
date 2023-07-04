import config from "../config";
import { isObject } from "./validate";
function getKey(key) {
  return config.storage + key;
}
export default {
  get(key) {
    return uni.getStorageSync(getKey(key));
  },
  set(key, data, batch = false) {
    // batch为true,则拆分对象进行批量设置
    if (batch && isObject(data)) {
      for (const key in data) {
        uni.setStorageSync(getKey(key), data[key]);
      }
    } else {
      uni.setStorageSync(getKey(key), data);
    }
  },
  remove(key) {
    uni.removeStorageSync(getKey(key));
  },
  clear() {
    uni.clearStorageSync();
  },
};
