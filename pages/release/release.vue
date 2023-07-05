<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-07-04 11:33:32
 * @LastEditors: Why so serious my dear 854059946@qq.com
 * @LastEditTime: 2023-07-04 16:38:35
 * @FilePath: /used-idle/pages/release/release.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="container release box">
    <u-status-bar></u-status-bar>
    <StatusBar />
    <view class="release-header flex-a-center">
      <view class="release-header-left">
        <view>正在征集…</view>
        <view class="text">每天一篇好物中草贴</view>
        <view class="release-btn">立即分享</view>
      </view>
      <image
        src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230704_ddfd6ec7ec504b7994c0365e98c63559.png"
        mode=""
      />
    </view>

    <view class="release-content">
      <view class="release-content-item box">
        <view class="release-content-item-left">
          <image
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230703_0a514b9fcdb7426f863f1668cee859ef.png"
            mode=""
          />
          <view class="left-context">
            <view class="left-context-header">发闲置</view>
            <view>立即转卖换钱</view>
          </view>
        </view>

        <u-icon name="arrow-right" @click.native="clickReleaseBtn"></u-icon>
      </view>
    </view>

    <view class="out-btn">
      <image
        src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230704_3d56a9146fa84a50beed255983c4c4c4.png"
        mode=""
      />
    </view>
  </view>
</template>

<script>
import StatusBar from "@/components/StatusBar/StatusBar.vue";
export default {
  data() {
    return {};
  },
  methods: {
    clickReleaseBtn() {
      uni.navigateTo({
        url: "/pages/release/detail/detail",
      });
    },
  },
  components: {
    StatusBar,
  },
};
</script>

<style lang="scss" scoped>
%flex-j-sb {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

%flex-j-center {
  display: flex;
  justify-content: center;
}

.release {
  background: linear-gradient(180deg, #d8f0f9 0%, #f7f7f7 100%);

  &-header {
    @extend %flex-j-sb;

    &-left {
      font-size: 25rpx;
      padding-left: 32rpx;
      color: #333333;

      .text {
        height: 42rpx;
        font-size: 30rpx;
        line-height: 42rpx;
      }

      .release-btn {
        width: 176rpx;
        height: 42rpx;
        background: #ff4609;
        border-radius: 22rpx;
        line-height: 42rpx;
        color: #fff;
        text-align: center;
      }

      view {
        margin-bottom: 16rpx;
      }
    }

    > image {
      width: 240rpx;
      height: 280rpx;
      margin-right: 32rpx;
    }
  }

  &-content {
    margin-top: 450rpx;

    &-item {
      @extend %flex-j-sb;
      height: 133rpx;
      background: #e2f7f6;
      border-radius: 14rpx;

      &-left {
        @extend %flex-j-sb;

        > image {
          width: 84rpx;
          height: 68rpx;
          margin-right: 20rpx;
        }

        .left-context {
          .left-context-header {
            height: 50rpx;
            font-size: 34rpx;
            color: #252b50;
            line-height: 50rpx;
          }

          view {
            height: 35rpx;
            font-size: 24rpx;
            color: #636676;
            line-height: 35rpx;
          }
        }
      }
    }
  }

  .out-btn {
    margin-top: 90rpx;
    @extend %flex-j-center;

    > image {
      width: 76rpx;
      height: 76rpx;
    }
  }
}
</style>