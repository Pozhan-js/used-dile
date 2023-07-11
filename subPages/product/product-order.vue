<template>
  <view class="home-serve-form">
    <view class="home-serve-form-container">
      <!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
      <u--form
        labelPosition="left"
        labelWidth="100"
        :model="model1"
        :rules="rules"
        ref="uForm"
      >
        <u-form-item
          label="联系人"
          prop="userInfo.name"
          borderBottom
          :required="true"
          ref="item1"
          style="margin-left: 10rpx"
        >
          <u--input
            v-model="model1.userInfo.name"
            border="surround"
            clearable
            :customStyle="{
              background: '#EEEEEE',
              'border-radius': '10rpx',
            }"
          ></u--input>
        </u-form-item>
        <u-form-item
          label="联系人电话"
          prop="userInfo.name"
          :required="true"
          borderBottom
          ref="item1"
        >
          <u--input
            v-model="model1.userInfo.name"
            border="surround"
            clearable
            :customStyle="{
              background: '#EEEEEE',
              'border-radius': '10rpx',
            }"
          ></u--input>
        </u-form-item>
        <u-form-item
          label="上门服务地址"
          prop="userInfo.name"
          borderBottom
          :required="true"
          ref="item1"
        >
          <u--textarea
            v-model="value1"
            placeholder="请输入内容"
            :customStyle="{
              background: '#EEEEEE',
              'border-radius': '10rpx',
            }"
          ></u--textarea>
        </u-form-item>
        <u-form-item
          label="上门服务时间"
          prop="userInfo.name"
          borderBottom
          ref="item1"
        >
          <u--input
            v-model="model1.userInfo.name"
            border="surround"
            clearable
            :customStyle="{
              background: '#EEEEEE',
              'border-radius': '10rpx',
            }"
          ></u--input>
        </u-form-item>
        <u-form-item label="备注" prop="userInfo.name" borderBottom ref="item1">
          <u--textarea
            v-model="value1"
            placeholder="请说明您的情况，可以让商家更 了解您，提供更好的服务"
            :customStyle="{
              background: '#EEEEEE',
              'border-radius': '10rpx',
            }"
          ></u--textarea>
        </u-form-item>
      </u--form>
    </view>

    <view class="home-serve-form-pay-type">
      <view class="home-serve-form-pay-type-item">
        <view class="left">支付方式</view>
        <view class="right">
          <view>微信支付</view>
          <u-icon name="arrow-right"></u-icon>
        </view>
      </view>
      <view class="home-serve-form-pay-type-item">
        <view class="left">需支付</view>
        <view class="right">
          <view class="pay-number">￥88</view>
        </view>
      </view>
    </view>

    <view class="home-serve-form-btn" @click="toPayResult">微信支付88元</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showSex: false,
      model1: {
        userInfo: {
          name: "",
          sex: "",
        },
      },
      rules: {
        "userInfo.name": {
          type: "string",
          required: true,
          message: "请填写姓名",
          trigger: ["blur", "change"],
        },
        "userInfo.name": {
          type: "string",
          required: true,
          message: "请填写姓名",
          trigger: ["blur", "change"],
        },
        "userInfo.name": {
          type: "string",
          required: true,
          message: "请填写姓名",
          trigger: ["blur", "change"],
        },
        "userInfo.sex": {
          type: "string",
          max: 1,
          required: true,
          message: "请选择男或女",
          trigger: ["blur", "change"],
        },
      },
    };
  },
  methods: {
    hideKeyboard() {
      console.log("xxx");
    },
    toPayResult() {
      uni.navigateTo({
        url: "./product-pay",
      });
    },
  },
  onReady() {
    //如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
    this.$refs.uForm.setRules(this.rules);
  },
};
</script>

<style lang="scss" scoped>
.home-serve-form {
  padding-bottom: 1rpx;
  &-container {
    padding: 30rpx;
    background: #ffffff;
    box-shadow: 0rpx 6rpx 18rpx 1rpx rgba(209, 209, 209, 0.4);
    border-radius: 15rpx;
  }

  &-pay-type {
    background: #ffffff;
    box-shadow: 0rpx 6rpx 18rpx 1rpx rgba(209, 209, 209, 0.4);
    border-radius: 15rpx;
    padding: 0 40rpx;
    box-sizing: border-box;

    &-item {
      padding: 30rpx 0;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        height: 42rpx;
        font-size: 30rpx;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #333333;
        line-height: 42rpx;
      }

      .right {
        display: flex;
        align-items: center;

        view {
          font-size: 26rpx;
          color: #333333;
        }

        .pay-number {
          height: 53rpx;
          font-size: 38rpx;
          font-weight: bold;
          color: #ff2d2d;
          line-height: 53rpx;
        }
      }
    }
  }

  &-btn {
    margin: 104rpx auto;
    width: 620rpx;
    height: 106rpx;
    background: linear-gradient(90deg, #30f4c3 0%, #55e7f9 100%);
    box-shadow: 0rpx 6rpx 10rpx 1rpx rgba(0, 0, 0, 0.16);
    border-radius: 53rpx;
    font-size: 38rpx;
    font-weight: bold;
    color: #ffffff;
    line-height: 106rpx;
    text-align: center;
    animation: filterHor 5s infinite alternate;
  }
}
@keyframes filterHor {
  0% {
    filter: hue-rotate(0deg);
  }

  100% {
    filter: hue-rotate(360deg);
  }
}
</style>