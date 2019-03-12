<template>
    <div>
        <div class="top-back" v-show="show1">
            <img class="img-1" v-show="!noback" src="../../assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title"><i class="icon iconfont ripple" v-if="(taskOpen==2)" :class="(taskIcon==0)?'icon-xiaoxikaiqi':(taskOpen==1)?'icon-xiaoxiguanbi':'icon-xiaoxi-weishezhiqian'" @click="qhWei"></i>{{ title }}</div>
            <router-link :to="'/pocessLiteracy/'+uid+'/'+id+'/'+'gc'">
                <span class="top_right_span ripple">
                    <i class="icon iconfont icon-hexinsuyang"></i>
                    <strong>{{ score>9999?'9999+':score }}</strong>
                </span>
            </router-link>
        </div>
        <div style="height:1.133333rem;" v-show="show1">
            <sticky :check-sticky-support="false" :offset="0">
                <div class="tab-con-change">
                    <tab :line-width=2 :scroll-threshold="5" class="footer-tab" >
                        <tab-item v-for="(items,index) in tabTitle" :key="index" @on-item-click="onItemClick" :selected="index==0"
                        v-if="(index==4&&fj.length>0)||(index!=4)"  class="ripple">{{ items }}</tab-item>
                    </tab>
                </div>
            </sticky>
        </div>

        <div v-show="show1">
                <!-- 任务 -->
            <div class="task" v-show="index == 0">
                <template v-for="item in rw">
                    <!-- <router-link :to="(item.statusName=='未通过'||item.statusName=='未完成'||item.statusName=='进行中')||item.statusName=='尚未开始'?'/studentTaskDetails/'+uid+'/'+item.id+'/'+fmtDate(item.joinstarttime)+'/'+fmtDate(item.joinendtime)+'/'+item.formsid:'/studentTaskDetailsCompleted/'+uid+'/'+item.id+'/'+fmtDate(item.joinstarttime)+'/'+fmtDate(item.joinendtime)+'/'+item.formsid"> -->
                    <div @click="newlink(item)"  class="ripple">
                    <!-- <div @click="newlink(item.isRelateStu,item.id,item.joinstarttime,item.joinendtime)"  class="ripple"> -->
                        <img class="first-img" src="../../assets/img/ico_task.png" alt="" v-if="item.isRelateStu">
                        <img class="first-img" src="../../assets/img/yiwancheng.png" v-else-if="item.statusName=='已完成'">
                        <img class="first-img" src="../../assets/img/jinxingzhong.png" v-else-if="item.statusName=='未完成'">
                        <img class="first-img" src="../../assets/img/daishenhe_t.png" v-else-if="item.statusName=='待审核'">
                        <img class="first-img" src="../../assets/img/yibohui_t.png" v-else-if="item.statusName=='未通过'">
                        <img class="first-img" src="../../assets/img/yijieshu.png" v-else-if="item.statusName=='已经结束'">
                        <img class="first-img" src="../../assets/img/weikaiqi.png" v-else-if="item.statusName=='尚未开始'">
                        <img class="first-img" src="../../assets/img/jinxingzhong.png" v-else-if="item.statusName=='进行中'">
                        
                        <div class="ne-div">
                            <p>{{ item.title }}</p>
                            <p>
                                {{ 
                                    item.statusName=='已完成'?'完成时间 :':
                                (item.statusName=='未完成'||item.statusName=='进行中')&&item.jointimetype==0?'不限制':
                                (item.statusName=='未完成'||item.statusName=='进行中')&&item.jointimetype==2?'剩余时间 :':
                                item.statusName=='待审核'?'提交时间 :':
                                item.statusName=='未通过'?'审核时间 :':
                                item.statusName=='已经结束'&&item.jointimetype==2?'结束时间 :':
                                item.statusName=='尚未开始'&&item.jointimetype==2?'开启时间:':'' }}  
                                <span>
                                    {{ 
                                    (item.statusName=='尚未开始'&&item.jointimetype==2&&item.limittimes.length==0)?item.joinstarttime:
                                    (item.statusName=='尚未开始'&&item.jointimetype==2&&item.limittimes.length>0)?formatDuringNextDay(item.limittimes):
                                    item.statusName=='已完成'||item.statusName=='待审核'||item.statusName=='未通过'? item.joinStartTimeShow:
                                    item.statusName=='已经结束'&&item.jointimetype==2?item.joinendtime:
                                    (item.statusName=='未完成'||item.statusName=='进行中')&&item.jointimetype==2&&item.limittimes.length==0?formatDuring(item.joinendtime):
                                    (item.statusName=='未完成'||item.statusName=='进行中')&&item.jointimetype==2&&item.limittimes.length>0?formatDuringToday(item.limittimes):''
                                    }}
                                </span> 
                                </p>
                            <img class="back-a" src="../../assets/img/you.png" alt="">
                        </div>
                    </div>
                </template>
                <div class="no-msg-div" v-if="rw.length<=0">
                    <img src="../../assets/img/zanwushuju.png" alt="">
                    <span>暂无数据</span>
                </div>
            </div>


            <!-- 记录 -->
            <div class="dynamic" v-show="index == 1">
                <div class="t_book ripple" @click="jlBtn">
                    <p>此刻你想说点什么?</p>
                    <i class="icon iconfont icon-zhaopian"></i>
                </div>
                <template>
                    <div class="dynameic-child"  v-for="tw in jl">
                        <div class="dy-title">
                            <img class="head-img" v-if="tw.pic!=''&&tw.pic!=null" :src="tw.pic" alt="">
                            <img class="head-img" v-if="tw.pic==''||tw.pic==null" src="../../assets/img/daishenhe.png" alt="">
                            <strong>
                                <span>{{tw.stuname}}</span>
                                <span>{{tw.timeShow}}</span>
                            </strong>
                            <img @click="deltabProp(tw.id)" class="del-img" v-if="tw.stuid==meId" src="../../assets/img/shanchu.png" alt="">
                        </div>
                        <p class="comments-msg">{{tw.title}}</p>
                        <div class="dy-img-con">
                            <img v-for="(img,index) in tw.listImg" :key="index" :src="img" :preview="tw.id" alt="">
                        </div>
                        <div class="pl-dz">
                            <img  @click="zan(tw.id)" src="../../assets/img/weizan.png" alt=""  v-show="tw.iszhan=='N'">
                            <img  @click="zan(tw.id)" src="../../assets/img/weizan-1.png" alt=""  v-show="tw.iszhan=='Y'">
                            <img @click="tabProp(tw.id)" src="../../assets/img/pinglun.png" alt="">
                        </div>
                        <div class="display-con">
                            <div class="display-con-title" v-show="tw.zhans.length>0">
                                <img src="../../assets/img/yizan.png" alt="">
                                <span>
                                    <template v-for="(zan_,index) in tw.zhans">
                                        {{zan_}}
                                        <span v-if="index<(tw.zhans.length-1)">,</span>
                                    </template>
                                </span>
                            </div>
                            <div class="display-body" v-if="tw.listComment.length>0">
                                <p v-for="comment in tw.listComment">
                                    <span>{{comment.username}}:</span>{{comment.content}}
                                    <i class="icon iconfont icon-shanchu1" @click="removepl(comment.id)" v-if="comment.userid==meId"></i>
                                </p>
                            </div>
                            <div class="display-body" v-else>
                                <p>暂无评论</p>
                            </div>
                        </div>
                    </div>
                     <Infinite v-on:infinite="infiniteMore" ></Infinite>
                </template>
                <div class="no-msg-div" v-if="jl.length<=0">
                    <img src="../../assets/img/zanwushuju.png" alt="">
                    <span>暂无数据</span>
                </div>
            </div>

            <!-- 证书 -->
            <div class="certificate" v-show="index == 2">
                <template v-for="cer in zs">
                    <!-- <router-link 
                    :to="(cer.showName=='已经获得'||(cer.cometype==1&&cer.showName=='尚未获得'))? '/CertificateAcquisition/'+uid+'/'+cer.id :(cer.cometype==0&&cer.showName=='尚未获得')||(cer.cometype==0&&cer.showName=='未通过')?'/CertificateRUploadRejection/'+uid+'/'+cer.id:(cer.cometype==0&&cer.showName=='待审核')?'/CertificatePendingReview/'+uid+'/'+cer.id:''"> -->
                    <div @click="link1(cer.id)" class="ripple">
                        <img class="first-img" :src="cer.img" alt="">
                        <div class="ne-div">
                            <p>{{ cer.cerName }}</p>
                            <p>
                                <img src="../../assets/img/yihuode_s.png" alt="" v-if="(cer.cometype==0&&cer.showName=='已经获得')">
                                <img src="../../assets/img/weishangchuan_s.png" alt="" v-if="(cer.cometype==0&&cer.showName=='尚未获得')">
                                <img src="../../assets/img/yibohui_s.png" alt="" v-if="(cer.cometype==0&&cer.showName=='未通过')">
                                <img src="../../assets/img/daishenhe_s.png" alt="" v-if="(cer.cometype==0&&cer.showName=='待审核')">

                                <img src="../../assets/img/yihuode_s.png" alt="" v-if="(cer.cometype==1&&cer.showName=='已经获得')">
                                <img src="../../assets/img/weihuide_s.png" alt="" v-if="(cer.cometype==1&&cer.showName=='尚未获得')">
                            </p>
                            <img class="back-a" src="../../assets/img/you.png" alt="">
                        </div>
                    </div>
                </template>
                <div class="no-msg-div" v-if="zs.length<=0">
                    <img src="../../assets/img/zanwushuju.png" alt="">
                    <span>暂无数据</span>
                </div>
            </div>


            <!-- 笔记本 -->
            <div class="notebook" v-show="index == 3">
                <div class="t_book ripple" @click="ssCon1">
                    <p>你想在笔记里写点什么哪?</p>
                    <i class="icon iconfont icon-bianji"></i>
                </div>
                <template v-for="notbk in book">
                    <div class="bk_child ripple" @click="ssCon(notbk.content,notbk.id)">
                        <p>{{ notbk.content }}</p>
                    </div>
                    <p class="close_p">
                        <span>{{ notbk.mtime }}</span>
                        <i class="icon iconfont icon-shanchu1 ripple" @click="deltabProp1(notbk.id)"></i>
                    </p>
                </template>
                <div class="no-msg-div" v-if="book.length<=0">
                    <img src="../../assets/img/zanwushuju.png" alt="">
                    <span>暂无数据</span>
                </div>
            </div>

            <!--附件-->
            <div class="annex" v-show="index == 4">
                <template v-for="annex in fj">
                    <router-link to="/">
                        <div>
                            <p>{{annex.name}}</p>
                            <img class="back-a" src="../../assets/img/you.png" alt="">
                        </div>
                    </router-link>
                </template>
                <div class="no-msg-div" v-if="fj.length<=0">
                    <img src="../../assets/img/zanwushuju.png" alt="">
                    <span>暂无数据</span>
                </div>
            </div>

            <div v-transfer-dom>
                <popup v-model="show10" position="bottom">
                    <div class="position-vertical-demo inputParent">
                        <input type="text" placeholder="评论(最多可输入200字)" maxlength="200" onkeyup="this.value=this.value.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,'')" v-bind="discuss" ref="inputText" @keyup.enter="adddiscuss">
                        <span @click="adddiscuss">发送</span>
                    </div>
                </popup>
            </div>
            <div v-transfer-dom class="styleC">
                <confirm v-model="show"
                :title="propTile"
                @on-cancel="onCancel"
                @on-confirm="onConfirm"
                @on-show="onShow"
                @on-hide="onHide">
                </confirm>
            </div>
            <div v-transfer-dom class="styleC">
                <confirm v-model="showProp"
                title="只有加入过程才能继续操作哦"
                @on-cancel="onCancelProp"
                @on-confirm="onConfirmProp"
                confirm-text="我再看看"
                :cancel-text="(taskOpen==2)?'加入并接受通知':'立即加入'">
                </confirm>
            </div>
        </div>

        


        <!-- 添加评论(新建,查看) -->
        <NotebookDetails v-show="show11" @add="add" @closeSelect = "closeSelect" ref="child"></NotebookDetails>
        <ReleaseRecord v-if="show9" @closeSelect = "closeSelect" @add1="add1"></ReleaseRecord>

    </div>
</template>

<script>
import { Sticky, Tab, TabItem, TransferDom, Confirm, Popup  } from "vux";
import qs from 'qs';
import {formatDate} from '../../plugins/formatDate.js';
import NotebookDetails from '@/components/stu/NotebookDetails'
import ReleaseRecord from '@/components/stu/ReleaseRecord'
import Infinite from "@/components/vue-scroll";



export default {
    directives: {
        TransferDom
    },
    components:{
        Sticky,
        Tab, 
        TabItem,
        Confirm,
        Popup,
        Infinite,
        NotebookDetails,
        ReleaseRecord
    },
    data(){
        return{
            uid:this.$route.params.uid,
            id:this.$route.params.id,
            back:this.$route.params.back,
            index:0,
            lastId:0,
            isaction:true,
            taskOpen:'',
            taskIcon:null,
            title:'',
            score:'',
            bjcon:'',
            bjconId:'',
            rw:[],
            jl:[],
            zs:[],
            book:[],
            fj:[],
            
            discussId:0,
            show11:false,
            show10:false,
            show9:false,
            discuss:null,
            isControl:null,


            show:false,
            show1:true,
            show2:true,
            tabTitle:['任务','记录','证书','笔记本','附件'],
            bianji:false,
            propTile:'',
            showProp:false,

            meId:''
        }
    },
    created(){
        this.loadData()
        this.loadData1()
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return  formatDate(date, "yyyy-MM-dd hh:mm");
        }
    },
    computed: {
        noback:function(){
            return this.back == 1 ? true : false;
        }
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        formatDuring(mss1){
            var time1 = mss1.replace(/-/g,'/');  // 月、日、时、分、秒如果不满两位数可不带0.
            var d1 = new Date(time1);  // 将指定日期转换为标准日期格式。Fri Dec 08 2017 20:05:30 GMT+0800 (中国标准时间)
            var c = d1.getTime()  // 将转换后的标准日期转换为时间戳。
            var d =Date.parse(new Date());

            var days = parseInt((c-d) / (1000 * 60 * 60 * 24));
            var hours = parseInt(((c-d) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = parseInt(((c-d) % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = ((c-d) % (1000 * 60)) / 1000;
            var a = days + " 天 " + hours + " 小时 " + minutes + " 分钟 "
            
            // console.log(a,'剩余时间')
            return a;
        },
        formatDuringToday(array){
            var _this = this;
            var date = new Date();
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            console.log(currentdate,'今天的日期')  
            console.log(array,'日期数组')  
            var conTime = null;
            array.forEach(function(el,index){
                if(el==currentdate){
                    conTime = _this.formatDuring(el+' 23:59:59')
                    console.log(conTime)
                }
            })
            return conTime
        },
        formatDuringNextDay(array){
            var _this = this;
            var d =Date.parse(new Date());
            console.log(d,'当前的时间戳')
            var con=null
            var indexC=null
            var stat=true
            array.forEach(function(el,index){
                if(stat){
                    var time1 = el.replace(/-/g,'/');  // 月、日、时、分、秒如果不满两位数可不带0.
                    var d1 = new Date(time1);  // 将指定日期转换为标准日期格式。Fri Dec 08 2017 20:05:30 GMT+0800 (中国标准时间)
                    var c = d1.getTime()  // 将转换后的标准日期转换为时间戳。
                    if(d<c){
                        indexC = index;
                        stat = false;
                    }
                }
            })
            con=array[indexC]+' 00:00:00'
            return con
        },
        // fmtDate(inputTime) {  
        //     var date = new Date(inputTime);
        //     var y = date.getFullYear();  
        //     var m = date.getMonth() + 1;  
        //     m = m < 10 ? ('0' + m) : m;  
        //     var d = date.getDate();  
        //     d = d < 10 ? ('0' + d) : d;  
        //     var h = date.getHours();
        //     h = h < 10 ? ('0' + h) : h;
        //     var minute = date.getMinutes();
        //     var second = date.getSeconds();
        //     minute = minute < 10 ? ('0' + minute) : minute;  
        //     second = second < 10 ? ('0' + second) : second; 
        //     return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
        // },
        loadData(){
          var _self = this;
          this.$axios.post( process.env.API_ROOT+"app/stu/v1/itemview",
            qs.stringify({
              uid:_self.$route.params.uid,
              id:_self.$route.params.id
            })
          ).then(function(res){
            //   console.log(res)
            _self.taskOpen = res.data.sceneItemInfo.taskupdatenoticetype;
            _self.taskIcon = res.data.accepttype;
            _self.title = res.data.sceneItemInfo.title;
            _self.score = res.data.sceneItemInfo.scorecount;
            _self.rw = res.data.listTask;
            // console.log(_self.rw)
            _self.zs = res.data.listCer;
            _self.book = res.data.listNote;
            _self.isControl = res.data.sceneItemInfo.isCanyu;
            
            _self.meId=localStorage.mz

          }).catch(function(err){
            _self.errorUtil(err);
          })
        },

        infiniteMore($state) {
          this.state = $state;
          this.querytw();
        },
        querytw(){
        var _self = this;
        if(!_self.isaction){
          if(_self.state!=null){
            _self.state.loaded();
          }
          return false;
        }
        _self.isaction=false;

        this.$axios.post( process.env.API_ROOT+"app/stu/v1/queryTw",
          qs.stringify({
              uid:_self.$route.params.uid,
              id:_self.$route.params.id,
              lastId:_self.lastId
          })
        ).then(function(res){

          _self.lastId = _self.lastId+1;
          res.data.listMap.forEach(function(item) {
            _self.jl.push(item);
            _self.lastId = item.id;
          });
          _self.$nextTick(function(){
            if(_self.state!=null){
              _self.state.loaded();
            }
            if(res.data.listMap.length==10){
              _self.isaction=true;
            }
            if(res.data.listMap.length<10){
              if(_self.state!=null){
                _self.state.completed("没有更多数据了");
              }
            }
          });
        }).catch(function(err){
          _self.errorUtil(err);
        })

      },

        loadData1(){
          var _self = this;
          this.$axios.post( process.env.API_ROOT+"app/stu/v1/queryTw",
            qs.stringify({
              uid:_self.$route.params.uid,
              id:_self.$route.params.id,
              lastId:0
            })
          ).then(function(res){
              _self.jl=res.data.listMap;
              if(res.data.listMap.length>0){
                   _self.lastId = res.data.listMap[res.data.listMap.length-1].id;
              }
                console.log(_self.jl)
                if(_self.jl.length>0&&_self.jl[0].timeShow=='时间有问题'){
                    _self.jl[0].timeShow='刚刚更新'
                }
                _self.$previewRefresh()
          }).catch(function(err){
            _self.errorUtil(err);
          })
        },
        deltabProp (id){
            this.show=!this.show
            this.discussId=id;
            this.propTile='确定要删除该条记录吗?'
        },
        // 任务详情跳转
        // link(id,str,end){
        //     var _self = this;
        //     if(_self.isControl){
        //         this.$router.push({path: '/studentTaskDetails/'+_self.uid+'/'+id+'/'+str+'/'+end+'/'+0});
        //     }else{
        //         this.showProp=!this.showProp
        //     }
        // },
        // 任务跳转至学生列表
        // newlink(bool,id,formsid,schoolid,str,end){
        newlink(task){
            if(this.isControl){
                if(!task.isRelateStu){
                    this.$router.push({path: '/studentTaskDetails/'+this.uid+'/'+task.id+'/'+task.joinstarttime+'/'+task.joinendtime+'/'+0});
                }else{
                    //列表式
                    this.$router.push({path: '/stuList2/'+this.uid+'/'+task.id+'/'+task.formsid+'/'+task.schoolid+'/'+null});
                    //此处需要添加showflag的判断-卡片式 -列表式
                    // this.$router.push({path: '/stuList2Card/'+this.uid+'/'+task.id+'/'+task.formsid+'/'+task.schoolid});
                }
                
            }else{
                this.showProp=!this.showProp
            }
        },
        link1(id){
            var _self = this;
            if(_self.isControl){
                this.$router.push({path: '/CertificateRUploadRejection/'+_self.uid+'/'+id});
            }else{
                this.showProp=!this.showProp
            }
        },
        // 点赞
        zan(id){
          var _self = this;
          _self.$axios.post( process.env.API_ROOT+"app/stu/v1/zhan",
            qs.stringify({
              uid:_self.$route.params.uid,
              id:id
            })
          ).then(function(res){
            _self.loadData1()
          }).catch(function(err){
            _self.errorUtil(err);
          })

        },
        // 评论
        tabProp (id){
            this.show10=!this.show10;
            this.discussId=id;
            this.discuss = '';
            this.$nextTick(function () {
                // DOM is now updated
                // `this` is bound to the current instance
                this.$refs.inputText.value='';
                this.$refs.inputText.focus();
            })
        },
        // 发送评论
        adddiscuss(){
             var discuss =  this.$refs.inputText.value;
             if(!discuss){
               this.$vux.toast.show({type: 'warn',width:'10em', text: "请填写评论"});
               return false
             }

              var length = discuss.length;
              if (length > 200) {
                this.$vux.toast.show({type: 'warn',width:'10em', text: "字数超过限制"});
                return false
              }

             var _self = this;
            _self.$axios.post( process.env.API_ROOT+"app/stu/v1/savecomment",
              qs.stringify({
                uid:_self.$route.params.uid,
                scenefeelingid:_self.discussId,
                content:discuss,
              })
            ).then(function(res){
              _self.show10=!_self.show10;
              _self.jl.forEach(function(item) {
                if(item.id==_self.discussId){
                  item.listComment.push( res.data);
                }
              });

            }).catch(function(err){
              _self.errorUtil(err);
            })


        },
        // 删除评论
        removepl(id){
            var  _self = this;
            _self.$axios.post( process.env.API_ROOT+"app/stu/v1/delComment",
                qs.stringify({
                    uid:_self.$route.params.uid,
                    id:id
                })
            ).then(function(res){
                _self.$vux.toast.show({type: 'success',text:"删除成功" });
                _self.loadData1();
                
            }).catch(function(err){
                _self.errorUtil(err);
            })
        },
        onItemClick (index) {
            this.index=index
        },
        // 任务(加入过程弹窗)
        onCancelProp (){
            var _self = this;
            this.$axios.post( process.env.API_ROOT+"app/stu/v1/joinItem",
                qs.stringify({
                    uid:_self.$route.params.uid,
                    sceneitemid:_self.$route.params.id,
                })
            ).then(function(res){
                if(_self.taskOpen==2){
                    _self.qhWei()
                }
                _self.loadData();
            }).catch(function(err){
                _self.errorUtil(err);
            })
        },
        onConfirmProp (){
        },


        onCancel (){
        },
        // 删除记录||删除笔记
        onConfirm (){
            var  _self = this;
            if(_self.propTile=='确定要删除该条记录吗?'){
                var url = "app/stu/v1/deltw"
            }
            if(_self.propTile=='确定要删除该条笔记吗?'){
                var url = "app/stu/v1/delnote"
            }
            console.log(url)

            _self.$axios.post( process.env.API_ROOT+url,
                qs.stringify({
                    uid:_self.$route.params.uid,
                    id:_self.discussId
                })
            ).then(function(res){
                if(_self.propTile=='确定要删除该条记录吗?'){
                    _self.$vux.toast.show({type: 'success',text:"删除成功" });
                    _self.loadData1()
                }
                if(_self.propTile=='确定要删除该条笔记吗?'){
                    _self.$vux.toast.show({type: 'success',text:"删除成功" });
                    _self.loadData()
                }

            }).catch(function(err){
                _self.errorUtil(err);
            })
        },
        // 笔记本
        
        ssCon(con,id){
            this.show1=!this.show1
            this.show11=!this.show11
            this.$refs.child.lod(con)
            this.bianji=true
            this.bjconId=id
        },
        ssCon1(){
            this.show1=!this.show1
            this.show11=!this.show11
            this.bianji=false
            this.$refs.child.lod('')
            this.bjconId=0

        },
        // 记录发布按钮
        jlBtn(){
            this.show1=!this.show1
            this.show9=!this.show9
        },
        closeSelect(){
            this.show1 =true;
            this.show9=false
            this.show11=false
        },
        add1(msg,images){
            var _self = this;
            this.$axios.post( process.env.API_ROOT+"app/stu/v1/doaddfeeling",
                qs.stringify({
                    uid:_self.$route.params.uid,
                    id:_self.$route.params.id,
                    text:msg,
                    imgs:images,
                })
            ).then(function(res){
                _self.show1 =true;
                _self.show9 =false;
                _self.$vux.toast.show({type: 'success',text:"成功" });
                _self.loadData1();
            }).catch(function(err){
                _self.errorUtil(err);
            })
        },
        add(msg){
            var _self = this;
            if(!msg){
                _self.$vux.toast.show({type: 'warn',text:"不能为空" });
            }else{
                this.$axios.post( process.env.API_ROOT+"app/stu/v1/savenote",
                qs.stringify({
                    uid:_self.$route.params.uid,
                    id:_self.bjconId,
                    sceneitemid:_self.$route.params.id,
                    text:msg
                })
                ).then(function(res){
                _self.show1 =true;
                _self.show11 =false;
                _self.$vux.toast.show({type: 'success',text:"成功" });
                _self.loadData();

                }).catch(function(err){
                _self.errorUtil(err);
                })
            }
        },
        // 删除笔记
        deltabProp1 (id){
            this.show=!this.show
            this.discussId=id;
            this.propTile='确定要删除该条笔记吗?'
        },
        // 设置微信消息开启关闭
        qhWei(){
            var _self = this;
            this.$axios.post( process.env.API_ROOT+"app/stu/v1/setWxMessage",
                qs.stringify({
                    uid:_self.$route.params.uid,
                    sceneitemid:_self.$route.params.id,
                })
                ).then(function(res){
                    _self.loadData();
                }).catch(function(err){
                _self.errorUtil(err);
            })
        },
        onShow (){
            // alert("弹框显示")
        },
        onHide (){
            // alert("弹框隐藏")
        }
    }
}
</script>

<style>
    .vux-x-dialog .weui-dialog{max-width:520px;-webkit-transform: translate(0,0);transform: translate(0,0);left:0;top:0;}
    .vux-x-dialog .weui-dialog__bd {padding: 0 1.6em .8em;min-height: 40px;font-size: 15px;line-height: 1.3;word-wrap: break-word;word-break: break-all;color: #999;}
    .tab-con-change .vux-tab{height: 85px;background: #fff;} 
    .tab-con-change .vux-tab-con-changetainer,.tab-con-change .vux-tab-wrap{height: 85px;padding-top: 0;}
    .tab-con-change .vux-tab .vux-tab-item {font-size: 28px;line-height: 85px;color: #646464;font-weight: 600;}
    .tab-con-change .vux-tab-container{height:85px;}
    .tab-con-change .footer-tab .vux-tab-container .scrollable > div{flex: auto;}
    .footer-tab .vux-tab-container .vux-tab .vux-tab-selected{color:#01c269!important;border-bottom-color: #01c269;}

    .vux-x-dialog .weui-dialog{max-width:520px;}
    .vux-x-dialog .weui-dialog__title {font-size: 28px;color: #444;}
    .vux-x-dialog .weui-dialog__ft {line-height: 65px;}

    
    .styleC .weui-dialog__ft .weui-dialog__btn_default {font-size: 28px;color: #fff;background-color: #11c772;}
    .styleC .weui-dialog__ft .weui-dialog__btn_primary {font-size: 28px;color: #fff;background-color: #8f8e8e;}
</style>

<style scoped>
    .top-back {text-align: center;font-size: 36px;color: #444;padding:20px;background-color: #fff;position: relative;}
    .top-back .img-1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
    .top-back .n_title > i{color: #16c775;font-weight: 600;}
    .top_right_span{position: absolute;right: 20px;top: 20px}
    .top_right_span strong{font-weight: 400;font-size: 28px;color: #444;display: inline-block;}
    .top_right_span i{color: #16c775;}
    .n_title{width:50%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}




    .task{position: relative;border-top:1px solid #f4f3f3;/*no*/}
    .task >div{padding: 25px;text-align: left;color: #444;overflow: hidden;border-bottom: 1px solid #f4f3f3;/*no*/margin-bottom: 30px;position: relative;}
    .task >div:last-child{border-bottom:none;}
    .task .first-img {width: 78px;height: 78px;float: left;}
    .task .ne-div{float: left;height: 78px;margin-left: 20px;}
    .task .ne-div p:first-child{position: relative;font-size: 28px;}
    .task .ne-div p:nth-child(2){font-size: 26px;}
    .task .back-a{position: absolute;right: 20px;top: 50px;width: 24px;height: 24px;}


    


    .dynamic{position: relative;border-top:1px solid #f4f3f3;/*no*/}
    .dy-title {text-align: left;overflow: hidden;padding: 5px 0;}
    .head-img{float: left;width: 61px;height:61px;border-radius:100%;}
    .del-img{float: right;width: 24px;height:24px;margin-top: 16px;}
    .dy-title strong{float: left;width: auto;height: 61px;font-weight: 400;margin-left: 10px;}
    .dy-title span{display:block;line-height: 25.5px;}
    .dy-title span:first-child{font-size: 28px;color: #444;margin-bottom: 10px}
    .dy-title span:last-child{font-size: 24px;color: #999898;}
    .comments-msg{text-align: left;font-size: 28px;color: #444;padding: 10px 0;word-wrap: break-word;}
    .dy-img-con {text-align: left;}
    .dy-img-con img{width: 220px;height: 160px;margin-right: 10px;}
    .inputParent{padding: 20px 0;position: relative;}
    .inputParent input {display:block;width: 70%;margin-left: 5%;height: 40px;padding: 5px;font-size:28px;}
    .inputParent span {width: 10%;height: 40px;line-height: 40px;padding: 6.5px;position: absolute;right:8%;top:20px;border:1px solid #16c775;/*no*/text-align:center;background:#16c775;color:#fff;border-radius:3px;/*no*/}
    .pl-dz{text-align: right;padding-bottom: 10px;border-bottom: 1px solid #f4f3f3;/*no*/}
    .pl-dz img {widows: 30px;height: 30px;margin-left: 30px}
    .display-con{padding-top:10px;}
    .display-con-title{text-align: left;font-size: 28px;color: #444;clear: both;}
    .display-con-title img {widows: 40px;height: 40px;float: left;}
    .display-con-title > span {display:block;min-height: 40px;line-height: 46px;margin-left: 10px;}
    .display-body{text-align: left;font-size: 28px;color: #444;padding-top:10px;}
    .display-body > p {word-wrap:break-word}
    .display-body > p span {float: left;}
    .display-body span{color: #2683cf;margin-right: 10px;}
    .display-body i{font-size: 28px;color: #d5d3d3;margin-left:40px;}
    .display-body strong{color: #444;font-weight: 400;margin-right: 10px;}
    .dynameic-child{padding:25px 20px 25px 20px;border-bottom: 5px solid #f4f3f3;/*no*/}
    





    .certificate{position: relative;border-top:1px solid #f4f3f3;/*no*/}
    .certificate >div{padding: 20px;text-align: left;color: #444;overflow: hidden;border-bottom: 1px solid #f4f3f3;/*no*/margin-bottom: 30px;position: relative;}
    .certificate >div:last-child{border-bottom:none;}
    .certificate .first-img {width: 160px;height: 125px;float: left;}
    .certificate .ne-div{float: left;height: 125px;margin-left: 20px;}
    .certificate .ne-div p:first-child{position: relative;font-size: 28px;margin-top: 20px;}
    .certificate .ne-div p:nth-child(2) img{width:96px;}
    .certificate .back-a{position: absolute;right: 20px;top: 70px;width: 24px;height: 24px;}




    .notebook{position: relative;border-top:1px solid #f4f3f3;/*no*/}
    .notebook div{padding: 20px;}
    .t_book{padding: 10px 20px!important;border-bottom:5px solid #f4f4f4;/*no*/}  
    .t_book > p{font-size: 26px;color: #8f8e8e;}
    .t_book > i{font-size: 46px;color: #2ed184;}
    .notebook .bk_child p:first-child{font-size: 28px;color: #444;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp:3;overflow: hidden;}
    .notebook .close_p{position: relative;padding: 0 20px 20px 20px;border-bottom:1px solid #f4f4f4;/*no*/}
    .notebook .close_p span{font-size: 26px;color: #8f8e8e;}
    .notebook .close_p i{position: absolute;right: 10px;top:0;font-size: 30px;color: #d5d3d3;}




    .annex{position: relative;border-top:1px solid #f4f3f3;/*no*/}
    .annex a >div{padding: 20px;text-align: left;color: #444;position: relative;border-bottom: 1px solid #f4f3f3;/*no*/}
    .annex a >div p{font-size: 26px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;padding: 20px}
    .annex .back-a{position: absolute;right: 20px;top: 45px;width: 24px;height: 24px;}



    .no-msg-div{color: #999!important;text-align: center;line-height: 64px;margin-top: 50px;text-align:center!important;}
    .no-msg-div img{width: 70px;height: 70px;display: inline-block;vertical-align: middle}
    .no-msg-div span{height: 70px;display: inline-block;vertical-align: middle;font-size:28px;}
</style>
