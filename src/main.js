// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import './config.js'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import {ToastPlugin,AlertPlugin,LoadingPlugin } from 'vux'
import axios from './plugins/ajax'
import VueWechatTitle from 'vue-wechat-title';
import { WechatPlugin } from 'vux'
import Vuex from 'vuex'
import VueCookie from 'vue-cookie'

import 'lib-flexible/flexible'


import VueScroller from 'vue-scroller'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')



Vue.use(VideoPlayer)

Vue.use(preview)

// import weui from 'weui.js'
// import 'weui'
// Vue.prototype.$weui = weui



Vue.use(VueScroller)
Vue.use(VueWechatTitle)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(VueRouter)
Vue.use(axios)
Vue.use(Vuex)
Vue.use(WechatPlugin)
Vue.use(LoadingPlugin)
Vue.use(VueCookie)

const store = new Vuex.Store({
  state: {
    isLoading: false,
    _url_: window.location.href
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})

const routes = [


    {
        name:'del',
        path: '/del',
        meta: {
            // title: '素养'
        },
        component: function (resolve) {
            require(['./page/del.vue'], resolve)
        }
    },
  {
    name:'Error404',
    path: '/Error404/:msg',
    meta: {
      // title: '素养'
    },
    component: function (resolve) {
      require(['./page/Error404.vue'], resolve)
    }
  },
  {
    name:'login',
    path: '/login/:uid/:phone/:type',
    meta: {
      // title: '登陆'
    },
    component: function (resolve) {
      require(['./page/login.vue'], resolve)
    }
  },
  {
    name:'stuIndex',
    path: '/stuIndex/:uid',
    meta: {
      // title: '首页'
    },
    component: function (resolve) {
      require(['./page/stu/index.vue'], resolve)
    },
  },
  {
    name: 'StudentSceneDetails',
    path: '/StudentSceneDetails/:uid/:id/:back?',
    meta: {
      // title: '场景详情'
    },
    component: function (resolve) {
      require(['./page/stu/StudentSceneDetails.vue'], resolve)
    }
  },
  {
    name: 'ProcessDetails',
    path: '/ProcessDetails/:uid/:id/:back?',
    meta: {
      // title: '过程详情'
    },
    component: function (resolve) {
      require(['./page/stu/ProcessDetails.vue'], resolve)
    }
  },
  // {
  //   name: 'CertificateAcquisition',
  //   path: '/CertificateAcquisition/:uid/:id',
  //   meta: {
  //     title: '证书已获得'
  //   },
  //   component: function (resolve) {
  //     require(['./page/stu/CertificateAcquisition.vue'], resolve)
  //   }
  // },
  {
    name: 'CertificateRUploadRejection',
    path: '/CertificateRUploadRejection/:uid/:id',
    meta: {
      // title: '证书未上传(驳回)'
      // title: '证书'
    },
    component: function (resolve) {
      require(['./page/stu/CertificateRUploadRejection.vue'], resolve)
    }
  },
  // {
  //   name: 'CertificatePendingReview',
  //   path: '/CertificatePendingReview/:uid/:id',
  //   meta: {
  //     title: '证书待审核'
  //   },
  //   component: function (resolve) {
  //     require(['./page/stu/CertificatePendingReview.vue'], resolve)
  //   }
  // },
  // {
  //   name: 'studentTaskDetailsCompleted',
  //   path: '/studentTaskDetailsCompleted/:uid/:id/:strtime/:endtime/:formid',
  //   meta: {
  //     title: '任务详情查看'
  //   },
  //   component: function (resolve) {
  //     require(['./page/stu/studentTaskDetailsCompleted.vue'], resolve)
  //   }
  // },
  {
    name: 'studentTaskDetails',
    path: '/studentTaskDetails/:uid/:id/:strtime/:endtime/:formid/:back?',
    meta: {
      // title: '任务详情填写'
      // title: '任务详情'
    },
    component: function (resolve) {
      require(['./page/stu/studentTaskDetails.vue'], resolve)
    }
  },
  {
    name: 'personalCenter',
    path: '/personalCenter/:uid',
    meta: {
      // title: '个人中心'
    },
    component: function (resolve) {
      require(['./page/stu/personalCenter.vue'], resolve)
    }
  },
  {
    name: 'inquiry',
    path: '/inquiry/:uid',
    meta: {
      // title: '问询'
    },
    component: function (resolve) {
      require(['./page/stu/inquiry.vue'], resolve)
    }
  },
  {
    name: 'inquiryList',
    path: '/inquiryList/:uid',
    meta: {
      // title: '问询列表'
    },
    component: function (resolve) {
      require(['./page/stu/inquiryList.vue'], resolve)
    }
  },
  {
    name: 'switchAccount',
    path: '/switchAccount/:uid',
    meta: {
      // title: '切换账号'
    },
    component: function (resolve) {
      require(['./page/stu/switchAccount.vue'], resolve)
    }
  },
  {
    name: 'studentDetails',
    path: '/studentDetails/:uid',
    meta: {
      // title: '素养分数详情'
    },
    component: function (resolve) {
      require(['./page/stu/studentDetails.vue'], resolve)
    }
  },
  {
    name: 'pocessLiteracy',
    path: '/pocessLiteracy/:uid/:itemId/:status',
    meta: {
      // title: '过程素养分明细'
    },
    component: function (resolve) {
      require(['./page/stu/pocessLiteracy.vue'], resolve)
    }
  },

  {
    name: 'todolist',
    path: '/todolist/:uid/:id',
    meta: {
      // title: '待办列表'
    },
    component: function (resolve) {
      require(['./page/stu/todolist.vue'], resolve)
    }
  },

  {
    name: 'news',
    path: '/news/:uid',
    meta: {
      // title: '消息'
    },
    component: function (resolve) {
      require(['./page/stu/news.vue'], resolve)
    }
  },
    {
    name: 'setStuAvatar',
    path: '/setStuAvatar/:uid/',
    meta: {
      // title: '设置头像'
    },
    component: function (resolve) {
      require(['./page/stu/setStuAvatar.vue'], resolve)
    }
  },
  {
    name: 'msgcontent',
    path: '/msgcontent/:uid/:id',
    meta: {
      // title: '消息'
    },
    component: function (resolve) {
      require(['./page/stu/msgcontent.vue'], resolve)
    }
  },
  {
    name: 'select',
    path: '/select/:uid',
    meta: {
      // title: '选择账号'
    },
    component: function (resolve) {
      require(['./page/select.vue'], resolve)
    }
  },

  {
    name: 'index',
    path: '/index/:uid',
    meta: {
      // title: '素养'
    },
    component: function (resolve) {
      require(['./page/tea/index.vue'], resolve)
    }
  }, {
    name:'scenesList',
    path: '/scenesList/:uid',
    meta: {
      // title: '素养'
    },
    component: function (resolve) {
      require(['./page/tea/ScenesList.vue'], resolve)
    }
  },
  {
    name:'scenesMore',
    path: '/scenesMore/:uid/:orgid',
    meta: {
      // title: '素养'
    },
    component: function (resolve) {
      require(['./page/tea/ScenesMore.vue'], resolve)
    }
  },
  {
    name:'sceneDetails',
    path: '/sceneDetails/:uid/:id/:courseId?/:back?',
    // path: '/sceneDetails/:uid/:id/:back?',
    meta: {
      // title: '素养'
    },
    component: function (resolve) {
      require(['./page/tea/SceneDetails.vue'], resolve)
    }
  },
  {
    name:'taskList',
    path: '/taskList/:uid/:taskid/:id/:back?',
    meta: {
      // title: '素养'
    },
    component: function (resolve) {
      require(['./page/tea/TaskList.vue'], resolve)
    }
  },
  {
    name:'notified',
    path: '/notified/:uid/:sid',
    meta: {
      // title: '素养'
    },
    component: function (resolve) {
      require(['./page/tea/notified.vue'], resolve)
    }
  },
  {
    name:'HistoryNotification',
    path: '/HistoryNotification/:uid',
    meta: {
      // title: '素养'
    },
    component: function (resolve) {
      require(['./page/tea/HistoryNotification.vue'], resolve)
    }
  },
  {
    name:'ViewNotification',
    path: '/ViewNotification/:uid/:id',
    meta: {
      // title: '素养'
    },
    component: function (resolve) {
      require(['./page/tea/ViewNotification.vue'], resolve)
    }
  },
  {
    name:'BatchVerification',
    path: '/BatchVerification/:uid/:id',
    meta: {
      // title: '素养'
    },
    component: function (resolve) {
      require(['./page/tea/BatchVerification.vue'], resolve)
    }
  },
  {
    name:'settingLiteracyIndicators',
    path: '/settingLiteracyIndicators/:uid/:id',
    meta: {
      // title: '素养'
    },
    component: function (resolve) {
      require(['./page/tea/settingLiteracyIndicators.vue'], resolve)
    }
  },
  {
    name:'InputNutrients',
    path: '/InputNutrients/:uid/:id',
    meta: {
      // title: '素养'
    },
    component: function (resolve) {
      require(['./page/tea/InputNutrients.vue'], resolve)
    }
  },
  {
    name:'AuditOperation',
    path: '/AuditOperation/:uid/:id',
    meta: {
      // title: '素养'
    },
    component: function (resolve) {
      require(['./page/tea/AuditOperation.vue'], resolve)
    }
  },
  {
    name:'OutstandingStudentLeaders',
    path: '/OutstandingStudentLeaders/:uid/:id/:st',
    meta: {
      // title: '素养'
    },
    component: function (resolve) {
      require(['./page/tea/OutstandingStudentLeaders.vue'], resolve)
    }
  },
  {
    name:'AuditCer',
    path: '/AuditCer/:uid/:id',
    meta: {
      // title: '素养'
    },
    component: function (resolve) {
      require(['./page/tea/AuditCer.vue'], resolve)
    }
  },
  {
    name:'Me',
    path: '/Me/:uid',
    meta: {
      // title: '素养'
    },
    component: function (resolve) {
      require(['./page/tea/Me.vue'], resolve)
    }
  },
  {
    name:'MyStudent',
    path: '/MyStudent/:uid',
    meta: {
      // title: '素养'
    },
    component: function (resolve) {
      require(['./page/tea/MyStudent.vue'], resolve)
    }
  },
  {
    name:'StudentDetails',
    path: '/StudentDetails/:uid/:id',
    meta: {
      // title: '素养'
    },
    component: function (resolve) {
      require(['./page/tea/StudentDetails.vue'], resolve)
    }
  },
  {
    name:'SuggestionBox',
    path: '/SuggestionBox/:uid',
    meta: {
      // title: '素养'
    },
    component: function (resolve) {
      require(['./page/tea/SuggestionBox.vue'], resolve)
    }
  },
  {
    name:'teaNews',
    path: '/teaNews/:uid',
    meta: {
      // title: '素养'
    },
    component: function (resolve) {
      require(['./page/tea/teaNews.vue'], resolve)
    }
  },
  {
    name:'TaskListApproval',
    path: '/taskListApproval/:uid/:taskid/:id',
    meta: {
      // title: '素养'
    },
    component: function (resolve) {
      require(['./page/tea/TaskListApproval.vue'], resolve)
    }
  },
  {
    name:'EventDetails',
    path: '/EventDetails/:uid/:id',
    meta: {
      // title: '素养'
    },
    component: function (resolve) {
      require(['./page/tea/EventDetails.vue'], resolve)
    }
  },
  {
    name:'start',
    path: '/start/:uid',
    meta: {
      // title: '素养'
    },
    component: function (resolve) {
      require(['./page/start.vue'], resolve)
    }
  },
  {
    name:'setTeaAvatar',
    path: '/setTeaAvatar/:uid',
    meta: {
      // title: '素养'
    },
    component: function (resolve) {
      require(['./page/tea/setTeaAvatar.vue'], resolve)
    }
  },
  {
    name:'signIn',
    path: '/signIn',
    meta: {
      // title: '签到'
    },
    component: function (resolve) {
      require(['./page/tea/signIn.vue'], resolve)
    }
  },
  {
    name: 'singNut',
    path: '/singNut',
    meta: {
      // title: '签到加分'
    },
    component: function (resolve) {
      require(['./page/tea/singNut.vue'], resolve)
    }
  },
  {
    name: 'signInStu',
    path: '/signInStu',
    meta: {
      // title: '签到加分'
    },
    component: function (resolve) {
      require(['./page/stu/signInStu.vue'], resolve)
    }
  },
  {
    name: 'stuList',
    path: '/stuList/:uid/:id/:cycleid/:back?',
    meta: {
      // title: '学生列表'
    },
    component: function (resolve) {
      require(['./page/tea/stuList.vue'], resolve)
    }
  },
  {
    name: 'studentTaskDetailsTea',
    path: '/studentTaskDetailsTea/:uid/:id/:stuid?/:strtime/:endtime/:formid/:stuname?/:back?',
    meta: {
      // title: '填写表单'
    },
    component: function (resolve) {
      require(['./page/tea/studentTaskDetailsTea.vue'], resolve)
    }
  },
  {
    name: 'upcoming',
    path: '/upcoming/:uid/:id',
    meta: {
      // title: '待办'
    },
    component: function (resolve) {
      require(['./page/tea/upcoming.vue'], resolve)
    }
  }
]




const router = new VueRouter({
  routes
})

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})


// FastClick.attach(document.body)

Vue.config.productionTip = false



Vue.prototype.formatUrl= function (url) {
     var bool = url.indexOf("http");
     var bool2 = url.indexOf("src");
     var bool3 = url.indexOf("href");
     if(bool>=0&&bool2<0&&bool3<0){
       url = url.replace(/_tcn_/g, 't.cn');
       url = url.replace(/&amp;/g, '&');
       url = url.replace(/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|\&|-)+)/g, "<a href='$1$2' target='_blank'> 分享链接 </a>");
     }
    return url;
};
//全局错误处理方法
Vue.prototype.errorUtil = function (err,uid){
    if(err.data!=undefined&&err.data.errorCode=="ERROR"){
      this.$router.replace({  path: '/error/'+uid+"/"+err.message});
    }else if(err.data!=undefined&&err.data.errorCode=="MISTOKEN"){
          if (localStorage.uid) {
            //保存当前url

              // var u = navigator.userAgent;
              // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
              // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
              // var httpUrl = this._url_;
              // if (!isiOS) {
              //
              // }
              // alert(httpUrl);

              var  httpUrl = window.location.href;
              var  httpUrl2 =  localStorage.lasturl;
              if(httpUrl2!=httpUrl){
                  localStorage.setItem("lasturl",httpUrl);
              }else{
                  localStorage.removeItem("lasturl");
              }


              this.$router.replace({  path: '/start/'+localStorage.uid});
              //location.replace("/app/auth/wx?uid="+localStorage.uid+"&code="+localStorage.token);
          }
      return;
    }else{
      if(err.message!="") {
        this.$vux.toast.show({type: 'warn', text: err.message});
      }else if(err.data!=undefined){
        this.$vux.toast.show({type: 'warn', text: err.data.errorDesc});
      }else{
        this.$vux.toast.show({type: 'warn', text: "未知错误"});
      }

    }
}


/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
