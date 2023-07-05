<template>
  <view class="user-pages container">
    <!-- <navbar pages /> -->
    <u-status-bar></u-status-bar>
    <StatusBar />
    <view
      class="user-pages-header relative padding-y-24 flex"
      :class="{ 'items-center': !isLogin }"
    >
      <u-avatar size="140rpx" src="/static/image/icon/user/headimg.png" />
      <!-- <u-avatar size="140rpx" :src="avatar" /> -->
      <view v-if="isLogin" class="user-info flex-col flex-grow justify-evenly">
        <text class="user-name text_ellipsis">{{ realName }}</text>
        <text class="study-days">学习{{ studyDays }}天</text>
      </view>
      <view
        v-else
        class="login-btn color-white bg-theme radius-25"
        @click="handleLogin"
      >
        点击登录
      </view>
      <image
        class="head-bg absolute top-0"
        :src="$helper.getImage('', '20220829_9950d6ac472c4ad7bfe80a4d5511c3bf')"
      ></image>
    </view>

    <view class="user-pages-content">
      <view class="user-pages-content-header flex-a-center-j-space-between">
        <view class="header-left">我的交易</view>
        <view class="header-right flex-a-center">
          <view>更多</view>
          <u-icon name="arrow-right"></u-icon>
        </view>
      </view>
      <u-grid :border="false" col="4">
        <u-grid-item
          v-for="(baseListItem, baseListIndex) in baseList"
          @click="handleToRelease(baseListItem.url)"
          :key="baseListIndex"
        >
          <image
            :style="{ width: '84rpx', height: '84rpx', marginTop: '20rpx' }"
            :src="baseListItem.image"
            mode=""
          />
          <text class="grid-text">{{ baseListItem.title }}</text>
        </u-grid-item>
      </u-grid>
      <u-toast ref="uToast" />
    </view>

    <view
      class="user-pages-body bg-white radius-10 overflow-hidden padding-y-24 margin-t-24"
    >
      <u-cell-group :border="false">
        <u-cell
          v-for="(item, index) in cellList"
          :key="index"
          isLink
          center
          size="large"
          :icon="item.icon"
          :title="item.title"
          @click="handleCellClick(item)"
        />
      </u-cell-group>
    </view>
  </view>
</template>

<script>
import infoMixin from "@/common/mixins/info";
import StatusBar from "@/components/StatusBar/StatusBar.vue";
export default {
  mixins: [infoMixin],
  data() {
    const getIcon = (icon) => `/static/image/icon/user/${icon}.png`;
    const getPath = (path) => `/subPages/user/${path}/${path}`;

    return {
      cellList: [
        { title: "设置", path: getPath("settings"), icon: getIcon("headimg") },
      ],
      list: [
        {
          name: "photo",
          title: "图片",
        },
        {
          name: "lock",
          title: "锁头",
        },
        {
          name: "star",
          title: "星星",
        },
        {
          name: "hourglass",
          title: "沙漏",
        },
        {
          name: "home",
          title: "首页",
        },
        {
          name: "star",
          title: "音量",
        },
      ],

      baseList: [
        {
          id: 1,
          image:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230705_386d6290b4554883bcc2570038b8d33b.png",
          title: "我发布的",
          url: "/subPages/my-release/my-release",
        },
        {
          id: 2,
          image:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230705_5abf75207bd74ea78559ba846f70812a.png",
          title: "我卖出的",
          url: "/subPages/my-release/my-release",
        },
        {
          id: 3,
          image:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230705_45b9a77bc0394a8092b363473eccd39b.png",
          title: "我买到的",
          url: "/subPages/my-release/my-release",
        },
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
    handleToRelease(url) {
      this.$jump(url);
    },
  },
  components: {
    StatusBar,
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

  &-content {
    background: #ffffff;
    border-radius: 13rpx;
    padding-bottom: 32rpx;

    &-header {
      padding: 32rpx;
      padding-bottom: 0;
      box-sizing: border-box;

      .header-left {
        height: 54rpx;
        font-size: 34rpx;
        color: #000000;
        line-height: 54rpx;
      }

      .header-right {
        height: 42rpx;
        font-size: 30rpx;
        color: #636676;
        line-height: 42rpx;
      }
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
