<template>

  <div id="app">
    <loading v-model="isLoading"></loading>
    <transition
      @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
      :name="viewTransition" :css="!!direction">
      <router-view v-wechat-title="$route.meta.title" class="router-view"></router-view>
    </transition>
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
    isLoading: state => state.isLoading,
    direction: state => state.direction,
    viewTransition () {
      if (!this.direction) return ''
      return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
    }
  }),
  created() {

  }

}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
// @import 'http://cdn.bootcss.com/weui/1.1.1/style/weui.min.css';
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  width: 100%;
  height: 100%;
  top: 0px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.weui-toast{
  top:8.4rem;
  min-height: 2rem !important;
  .weui-loading{
    margin-top: 0.65rem;
    width: 0.7rem;
    height: 0.7rem;
  }
}
</style>
