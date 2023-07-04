<template>
  <view class="login container">
    <view class="login-wrap relative flex-col justify-center">
      <view class="login-header">
        <image :src="loginImage" mode="widthFix" />
      </view>
      <view class="login-body">
        <view class="login-buttons margin-t-24">
          <button class="login-phone circle-button" @click="goPhoneLogin">
            账号验证登录
          </button>
          <button
            v-if="isAgreement"
            class="login-wx circle-button"
            open-type="getPhoneNumber"
            @getphonenumber="wxLogin">
            手机号快捷登录
          </button>
          <button v-else class="login-wx circle-button" @click="loginPrompt">
            手机号快捷登录
          </button>
        </view>
      </view>
      <view class="login-footer">
        <Agreement v-model="isAgreement" :text="agreementText" />
      </view>
    </view>
  </view>
</template>

<script>
import Agreement from "./components/Agreement";
import userMixin from "@/common/mixins/user";
export default {
  mixins: [userMixin],
  components: { Agreement },
  data() {
    return {
      isAgreement: false,
      agreementText: "我已阅读并同意#user[用户协议]、#privacy[隐私政策]",
    };
  },
  computed: {
    loginImage() {
      return this.$helper.getImage(
        "test",
        "20221107_7ef67bb0a178480aaaf3b4e8a0104c86"
      );
    },
  },
  methods: {
    handleChangeAgreement() {
      this.isAgreement = !this.isAgreement;
    },
    loginPrompt() {
      this.$message("请先阅读并同意下方协议", false);
    },
    goPhoneLogin() {
      if (!this.isAgreement) return this.loginPrompt();
      this.$jump("./phone-login");
    },
    wxLogin(e) {
      const { code } = e.detail;
      if (code) {
        this.phoneLogin(e).then(() => this.$helper.rollback({ timeout: 1200 }));
      }
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  background: #f5f7fb;
  &-wrap {
    height: 100%;
  }
  &-header > image {
    margin-top: -120rpx;
    width: 100%;
  }
  &-buttons {
    margin-top: 64rpx;
    > button {
      width: 80%;
      padding: 4rpx 0;
    }
    .login-phone {
      margin-bottom: 48rpx;
      background: #1959f6;
    }
    .login-wx {
      background: #5dba70;
    }
  }
  ::v-deep .agreement-box {
    position: absolute;
    bottom: 32rpx;
  }
}
</style>
