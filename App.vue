<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-07-03 15:10:10
 * @LastEditors: Why so serious my dear 854059946@qq.com
 * @LastEditTime: 2023-07-05 20:37:14
 * @FilePath: /used-idle/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script>
export default {
  onLaunch: function () {
    uni.$set = this.$set;
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: "uicon-iconfont";
  src: url("https://at.alicdn.com/t/font_2225171_8kdcwk4po24.ttf")
    format("truetype");
}

%display-space {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/*每个页面公共css */
@import "uview-ui/index.scss";
@import "@/common/css/project.scss";
@import "@/common/css/index.scss";
//#ifndef H5
@import "@/common/css/h5-tag.scss";
//#endif
</style>
