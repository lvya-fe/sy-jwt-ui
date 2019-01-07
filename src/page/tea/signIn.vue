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
        <div class="tab-con">
            <tab :line-width=2 active-color='#16c775' v-model="index" class="footer-tab">
                <tab-item class="vux-center"  v-for="item in tarkName" :key="item.index" >{{ item.name }}</tab-item>
            </tab>
            <div class="tab-swiper vux-center" v-show="index == 0">
                <div class="vie_div">
                    <span>标题 :</span>
                    <input type="text" placeholder="请输入标题" value="现场签到">
                </div>
                <div class="vie_div">
                    <span>所属场景 :</span>
                    <select>
                      <option value="">请选择场景</option>
                      <option value="">素质活动</option>
                      <option value="">场景3</option>
                      <option value="">场景4</option>
                    </select>
                </div>
                <div class="vie_div">
                    <span>所属过程 :</span>
                    <select>
                      <option value="">请选择过程</option>
                      <option value="">活动现场签到</option>
                      <option value="">过程3</option>
                      <option value="">过程4</option>
                    </select>
                </div>
                <div class="vie_div">
                    <span>签到人员 :</span>
                    <p>当前过程全体学生</p>
                </div>
                <div class="vie_div">
                    <span>结束 :</span>
                    <div>
                        <span v-for="(item,index) in time" :key="index" :class="index==index01?'selected':''" @click="qhSpan(index)">{{ item }}</span>
                    </div>
                </div>
                <div class="vie_div" style="border-bottom:0;">
                    <div class="ts_msg">请将输入的口令告诉学生，学生在倒计时内输入口令t提交。超时视为失败。</div>
                    <span>口令 :</span>
                    <input type="text" placeholder="请输入口令">
                </div>
                <button type="button" class="qd" @click="alta">确定</button>
            </div>

            <div class="tab-swiper vux-center" v-show="index == 1">
                <div class="div_2" v-show="rightShow">
                    <div class="vie_div2" @click="changeRight">
                      <p class="p_title">现场签到</p>
                      <div class="div_content">
                        <span>所属场景 :</span>
                        <span>素质活动</span>
                        <img class="right-img" src="@/assets/img/you.png" alt="">
                      </div>
                    </div>
                    <div class="vie_div2" @click="changeRight">
                      <p class="p_title">现场签到</p>
                      <div class="div_content">
                        <span>所属场景 :</span>
                        <span>素质活动</span>
                        <img class="right-img" src="@/assets/img/you.png" alt="">
                      </div>
                    </div>
                    <div class="vie_div2" @click="changeRight">
                      <p class="p_title">现场签到</p>
                      <div class="div_content">
                        <span>所属场景 :</span>
                        <span>素质活动</span>
                        <img class="right-img" src="@/assets/img/you.png" alt="">
                      </div>
                    </div>
                    <div class="vie_div2" @click="changeRight">
                      <p class="p_title">现场签到</p>
                      <div class="div_content">
                        <span>所属场景 :</span>
                        <span>素质活动</span>
                        <img class="right-img" src="@/assets/img/you.png" alt="">
                      </div>
                    </div>
                    <div class="vie_div2" @click="changeRight">
                      <p class="p_title">现场签到</p>
                      <div class="div_content">
                        <span>所属场景 :</span>
                        <span>素质活动</span>
                        <img class="right-img" src="@/assets/img/you.png" alt="">
                      </div>
                    </div>
                    <div class="vie_div2" @click="changeRight">
                      <p class="p_title">现场签到</p>
                      <div class="div_content">
                        <span>所属场景 :</span>
                        <span>素质活动</span>
                        <img class="right-img" src="@/assets/img/you.png" alt="">
                      </div>
                    </div>
                    <div class="vie_div2" @click="changeRight">
                      <p class="p_title">现场签到</p>
                      <div class="div_content">
                        <span>所属场景 :</span>
                        <span>素质活动</span>
                        <img class="right-img" src="@/assets/img/you.png" alt="">
                      </div>
                    </div>
                    <div class="vie_div2" @click="changeRight">
                      <p class="p_title">现场签到</p>
                      <div class="div_content">
                        <span>所属场景 :</span>
                        <span>素质活动</span>
                        <img class="right-img" src="@/assets/img/you.png" alt="">
                      </div>
                    </div>
                    <div class="vie_div2" @click="changeRight">
                      <p class="p_title">现场签到</p>
                      <div class="div_content">
                        <span>所属场景 :</span>
                        <span>素质活动</span>
                        <img class="right-img" src="@/assets/img/you.png" alt="">
                      </div>
                    </div>
                    <div class="vie_div2" @click="changeRight">
                      <p class="p_title">现场签到</p>
                      <div class="div_content">
                        <span>所属场景 :</span>
                        <span>素质活动</span>
                        <img class="right-img" src="@/assets/img/you.png" alt="">
                      </div>
                    </div>
                </div>
                <div v-show="!rightShow">
                    <div class="two_title">
                       现场签到记录
                    </div>
                    <div class="two_content">
                        <div class="two_tab">
                            <div v-for="(item,index) in tabCon" :key="index" :class="index==index02?'tab_selected':''" @click="tabConS(index)">{{ item }}</div>
                        </div>
                        <div class="conTab1" v-show="index02==0">
                            <div class="change_tit">
                              <div>
                                <input type="checkbox" id="qb" v-model="checkAll" @change="all">
                                <label for="qb">全选</label>
                              </div>
                              <div @click="goSing">加分</div>
                            </div>
                            <div class="check_div" v-for="(item,index) in radio" :key="index">
                                <input type="checkbox" :id="'check'+index" v-model="item.check" @change="check">
                                <label :for="'check'+index">{{ item.name }}</label>
                            </div>
                        </div>
                        <div class="conTab2" v-show="index02==1">
                            <div class="last_div">
                                <img src="@/assets/img/morenPic.png" alt="">
                                <div>
                                    <p>王强</p>
                                    <p>三年级二班</p>
                                </div>
                            </div>
                            <div class="last_div">
                                <img src="@/assets/img/morenPic.png" alt="">
                                <div>
                                    <p>李萌</p>
                                    <p>三年级二班</p>
                                </div>
                            </div>
                            <div class="last_div">
                                <img src="@/assets/img/morenPic.png" alt="">
                                <div>
                                    <p>向东旭</p>
                                    <p>三年级二班</p>
                                </div>
                            </div>
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
                    name:'创建签到',
                    num:'0'
                },
                {
                    name:'我的签到',
                    num:'0'
                }
            ],
          index: 0,
          index01:3,
          index02:0,
          time:['30秒','1分钟','3分钟','五分钟'],
          tabCon:['已经签到( 18 )','未签到( 2 )'],
          checkAll:false,
          radio:[
            {
              name:'卢同学签到成功',
              check:false
            },
            {
              name:'李珊签到成功',
              check:false
            },
            {
              name:'王强签到成功',
              check:false
            },
            {
              name:'李萌签到成功',
              check:false
            },
            {
              name:'向东旭签到成功',
              check:false
            },
            {
              name:'陈导签到成功',
              check:false
            },
            {
              name:'李明签到成功',
              check:false
            },
          ],
          rightShow:true,
        }
    },
    mounted(){
    },
    created(){

    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        //加分
        goSing(){
            this.$router.push({path: '/singNut'});
        },
        alta(){
          this.$vux.toast.text('创建成功', 'middle')
        },
        changeRight(){
          this.rightShow=!this.rightShow
        },
        tabIndex(target,nodeList){
          for(let i=0;i<nodeList.length;i++){
            if(target===nodeList[i]){
              this.index = i;
            }
          }
        },
        qhSpan(index){
          this.index01=index
        },
        tabConS(index){
          this.index02=index
        },
        all(){
          if(this.checkAll){
            this.radio.forEach(function(el){
              el.check=true
            })
          }else{
            this.radio.forEach(function(el){
              el.check=false
            })
          }
        },
        check(){
          var zt = true
          this.radio.forEach(function(el){
            if(el.check==false){
              zt=false
            }
          })
          if(zt){
            this.checkAll=true
          }else{
            this.checkAll=false
          }
        },
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
.vie_div2{border-top: 1px solid #f2f2f2;/*no*/border-bottom: 1px solid #f2f2f2;/*no*/padding:20px 30px;background:#fff;position: relative;margin-bottom:20px;}
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

</style>
