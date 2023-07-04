<template>
    <view class="statusBar" :style="{ height: (statusBarHeight+10) + 'px' }"></view>
</template>
<script>
export default {
    data() {
        return {
            statusBarHeight: ''
        }
    },
    created() {
        let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
        this.statusBarHeight = menuButtonInfo.height
    }
}
</script>
<style lang="scss" scoped>
.statusBar {
    width: 100%;
}
</style>
