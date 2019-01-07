<template>
  <div id="app">
    <loading v-model="isLoading"></loading>
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>


import { Loading } from 'vux'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    Loading
  },
  computed: mapState({
    isLoading: state => state.isLoading
  })

}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
// @import 'http://cdn.bootcss.com/weui/1.1.1/style/weui.min.css';
</style>
