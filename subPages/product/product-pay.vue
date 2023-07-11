<template>
  <view class="container">
    <view v-if="paySuccess">
      <view class="pay-sts fail">支付失败</view>
      <view class="tips">请在 <text class="warn">30分钟</text>内完成付款</view>
      <view class="tips">否则订单会被系统取消</view>
      <view class="btns">
        <text class="button checkorder">查看订单</text>
        <text class="button payagain">重新支付</text>
      </view>
    </view>

    <view v-else>
      <view class="pay-sts succ">支付成功</view>
      <view class="tips">感谢您的购买</view>
      <view class="btns">
        <text class="button checkorder">查看订单</text>
        <text class="button shopcontinue" @click="shopContinue">继续购物</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      paySuccess: false,
    };
  },
  methods: {
    checkOrder() {
      uni.navigateTo({
        url: "/pages/order/order-list",
      });
    },
    payAgain() {
      uni.navigateTo({
        url: "/subPages/product/product",
      });
    },
    shopContinue() {
      uni.switchTab({
        url: "/pages/index/index",
      });
    },
  },
  onload() {},
};
</script>

<style  scoped>
.pay-sts {
  font-size: 40rpx;
  margin-top: 100rpx;
  padding: 30rpx 0;
  text-align: center;
}

.pay-sts.fail {
  color: #f43530;
}

.pay-sts.succ {
  color: #19be6b;
}

.btns {
  margin-top: 50rpx;
  text-align: center;
}

.tips {
  font-size: 28rpx;
  color: #999;
  text-align: center;
}

.tips .warn {
  color: #f43530;
}

.btns .button {
  border-radius: 10rpx;
  font-size: 28rpx;
  background: #fff;
  color: #333;
  padding: 20rpx 35rpx;
  width: 300rpx;
  margin: 0 20rpx;
  text-align: center;
}

.btns .button.checkorder {
  background: #19be6b;
  color: #fff;
  margin-bottom: 20rpx;
  border: 2rpx solid #19be6b;
}

.btns .button.payagain {
  background: #fff;
  border: 2rpx solid #f90;
  color: #f90;
}

.btns .button.shopcontinue {
  background: #fff;
  border: 2rpx solid #19be6b;
  color: #19be6b;
}
</style>
