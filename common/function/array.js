//删除数组指定项
export function removeArrayItem(arr, value, key = "id") {
  let item = [null];
  const index = key
    ? arr.findIndex((o) => o[key] === value)
    : arr.indexOf(value);
  if (index > -1) item = arr.splice(index, 1);
  return item[0];
}

/**
 * @description: 数组对象去重(只支持单个属性是否重复去重)
 * @param {array} arr 待处理数组
 * @param {?function} filterFn 过滤函数
 * @param {string} [name="name"] 去重属性
 * @return {array}
 */
export function arrayObjectDeWeight(arr = [], { filterFn, name = "id" }) {
  let map = new Map();
  if (!filterFn) filterFn = item => item;
  for (let item of arr) {
    if (!map.has(item[name])) map.set(item[name], filterFn(item));
  }
  return Array.from(map.values());
}

/**
 * @description: 树型转化 [单循环O(n)算法]
 * @param {Array} list 扁平数组数据
 * @param {String} keyField id的键值
 * @param {String} childField children的属性名
 * @param {String} parentField parentId的键值
 * @return {Array} 树型格式数据
 */
export function transformTree(list, options = {}) {
  const {
    keyField = "id",
    childField = "children",
    parentField = "parentId",
    checkFn = (res) => res && res != -1, //当parentField为-1或者其他特殊值,需要传入校验函数
  } = options;
  const tree = [];
  const record = {}; //记录单次children结果
  for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i]; //当前项
    const id = item[keyField]; //当前项id
    if (!id) continue; //id不存在则跳过
    let record_id = record[id];
    item[childField] = record_id ? record_id : (record[id] = []);
    //如果当前项有parentId,则将当前项添加到parentId对应的children中
    if (checkFn(item[parentField])) {
      const parentId = item[parentField];
      if (!record[parentId]) record[parentId] = [];
      record[parentId].push(item); //将当前项添加到parentId对应的children中
    } else {
      //如果当前项没有parentId,则将当前项添加到根节点中
      tree.push(item);
    }
  }
  return tree;
}

/**
 * @description: 树型扁平化(递归处理)
 * @param {array} data 待处理数据
 * @param {string} [childField= "children"] 子元素标识符
 * @param {?function} filterFn 传递过滤函数时可自行控制循环和返回值,这样可以在递归时处理数据
 * @param {array} [defaultValue=[]] 默认数据
 * @return {array}
 */
export function extractTree(
  data,
  { childField = "children", filterFn, defaultValue = [] } = {}
) {
  let res = defaultValue,
    isOver = false, //是否结束
    isSkip = false, //是否跳过
    tier = 0, //层级
    index = -1; //计数索引
  let main = (el) => res.push(el);
  const options = {
    over: () => (isOver = true), //结束循环
    get: () => res,
    set: (val) => (res = val),
    skip: () => (isSkip = true), //跳过当前
    getTier: () => tier, //获取层级
    getIndex: () => index, //获取当前索引
  };
  if (filterFn instanceof Function) {
    main = function (el, that, source) {
      index++;
      const getParent = () => that || {}; //获取父级
      const getList = () => source || []; //获取列表
      const params = { ...options, getList, getParent };
      return filterFn(el, params);
    };
  }
  const fn = (source = [], that) => {
    index = -1; //每次递归时重置索引
    for (const el of source) {
      main(el, that, source);
      if (isOver) return;
      if (isSkip) {
        isSkip = false;
        continue;
      }
      if (el[childField] && el[childField].length > 0)
        fn(el[childField], el, ++tier) || --tier; //递归时加1,结束后减1
    }
  };
  fn(data);
  return res;
}
