<template>
  <view class="invite-record container flex-col">
    <view class="user-info flex justify-between">
      <view class="photo-name flex items-center">
        <image mode="aspectFill" class="user-avatar" :src="avatar" />
        <view class="user-name-app flex-col justify-between margin-l-24">
          <view class="user-name">
            <u--text mode="phone" :text="realName"></u--text>
          </view>
          <view class="user-tip">有效邀请：{{ inviteUserList.length }}名</view>
        </view>
      </view>
      <!-- <view class="user-ranking flex-col justify-between">
        <view class="rank-value">9999+</view>
        <view class="rank-label">当前排名</view>
      </view> -->
    </view>
    <view class="invite-app flex-1 flex-col">
      <view class="title"> 邀请记录 </view>
      <view class="invite-user-app">
        <view
          class="invite-user flex items-center"
          v-if="inviteUserList.length">
          <view
            class="invite-item flex-col flex-center"
            v-for="(item, index) in inviteUserList"
            :key="index">
            <image
              mode="aspectFill"
              :src="baseURL + '/api/file/Image/userAvatar/' + item.F_HeadIcon">
            </image>
            <view class="name flex-center">
              <u--text
                mode="phone"
                :text="item.F_MobilePhone"
                format="encrypt"></u--text>
            </view>
          </view>
        </view>
        <view
          v-if="!inviteUserList.length"
          class="empty-data flex-center flex-col">
          <image mode="aspectFit" :src="emptyImage" />
          <view class="empty-text">暂无邀请记录</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import config from "@/common/config";
import infoMixin from "@/common/mixins/info";
export default {
  mixins: [infoMixin],
  data() {
    return {
      baseURL: config.baseURL,
      inviteUserList: [],
    };
  },
  computed: {
    emptyImage() {
      return this.$helper.getImage(
        "test",
        "20221013_a81cd1e4df7840ada87c07316422150c"
      );
    },
  },
  onLoad(e) {
    console.log(e);
  },
};
</script>

<style scoped lang="scss">
.invite-record {
  background-color: #f4f2f2;

  .user-info {
    margin-top: 1rpx;
    padding: 30rpx;
    background-color: #fff;
    .photo-name {
      & > image {
        width: 72rpx;
        height: 72rpx;
        border-radius: 50%;
      }
      .user-name-app {
        margin-left: 15rpx;
        .user-name {
          font-size: 32rpx;
          color: #333;
        }
        .user-tip {
          font-size: 24rpx;
          color: #999;
        }
      }
    }
    .user-ranking {
      padding-right: 10rpx;
      .rank-value {
        font-size: 32rpx;
        font-weight: bold;
        color: #ff2d2d;
      }
      .rank-label {
        font-size: 24rpx;
        color: #999;
      }
    }
  }
  .invite-app {
    background-color: #fff;
    margin-top: 30rpx;
    padding: 20rpx;
    .title {
      font-size: 28rpx;
      font-weight: 500;
      color: #333;
      padding-bottom: 20rpx;
      border-bottom: 1rpx solid #eee;
    }
    .invite-user-app {
      .invite-user {
        margin-top: 40rpx;
        flex-wrap: wrap;
        width: 100%;
        .invite-item {
          padding-top: 30rpx;
          width: 25%;
          text-align: center;
          & > image {
            width: 80rpx;
            height: 80rpx;
            border-radius: 50%;
          }
          .name {
            font-size: 24rpx;
          }
        }
      }
    }
  }
  .empty-data {
    margin-top: 40%;
    & > image {
      width: 360rpx;
      height: 360rpx;
    }
    .empty-text {
      margin-top: 30rpx;
      text-align: center;
      color: #666;
    }
  }
}
</style>
