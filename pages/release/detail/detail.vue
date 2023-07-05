<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-07-04 16:30:31
 * @LastEditors: Why so serious my dear 854059946@qq.com
 * @LastEditTime: 2023-07-05 11:18:30
 * @FilePath: /used-idle/pages/release/detail/detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="release-detail container box">
    <view class="release-detail-content box">
      <u--textarea
        v-model="value3"
        :height="200"
        placeholder="分享心情。。。"
        autoHeight
        border="none"
        :showConfirmBar="false"
      ></u--textarea>

      <!-- 上传 -->
      <view class="release-detail-content-upload">
        <u-upload
          :fileList="fileList3"
          @afterRead="afterRead"
          @delete="deletePic"
          name="3"
          multiple
          :maxCount="3"
          :previewFullImage="true"
        ></u-upload>
      </view>

      <view class="release-detail-content-list">
        <view
          class="item-context color"
          :style="{ '--color': color }"
          @click="clickAddrs"
        >
          <view class="item-context-left flex-a-center">
            <u-icon name="map" :color="color" size="20"></u-icon>
            <view class="text">获取位置</view>
            <view>{{ city }} {{ district }}</view>
          </view>

          <u-icon name="arrow-right" :color="color"></u-icon>
        </view>
        <view
          class="item-context color-who"
          :style="{ '--color-who': colorWho }"
          @click="whoLook"
        >
          <view class="item-context-left flex-a-center">
            <u-icon name="man-add-fill" :color="colorWho" size="20"></u-icon>
            <view class="text">提醒谁看</view>
            <view>{{}}</view>
          </view>

          <u-icon name="arrow-right" :color="colorWho"></u-icon>
        </view>
        <!-- <view
          class="item-context color"
          :style="{ '--color': color }"
          @click="clickAddrs"
        >
          <view class="item-context-left flex-a-center">
            <u-icon name="map" :color="color" size="20"></u-icon>
            <view class="text">获取位置</view>
            <view>{{ city }} {{ district }}</view>
          </view>

          <u-icon name="arrow-right" :color="color"></u-icon>
        </view> -->
      </view>

      <view>
        <u-button type="primary">发表</u-button>
      </view>
    </view>
  </view>
</template>

<script>
import QQMapWX from "@/utils/qqmap-wx-jssdk.min.js";
export default {
  data() {
    // 实例化API核心类

    return {
      value3: "",
      fileList3: [
        {
          url: "https://cdn.uviewui.com/uview/swiper/1.jpg",
        },
      ],
      Areaaddress: "", //当前位置
      //   省
      city: "",
      //   区
      district: "",
      color: "#666",
      colorWho: "#666",
    };
  },
  methods: {
    // 删除图片
    deletePic(event) {
      this[`fileList${event.name}`].splice(event.index, 1);
    },
    // 新增图片
    async afterRead(event) {
      // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file);
      let fileListLen = this[`fileList${event.name}`].length;
      lists.map((item) => {
        this[`fileList${event.name}`].push({
          ...item,
          status: "uploading",
          message: "上传中",
        });
      });
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url);
        let item = this[`fileList${event.name}`][fileListLen];
        this[`fileList${event.name}`].splice(
          fileListLen,
          1,
          Object.assign(item, {
            status: "success",
            message: "",
            url: result,
          })
        );
        fileListLen++;
      }
    },
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: "http://192.168.2.21:7001/upload", // 仅为示例，非真实的接口地址
          filePath: url,
          name: "file",
          formData: {
            user: "test",
          },
          success: (res) => {
            setTimeout(() => {
              resolve(res.data.data);
            }, 1000);
          },
        });
      });
    },
    // 获取地址信息
    // getAuthorizeInfo(a = "scope.userLocation") {
    //   //1. uniapp弹窗弹出获取授权（地理，个人微信信息等授权信息）弹窗
    //   var _this = this;
    //   uni.authorize({
    //     scope: a,
    //     success() {
    //       //1.1 允许授权
    //       _this.getLocationInfo();
    //     },
    //     fail() {
    //       //1.2 拒绝授权
    //       console.log("你拒绝了授权，无法获得周边信息");
    //     },
    //   });
    // },
    // getLocationInfo() {
    //   //2. 获取地理位置
    //   var _this = this;
    //   uni.getLocation({
    //     type: "wgs84",
    //     success(res) {
    //       console.log("你当前经纬度是：");
    //       console.log(res);
    //       let latitude, longitude;
    //       latitude = res.latitude.toString();
    //       longitude = res.longitude.toString();
    //       uni.request({
    //         header: {
    //           "Content-Type": "application/text",
    //         },
    //         url:
    //           "http://apis.map.qq.com/ws/geocoder/v1/?location=" +
    //           latitude +
    //           "," +
    //           longitude +
    //           "&key=PJXBZ-NAO3Z-RDCXS-TF3QP-W7FJJ-D2B6U",
    //         success(re) {
    //           console.log("中文位置");
    //           console.log(re);
    //           _this.Areaaddress = re.data.result.address;
    //           if (re.statusCode === 200) {
    //             console.log("获取中文街道地理位置成功");
    //           } else {
    //             console.log("获取信息失败，请重试！");
    //           }
    //         },
    //       });
    //     },
    //   });
    // },
    // 点击获取地址
    clickAddrs() {
      const qqmapsdk = new QQMapWX({
        key: "PJXBZ-NAO3Z-RDCXS-TF3QP-W7FJJ-D2B6U", // 必填
      });
      //   this.getAuthorizeInfo();
      //   this.getLocationInfo();
      //   console.log("点击获取地址");
      let that = this;
      uni.getLocation({
        type: "gcj02",
        geocode: true,
        success: function (res) {
          //逆地址解析  坐标转地址信息
          qqmapsdk.reverseGeocoder({
            //Object格式
            location: {
              latitude: res.latitude,
              longitude: res.longitude,
            },
            success: function (res) {
              //成功后的回调
              const mapdata = res.result.ad_info;
              that.city = mapdata.city;
              that.district = mapdata.district;
              if (that.city) {
                that.color = "green";
              }

              console.log("address", mapdata);
            },
            fail: function (error) {
              console.error(error);
            },
            complete: function (res) {
              //console.log(res);
            },
          });
        },
      });

      console.log("点击获取地址");
    },
    //提醒谁看
    whoLook() {
      //   uni.navigateTo({
      //     url: "/pages/whoLook/whoLook",
      //   });
    },
  },
  mounted: function () {
    // this.getAuthorizeInfo();
    // this.getLocationInfo();
  },
};
</script>

<style lang="scss" scoped>
%flex-j-space {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.release-detail {
  background: #f5f7fb;
  border-top: 1px solid transparent;

  &-content {
    margin: 32rpx 0;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 2px;
    height: 100%;
    border-radius: 14rpx;

    &-upload {
      margin-top: 100rpx;
    }

    &-list {
      margin-top: 50rpx;

      .item-context {
        @extend %flex-j-space;
        border-top: 1px solid #eeeeee;
        padding: 20rpx 0;
        color: var(--addr-color);

        &-left {
          .text {
            margin: 0 30rpx;
          }
        }
      }
    }
  }
}

.color {
  color: var(--color) !important;
}
.color-who {
  color: var(--color-who) !important;
}
</style>