<template>
    <div>
        <div class="top-back">
            <img class="img-1" v-show="!noback" src="../../assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ info.title }}</div>

            <router-link :to="'/pocessLiteracy/'+uid+'/'+id+'/'+'cj'">
                <span class="top_right_span ripple">
                    <i class="icon iconfont icon-hexinsuyang"></i>
                    <strong>{{ syNum>99999?'99999+':syNum }}</strong>
                </span>
            </router-link>
            <p v-if="info.manageOrgName!=null">
                管理部门:
                <span>{{ info.manageOrgName }}</span>
            </p>
        </div>
        <!-- <div class="fraction_div">
            <div class="sy_div">
                <p>我的素养分</p>
                <div :style="'width:'+ (syPercentage<10?10:syPercentage) +'%;'" ><span>{{ syNum }}</span></div>
            </div>
            <div class="class_div">
                <p>班级平均分</p>
                <div :style="'width:'+ classPercentage +'%;'" ><span>{{ classNum }}</span></div>
            </div>
        </div> -->

        <div class="tz_partent ripple" @click="goTodo">
            <div class="notice_div">
                <div class="notice_left_div">
                    <img src="../../assets/img/daiban.png" alt="">
                    <p>待办</p>
                </div>
                <div class="scroll-wrap">
                    <ul class="scroll-content" v-if="msg.length>0" :style="{ top }">
                        <li v-for="item in msg" :key="item.index"><span>●</span>{{item.stateMsg}}</li >
                    </ul>
                    <p  v-if="msg.length<=0">今日事今日毕，看好你哦。</p>
                </div>
                <img class="right_img" src="../../assets/img/you.png" alt="">
                <span class="notice-num" v-if="msg.length>0">{{ msgcount }}</span>
            </div>
        </div>

        <div class="flow_div clearfix">
            <div class="flow_child_div" v-for="(item,index) in flowCon"  @click="tabProp1(index)">
                <div class="left_di">
                    <span :class="(item.isControl)? (item.isCanyu)? 'green_span': 'blue_span' : '' "></span>
                </div>
                <div class="flow_content">
                    <p>{{ item.title }}</p>
                    <div v-if="!((item.isControl)&&(!item.isCanyu))">
                        <span>
                            <i class="icon iconfont icon-renwu"></i>任务
                        </span>
                        <strong>({{ item.taskcount }})</strong>
                    </div>
                    <div v-if="!((item.isControl)&&(!item.isCanyu))">
                        <span>
                            <i class="icon iconfont icon-hexinsuyang"></i>素养分
                        </span>
                        <strong>({{ item.scorecount }})</strong>
                    </div>
                    <div>
                        <span>
                            <i class="icon iconfont icon-techreport-"></i>记录
                        </span>
                        <strong>({{ item.feelcount }})</strong>
                    </div>
                    <img class="right_img" src="../../assets/img/you.png" alt="">
                </div>
            </div>
        </div>
        <div v-transfer-dom class="styleB">
            <confirm v-model="show"
            title="只有加入过程才能继续操作哦"
            @on-cancel="onCancel"
            @on-confirm="onConfirm"
            @on-show="onShow"
            @on-hide="onHide"
            confirm-text="我再看看"
            :cancel-text="(type==2)?'加入并接受通知':'立即加入'">
            </confirm>
        </div>
        <!-- <sceneVersion></sceneVersion> -->
    </div>
</template>

<script>
import { TransferDom, Confirm, Popup } from "vux";
import qs from 'qs';
// import sceneVersion from '@/page/stu/sceneVersion'


export default {
    directives: {
        TransferDom
    },
    components:{
        Confirm,
        Popup,
        // sceneVersion
    },
    data(){
        return{
            uid:this.$route.params.uid,
            id:this.$route.params.id,
            back:this.$route.params.back,
            info:[],
            type:'',
            childId:'',
            syNum:'',
            syZnum:'',
            msgcount:0,
            syPercentage:80,
            classNum:'',
            // classPercentage:'30',
            msg:[],
            activeIndex: 0,
            show:false,


            flowCon:[],


            // show1:false,
        }
    },
    created(){
        this.loadData()
    },
    computed: {
        top() {
            return - this.activeIndex * 0.666667 + 'rem';
        },
        noback:function(){
            return this.back == 1 ? true : false;
        }
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        goTodo(){

            this.$router.push({path: '/todolist/' + this.$route.params.uid+'/'+this.$route.params.id});
        },
        loadData(){
          var _self = this;
          this.$axios.post( process.env.API_ROOT+"app/stu/v1/sceneIndex",
            qs.stringify({
              uid:_self.$route.params.uid,
              id:_self.$route.params.id
            })
          ).then(function(res){
            _self.info = res.data.scene;
            _self.syNum= res.data.score;
            _self.syZnum= res.data.totalSumScore;
            _self.classNum= res.data.calssscore;
            _self.msg= res.data.todoList;
            _self.flowCon= res.data.sceneItemInfos;
            if(res.data.todosize>99){
                _self.msgcount='•••'
            }else{
                _self.msgcount= res.data.todosize;
            }

            console.log(res)
            console.log(_self.flowCon)

          }).catch(function(err){
            _self.errorUtil(err);
          })


        },
        tabProp1 (index){
            var _self = this;
            _self.type=_self.flowCon[index].taskupdatenoticetype
            _self.childId=_self.flowCon[index].id
            if((_self.flowCon[index].isControl) && (!_self.flowCon[index].isCanyu) ){
                this.show=!this.show
            }else{
                this.$router.push({path:'/ProcessDetails/'+this.uid+'/'+this.childId})
            }
        },
        onCancel (){
            var _self = this;
            console.log(_self.childId)
            this.$axios.post( process.env.API_ROOT+"app/stu/v1/joinItem",
                qs.stringify({
                    uid:_self.$route.params.uid,
                    sceneitemid:_self.childId
                })
            ).then(function(res){
                if(_self.type==2){
                    _self.$axios.post( process.env.API_ROOT+"app/stu/v1/setWxMessage",
                        qs.stringify({
                            uid:_self.$route.params.uid,
                            sceneitemid:_self.childId,
                        })
                        ).then(function(res){
                            console.log(res)
                        }).catch(function(err){
                        _self.errorUtil(err);
                    })
                }
                _self.$router.push({path:'/ProcessDetails/'+_self.uid+'/'+_self.childId})
            }).catch(function(err){
                _self.errorUtil(err);
            })


        },
        onConfirm (){
            var _self = this;
            this.$router.push({path:'/ProcessDetails/'+_self.uid+'/'+_self.childId})
        },
        onShow (){
            // alert("弹框显示")
        },
        onHide (){
            // alert("弹框隐藏")
        }
    },
    mounted() {
        setInterval(_ => {
            if(this.activeIndex < this.msg.length-1) {
                this.activeIndex += 1;
            } else {
                this.activeIndex = 0;
            }
        }, 1500);
    }
}
</script>

<style>
.vux-x-dialog .weui-dialog{max-width:520px;-webkit-transform: translate(0,0);transform: translate(0,0);left:0;top:0;}
.vux-x-dialog .weui-dialog__bd {padding: 0 1.6em .8em;min-height: 40px;font-size: 15px;line-height: 1.3;word-wrap: break-word;word-break: break-all;color: #999;}
.vux-x-dialog .weui-dialog__title {font-size: 28px;color: #444;}
.vux-x-dialog .weui-dialog__ft {line-height: 65px;}
.styleB .weui-dialog__ft .weui-dialog__btn_default {font-size: 28px;color: #fff;background-color: #11c772;}
.styleB .weui-dialog__ft .weui-dialog__btn_primary {font-size: 28px;color: #fff;background-color: #8f8e8e;}
</style>

<style scoped>
    .top-back {text-align: center;font-size: 36px;color: #444;padding:20px;background-color: #fff;position: fixed;top:0;left:0;right:0;z-index: 100;}
    .top-back > p{font-size: 26px;color: #444;text-align: left;padding-top: 10px;}
    .top-back .img-1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
    .notice-num {position: absolute;top: 0;right:-20px;border-radius: 100%;background-color: #ef1a00;color: #fff;width: 35px;height:35px;line-height:35px;text-align: center;font-size: 16px!important;}
    .n_title{width:50%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}


    .top_right_span{position: absolute;right: 20px;top: 20px}
    .top_right_span strong{font-weight: 400;font-size: 28px;color: #444;}
    .top_right_span i{color: #16c775;}


    .fraction_div {padding-bottom: 30px;}
    .fraction_div > div{margin: 0 30px;padding-top: 20px;}
    .fraction_div > div p{font-size: 28px;color: #444;}
    .fraction_div > div > div{margin: 20px 0;text-align: right;border-radius: 3px;/*no*/}
    .fraction_div span{color: #fff;padding: 0 20px;}
    .sy_div{border-bottom: 1px solid #f4f3f3;/*no*/}
    .sy_div > div{background: #16c775;}
    .class_div > div{background: #199ed8;}


    .tz_partent{border-top:5px solid #f4f4f4;/*no*/margin-top:150px;}
    li{list-style: none;}
    .notice_div{position: relative;height: 100px;padding: 30px 0;background: #fff;}
    .notice_div > div{float: left;}
    .notice_left_div{margin: 0 30px;}
    .notice_left_div img{width: 61px;}
    .notice_left_div p{text-align: center;font-size: 26px;color: #444;}
    .scroll-wrap{overflow: hidden;width: 70%;height: 100px;}
    .scroll-wrap > p{line-height:80px;font-size:26px;}
    .notice_div .right_img{top: 60px;}
    .scroll-content{position: relative;transition: top 0.5s;}
    .scroll-content li{line-height: 50px;color: #444;font-size: 26px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
    .scroll-content li span{color: #b42b1a;margin-right: 5px;font-size:13px;}
    .right_img{position: absolute;top: 50px;right: 30px;width: 24px;}
    .notice_div .notice-num{top:10px;right: 60px;}


    .flow_div{padding: 20px 30px 20px 10%;border-top:5px solid #f4f4f4;/*no*/}
    .flow_child_div{position: relative;margin-bottom: 20px;}
    .left_di{height: 195px;width: 1px;/*no*/background-color: #f4f3f3;position: absolute;left: -5%;top: -20px}
    .left_di span{background: #d7d7d7;border: 3px solid #e9e4e4;border-radius: 50%;position: absolute;top:80px;left:-10px;width: 20px;height:20px;}
    .left_di .green_span{background-color: #16c775;border-color: #bce1d0;}
    .left_di .blue_span{background-color: #199ed8;border-color: #86d1f2;}



    .flow_content{width: 93%;overflow: hidden;padding: 20px;border: 1px solid #f4f4f4;/*no*/position: relative}
    .flow_content > p{font-size: 28px;color: #444;margin-bottom: 10px;}
    .flow_content > div{float: left;width: 33%;font-size: 26px;}
    .flow_content > div i{color: #16c775;margin-right: 10px;}
    .flow_content > div strong{color: #16c775;font-size: 24px;}
    .flow_content .right_img{position: absolute;right: 10px;top: 60px;}
</style>
