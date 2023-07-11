<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-07-05 16:56:57
 * @LastEditors: Why so serious my dear 854059946@qq.com
 * @LastEditTime: 2023-07-11 11:08:50
 * @FilePath: /used-idle/subPages/my-release/detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="release-detail box">
    <view class="release-detail-header">
      <u-icon name="map" size="18"></u-icon>
      <view class="addr">长沙</view>
      <u-search
        placeholder="请输入关键字"
        v-model="keyword"
        :showAction="false"
      ></u-search>
      <u-icon name="shopping-cart" size="30"></u-icon>
    </view>
    <view class="release-detail-body">
      <view class="user-info flex-a-center-j-space-between">
        <view class="user-info-left flex-a-center">
          <image
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230705_46d242b0c3594dc992b39c7f20033c47.png"
            mode=""
          />
          <view class="user-info-left-text">
            <view class="user-info-left-text-name">
              <text class="name">潮精品店</text>
              <text class="icon"> 信誉极好 </text>
            </view>
            <view class="user-info-left-text-time">
              1小时前来过｜发布于深圳
            </view>
          </view>
        </view>
        <view class="user-info-right"> + 关注 </view>
      </view>

      <view class="shop-price flex-a-center">
        <view class="price-delete">￥ 200</view>
        <view class="price">3200</view>
        <view class="price-btn">购入价2.8折</view>
      </view>

      <view class="product-information">
        <view class="product-information-content flex-a-center">
          <view
            class="product-information-content-item"
            v-for="item in typeList"
            :key="item.title"
          >
            <view class="item-title">{{ item.title }}</view>
            <view class="item-text">{{ item.message }}</view>
          </view>
        </view>
      </view>

      <view class="describe">
        <a href="#">
          婴儿安全座椅，天文家品牌，九成新，没用过几次。感兴趣的话和我私聊吧~
        </a>
      </view>

      <image
        src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230705_3b1d9d354d1143b397e7c265fe78fd63.png"
        mode=""
        style="width: 100%; height: 490rpx"
      />

      <view class="img-gird flex-a-center">
        <view class="img-gird-left"> </view>
        <view class="img-gird-right">
          <view class="top"></view>
          <view class="bottom"></view>
        </view>
      </view>

      <view class="hope-people">8人想买｜150人浏览</view>
      <view class="release-address">30分钟前发布于长沙</view>
    </view>

    <view class="release-detail-footer flex-a-center-j-space-between box">
      <view class="footer-left flex-a-center-j-space-between">
        <u-icon
          name="star"
          label="收藏"
          size="24"
          labelPos="bottom"
          labelSize="10"
          style="marginright: '60rpx'"
        ></u-icon>
        <u-icon
          name="chat"
          labelSize="10"
          label="留言"
          size="24"
          labelPos="bottom"
        ></u-icon>
      </view>
      <view class="footer-right flex-a-center">
        <view class="footer-btn box">加入购物车</view>
        <view class="footer-btn active-btn box" @click="toPay">去付款</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      typeList: [
        {
          title: "款式",
          message: "可折叠式",
        },
        {
          title: "成色",
          message: "明显使用痕迹",
        },
        {
          title: "颜色",
          message: "苍青色",
        },
        {
          title: "承重",
          message: "100kg",
        },
        {
          title: "材质",
          message: "聚丙乙烯",
        },
        {
          title: "手托",
          message: "不配备手托",
        },
      ],
    };
  },
  methods: {
    toPay() {
      uni.navigateTo({
        url: "../product/product-order",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
%display-space {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.release-detail {
  position: relative;

  &-header {
    padding-bottom: 30rpx;
    border-bottom: 1px solid #eee;

    @extend %display-space;
    // padding: 0 20rpx;
    margin-bottom: 32upx;

    .addr {
      margin-right: 18upx;
    }
  }

  &-body {
    padding-bottom: 300rpx;

    .user-info {
      margin-bottom: 38rpx;

      &-left {
        > image {
          width: 100rpx;
          height: 100rpx;
          margin-right: 26rpx;
        }

        &-text {
          .user-info-left-text-name {
            margin-bottom: 28rpx;

            .name {
              height: 46rpx;
              font-size: 30rpx;
              color: #333333;
              line-height: 46rpx;
              margin-right: 32rpx;
            }
            .icon {
              width: 120rpx;
              height: 38rpx;
              padding: 6rpx;
              background: #fef8ac;
              border-radius: 8rpx;
              font-size: 24rpx;
              color: #333333;
              line-height: 38rpx;
              text-align: center;
            }
          }

          .user-info-left-text-time {
            font-size: 24rpx;
            color: #999;
          }
        }
      }

      &-right {
        width: 126rpx;
        height: 58rpx;
        background: #f3f3f3;
        border-radius: 30rpx;
        font-size: 26rpx;
        color: #333333;
        line-height: 58rpx;
        text-align: center;

        &:active {
          background: #fef8ac;
          color: #fff;
        }
      }
    }

    .shop-price {
      margin-bottom: 20rpx;

      view {
        margin-right: 20rpx;
      }

      .price-delete {
        height: 60rpx;
        font-size: 44rpx;
        font-weight: 600;
        color: #fb8753;
        line-height: 60rpx;
      }

      .price {
        height: 38rpx;
        font-size: 30rpx;
        color: #999999;
        line-height: 38rpx;
        text-decoration: line-through;
      }

      .price-btn {
        width: 168rpx;
        height: 42rpx;
        border-radius: 22rpx;
        border: 2rpx solid #ffd17c;
        font-size: 26rpx;
        color: #fba13a;
        line-height: 42rpx;
        text-align: center;

        &:active {
          background: #ffd17c;
          color: #fff;
        }
      }
    }

    .product-information {
      position: relative;

      &::after {
        content: "";
        display: block;
        width: 80rpx;
        background: #eee;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, #fff);
      }

      &-content {
        overflow-x: scroll;

        &-item {
          border-right: 1px solid #eee;
          padding-right: 20rpx;
          margin-right: 20rpx;
          flex-shrink: 0;

          .item-title {
            height: 38rpx;
            font-size: 26rpx;
            color: #999999;
            line-height: 38rpx;
            margin-bottom: 20rpx;
          }

          .item-text {
            height: 38rpx;
            font-size: 29rpx;
            font-family: AppleSystemUIFont;
            color: #333333;
            line-height: 38rpx;
          }
        }
      }
    }

    .describe {
      margin: 36rpx 0;
      font-size: 30rpx;
      color: #333333;
    }

    .img-gird {
      margin-top: 16rpx;

      &-left {
        width: 450rpx;
        height: 450rpx;
        background: url("https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230706_eb136b6cc9374eeab451637b4fd9bef7.png");
        background-size: cover;
        margin-right: 18rpx;
      }
      &-right {
        .top {
          width: 214rpx;
          height: 214rpx;
          background: url("https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230706_eb136b6cc9374eeab451637b4fd9bef7.png");
          background-size: cover;
          margin-bottom: 16rpx;
        }
        .bottom {
          width: 214rpx;
          height: 214rpx;
          background: url("https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230706_eb136b6cc9374eeab451637b4fd9bef7.png");
          background-size: cover;
        }
      }
    }

    .hope-people {
      height: 35rpx;
      font-size: 25rpx;
      color: #999999;
      line-height: 35rpx;
      margin-top: 12rpx;
      float: right;
      margin-top: 18rpx;
    }

    .release-address {
      height: 42rpx;
      font-size: 29rpx;
      color: #333333;
      line-height: 42rpx;
      clear: both;
      float: right;
      margin-top: 18rpx;
    }
  }

  &-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 134rpx;
    background: #fff;
    padding-bottom: 40rpx;
    padding-top: 20rpx;

    .footer-left {
      width: 130rpx;
    }

    .footer-right {
      .footer-btn {
        // width: 142rpx;
        // min-width: 142rpx;
        height: 67rpx;
        background: #efefef;
        border-radius: 33rpx;
        line-height: 67rpx;
        text-align: center;
        margin-left: 20rpx;
      }
    }
  }
}

.active-btn {
  background: #f6f931 !important;
}
</style>