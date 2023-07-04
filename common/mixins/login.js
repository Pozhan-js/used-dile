// import {
//     userLogin,
//     userCreateOrder,
//     getUserOpenId
// } from '@/api/user'
import config from "@/common/config";
import { getObjectAssignProperty, message } from "@/common/function";
export default {
  methods: {
    /**
     * @description 商品支付
     * @param {String} id 商品id
     * @param {String} description 商品描述
     * @returns {Promise} 返回支付状态
     */
    async commodityPayment(id, description = "") {
      // 获取openId
      if (!id) throw message("商品id不能为空", false);
      const openid = await this.getUserOpenid();
      const { tenantId } = config.Global;
      // JsAPI下单 返回支付参数
      const params = { id, openid, tenantId, description };
      const { data: payParams } = await userCreateOrder(params);
      return new Promise((resolve, reject) => {
        uni.getProvider({
          service: "payment",
          success: (res) => {
            const payment = {
              ...payParams,
              package: payParams.packageStr,
              provider: res.provider[0],
            };
            payment.timeStamp += "";
            uni.requestPayment({
              ...payment,
              success(payRes) {
                message("支付成功", true).success(() => resolve(payRes));
              },
              fail(err) {
                message("支付失败", false).error(() => reject(err));
              },
            });
          },
          fail: (err) => reject(err),
        });
      });
    },
    /**
     * @description 获取用户的OpenId
     * @returns {Promise} 返回用户的OpenId
     */
    getUserOpenid() {
      return new Promise((resolve) => {
        // 如果存在缓存
        const { OPENID_CACHE } = this.$constants;
        let userOpenId = uni.getStorageSync(OPENID_CACHE);
        if (userOpenId) return resolve(userOpenId);
        uni.login({
          provider: "weixin",
          success: async (e) => {
            // 获取用户微信信息
            let userWxInfo = await getUserOpenId(e.code);
            // 保存openId
            uni.setStorageSync(OPENID_CACHE, userWxInfo.data);
            // 返回openId
            resolve(userWxInfo.data);
          },
        });
      });
    },
    async saveUserDataInfo(data) {
      // 保存用户信息
      this.$store.commit("user/SET_TOKEN", data.token);
      await this.$helper.saveUserDataInfo();
      uni.hideLoading();
      // if (inviteUserId) uni.removeStorageSync("$inviteUserId");
    },
    _userLogin(params = {}) {
      //用户登录(内部使用)
      uni.showLoading({ title: "登录中" });
      return new Promise((resolve, reject) => {
        Object.assign(
          params,
          getObjectAssignProperty(config, [
            "organizeId",
            "positionId",
            "roleId",
            "tenantId",
          ])
        );
        // 是否是邀请用户
        // let inviteUserId = uni.getStorageSync("$inviteUserId");
        // if (inviteUserId) params.formUser = inviteUserId;
        userLogin(params).then(async (res) => {
          const isLogin = res.code === 200;
          if (isLogin) await this.saveUserDataInfo(data);
          message("登录", isLogin, { auto: true, request: res.msg });
          isLogin ? resolve() : reject(res);
        });
      });
    },
    /**
     * @description 验证码登录
     * @param {Object} code 验证码
     * @param {Object} mobilePhone 手机号
     */
    codeLogin(code, mobilePhone) {
      return this._userLogin({ type: 2, code, mobilePhone });
    },
    /**
     * @description 手机号登录
     * @param {Object} e 用户点击获取手机号的值
     */
    phoneLogin(e) {
      const { code } = e?.detail || {};
      if (code) {
        message("获取手机号失败", false);
        return Promise.reject();
      }
      return this._userLogin({ type: 3, code });
    },
  },
};
