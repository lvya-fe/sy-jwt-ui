<template>
  <div>
    <div v-show="isshow">
        <div class="top-back">
            <img class="img-1" src="@/assets/img/back_left_whit.png" alt="" @click="goback">
            签到
            <group class="right-btn" v-show="taskinfo.jointimetype==1">
                <x-switch title=" " v-model="taskinfo.islock" ></x-switch>
            </group>
        </div>
        <div class="tab-con my_bar">
            <tab :line-width=2 active-color='#16c775' v-model="index" class="footer-tab">
                <tab-item class="vux-center"  v-for="item in tarkName" :key="item.index" >{{ item.name }}</tab-item>
            </tab>
            <div class="tab-swiper vux-center" v-show="index == 0">
                <div class="ic_img">
                    <img src="@/assets/img/morenPic.png" alt="">
                </div>
                <div class="vie_div ts_vie">
                    <span>卢同学 </span>
                    <p>(测试班)</p>
                </div>
                <div class="vie_div">
                    <span>当前签到项 : </span>
                    <p>素质活动现场签到</p>
                </div>
                <div class="vie_div">
                    <span>记录结束 : </span>
                    <p>{{minute}}分{{second}}秒</p>
                </div>
                <div class="vie_div">
                    <span>口令 :</span>
                    <input type="text" placeholder="请输入口令">
                </div>
                <button type="button" class="qd" @click="alta">签到</button>
            </div>

            <div class="tab-swiper vux-center" v-show="index == 1">
                <div>
                    <div class="vie_div2">
                      <p class="p_title">刘老师 10-12 签到</p>
                      <div class="div_content">
                        <span>签到成功</span>
                        <!-- <span> 墨香沁书法社团--欢迎同学们参加</span> -->
                        <img class="right-img" src="@/assets/img/you.png" alt="">
                      </div>
                    </div>
                    <div class="vie_div2">
                      <p class="p_title">王老师 10-11 签到</p>
                      <div class="div_content">
                        <span>签到成功</span>
                        <!-- <span> 墨香沁书法社团--欢迎同学们参加</span> -->
                        <img class="right-img" src="@/assets/img/you.png" alt="">
                      </div>
                    </div>
                    <div class="vie_div2">
                      <p class="p_title">张老师 10-10 签到</p>
                      <div class="div_content">
                        <span>签到成功</span>
                        <!-- <span> 墨香沁书法社团--欢迎同学们参加</span> -->
                        <img class="right-img" src="@/assets/img/you.png" alt="">
                      </div>
                    </div>
                    <div class="vie_div2">
                      <p class="p_title">向老师 10-09 签到</p>
                      <div class="div_content">
                        <span>签到成功</span>
                        <!-- <span> 墨香沁书法社团--欢迎同学们参加</span> -->
                        <img class="right-img" src="@/assets/img/you.png" alt="">
                      </div>
                    </div>
                    <div class="vie_div2">
                      <p class="p_title">陈老师 10-12 签到</p>
                      <div class="div_content">
                        <span>签到成功</span>
                        <!-- <span> 墨香沁书法社团--欢迎同学们参加</span> -->
                        <img class="right-img" src="@/assets/img/you.png" alt="">
                      </div>
                    </div>
                    <div class="vie_div2">
                      <p class="p_title">李老师 10-12 签到</p>
                      <div class="div_content">
                        <span>签到成功</span>
                        <!-- <span> 墨香沁书法社团--欢迎同学们参加</span> -->
                        <img class="right-img" src="@/assets/img/you.png" alt="">
                      </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  </div>
</template>

<script>




import { XSwitch, Tab, TabItem, Swiper, SwiperItem, CellBox, Group, Checker, CheckerItem, XInput, Toast  } from "vux";
import qs from 'qs';
import {formatDate} from '@/plugins/formatDate.js';
//import VueScroller from 'vue-scroller'

export default {
    components: {
        XSwitch,
        Tab,
        TabItem,
        Swiper,
        SwiperItem,
        CellBox,
        Group,
        Checker,
        CheckerItem,
        XInput,
        Toast 
    },
    data(){
        return{
          taskinfo:[],
          isshow:true,
          tarkName:[
                {
                    name:'签到',
                    num:'0'
                },
                {
                    name:'历史签到',
                    num:'0'
                }
            ],
          index: 0,
          minutes: 5,
          seconds: 0
        }
    },
    mounted(){
      this.add()
    },
    created(){

    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        alta(){
          this.$vux.toast.text('签到成功', 'middle')
        },
        tabIndex(target,nodeList){
          for(let i=0;i<nodeList.length;i++){
            if(target===nodeList[i]){
              this.index = i;
            }
          }
        },
        num: function (n) {
          return n < 10 ? '0' + n : '' + n
        },
        add: function () {
          var _this = this
          var time = window.setInterval(function () {
            if (_this.seconds === 0 && _this.minutes !== 0) {
              _this.seconds = 59
              _this.minutes -= 1
            } else if (_this.minutes === 0 && _this.seconds === 0) {
              _this.seconds = 0
              window.clearInterval(time)
            } else {
              _this.seconds -= 1
            }
          }, 1000)
        }
    },
    watch: {
      second: {
        handler (newVal) {
          this.num(newVal)
        }
      },
      minute: {
        handler (newVal) {
          this.num(newVal)
        }
      }
    },
    computed: {
      second: function () {
        return this.num(this.seconds)
      },
      minute: function () {
        return this.num(this.minutes)
      }
    }
}
</script>
<style>
.right-btn .weui-cells:after{content:none;}
.tab-con .vux-tab{height: 85px;background-color: #f4f4f4}
.tab-con .vux-tab-container,.tab-con .vux-tab-wrap{height: 85px;padding-top: 0;}
.tab-con .vux-tab .vux-tab-item {font-size: 28px;line-height: 85px;}
.tab-con .vux-slider{border-bottom: 1px solid #e3e2e2;/*no*/padding-bottom: 20px;}



.weui-cells:before{content: none!important;}


.weui-cell_access.vux-cell-box:after{content:none!important;}
.tab-swiper .vux-no-group-title:after{content:none!important;}
.my_bar .vux-tab-ink-bar{background-color:#0d940b!important;}
</style>


<style scoped>
.top-back {text-align: center;font-size: 36px;color: #444;position: fixed;left:0;right:0;padding:20px;background-color: #01c269;color:#fff;z-index: 100;top: 0;}
.top-back .img-1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}



.tab-con{margin-top: 98px;}
.vie_div {overflow: hidden;padding:20px 0;border-bottom:1px solid #f2f2f2;}
.vie_div > span {float: left;width: 30%;text-align:right;font-size: 26px;line-height:50px;height:50px;color:#2e2b2b;}
.vie_div input {float: left;width: 50%;margin-left: 5%;font-size: 26px;padding:5px 10px;background: #f4f4f4;border:1px solid #f2f2f2;/*no*/border-radius:3px;/*no*/height:40px;line-height:40px;outline:none;}
.vie_div select {float: left;width: 53%;margin-left: 5%;font-size: 26px;padding:5px 10px;background: #f4f4f4;border:1px solid #f2f2f2;/*no*/border-radius:3px;/*no*/height:55px;line-height:55px;outline:none;}
.vie_div p{float:left;margin-left: 5%;font-size:26px;width:50%;height:40px;line-height:40px;padding:5px 0;color:#2e2b2b;}
.vie_div div{float:left;margin-left: 5%;font-size:26px;width:60%;overflow: hidden;}
.vie_div div span{float:left;text-align: center;border:1px solid #f2f2f2;/*no*/background:#f4f4f4;color:#2e2b2b;width:110px; height: 40px;border-radius: 5px;/*no*/margin:0 20px 20px 0;}
.selected{background:#01c269!important;}
.vie_div .ts_msg{width:70%;margin:0 auto 20px;float: none;color:#2e2b2b;}
.qd{width:150px;height:60px;line-height:60px;border:1px solid #01c269;/*no*/background:#01c269;color:#fff;text-align:center;display:block;margin:30px auto;border-radius:5px;/*no*/font-size:32px;}

.div_2{background: #f4f4f4;height:100%;}
.vie_div2{border-bottom: 1px solid #f2f2f2;/*no*/padding:20px 30px;background:#fff;position: relative;}
.right-img{position: absolute;right: 30px;width: 24px;height: 24px;}
.p_title{font-size:32px;color:#2e2b2b;}
.div_content{font-size:26px;color:#2e2b2b;}

.two_title{border-bottom:1px solid #f2f2f2;/*no*/padding:20px 40px;color:#2e2b2b;font-size:26px;}
.two_tab{display:flex;border-top:1px solid #dbdada;/*no*/border-bottom:1px solid #dbdada;/*no*/background:#f4f4f4;margin-top:30px;}
.two_tab > div{flex:1;border-right:1px solid #dbdada;/*no*/text-align:center;color: #2e2b2e;font-size:26px;padding:10px 0;}
.two_tab > div:last-child{border-right:0;}
.tab_selected{color:#fff!important;background: #01c269;}


.change_tit {overflow: hidden;padding:20px 0;border-bottom:1px solid #f2f2f2;/*no*/}
.change_tit > div:first-child{float: left;width:30%;margin-left:10%;font-size:26px;color:#2e2b2b;}
.change_tit > div:first-child input{vertical-align:middle;margin-top:-3px;/*no*/}
.change_tit > div:last-child{float: right;width:30%;text-align: right;margin-right:10%;font-size:26px;color:#2e2b2b;}

.check_div{padding:20px 0 20px 10%;border-bottom:1px solid #f2f2f2;/*no*/font-size:26px;color:#2e2b2b;}
.check_div input {vertical-align:middle;margin-top:-3px;/*no*/}

.last_div{padding:20px 30px;border-bottom:1px solid #f2f2f2;overflow: hidden;}
.last_div img{width:100px;height:100px;border-radius: 100%;float: left;}
.last_div > div {float: left;margin-left:30px;font-size:26px;color:#2e2b2b;}
.last_div > div p{line-height:50px;}



.ts_vie > span,.ts_vie > p{font-size:36px;}
.ic_img{padding-top:20px;background: url("../../assets/img/bg_qd.png")no-repeat center;background-size: cover;}
.ic_img img{width:200px;height:200px;margin-left:20%;border-radius: 100%;}
</style>
