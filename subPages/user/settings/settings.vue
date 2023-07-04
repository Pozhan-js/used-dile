<template>
  <view class="settings container absolute w-full">
    <view class="settings-list bg-white margin-t-24">
      <u-cell-group :border="false">
        <!-- <u-cell
          :isLink="true"
          size="large"
          center
          title="账号设置"
          @click="$jump('./userInfo')"></u-cell> -->
      </u-cell-group>
    </view>
    <button @click="quit" class="quit-btn circle-button">退出登录</button>
  </view>
</template>

<script>
import { sleep } from "@/common/function";
export default {
  methods: {
    quit() {
      this.$model("提示", "是否确认退出？").then(e => {
        if (e.confirm) {
          const duration = 600;
          uni.showLoading({ mask: true });
          this.$store.dispatch("user/logout");
          sleep(() => {
            uni.hideLoading();
            this.$message("退出成功", { duration });
            sleep(() => uni.switchTab({ url: "/pages/user/user" }), duration);
          }, 600);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.quit-btn {
  width: 80%;
  margin: 100rpx auto;
}
</style>
