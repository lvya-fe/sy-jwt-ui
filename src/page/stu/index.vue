<template>
  <div class="index">
      <div class="index_top">
          <i class="icon iconfont icon-tongzhi1 ripple" @click="goMsg"> <span class="notice-num" v-if="whole.messageCount>0">{{ whole.messageCount>99?'•••':whole.messageCount }}</span></i>
          <router-link :to="'/studentDetails/'+uid" class="ripple">
            <i class="icon iconfont icon-hexinsuyang ts-img"></i>
          </router-link>
          <p class="number_p">{{ num.score ?num.score: '&nbsp;' }}</p>
      </div>

      <div class="notice_div ripple" @click="goTodo">
          <div class="notice_left_div">
              <img src="../../assets/img/daiban.png" alt="">
              <p>待办</p>
          </div>
          <div class="scroll-wrap">
              <ul class="scroll-content" v-if="todoList.length>0" :style="{ top }">
                  <li v-for="item in todoList" :key="item.index"><span>●</span>{{item.stateMsg}}</li >
              </ul>
              <p v-if="todoList.length<=0">今日事今日毕，看好你哦。</p>
          </div>
          <img class="right_img" src="../../assets/img/you.png" alt="">
          <span class="notice-num"  v-if="todosize>0">{{ todosize>99?'•••':todosize }}</span>
      </div>

      <flexbox class="sign_vote" :class="(todosize<=0)?'sign_vote_top' : ''">
          <flexbox-item class="ripple">
              <!-- <a  @click="go(uid,'/wx/sign/listSign?identityType=stu&uid='+uid)"> -->
              <!-- <a  @click="tabProp"> -->
              <a  @click="singIn">
                  <div class="flex-demo">
                      <img src="../../assets/img/qiandao.png" alt="">
                      <p>签到</p>
                  </div>
              </a>
          </flexbox-item>
          <flexbox-item class="ripple">
              <!-- <a @click="go(uid,'/wx/vote/vote?identityType=stu&uid='+uid)"> -->
              <a @click="tabProp">
                  <div class="flex-demo">
                      <img src="../../assets/img/toupiao.png" alt="">
                      <p>投票</p>
                  </div>
              </a>
          </flexbox-item>
      </flexbox>


      <flexbox :gutter="0" wrap="wrap" class="title_div">
          <flexbox-item :span="1/4"  v-for="item in sceneInfos" :key="item.index" class="ripple">
              <router-link :to="'/StudentSceneDetails/'+uid+'/'+item.id">
                  <div class="flex-demo add_class">
                      <div class="set-div">
                          <img :src="item.img" alt="">
                          <span class="notice-num" v-show="item.untreatedTask>0">{{ item.untreatedTask }}</span>
                      </div>
                      <p class="tit-p">{{ item.title.substring(0,4) }}</p>
                  </div>
              </router-link>
          </flexbox-item>
          <div class="no-msg-div" v-if="sceneInfos.length<=0 && !isLoading">
              <img src="../../assets/img/zanwushuju.png" alt="">
              <span>暂无数据</span>
          </div>
      </flexbox>

      <div v-transfer-dom class="styleA">
          <alert v-model="show" title="该功能暂未开放" ></alert>
      </div>
      <BottomNav v-bind:type="1" v-bind:uid="uid"></BottomNav>
  </div>
</template>
<script>

import qs from 'qs';
import { Group, Cell, Flexbox, FlexboxItem, TransferDom, Alert } from 'vux'
import BottomNav from '@/components/stu/studentBottom'
import Cookies from 'js-cookie';


let intervalCtrl = ''
export default {
  name:'index',
  data(){
    return{
      uid:this.$route.params.uid,
      activeIndex: 0,
      whole:[],
      todosize:0,
      todoList: [],
      num:[],
      isLoading: true,
      sceneInfos: localStorage.getItem('sceneInfos') ? JSON.parse(localStorage.getItem('sceneInfos')):[],
      show:false,
    }
  },
  components: {
    Group,
    Cell,
    Flexbox,
    FlexboxItem,
    BottomNav,
    Alert
  },
  computed: {
      top() {
        return - this.activeIndex * 0.666667 + 'rem';
      }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  directives: {
      TransferDom
  },

  methods:{
      // 暂未开放功能
    tabProp(){
      this.show=!this.show
    },
    //签到
    singIn(){
      this.$router.push({path: '/signInStu'});
    },
      //获取接口的例子

    loadTodo(){
      var _self = this;

      this.$axios.post( process.env.API_ROOT+"app/stu/v1/index_todo",
        qs.stringify({
          uid:_self.$route.params.uid
        })
      ).then(function(res){
        _self.todoList = res.data.todoList;
        _self.todosize = res.data.todosize;


        // alert("获取到数  据了");
      }).catch(function(err){
        _self.errorUtil(err);
      })

    },

    loadData(){
      var _self = this;
      this.isLoading = true
      this.$axios.post( process.env.API_ROOT+"app/stu/v1/index",
        qs.stringify({
          uid:_self.$route.params.uid
        })
      ).then(function(res){
        _self.isLoading = false;
        _self.sceneInfos = res.data.sceneInfos;
        localStorage.setItem('sceneInfos',JSON.stringify(res.data.sceneInfos))
        _self.whole = res.data;
        _self.num = res.data.stuInfo;
        localStorage.setItem('mz',_self.num.id)
        // alert("获取到数  据了");
      }).catch(function(err){
        _self.errorUtil(err);
      })

    },

    go(uid,url){
      location.replace("/auth/session?uid="+uid+"&url="+encodeURIComponent(url)+"&code="+localStorage.token);
    },
      goTodo(){
       this.$router.push({path: '/todolist/' + this.$route.params.uid+"/0"});
      },
      goMsg(){
        this.$router.push({path: '/news/' + this.$route.params.uid});
      }

  },
  async mounted() {
    // 角色判断
    if(/stu/.test(location.href)) {
      Cookies.set("roleType", 'stu');
    } else {
      Cookies.set("roleType", 'tea');
    }
    // 延迟加载数据，不然动画卡顿
    setTimeout(()=>{
      this.loadData();
      this.loadTodo();
    }, 500)

     var _self = this;
    intervalCtrl = setInterval(_ => {
          if(_self.activeIndex < _self.todoList.length-1) {
              _self.activeIndex += 1;
          } else {
              _self.activeIndex = 0;
          }
      }, 1500);
  },

  destroyed() {
    // 销毁计时器
    clearInterval(intervalCtrl)
  }
}
</script>
<style>
  .title_div{padding: 40px 0;margin-bottom: 100px}
  .set-div{text-align: center}
  .set-div{width:115px;height:115px;border-radius: 5px;/*no*/margin: 0 auto;}
  .set-div span{right:5px;}
  .tit-p{width:115px;margin: 0 auto; text-align: center;font-size: 26px;overflow: hidden;white-space: nowrap;padding-top:5px;}
  .add_class{position: relative;margin: 10px;border-bottom: none}
  .add_class .notice-num{right: 20px;top: 0;}

  .vux-x-dialog .weui-dialog{max-width:520px;-webkit-transform: translate(0,0);transform: translate(0,0);left:0;top:0;}
  .vux-x-dialog .weui-dialog__bd {padding: 0 1.6em .8em;min-height: 40px;font-size: 15px;line-height: 1.3;word-wrap: break-word;word-break: break-all;color: #999;}
  .vux-x-dialog .weui-dialog{max-width:520px;}
  .vux-x-dialog .weui-dialog__title {font-size: 28px;color: #444;}
  .vux-x-dialog .weui-dialog__ft {line-height: 65px;}
  .styleA .weui-dialog__ft .weui-dialog__btn_default {font-size: 28px;color: #fff;background-color: #8f8e8e;}
  .styleA .weui-dialog__ft .weui-dialog__btn_primary {font-size: 28px;color: #fff;background-color: #16c775;}
</style>

<style scoped>
  .set-div img{width:115px!important;height:115px!important;border-radius: 5px;}
  .index_top{position: relative;text-align: center;padding: 0 0 30px;}
  .index_top .icon-tongzhi1{position: absolute;right: 40px;top: 5px;color: #2ed184;font-size: 40px;}
  .ts-img{font-size: 76px;color: #2ed184;}
  .number_p{color: #2ed184;font-size: 36px;}
  .notice-num {position: absolute;top: 0;right:-10px;border-radius: 100%;background-color: #ef1a00;color: #fff;width: 35px;height:35px;line-height:35px;text-align: center;font-size: 16px!important;}

  li{list-style: none;}
  .notice_div{position: relative;height: 100px;padding: 30px 0;border-bottom: 1px solid #ededee;/*no*/}
  .notice_div > div{float: left;}
  .notice_left_div{margin: 0 30px;}
  .notice_left_div img{width: 61px;}
  .notice_left_div p{text-align: center;font-size: 26px;color: #444;}
  .scroll-wrap{overflow: hidden;width: 70%;height: 100px;}
  .scroll-wrap > p{line-height:50px;font-size: 26px;}
  .scroll-content{position: relative;transition: top 0.5s;}
  .scroll-content li{line-height: 50px;color: #444;font-size: 26px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
  .scroll-content li span{color: #b42b1a;margin-right: 5px;font-size:13px;}
  .right_img{position: absolute;top: 70px;right: 30px;width: 24px;}
  .notice_div .notice-num{top:10px;right: 60px;}


  .flex-demo{text-align: center;color: #444;font-size: 28px;}
  .flex-demo img{width: 70px;}
  .sign_vote{padding: 30px 0;border-bottom:1px solid #ededee;/*no*/}
  .sign_vote_top{border-top:1px solid #ededee;/*no*/}

   .no-msg-div{color: #999;text-align: center;line-height: 64px;margin:0 auto;}
   .no-msg-div img{width: 70px;height: 70px;display: inline-block;vertical-align: middle}
   .no-msg-div span{height: 70px;display: inline-block;vertical-align: middle;font-size:28px;}

</style>
