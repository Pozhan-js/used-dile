<template>
  <view class="invite container flex-col items-center">
    <navbar color="#fff" />
    <image
      style="width: 80%; height: 150rpx"
      :src="
        $helper.getImage('test', '20221025_c85b4910d2a7447aa24015cb258da729')
      " />
    <image
      style="width: 70%; height: 400rpx"
      :src="
        $helper.getImage('test', '20221025_e1d3f11503bd424887aeab79f68369e5')
      " />
    <view class="user flex-col">
      <view class="user-top flex justify-between items-center">
        <view class="user-info flex items-center">
          <u-avatar size="90rpx" :src="avatar"></u-avatar>
          <view class="user-info-name">{{ realName }}</view>
        </view>
        <view class="user-save flex-center h-fit" @click="saveQrCode">
          保存二维码
        </view>
      </view>
      <view class="user-sub">我的邀请二维码</view>
      <image class="user-qrcode" :src="qrCode"></image>
      <view class="flex-center">
        <view class="user-invite-recode flex-center" @click="goInvite">
          查看我的邀请记录
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import config from "@/common/config";
import { base64ToPath } from "@/utils/qrCode";
import { getInviteCode } from "@/api/user.js";
import infoMixin from "@/common/mixins/info";
const { tenantId, baseURL } = config;
export default {
  mixins: [infoMixin],
  data() {
    return {
      baseURL: baseURL,
      qrCode: "",
    };
  },
  onLoad() {
    this.getQRcode();
  },
  methods: {
    goInvite() {
      this.$jump("./invite-record");
    },
    saveQrCode() {
      let { qrCode } = this;
      if (qrCode)
        uni.saveImageToPhotosAlbum({
          filePath: qrCode,
          success: () => this.$message("保存成功"),
          fail: () => this.$message("保存失败", false),
        });
    },
    async getQRcode() {
      let key = "InviteCode";
      let code = this.$storage.get(key);
      try {
        if (!code) {
          let page = "pages/index/index";
          let scene = String(this.userInfo.id);
          const { code, data } = await getInviteCode({ page, scene, tenantId });
          if (code != 200) throw new Error("获取二维码失败");
          if (Boolean((code = data))) uni.setStorage({ key, data });
        }
        this.qrCode = await base64ToPath(code);
      } catch (error) {
        console.log(error);
        this.$message("二维码加载失败", false);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.invite {
  background: linear-gradient(140deg, #79b8fa 0%, #537eef 100%);
  /deep/ .u-navbar {
    width: 100%;
  }
  .back {
    position: fixed;
    left: 0;
  }
  .user {
    width: 88%;
    padding: 30rpx;
    background-color: #fff;
    border-radius: 20rpx;
    &-info {
      &-name {
        margin-left: 35rpx;
      }
    }

    &-save {
      background: linear-gradient(156deg, #ff9669 0%, #ff5d38 100%);
      border-radius: 36rpx;
      padding: 10rpx 25rpx;
      color: #fff;
    }
    &-sub {
      font-size: 32rpx;
      margin: 30rpx 0;
      text-align: center;
      color: #999;
    }
    &-qrcode {
      width: 360rpx;
      height: 360rpx;
      margin: 0 auto;
    }
    &-invite-recode {
      margin: 30rpx 0;
      background: linear-gradient(156deg, #ff9669 0%, #ff5d38 100%);
      border-radius: 46rpx;
      font-size: 32rpx;
      padding: 15rpx 25rpx;
      width: 550rpx;
      color: #fff;
    }
  }
}
</style>
