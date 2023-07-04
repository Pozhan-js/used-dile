import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState("user", ["userInfo", "userData", "token"]),
    ...mapGetters(["isLogin"]),
    headIcon() {
      return this.userInfo.headIcon;
    },
    realName() {
      return this.userInfo.realName || "未知";
    },
    avatar() {
      return this.$helper.getAvatar(this.userInfo.headIcon);
    },
  },
};
