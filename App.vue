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
/*每个页面公共css */
@import "uview-ui/index.scss";
@import "@/common/css/project.scss";
@import "@/common/css/index.scss";
//#ifndef H5
@import "@/common/css/h5-tag.scss";
//#endif
</style>
