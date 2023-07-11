<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-05-29 16:07:39
 * @LastEditors: Why so serious my dear 854059946@qq.com
 * @LastEditTime: 2023-07-11 11:01:20
 * @FilePath: /uniapp-base/pages/index/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="container home box">
    <u-status-bar></u-status-bar>
    <StatusBar />
    <!-- 首页头部 -->
    <view class="home-header">
      <u-icon name="map" size="18"></u-icon>
      <view class="addr">长沙</view>
      <u-search
        placeholder="请输入关键字"
        v-model="keyword"
        :showAction="false"
      ></u-search>
      <u-icon name="shopping-cart" size="30"></u-icon>
    </view>

    <view class="home-swiper">
      <u-swiper
        :list="list1"
        indicator
        indicatorMode="line"
        circular
        @change="change"
        @click="click"
      ></u-swiper>
    </view>

    <view class="home-type-list">
      <u-grid :border="false" col="4">
        <u-grid-item
          v-for="(baseListItem, baseListIndex) in baseList"
          @click="clickItemIcon(baseListItem)"
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

    <view class="home-choose">
      <view class="home-choose-item box" @click="clickRelease">
        <view>
          <view class="item-title">发布闲置</view>
          <view>卖闲置 换现金</view>
        </view>
        <image
          src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230703_0a514b9fcdb7426f863f1668cee859ef.png"
          mode=""
        />
      </view>
      <view class="home-choose-item box">
        <view>
          <view class="item-title">在线估价</view>
          <view>平台估价可靠</view>
        </view>
        <image
          src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230703_0a514b9fcdb7426f863f1668cee859ef.png"
          mode=""
        />
      </view>
    </view>

    <view class="home-content">
      <view class="home-content-header">
        <view class="left">
          <image
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230704_8f093bc9ef51482ea13cdfbb42cd098b.png"
          />
          <view>最新发布</view>
        </view>
        <u-icon name="arrow-right"></u-icon>
      </view>
    </view>

    <view class="home-shop">
      <view class="home-shop-item flex-a-center" @click="clickProduct">
        <image
          src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230704_339809fe4e1c437884bf0dcadb58fa8d.png"
          class="img"
          mode=""
        >
        </image>
        <view class="item-right">
          <view class="item-right-content item-title">
            <text class="title">好孩子婴儿推车</text>
            <text class="price">¥200</text>
          </view>

          <view class="item-right-content flex-a-center">
            <view class="item-type">按钮</view>
            <view class="item-type">9成新</view>
            <view class="item-type">包邮</view>
            <view class="item-btn-type"></view>
          </view>

          <view class="item-right-content flex-a-center">
            <u-icon name="map" size="14"></u-icon>
            <text class="addr">长沙开福区</text>
          </view>

          <view class="item-right-content item-title">
            <text class="text-content">据我12.5km</text>
            <text class="text-content"> 30分钟前</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import StatusBar from "@/components/StatusBar/StatusBar.vue";
export default {
  data() {
    return {
      keyword: "",
      list1: [
        "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230703_8c0f35d609794696ac794f74afdcdb5e.png",
        "https://cdn.uviewui.com/uview/swiper/swiper2.png",
        "https://cdn.uviewui.com/uview/swiper/swiper3.png",
      ],
      baseList: [
        {
          id: 1,
          image:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230703_3bfcf278650847228eec2f69fba4b3aa.png",
          title: "二手手机",
          pageUrl: "/subPages/product/product",
        },
        {
          id: 2,
          image:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230703_765a51386ea443fcbcd9a7dea24dcb87.png",
          title: "高价旧物",
        },
        {
          id: 3,
          image:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230703_16f68fb00a3f41c88de325b632fdaac8.png",
          title: "婴童居室",
        },
        {
          id: 4,
          image:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230703_dfac4052482d48c891b2af8e5f5cc066.png",
          title: "座椅出行",
        },
        {
          id: 5,
          image:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230703_786af8a36d2642c69d6a18270d6ad452.png",
          title: "限量潮品",
        },
        {
          id: 6,
          image:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230703_83a411879e76414eac6bfc2bf18b70fe.png",
          title: "婴童服饰",
        },
        {
          id: 7,
          image:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230703_7c2d8816ae884a23884624bbefbc833f.png",
          title: "童书育儿",
        },
        {
          id: 8,
          image:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230703_d8175e90b28149c38168b5220989fb8f.png",
          title: "更多分类",
        },
      ],
    };
  },
  methods: {
    change() {
      console.log("change");
    },
    click() {
      console.log("click");
    },
    clickItemIcon(item) {
      // this.$refs.uToast.success(`点击了第${name}个`);
      uni.navigateTo({
        url: item.pageUrl,
      });
    },
    // 点击发布闲置
    clickRelease() {
      uni.switchTab({
        url: "/pages/release/release",
      });
      this.$refs.uToast.success(`点击了发布闲置`);
    },
    clickProduct() {
      uni.navigateTo({
        url: "/subPages/my-release/detail",
      });
    },
  },
  components: {
    StatusBar,
  },
};
</script>

<style lang="scss" scoped>
%display-space {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.grid-text {
  font-size: 15px;
  color: #252b50;
  // color: #909399;
  padding: 10rpx 0 20rpx 0rpx;
  /* #ifndef APP-PLUS */
  box-sizing: border-box;
  /* #endif */
}

.home {
  &-header {
    @extend %display-space;
    // padding: 0 20rpx;
    margin-bottom: 32upx;

    .addr {
      margin-right: 18upx;
    }
  }

  &-swiper {
    margin-bottom: 28rpx;
  }

  &-type-list {
    background: #ffffff;
    border-radius: 8rpx;
    margin-bottom: 32rpx;
  }

  &-choose {
    @extend %display-space;
    margin-bottom: 32rpx;

    &-item {
      @extend %display-space;
      width: 326rpx;
      height: 150rpx;
      background: linear-gradient(180deg, #ecfff8 0%, #fdfefe 100%);
      border-radius: 14rpx;
      > image {
        width: 80rpx;
        height: 68rpx;
      }

      .item-title {
        height: 50rpx;
        font-size: 34rpx;
        color: #252b50;
        line-height: 50rpx;
      }

      view {
        font-size: 26rpx;
        color: #636676;
      }
    }
  }

  &-content {
    &-header {
      @extend %display-space;
      padding: 0 20rpx;
      margin-bottom: 32upx;
      .left {
        @extend %display-space;
        > image {
          width: 40rpx;
          height: 40rpx;
          margin-right: 10rpx;
        }
      }
    }
  }

  &-shop {
    background: #ffffff;
    border-radius: 8rpx;
    padding: 32rpx;
    box-sizing: border-box;

    &-item {
      > .img {
        width: 167rpx;
        height: 167rpx;
        background: rgba(224, 224, 224, 0.5);
        border-radius: 8rpx;
        flex-shrink: 0;
        margin-right: 16rpx;
      }

      .item-right {
        width: 100%;
        overflow: hidden;

        .item-right-content {
          position: relative;
          margin-bottom: 4rpx;

          .item-btn-type {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            width: 44rpx;
            background: linear-gradient(90deg, transparent, #fff);
          }

          .title {
            height: 42rpx;
            font-size: 30rpx;
            color: #333333;
            line-height: 42rpx;
          }
          .price {
            height: 42rpx;
            font-size: 30rpx;
            font-weight: 600;
            color: #fb8753;
            line-height: 42rpx;
          }

          .item-type {
            width: 84rpx;
            height: 42rpx;
            flex-shrink: 0;
            border-radius: 21rpx;
            font-size: 25rpx;
            color: #fba13a;
            border: 2rpx solid #ffd17c;
            line-height: 42rpx;
            text-align: center;
            margin-right: 16rpx;
          }

          .text-content {
            font-size: 25rpx;
            color: #999999;
          }

          .addr {
            font-size: 25rpx;
            color: #333333;
          }
        }
      }
    }
  }
}

.item-title {
  @extend %display-space;
}
</style>
