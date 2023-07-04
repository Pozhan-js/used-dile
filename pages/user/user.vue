<template>
  <view class="user-pages container">
    <navbar pages />
    <view
      class="user-pages-header relative padding-y-24 flex"
      :class="{ 'items-center': !isLogin }">
      <u-avatar size="140rpx" :src="avatar" />
      <view v-if="isLogin" class="user-info flex-col flex-grow justify-evenly">
        <text class="user-name text_ellipsis">{{ realName }}</text>
        <text class="study-days">学习{{ studyDays }}天</text>
      </view>
      <view
        v-else
        class="login-btn color-white bg-theme radius-25"
        @click="handleLogin">
        点击登录
      </view>
      <image
        class="head-bg absolute top-0"
        :src="
          $helper.getImage('', '20220829_9950d6ac472c4ad7bfe80a4d5511c3bf')
        "></image>
    </view>
    <view
      class="user-pages-body bg-white radius-10 overflow-hidden padding-y-24 margin-t-24">
      <u-cell-group :border="false">
        <u-cell
          v-for="(item, index) in cellList"
          :key="index"
          isLink
          center
          size="large"
          :icon="item.icon"
          :title="item.title"
          @click="handleCellClick(item)" />
      </u-cell-group>
    </view>
  </view>
</template>

<script>
import infoMixin from "@/common/mixins/info";
export default {
  mixins: [infoMixin],
  data() {
    const getIcon = icon => `/static/image/icon/user/${icon}.png`;
    const getPath = path => `/subPages/user/${path}/${path}`;

    return {
      cellList: [
        { title: "设置", path: getPath("settings"), icon: getIcon("settings") },
      ],
    };
  },
  computed: {
    studyDays() {
      return 0;
    },
  },
  methods: {
    handleLogin() {
      this.$jump("/subPages/user/login/login");
    },
    handleCellClick(item) {
      if (!item.path) this.$message("功能开发中...", "none");
      else this.$jump(item.path);
    },
  },
};
</script>
<style lang="scss" scoped>
.user-pages {
  padding: 0 5%;
  &-header {
    margin-top: 16rpx;
    ::v-deep > .u-avatar {
      margin-right: 36rpx;
    }
    .login-btn {
      width: 180rpx;
      height: 80rpx;
      font-size: 30rpx;
      text-align: center;
      line-height: 80rpx;
    }
    .user-info {
      .user-name {
        max-width: 7em;
        font-size: 40rpx;
        color: #333;
      }
      .study-days {
        color: #969dab;
      }
    }
    .head-bg {
      width: 232rpx;
      right: 32rpx;
      height: 100%;
    }
  }
  ::v-deep .u-cell:last-child > .u-cell__body + view {
    // 隐藏最后一个下划线
    display: none;
  }
  ::v-deep .u-cell__title-text {
    font-weight: bold;
    text-indent: 0.8em;
  }
}
</style>
