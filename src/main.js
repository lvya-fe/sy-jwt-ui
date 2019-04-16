import Vue from 'vue'

import VueRouter from 'vue-router'

import {ToastPlugin,AlertPlugin,LoadingPlugin } from 'vux'

import axios from './plugins/ajax'

// import VueWechatTitle from 'vue-wechat-title';
import { WechatPlugin } from 'vux'
// TODO lgzhang: 用一个cookie就行，后面统一把vue-cookie去掉
import VueCookie from 'vue-cookie'
import Cookies from 'js-cookie'
// 配置成全局使用
window.Cookies = Cookies
// 配合 px to rem 转换
import 'lib-flexible/flexible'

import VueScroller from 'vue-scroller'

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

import VideoPlayer from 'vue-video-player-lvya'
import 'video.js/dist/video-js.css'
import 'vue-video-player-lvya/src/custom-theme.css'

import './config.js'
import routes from './router.js'
import store from './vuex/store'

import App from './App'
const router = new VueRouter({
  routes
})

// Vue.config.productionTip = false

// 移动 全局通用组件
import EduComs from './edu-common/src/coms-m/index.js'
Vue.use(EduComs)

// url处理
import DoUrl from './utils/DoUrl'
Vue.prototype.formatUrl= DoUrl

//全局错误处理方法
import DoApi from './utils/DoApi'
Vue.prototype.errorUtil = DoApi.doError

// 页面切换动画
import {PageAnimation} from "./utils/Animation"
PageAnimation(router, store)

// Todo 清缓存
localStorage.setItem('sceneInfos', '')


Vue.use(VideoPlayer)
Vue.use(preview)

Vue.use(VueScroller)

// Vue.use(VueWechatTitle)
Vue.use(WechatPlugin)

Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(VueRouter)
Vue.use(axios)
Vue.use(VueCookie)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
