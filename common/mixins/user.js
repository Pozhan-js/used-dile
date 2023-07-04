import { userLogin, userCreateOrder, getUserOpenId } from "@/api/user";
import config from "@/common/config";

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
      if (!id) throw this.$message("商品id不能为空", false);
      const openid = await this.getUserOpenid();
      const { tenantId } = config.Global;
      // JsAPI下单 返回支付参数
      const params = { id, openid, tenantId, description };
      const { data: payParams } = await userCreateOrder(params);
      return new Promise((resolve, reject) => {
        uni.getProvider({
          service: "payment",
          success: res => {
            const payment = {
              ...payParams,
              package: payParams.packageStr,
              provider: res.provider[0],
            };
            payment.timeStamp += "";
            uni.requestPayment({
              ...payment,
              success(payRes) {
                this.$message("支付成功", true).success(() => resolve(payRes));
              },
              fail(err) {
                this.$message("支付失败", false).error(() => reject(err));
              },
            });
          },
          fail: err => reject(err),
        });
      });
    },
    /**
     * @description 获取用户的OpenId
     * @returns {Promise} 返回用户的OpenId
     */
    getUserOpenid() {
      return new Promise(resolve => {
        // 如果存在缓存
        const { OPENID_CACHE } = this.$constants;
        let userOpenId = uni.getStorageSync(OPENID_CACHE);
        if (userOpenId) return resolve(userOpenId);
        uni.login({
          provider: "weixin",
          success: async e => {
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
    _userLogin(params = {}) {
      //用户登录
      uni.showLoading({ title: "登录中" });
      params.tenantId = config.tenantId;
      // 是否是邀请用户
      // let inviteUserId = uni.getStorageSync("$inviteUserId");
      // if (inviteUserId) params.formUser = inviteUserId;
      return this.$request(
        async () => {
          const res = (await userLogin(params)) || {};
          if (res.code !== 200) return res;
          return this.$store.dispatch("user/updateUserInfo", res.data?.token);
        },
        { msg: "登录", request: true }
      );
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
      return this._userLogin({ type: 3, code });
    },
  },
};
