const http = uni.$u.http;
import config from "@/common/config";
import store from "../store";

export const API = {
  visual: "/api/mongoVisualdev/online_dev/",
  open: "/api/mongoVisualdev/OpenApi/",
  system: "/api/mongoSystem/Permission/",
};

//获取公共token
export async function getOpenToken(fn) {
  const { token, openToken } = store.state.user;
  const isOpen = !token;
  if (isOpen && !openToken) {
    const { code, msg } = await http.get(
      `${API.open}getToken/${config.tenantId}`
    );
    uni.setStorageSync("lastLoginTime", Date.now());
    if (code === 200) store.commit("user/SET_OPEN_TOKEN", msg);
  }
  return fn(isOpen);
}

// 新建数据
export const createModel = (modelId, data) =>
  http.post(API.visual + modelId, { data: JSON.stringify(data || {}) });

// 删除数据
export const deleteModel = (modelId, id) =>
  http.delete(API.visual + `delete/${modelId}/${id}`);

// 获取数据列表
export const getModelList = (modeId, data = {}) =>
  http.post(API.visual + modeId + "/list", {
    pageSize: -1,
    ...data,
  });

// 获取开放数据列表
export const getPublicModelList = (modeId, data = {}) => {
  return getOpenToken(isOpen =>
    http.post(API[isOpen ? "open" : "visual"] + modeId + "/list", {
      pageSize: -1,
      ...data,
    })
  );
};

// 修改数据列表
export const updateModel = (modelId, data, id) =>
  http.put(API.visual + `update/${modelId}/${data.id || id || ""}`, data);

// 获取数据信息详情
export const getModelInfo = (modelId, id) =>
  getOpenToken(() => http.get(API.visual + `${modelId}/${id}`));

// 获取公开数据信息详情
export const getPublicModelInfo = (modelId, id) =>
  getOpenToken(isOpen =>
    http.get(API[isOpen ? "open" : "visual"] + `${modelId}/${id}`)
  );

//定制化接口
export const dataInterface = (id, data) =>
  http.post("api/mongoVisualdev/Datainterface/" + id, data);

// 批量操作
export const batchOperation = (modelId, data) =>
  http.post(API.visual + `batch_insert_update/${modelId}`, data);
