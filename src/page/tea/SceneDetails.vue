<template>
    <div class="">
        <div class="top-back">
            <img class="img-1" src="@/assets/img/back_left_green.png" alt="" @click="goback">
            <router-link :to="'/EventDetails/'+this.uid+'/'+this.id" class="img-2">
                <img  src="@/assets/img/morezhankai.png" alt="">
            </router-link>
            <div class="n_title">{{ info.title }}</div>
        </div>
        <!-- <div class="progress-bar">
            <p class="progress-title">参与情况 (<span>{{ count2 }}</span>/<span>{{ count }}</span>) </p>
            <div class="progress-left">
                <div :style="'width:'+ count2/count*100 +'%;'">
                    <span :class="(count2/count*100)>=60?'csSpan':''">{{ (count2/count*100).toFixed(2) }}%</span>
                </div>
                <div class="progress-right">{{(100 - (count2/count*100)).toFixed(2) }}%</div>
            </div>
        </div> -->
        <div class="middle-div">
            <flexbox>
              <flexbox-item :span="1/2" >
                <!-- <router-link :to="'/upcoming/'+uid+'/'+info.id"> -->
                <div class="flex-demo" @click="zwKq">
                  <div class="flex-demo">
                    <div class="set-div">
                      <img src="@/assets/img/daishenhe.png" alt="">
                      <span class="notice-num" v-show="info.untreatedTask>0">
                      {{info.untreatedTask>99?'•••':info.untreatedTask }}
                      </span>
                    </div>
                    <p class="tit-p">待审核</p>
                  </div>
                </div>
                <!-- </router-link> -->
              </flexbox-item>
              <flexbox-item :span="1/2" >

                <div class="flex-demo" @click="sendNotice">
                  <div class="flex-demo">
                    <div class="set-div">
                      <img src="@/assets/img/tongzhi.png" alt="">
                      <!-- <span class="notice-num">0</span> -->
                    </div>
                    <p class="tit-p">通知</p>
                  </div>
                </div>
              </flexbox-item>
            </flexbox>
            <scroller lock-y scrollbar-x :bounce=false class="customize-bg" ref="kwt">
                  <div class="box1" ref="kw">
                      <div class="box1-item" v-for="(item,index) in items" :key="index" @click="toggle(index)" :class="{active:index==active}"  >
                          <p>{{ item.title }}</p>
                          <div class="sj-div"></div>
                      </div>
                  </div>
            </scroller>
        </div>
        <div style="height:1.133333rem;">
          <sticky :check-sticky-support="false" :offset="0">
              <div class="tab-con-change">
                  <tab :line-width=2 active-color='#16c7750' :scroll-threshold="countTab" class="footer-tab" >
                      <tab-item class="ripple" v-for="(items,ix) in tabTitle" :key="ix" @on-item-click="onItemClick" :selected="ix==index"
                        v-if="(ix==3&&nowsceneitem.sceneItemEnclosures.length>0)||(ix==2&&nowsceneitem.sceneItemCers.length>0)||(ix!=3&&ix!=2)">{{ items }}
                      </tab-item>
                  </tab>
              </div>
          </sticky>
        </div>

        <!--简介-->
        <!-- <div class="introduction" v-show="index == 0">
            <p>{{nowsceneitem.bz}}</p>

            <div class="no-msg-div" v-if="nowsceneitem.bz<=0">
              <img src="@/assets/img/zanwushuju.png" alt="">
              <span>暂无数据</span>
            </div>
        </div> -->


        <!--任务-->
        <div class="task" v-show="index == 0">
          <template v-for="task in nowsceneitem.listTask">

            <div @click="toview(task)" class="taskChild">
                <p>
                  <span v-if="task.teaDoType==3&&task.statusName=='进行中'" class="leftStatusSpan greenSpanstatus"></span>
                  <span v-if="task.teaDoType==3&&task.statusName=='已完成'" class="leftStatusSpan"></span>
                  <span v-if="task.teaDoType==3&&task.statusName=='未通过'" class="leftStatusSpan yellowSpanstatus"></span>
                  <span v-if="task.teaDoType==3&&task.statusName=='已经结束'" class="leftStatusSpan downSpanstatus"></span>
                  <span v-if="task.teaDoType==3&&task.statusName=='尚未开始'" class="leftStatusSpan noStartSpanstatus"></span>
                  <span v-if="task.teaDoType==3&&task.statusName=='待审核'" class="leftStatusSpan pendingSpanstatus"></span>
                  {{task.title}}
                </p>
                <p v-if="task.teaDoType==0||task.teaDoType==1">参与情况: <strong><span>{{task.doSignCount}}</span>/<span>{{task.doCount}}</span></strong> </p>
                <p>参与时间: <span>{{task | zt}}</span></p>
                <img class="back-a" :src="task.teaDoType==0?require('@/assets/img/chakanSim.png'):task.teaDoType==1?require('@/assets/img/shenheSim.png'):task.teaDoType==2?require('@/assets/img/chuliSim.png'):task.teaDoType==3?require('@/assets/img/tijiaoSim.png'):''" alt="">
                <img class="review" src="@/assets/img/shenhe.png" v-if="task.isCheck" alt="">
            </div>
          </template>
          <Infinite v-if="index == 0" v-on:infinite="infiniteMore2" ></Infinite>
          <div class="no-msg-div" v-if="nowsceneitem.listTask<=0">
              <img src="@/assets/img/zanwushuju.png" alt="">
              <span>暂无数据</span>
          </div>
        </div>

        <!--记录-->
        <div class="dynamic" v-show="index == 1">
          <template v-if="nowsceneitem.tws!=undefined">
            <div class="dynameic-child"  v-for="tw in nowsceneitem.tws.listMap">
                <div class="dy-title">
                    <img class="head-img" v-if="tw.pic!=''&&tw.pic!=null" :src="tw.pic" alt="">
                    <img class="head-img" v-if="tw.pic==''||tw.pic==null" src="@/assets/img/daishenhe.png" alt="">
                    <strong>
                        <span>{{tw.stuname}}</span>
                        <span>{{tw.timeShow}}</span>
                    </strong>
                    <img @click="deltabProp(tw.id)" class="del-img" src="@/assets/img/shanchu.png" alt="">
                </div>
                <p class="comments-msg">{{tw.title}}</p>
                <div class="dy-img-con">
                    <img v-for="(img,index) in tw.listImg" :key="index" :src="img" :preview="tw.id" alt="">
                </div>
                <div class="pl-dz">
                    <img  @click="zan(tw.id)" src="@/assets/img/weizan.png" alt=""  v-show="tw.iszhan=='N'">
                    <img  @click="zan(tw.id)" src="@/assets/img/weizan-1.png" alt=""  v-show="tw.iszhan=='Y'">
                    <img @click="tabProp(tw.id)" src="@/assets/img/pinglun.png" alt="">
                </div>
                <div class="display-con">
                    <div class="display-con-title" v-show="tw.zan.length>0">
                        <img src="@/assets/img/yizan.png" alt="">
                        <span>
                        <template v-for="(zan_,index) in tw.zan">{{zan_.username}}<span v-if="index<(tw.zan.length-1)">,</span></template>
                        </span>
                    </div>
                    <div class="display-body" v-if="tw.listComment.length>0">
                        <p v-for="comment in tw.listComment">
                          <span>{{comment.username}}:</span>{{comment.content}}
                          <i class="icon iconfont icon-shanchu1" @click="removepl(comment.id,tw.id)"></i>
                        </p>
                    </div>
                    <div class="display-body" v-else>
                      <p>暂无评论</p>
                    </div>
                </div>
            </div>
            <Infinite v-if="index == 1" v-on:infinite="infiniteMore" ></Infinite>
          </template>
          <div class="no-msg-div" v-if="nowsceneitem.tws.listMap<=0">
              <img src="@/assets/img/zanwushuju.png" alt="">
              <span>暂无数据</span>
          </div>
        </div>

       <!--证书-->
        <div class="certificate" v-show="index == 2">
          <template v-for="cer in nowsceneitem.sceneItemCers">
            <router-link :to="'/OutstandingStudentLeaders/'+uid+'/'+cer.id+'/'+cer.certificate.cometype">
                <div>
                    <img class="first-img" :src="cer.certificate.pic" alt="">
                    <div class="ne-div">
                        <p>{{cer.certificate.title}} <span class="notice-num" v-if="cer.cerCountO>0">{{cer.cerCountO>99?'•••':cer.cerCountO}}</span></p>
                        <p>已{{cer.certificate.cometype==0?'上传':'发放'}}: <span>{{cer.cerCount}}</span> </p>
                        <img class="back-a" src="@/assets/img/you.png" alt="">
                        <img class="review" src="@/assets/img/studentsc.png" alt="" v-if="cer.certificate.cometype==0">
                        <img class="review" src="@/assets/img/systemff.png" alt="" v-if="cer.certificate.cometype!=0">
                        <!-- ui没有出图暂时用这个图片 此处应该是 学生上传||系统发放-->
                    </div>
                </div>
            </router-link>
          </template>
          <div class="no-msg-div" v-if="nowsceneitem.sceneItemCers<=0">
              <img src="@/assets/img/zanwushuju.png" alt="">
              <span>暂无数据</span>
          </div>
        </div>

       <!--附件-->
        <div class="annex" v-show="index == 3">
            <template v-for="enclosures in nowsceneitem.sceneItemEnclosures">
                <div>
                    <p>{{enclosures.name}}</p>
                    <img class="back-a" src="@/assets/img/you.png" alt="">
                </div>
           </template>
           <div class="no-msg-div" v-if="nowsceneitem.sceneItemEnclosures<=0">
              <img src="@/assets/img/zanwushuju.png" alt="">
              <span>暂无数据</span>
          </div>
        </div>


        <div v-transfer-dom class="styleH">
            <popup v-model="show10" position="bottom">
                <div class="position-vertical-demo inputParent">
                    <input type="text" placeholder="评论(最多可输入200字)" maxlength="200" onkeyup="this.value=this.value.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,'')" v-bind="discuss" ref="inputText" @keyup.enter="adddiscuss">
                    <span @click="adddiscuss">发送</span>
                </div>
            </popup>
        </div>

        <div v-transfer-dom class="styleH">
            <confirm v-model="show"
            title="确定删除此动态吗?"
            @on-cancel="onCancel"
            @on-confirm="onConfirm"
            @on-show="onShow"
            @on-hide="onHide">
            </confirm>
        </div>
    
        <div v-transfer-dom class="styleH">
            <alert v-model="showZw" title="该功能暂未开放"></alert>
        </div>
    </div>
</template>

<script>
import { Flexbox, FlexboxItem, Sticky, Tab, TabItem, Group, XSwitch, TransferDom, Popup, Confirm, Alert } from 'vux'
import qs from 'qs';
import {formatDate} from '@/plugins/formatDate.js';
import Infinite from "@/components/vue-scroll";
import { Scroller } from 'vux'

export default {
    directives: {
        TransferDom
    },
    components:{
        Flexbox,
      Infinite,
        FlexboxItem,
        Sticky,
        Tab,
        TabItem,
        Group,
        XSwitch,
        Popup,
        Confirm,
        Scroller,
        Alert
    },
  computed: {
    // 计算属性的 getter
    countTab: function () {

      var count = 3;
      if(this.nowsceneitem.length>0&&this.nowsceneitem.sceneItemEnclosures.length>0){
          count =  count +1;

      }
      if(this.nowsceneitem.length>0&&this.nowsceneitem.sceneItemCers.length>0){
          count =  count +1;
      }
      return count;
    }
  },
    data(){
        return{
            isaction:true,
            isaction2:true,
            uid:this.$route.params.uid,
            id:this.$route.params.id,
            discuss:null,
            discussId:0,
            count2:0,
            count:0,
            info:[],
            items:[],
            nowsceneitem:[],
            show:false,
            show10:false,
            total:120,
            participateNum:32,
            percentage:0,
            active:0,
            Swidth:0,
            index:0,



            tabTitle:['任务','记录','证书','附件',],
            showZw:false,

        }
    },
  created(){
    var _this = this;
    var  operation_sceneid = this.$cookie.get('operation_sceneid');
    if(operation_sceneid!=undefined){
       operation_sceneid = this.id+","+operation_sceneid;
       var arr =operation_sceneid.split(",");

        var newArr = [];
        for(var i =0;i<arr.length-1;i++){
        　　 if(newArr.indexOf(arr[i]) == -1){
                if(arr[i]!=null){
        　　　　    newArr.push(arr[i]);
                }
        　　}
        }
       if(newArr.length>8){
           operation_sceneid = newArr.slice(0,8).join(",");
       }else{
           operation_sceneid = newArr.join(",");
       }
    }else{
      operation_sceneid = this.id;
    }
    this.$cookie.set('operation_sceneid', operation_sceneid, {expires: 7});


    _this.active=localStorage.indexB
    _this.index=localStorage.indexC
    this.loadData();
  },
  filters: {

    zt: function (info) {
      if(info.jointimetype=='0'){
          return "不限制";
      }
      if(info.jointimetype=='1'){
        return "手动";
      }
      if(info.jointimetype=='2'){


        return info.joinstarttime+"~"+info.joinendtime;
      }
      return "";
    }
  },
    methods:{
        // 暂未开放功能
        zwKq(){
          this.showZw=!this.showZw
        },
        sendNotice(){
          var json = {sceneid:this.id, relateid:this.id,relatetype:'5',sendids:[],ptype:'1'};
          var jsonsrt =  JSON.stringify(json);
          this.$cookie.set('notified', jsonsrt, 1);
          this.$router.push({path: '/notified/'+this.uid+'/'+this.id});
        },
        infiniteMore($state) {
          this.state = $state;
          this.querytw();
        },
        infiniteMore2($state) {
          this.state2 = $state;
          this.querytw2();
        },
        goback(){
            this.$router.go(-1);
        },
        zan(id){
          var _self = this;
          _self.$axios.post( process.env.API_ROOT+"app/tea/"+id+"/zhan2",
            qs.stringify({
              uid:_self.$route.params.uid
            })
          ).then(function(res){
            _self.nowsceneitem.tws.listMap.forEach(function(item) {
                if(item.id==id){
                  item.zan =  res.data.list;
                  item.iszhan=res.data.iszhan
                }
            });
            // console.log(res)





          }).catch(function(err){
            _self.errorUtil(err);
          })

        },
        loadData(){
          var _self = this;
          console.log(process.env.API_ROOT+"app/tea/"+_self.id+"/sceneView",'哪不对')
          this.$axios.post( process.env.API_ROOT+"app/tea/"+_self.id+"/sceneView",
            qs.stringify({
              uid:_self.$route.params.uid
            })
          ).then(function(res) {
            console.log(res)
            _self.info = res.data.scene;
            _self.items = res.data.infos;
            _self.count = res.data.count;
            _self.count2 = res.data.count2;
            if (_self.items!="") {
              _self.nowsceneitem = _self.items[localStorage.indexB];
              _self.sceneItemView(localStorage.indexB);
              _self.$previewRefresh()
              _self.$nextTick(function(){
                _self.percentage=Number(parseInt(_self.participateNum)/parseInt(_self.total)*100).toFixed(0);
                _self.$refs.kw.style.width=_self.items.length*3+'rem';
                this.$nextTick(() => {
                  var c=null;
                  if(_self.active>=_self.items.length-3&&_self.items.length>3){
                    c = parseInt(_self.items.length-3)*100
                  }else{
                    if(_self.active<3){
                      c=0
                    }else{
                      c = parseInt(_self.active)*100
                    }
                  }
                  this.$refs.kwt.reset({
                    left: c
                  })
                })
              })
            }else{
              _self.$vux.toast.show({type: 'warn', text: "该场景无可用过程，请先添加过程"});
              _self.$router.go(-1);
            }
          }).catch(function(err){
            _self.errorUtil(err);
          })


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

          this.$axios.post( process.env.API_ROOT+"app/tea/"+_self.nowsceneitem.id+"/querytw",
            qs.stringify({
              lastid:_self.nowsceneitem.tws.lastId_PW,
              uid:_self.$route.params.uid
            })
          ).then(function(res){
            console.log(res,'记录下拉')
            _self.nowsceneitem.tws.lastId_PW = res.data.lastId_PW;

            res.data.listMap.forEach(function(item) {
              _self.nowsceneitem.tws.listMap.push(item);
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
                  _self.nowsceneitem.tws.iscompleted= true;
                  _self.state.completed("没有更多数据了");
                }
              }
            });
          }).catch(function(err){
            _self.errorUtil(err);
          })

        },

        querytw2(){
          var _self = this;
          if(!_self.isaction2){
            if(_self.state2!=null){
              _self.state2.loaded();
            }
            return false;
          }
          _self.isaction2=false;

          this.$axios.post( process.env.API_ROOT+"app/tea/"+_self.nowsceneitem.id+"/sceneItemView",
            qs.stringify({
              lastid:_self.nowsceneitem.listTask[_self.nowsceneitem.listTask.length-1].id,
              uid:_self.$route.params.uid
            })
          ).then(function(res){
            console.log(res,'任务下拉')
            // _self.nowsceneitem = res.data;
            res.data.listTask.forEach(function(item) {
              _self.nowsceneitem.listTask.push(item);
            });

            _self.$nextTick(function(){
              if(_self.state2!=null){
                _self.state2.loaded();
              }
              if(res.data.length>0){
                _self.isaction=true;
              }
              if(res.data.length==0){
                if(_self.state2!=null){
                  _self.state2.completed("没有更多数据了");
                }
              }
            });
          }).catch(function(err){
            _self.errorUtil(err);
          })

        },
        toview(task){
          console.log(task)
          var _self = this;
          if(task.teaDoType==0){
            this.$router.push({path:'/taskList/'+this.uid+'/'+task.id+'/'+this.id});
          }else if(task.teaDoType==1){
            this.$router.push({path:'/taskListApproval/'+this.uid+'/'+task.id+'/'+this.id});
          }else if(task.teaDoType==2){
            this.$router.push({path:'/stuList/'+this.uid+'/'+task.id+'/'+null});
          }else if(task.teaDoType==3){
            this.$router.push({path: '/studentTaskDetailsTea/'+_self.$route.params.uid+'/'+task.id+'/'+task.joinstarttime+'/'+task.joinendtime+'/'+0});
            // alert(222)
          }

        },
        toggle(index){
          localStorage.setItem('indexB',index);
          var _self = this;
          _self.active=index;
          _self.index=0;
          _self.nowsceneitem = this.items[index];
          _self.sceneItemView(index);
        },

        sceneItemView(index){
          var _self = this;
          //重置下拉控件
          _self.isaction=true;
          if(_self.state!=undefined){
            _self.state.reset();
          }
          _self.isaction2=true;
          if(_self.state2!=undefined){
            _self.state2.reset();
          }

          if(_self.nowsceneitem.listTask==null
            ||_self.nowsceneitem.listTask==undefined
            ||_self.nowsceneitem.listTask==""){
            _self.$axios.post( process.env.API_ROOT+"app/tea/"+_self.nowsceneitem.id+"/sceneItemView",
              qs.stringify({
                uid:_self.$route.params.uid,
                lastid:0,
              })
            ).then(function(res){
              console.log(res,'任务')
              _self.nowsceneitem = res.data;
              _self.items[index] = res.data;
            }).catch(function(err){
              _self.errorUtil(err);
            })
          }else{
            //还原已经完成的下拉列表状态
            if(_self.nowsceneitem.tws!=undefined
            &&_self.state!=undefined
            &&_self.nowsceneitem.tws.iscompleted==true){
              _self.state.completed("没有更多数据了");
            }
             _self.querytw();
          }

        },
        onItemClick (index) {
            localStorage.setItem('indexC',index);
            this.index=index
            this.$cookie.set('s_'+this.id, index, 1);
        },
        //评论
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
            _self.$axios.post( process.env.API_ROOT+"app/tea/saveComment2",
              qs.stringify({
                uid:_self.$route.params.uid,
                scenefeelingid:_self.discussId,
                content:discuss,
              })
            ).then(function(res){
              console.log(res)
              _self.show10=!_self.show10;
              _self.nowsceneitem.tws.listMap.forEach(function(item) {
                if(item.id==_self.discussId){
                  item.listComment.push( res.data);
                }
              });

            }).catch(function(err){
              _self.errorUtil(err);
            })


        },
        deltabProp (id){
            this.show=!this.show
            this.discussId=id;
        },
        // 删除评论
        removepl(id,twId){
            var  _self = this;
            _self.discussId=twId
            _self.$axios.post( process.env.API_ROOT+"app/tea/delComment",
                qs.stringify({
                    uid:_self.$route.params.uid,
                    scenefeelingid:id
                })
            ).then(function(res){
                console.log(res)
                _self.$vux.toast.show({type: 'success',text:"删除成功" });
                _self.nowsceneitem.tws.listMap.forEach(function(item) {
                  if(item.id==_self.discussId){
                    item.listComment.forEach(function(items,index){
                      if(items.id==id){
                        item.listComment.splice(index,1)
                      }
                    })
                  }
                });
                // _self.loadData();

            }).catch(function(err){
                _self.errorUtil(err);
            })
        },
        onCancel (){
        },
        onConfirm (){
         var  _self = this;
          _self.$axios.post( process.env.API_ROOT+"app/tea/delFeeling",
            qs.stringify({
              uid:_self.$route.params.uid,
              scenefeelingid:_self.discussId
            })
          ).then(function(res){
            _self.nowsceneitem.tws.listMap.forEach(function(item,index,array) {
              if(item.id==_self.discussId){
                _self.nowsceneitem.tws.listMap.pop(index);
              }
            });
            _self.$vux.toast.show({type: 'success',text:"删除成功" });
            // _self.loadData()

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
    },
    mounted(){
    },

}
</script>
<style>
.vux-x-dialog .weui-dialog{max-width:520px;-webkit-transform: translate(0,0);transform: translate(0,0);left:0;top:0;}
.vux-x-dialog .weui-dialog__bd {padding: 0 1.6em .8em;min-height: 40px;font-size: 15px;line-height: 1.3;word-wrap: break-word;word-break: break-all;color: #999;}

.middle-div .vux-flexbox-item{margin-left: 0!important;}

.tab-con-change .vux-tab{height: 85px;background: #fff;}
.tab-con-change .vux-tab-con-changetainer,.tab-con-change .vux-tab-wrap{height: 85px;padding-top: 0;}
.tab-con-change .vux-tab .vux-tab-item {font-size: 28px;line-height: 85px;color: #646464;font-weight: 600;}
.tab-con-change .vux-tab .vux-tab-item.vux-tab-selected{color: #16c775;}
.tab-con-change .vux-tab-container{height:85px;}
.tab-con-change .footer-tab .vux-tab-container .scrollable > div{flex: auto;}
.vux-tab-ink-bar{background-color: #01c269!important;}




.vux-x-dialog .weui-dialog{max-width:520px;}
.vux-x-dialog .weui-dialog__title {font-size: 28px;color: #444;}
.vux-x-dialog .weui-dialog__ft {line-height: 65px;}
.styleH .weui-dialog__ft .weui-dialog__btn_default {font-size: 28px;color: #fff;background-color: #8f8e8e;}
.styleH .weui-dialog__ft .weui-dialog__btn_primary {font-size: 28px;color: #fff;background-color: #16c775;}

.dynamic .wh_completed{padding:20px 0;}
</style>


<style scoped>
.top-back {text-align: center;font-size: 36px;color: #444;padding:20px;background-color: #fff;position: relative;}
.top-back .img-1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
.top-back .img-2{position: absolute;width: 38px;height: 38px;right: 20px;top: 25px}
.top-back .img-2 img{width: 42px;height: 42px;}
.n_title{width:55%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}


.progress-bar{padding: 0 20px 20px 20px;text-align: left;overflow: hidden;border-bottom: 1px solid #f4f3f3;/*no*/box-shadow: 0 0 2px #f4f3f3;}
.progress-title{font-size: 28px;padding-bottom:10px;}
.progress-title span{font-size: 26px;}
.progress-title span:first-child{color: #16c775;}
.progress-left{width: 90%;float: left;background-color: #dee2e7;height: 35px;line-height: 35px;border-radius: 3px;/*no*/position:relative;}
.progress-left > div:first-child{background-color: #16c775;height:35px;width: 70%;border-radius: 3px;/*no*/float:left;position: relative;}
.progress-left > div:first-child span{width:5%;height: 35px;color: #444;position: absolute;right:-5%;z-index: 100;}
.progress-left > div:first-child .csSpan{width:5%;height: 35px;color: #444;position: absolute;right:5%;z-index: 100;}
.progress-right{width:12%;text-align: right;height: 35px;line-height: 35px;position: absolute;right: -11%;background-color: #dee2e7;border-radius: 3px;/*no*/}

.middle-div{background-color: #f4f4f4;padding: 20px 0 10px;}
.middle-div > div{background-color: #fff;padding: 20px 0 15px;}
.set-div{text-align: center;position: relative;}
.set-div{width:66px;height:66px;border-radius: 5px;/*no*/margin: 0 auto;}
.set-div img{width:100%;}
.notice-num {position: absolute;top: -10px;border-radius: 100%;background-color: #ef1a00;color: #fff;width: 35px;height:35px;line-height:35px;text-align: center}
.set-div span{right:-20px;}
.tit-p{text-align: center;font-size: 28px;color: #444;}

.middle-div .customize-bg{background-color: #f4f4f4;padding: 20px 20px 0 20px;overflow: auto;}
.box1-item{width: 200px;height: 150px;text-align:center;margin-right:20px;background-color: #fff;font-size: 28px;font-weight: 400;border-bottom: 4px solid transparent;/*no*/position: relative;float: left;}
.box1-item p{padding: 55px 5px 0;display: -webkit-box;-webkit-line-clamp: 2;overflow: hidden;-webkit-box-orient: vertical;}
.sj-div{width: 0px;height: 0px;border: 20px solid transparent;border-top: 20px solid transparent;position: absolute;bottom: -50px;left: 75px;}
.middle-div .active{border-bottom-color: #16c775;color:#16c775;}
.middle-div .active .sj-div {border-top-color: #16c775}
.footer-tab{border-bottom: 1px solid #f4f3f3;/*no*/}
.box1 {overflow: hidden;padding-bottom: 25px}

.introduction{padding: 20px}
.introduction p{font-size: 20px;color: #888787; text-indent:25px;text-align: left;}
.task{text-align: left;}
.task .taskChild{border-bottom: 1px solid #f4f3f3;/*no*/padding: 20px;color: #444;position: relative;}
.task .taskChild:last-child{border-bottom:0;}
.task .taskChild p{font-size: 26px;line-height: 40px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
.task .taskChild p:first-child {font-size: 28px;}
.task .taskChild p > span{color: #7a7878;}
.task .taskChild p > strong{color: #7a7878;font-weight: 400;}
.task .taskChild p > strong span:first-child{color: #16c775;}
.task .back-a{position: absolute;right: 20px;top: 60px;width: 35px;height: 35px;}
.task .review{position: absolute;right: 0;top: 0;width: 56px;height: 56px;}
.dynamic{position: relative;border-top:1px solid #f4f3f3;/*no*/}
.dy-title {text-align: left;overflow: hidden;padding: 5px 0;}
.head-img{float: left;width: 61px;height:61px;border-radius:100%;}
.del-img{float: right;width: 24px;height:24px;margin-top: 16px;}
.dy-title strong{float: left;width: auto;height: 61px;font-weight: 400;margin-left: 10px;}
.dy-title span{display:block;line-height: 25.5px;}
.dy-title span:first-child{font-size: 28px;color: #444;margin-bottom: 10px}
.dy-title span:last-child{font-size: 24px;color: #999898;}
.comments-msg{text-align: left;font-size: 28px;color: #444;padding: 10px 0;}
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



.certificate{position: relative;}
.certificate a >div{padding: 20px;text-align: left;color: #444;overflow: hidden;border-bottom: 1px solid #f4f3f3;/*no*/margin-bottom: 30px;position: relative;}
.certificate a >div:last-child{border-bottom:0;}
.certificate .first-img {width: 160px;height: 125px;float: left;}
.certificate .ne-div{float: left;height: 125px;margin-left: 20px;}
.certificate .ne-div p:first-child{position: relative;font-size: 28px;margin-bottom: 20px;}
.certificate .ne-div p:first-child span{font-size: 24px}
.certificate .ne-div p:nth-child(2) {font-size: 26px;color: #878686;}
.certificate .ne-div p .notice-num{right: -40px;}
.certificate .back-a{position: absolute;right: 20px;top: 70px;width: 24px;height: 24px;}
.certificate .review{position: absolute;right: 0;top: 0;width: 56px;height: 56px;}

.annex a >div{padding: 20px;text-align: left;color: #444;position: relative;border-bottom: 1px solid #f4f3f3;/*no*/}
.annex a >div p{font-size: 26px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;padding: 20px}
.annex .back-a{position: absolute;right: 20px;top: 45px;width: 24px;height: 24px;}


.no-msg-div{color: #999!important;text-align: center;line-height: 64px;margin-top: 50px;padding:0!important;}
.no-msg-div img{width: 70px;height: 70px;display: inline-block;vertical-align: middle}
.no-msg-div span{height: 70px;display: inline-block;vertical-align: middle;font-size:28px;}

.leftStatusSpan {background: #d7d7d7;border: 3px solid #e9e4e4;border-radius: 50%;display:inline-block;width: 20px;height:20px;vertical-align: middle;margin-top:-3px;/*no*/}
.greenSpanstatus{background-color: #16c775!important;border-color: #bce1d0!important;}
.yellowSpanstatus{background-color: #ff7043!important;border-color: #f7bdaa!important;}
.noStartSpanstatus{background-color: #5250bd!important;border-color: #8483c8!important;}
.downSpanstatus{background-color: #4d4d4d!important;border-color: #646464!important;}
.pendingSpanstatus{background-color: #c5c447!important;border-color: #c7c67e!important;}

</style>
