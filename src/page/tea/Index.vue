<template>
  <div class="index">
    <flexbox class="add_class">
      <flexbox-item>
        <!-- <a   @click="go(uid,'/wx/tea/sign/addSign?identityType=tea&uid='+uid)"> -->
        <!-- <a   @click="tabProp"> -->
        <a   @click="singIn">
          <div class="flex-demo">
            <img src="@/assets/img/qiandao.png" alt="">
            <p>签到</p>
          </div>
        </a>
      </flexbox-item>
      <flexbox-item>
        <!-- <a  @click="go(uid,'/wx/tea/vote/addVote?identityType=tea&uid='+uid)"> -->
        <a  @click="tabProp">
        <div class="flex-demo">
          <img src="@/assets/img/toupiao.png" alt="">
          <p>投票</p>
        </div>
        </a>
      </flexbox-item>
      <flexbox-item >
        <router-link :to="'/SuggestionBox/'+uid">
        <div class="flex-demo">
          <img src="@/assets/img/yijianxiang.png" alt="">
          <p>意见箱</p>
          <!--<span class="notice-num">10</span>-->
        </div>
        </router-link>
      </flexbox-item>
    </flexbox>
    <div class="title-div">
      <flexbox :gutter="0" wrap="wrap">
        <flexbox-item :span="1/4"  v-for="item in sceneInfos" :key="item.index">
          <router-link :to="'/sceneDetails/'+uid+'/'+item.id">
          <div class="flex-demo">
            <div class="set-div">
              <img :src="item.img" alt="">
              <span class="notice-num" v-show="item.untreatedTask>0">{{ item.untreatedTask>99?'•••':item.untreatedTask }}</span>
            </div>
            <p class="tit-p">{{ item.title.substring(0,4) }}</p>
          </div>
          </router-link>
        </flexbox-item>

        <flexbox-item :span="1/4" v-if="sceneInfos.length>0">
          <router-link :to="'/scenesList/'+uid">
          <div class="flex-demo">
            <div class="set-div">
              <img src="@/assets/img/gengduo.png" alt="">
            </div>
            <p class="tit-p">更多</p>
          </div>
          </router-link>
        </flexbox-item>

      </flexbox>
      <!-- 暂无数据时显示 -->
      <div class="no-msg-div" v-if="sceneInfos.length<=0">
        <img src="@/assets/img/zanwushuju.png" alt="">
        <span>暂无数据</span>
      </div>
    </div>
    <div class="list-con-div">

      <ul>
        <li v-for="(item,index) in conData" :key="item.index" v-if='index<=8'>
          <div class="list-con-left">
            <img :src="item.conImg" alt="">
          </div>
          <div class="list-con-right">
            <p class="name-date">
              <span>{{ item.name }}</span>
              <span>{{ item.ctime }}</span>
            </p>
            <p class="art-p">{{ item.content }}</p>
          </div>
        </li>
      </ul>

      <!-- 暂无数据时显示 -->
      <div class="no-msg-div" v-if="conData.length<=0">
        <img src="@/assets/img/zanwushuju.png" alt="">
        <span>暂无数据</span>
      </div>
    </div>
    <Infinite v-on:infinite="infiniteMore" ></Infinite>
    <BottomNav v-bind:type="1" v-bind:uid="uid"></BottomNav>
    <div v-transfer-dom class="styleE">
        <alert v-model="show" title="该功能暂未开放"></alert>
    </div>
  </div>
</template>
<script>

import BottomNav from '@/components/tea/bottomNav'
import {formatDate} from '@/plugins/formatDate.js';
import Infinite from "@/components/vue-scroll";
import qs from 'qs';
import { Group, Cell, Flexbox, FlexboxItem, TransferDom, Alert} from 'vux'
import Cookies from 'js-cookie';


export default {
  name:'index',
  data(){
    return{
      uid:this.$route.params.uid,
      pageNo:1,
      isaction:true,
      conData:[],
      sceneInfos:[],

      show:false,
    }
  },
  components: {
    Group,
    Cell,
    Flexbox,
    Infinite,
    FlexboxItem,
    BottomNav,
    Alert
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
  created(){
    this.loadData();
    this.query();
  },
  methods:{
    // 暂未开放功能
    tabProp(){
      this.show=!this.show
    },
    //签到
    singIn(){
      this.$router.push({path: '/signIn'});
    },
    loadData(){
      // localStorage.setItem('indexB',0);
      // localStorage.setItem('indexC',0);


        Cookies.set('indexB',0);
        Cookies.set('indexC',0);

      var _self = this;
      var  operation_sceneids = _self.$cookie.get('operation_sceneid');

      this.$axios.post( process.env.API_ROOT+"app/tea/index",
        qs.stringify({
          uid:_self.$route.params.uid,
          historyids:operation_sceneids
        })
      ).then(function(res){
        console.log(res)
        _self.sceneInfos = res.data.sceneInfos;
      }).catch(function(err){
        _self.errorUtil(err);
      })

    },
    go(uid,url){
      location.replace("/auth/session?uid="+uid+"&url="+encodeURIComponent(url)+"&code="+localStorage.token);
    },
    infiniteMore($state) {
      this.state = $state;
      this.query();
    },
    query(){
      var _self = this;
      if(!_self.isaction){
        if(_self.state!=null){
          _self.state.loaded();
        }
        return false;
      }
      _self.isaction=false;
      this.$axios.post( process.env.API_ROOT+"app/tea/MyNotificationDetails",
        qs.stringify({
          pageNo:_self.pageNo,
          uid:_self.uid
        })
      ).then(function(res){
        _self.pageNo= _self.pageNo+1;
        res.data.forEach(function(item) {
          _self.conData.push(item);
        });

        _self.$nextTick(function(){
          if(_self.state!=null){
            _self.state.loaded();
          }
          if(res.data.length==15){
            _self.isaction=true;
          }
          if(res.data.length<15){
            if(_self.state!=null){
              if(_self.conData.length==0){
                _self.state.completed("暂无数据");
              }else{
                _self.state.completed("没有更多数据了");
              }

            }
          }
        });
      }).catch(function(err){
        _self.errorUtil(err);
      })
    }

    }
}
</script>
<style>
.vux-x-dialog .weui-dialog{max-width:520px;-webkit-transform: translate(0,0);transform: translate(0,0);left:0;top:0;}
.vux-x-dialog .weui-dialog__bd {padding: 0 1.6em .8em;min-height: 40px;font-size: 15px;line-height: 1.3;word-wrap: break-word;word-break: break-all;color: #999;}



.vux-x-dialog .weui-dialog{max-width:520px;}
.vux-x-dialog .weui-dialog__title {font-size: 28px;color: #444;}
.vux-x-dialog .weui-dialog__ft {line-height: 65px;}
.styleE .weui-dialog__ft .weui-dialog__btn_default {font-size: 28px;color: #fff;background-color: #8f8e8e;}
.styleE .weui-dialog__ft .weui-dialog__btn_primary {font-size: 28px;color: #fff;background-color: #16c775;}
</style>

<style scoped>
.add_class{padding:30px 0;border-bottom: 1px solid #ededee;/*no*/}
.add_class > div {text-align: center;}
.add_class > div p{font-size: 28px;color: #444;}
.flex-demo {position: relative;}
.notice-num {position: absolute;top: -10px;border-radius: 100%;background-color: #ef1a00;color: #fff;width: 35px;height:35px;line-height:35px;text-align: center}
.add_class .flex-demo img{width: 70px;}
.title-div{padding: 30px 50px 10px;border-bottom: 1px solid #ededee;/*no*/}
.title-div .flex-demo {margin-bottom: 20px;}
.set-div{text-align: center}
.set-div{width:115px;height:115px;border-radius: 5px;/*no*/margin: 0 auto;}
.set-div img{width:115px;height:115px;}
.set-div span{right:5px;}
.title-div .vux-flexbox-item:last-child .set-div {background-color: #767674;line-height: 115px;}
.title-div .vux-flexbox-item:last-child .set-div img {width: 50%;height:auto;vertical-align: middle}
.tit-p{width:115px;margin: 0 auto; text-align: center;font-size: 26px;overflow: hidden;white-space: nowrap;color: #444;padding-top:5px;}
.list-con-div{position: relative;}
.list-con-div ul li {overflow:hidden;padding: 15px 20px;border-bottom: 1px solid #ededee;/*no*/}
.list-con-left {float: left;width: 90px;height: 90px;border-radius: 100%;border: 1px solid #ccc;/*no*/margin-right: 20px;}
.list-con-left img{width: 100%;}
.list-con-right {float: left;width: 580px;}
.name-date {overflow: hidden;padding-bottom: 10px;}
.name-date span:first-child{float: left;color: #393a3f;font-size: 28px;}
.name-date span:last-child{float: right;color: #7a7a7b;font-size: 24px;}
.art-p{overflow: hidden;text-overflow:ellipsis;white-space: nowrap;font-size: 26px;color:#444;}
._v-container{height:650px!important;}

.no-msg-div{color: #999;text-align: center;line-height: 64px;margin-top: 50px;}
.no-msg-div img{width: 70px;height: 70px;display: inline-block;vertical-align: middle}
.no-msg-div span{height: 70px;display: inline-block;vertical-align: middle;font-size:28px;}
</style>
