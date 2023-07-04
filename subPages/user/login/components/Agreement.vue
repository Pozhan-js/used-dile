<template>
  <view class="agreement-box w-full text-center" @click="handleChangeAgreement">
    <checkbox :color="$constants.THEME_COLOR" :checked="checked" />
    <text>{{ content.headText }}</text>
    <template v-for="(item, index) in content.list">
      <text
        :key="index"
        v-if="item.key"
        class="u-primary"
        @click.stop="goPath(paths[item.key]||item.key)">
        《{{ item.value }}》
      </text>
      <text :key="index + 'o'" v-if="item.content">{{ item.content }}</text>
    </template>
  </view>
</template>

<script>
export default {
  name: "Agreement",
  // #ifdef MP-WEIXIN
  options: {
    virtualHost: true,
  },
  // #endif
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "我已阅读并同意",
    },
    paths: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      checked: false,
    };
  },
  computed: {
    // content() {
    //     // 断言版本 #key[value]content
    //   const regex = /#(\w+)\[(.+?)\]((?:(?!#\w+\[).)*)/g;
    //   const list = [];
    //   let match;
    //   let headText = text;
    //   while ((match = regex.exec(this.text)) !== null) {
    //     list.push({
    //       key: match[1],
    //       value: match[2],
    //       content: match[3],
    //     });
    //     headText = headText.replace(match[0], "");
    //   }
    //   return {
    //     headText: headText.trim(),
    //     list,
    //   };
    // },
    content() {
      //由于ios不支持断言,所以使用兼容方法
      const text = this.text;
      // 定义正则表达式来匹配 #key[value] 模式
      const regex = /#(\w+)\[(.+?)\]/g;
      const list = [];
      let headText = "";
      let match = regex.exec(text);
      while (match !== null) {
        // 如果当前匹配项是第一个匹配项，那么提取 headText(即第一个匹配项之前的文本)
        if (list.length === 0) {
          headText = text.slice(0, match.index).trim();
        }
        // 计算当前匹配项的 content 的起始位置
        const contentStartIndex = match.index + match[0].length;
        // 查找下一个匹配项
        const nextMatch = regex.exec(text);
        // 计算当前匹配项的 content 的结束位置
        const contentEndIndex = nextMatch ? nextMatch.index : text.length;
        // 将当前匹配项添加到 list 数组中
        list.push({
          key: match[1],
          value: match[2],
          content: text.slice(contentStartIndex, contentEndIndex),
        });
        match = nextMatch;
      }
      // 返回结果对象
      return {
        headText,
        list,
      };
    },
  },
  methods: {
    handleChangeAgreement() {
      this.checked = !this.checked;
    },
    goPath(path) {
      if (path) {
        if (!/\//.test(path)) path = "/subPages/agreement/" + path;
        this.$jump(path);
      }
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.checked = val;
      },
    },
    checked(val) {
      this.$emit("input", val);
    },
  },
};
</script>

<style lang="scss">
.agreement-box {
  font-size: 24rpx;
  > checkbox,
  text {
    vertical-align: middle;
  }
  > checkbox {
    transform: scale(0.65);
  }
}
</style>
