<template>
    <div v-if="show">
      <div v-if="show1">
        <div class="top-back">
            <img src="@/assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ name }}</div>
        </div>
        <div class="con-body">

            <group>
              <cell-box class="con-child">
                <span>•提交时间:</span>
                <div class="hs_div">{{info.ctime}}</div>
                
              </cell-box>

              <template v-for="item in itmes">
                    <cell-box class="con-child" v-if="item.type!=6&&item.type!=29&&item.citeDataType!=1">
                        <span><strong :style="item.notnull=='Y'?'color:#ff0000;vertical-align: middle;':''"> {{ (item.notnull=='Y')?'*':'•' }}</strong>{{item.name}}:</span>
                        <div class="hs_div">{{ item.valex==''||item.valex==null||item.valex==undefined?'--':(item.type==5||item.type==10||item.type==17||item.type==25)?item.valex.replace(/,/g,' | '):item.valex }}</div>
                        
                    </cell-box>
                    <div class="referenceDiv referenceDivZs auditStyle" v-if="item.citeDataType==1&&item.type!=6&&item.type!=29">
                        <span>"{{ item.name }}"</span>
                        <div class="referChildDiv" v-for="(itemRefer,index) in item.listCiteData">
                            <p><span>{{ itemRefer.name }}</span> <span>{{ itemRefer.orgNames }}</span></p>
                            <p>
                                {{ itemRefer.val==''||itemRefer.val==null||itemRefer.val==undefined?'--':itemRefer.type==22?removeStr(itemRefer.val,8):itemRefer.type==21?itemRefer.val+'%':itemRefer.type==3?removeStr(itemRefer.val,3):(itemRefer.type==5||itemRefer.type==10||itemRefer.type==17||itemRefer.type==25)?itemRefer.val.replace(/,/g,' | '):itemRefer.val }}
                            </p>
                        </div>
                        <p style="color:#706f6f;" v-if="item.listCiteData.length<=0">--</p>
                    </div>
                    <cell-box class="con-child" v-if="item.type==6&&item.citeDataType!=1"> 
                        <span>{{ item.name }}</span>
                        <div class="picture_div" v-if="item.valex!=''&&item.valex!=null&&item!=undefined">
                            <div class="img_div" v-for="(pictures,index) in item.valex.split(',')" :key="index">
                                <img  :src="pictures" alt="" :preview="item.id">
                            </div>
                        </div>
                        <div class="hs_div" v-if="item.valex==''||item.valex==null||item==undefined">
                          --
                        </div>
                    </cell-box>

                    <cell-box class="con-child" v-if="item.type==29&&item.citeDataType!=1"> 
                        <span>{{ item.name }}</span>
                        <div class="seeVideo" v-if="item.valex!=null&&item.valex!=''&&item.valex!=undefined">
                            <img class ="seeImg" @click="ckSee(item.valex)" src="@/assets/img/videoImgMo.png" alt="">
                        </div>
                        <div class="hs_div" v-if="item.valex==''||item.valex==null||item==undefined">
                          --
                        </div>
                    </cell-box>
                     <div class="referenceDiv referenceDivZs auditStyle" v-if="item.citeDataType==1&&item.type==29">
                        <span>"{{ item.name }}"</span>
                        <div class="referChildDiv" v-for="(itemRefer,index) in item.listCiteData">
                            <p><span>{{ itemRefer.name }}</span> <span>{{ itemRefer.orgNames }}</span></p>
                            <div class="seeVideo" v-if="itemRefer.val!=null&&itemRefer.val!=''&&itemRefer.val!=undefined">
                                <img class ="seeImg" @click="ckSee(itemRefer.val)" src="@/assets/img/videoImgMo.png" alt="">
                            </div>
                        </div>
                        <p style="color:#706f6f;" v-if="item.listCiteData.length<=0">--</p>
                    </div>
               </template>

                <cell-box class="con-child" v-if="info.state=='N'">
                <span>•审核未通过原因:</span>
                <div class="hs_div">{{info.approvalbz}}</div>
              </cell-box>
            </group>
        </div>
        <div class="btn1-div" v-if="info.state=='O'">
            <button type="button" class="by" @click="pass">通过</button>
            <button type="button" class="turn-down" @click="show1=!show1">驳回</button>
        </div>
      </div>
        <reviewRejected v-show="!show1" @add="add" @closeSelect = "closeSelect"></reviewRejected>
        
        <div class="videoParent" @click.prevent.stop="videoPropShow=false" v-if="videoPropShow">
            <div @click.prevent.stop="playVideo()">
                <video :src="videoSrc" id="videoPlay" :sht="shoqq" class="video" controls="controls">您的浏览器不支持 video 视屏播放。</video>
            </div>
        </div>
    </div>
</template>

<script>
  import qs from 'qs';
  import {formatDate} from '@/plugins/formatDate.js';
  import reviewRejected from "@/components/tea/ReviewRejected";

import { CellBox, Group, Flexbox, FlexboxItem } from "vux";
export default {
    components: {
        CellBox,
        Group,
        Flexbox,
        reviewRejected,
        FlexboxItem
    },
    created(){
      this.loadData();
    },
    data(){
        return{
            uid:this.$route.params.uid,
            show:false,
            show1:true,
            itmes:[],
            info:[],
            isRuleApproval:false,
            name:'',

            // 视频
            videoPropShow:false,
            videoSrc: '',
            shoqq:true,

        }
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm");
      }
    },
    methods:{
        pass(){
          if(this.isRuleApproval){
               this.$router.push({path: '/InputNutrients/'+this.uid+'/'+this.info.id});
             }else{
                 var _self = this;
                this.$axios.post( process.env.API_ROOT+"app/tea/task/"+_self.$route.params.id+"/dispass",
                  qs.stringify({
                    uid:_self.$route.params.uid
                  })
                ).then(function(res){
                  _self.$vux.toast.show({type: 'success',text:"成功" });

                   _self.$router.go(-1);

                }).catch(function(err){
                  _self.errorUtil(err);
                })
             }

        },
//        decline(){
//          this.$router.push({path: '/ReviewRejected/'+this.uid+'/'+this.info.id});
//        },

      closeSelect(){
        this.show1 =true;
      },
      add(msg){
        var _self = this;
        this.$axios.post( process.env.API_ROOT+"app/tea/task/"+_self.$route.params.id+"/decline",
          qs.stringify({
            uid:_self.$route.params.uid,
            text:msg
          })
        ).then(function(res){
          _self.$vux.toast.show({type: 'success',text:"成功" });
          _self.show1 =true;
          //_self.loadData();
           _self.$router.go(-1);

        }).catch(function(err){
          _self.errorUtil(err);
        })
      },

        goback(){
            this.$router.go(-1);
        },
        loadData(){
          var _self = this;
          this.$axios.post( process.env.API_ROOT+"app/tea/task/"+_self.$route.params.id+"/view",
            qs.stringify({
              uid:_self.$route.params.uid
            })
          ).then(function(res){
            console.log(res,'adasdasd')
            _self.itmes = res.data.itmes;
            _self.info = res.data.info;
            _self.name = res.data.name;
            _self.show=true;
            _self.isRuleApproval=res.data.isRuleApproval;
            console.log(_self.itmes)
          }).catch(function(err){
            _self.errorUtil(err);
          })
        },
        //点击播放视频
        playVideo(){
            var vdo = document.getElementById("videoPlay");
            if(this.shoqq){
                vdo.play();
                this.shoqq=false
            }else{
                vdo.pause();
                this.shoqq=true
            }
        },
        //查看类型表单 查看视频
        ckSee(value){
            this.videoPropShow=true;
            this.videoSrc=value;
        },
    }
}
</script>

<style>
.weui-cells:before,.weui-cells:after,.ts-child:before,.weui-cell:before{content: none!important;}

</style>

<style scoped>
  [v-cloak] {
       display: none;
     }
.top-back {text-align: center;font-size: 36px;color: #444;position: fixed;left:0;right:0;padding:20px;background-color: #fff;z-index: 100;top: 0;}
.top-back img{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
.con-body{margin-top: 100px;}
.con-body .con-child{margin-right: 10px;font-size: 28px;color: #444;display:block;text-align:left;padding: 10px 25px;    word-wrap: break-word;overflow:hidden;}
.con-child span{margin-right: 10px;min-width: 2em;}
.hs_div{margin-top:20px;color:#706f6f;}
.con-body .ts-child {padding-top: 0;}
.ts-child img{width: 200px;height: 150px;border-radius: 3px;/*no*/margin: 12px;}
.btn1-div{margin-top: 80px;}
.by{width:90%;display:block;height: 60px;line-height: 60px;color: #fff;background-color: #01c269;padding:0 20px;margin: 0 auto 20px;outline: none;border: 1px solid #01c269;/*no*/border-radius: 3px;/*no*/font-size: 26px;}
.turn-down{width:90%;display:block;height: 60px;line-height: 60px;color: #444;background-color: #f4f4f4;padding:0 20px;margin: 0 auto 20px;outline: none;border: 1px solid #dfdddd;/*no*/border-radius: 3px;/*no*/font-size: 26px;}



.picture_div{margin: 20px 0;overflow: hidden;width:100%;float: left;}
.img_div,.add_div{width:215px;height:215px;position: relative;margin:0 15px 15px 0;float: left;}
.img_div i{position: absolute;right:0;top:-8px;width:32px;height:32px;}
.img_div img,.add_div img{width:100%;height:100%;}


.n_title{width:55%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}


.auditStyle{padding: 10px 25px!important;}


/* 视频 */
.videoParent{position: fixed;top:0;bottom:0;left:0;right:0;width:100%;height:100%;background:#000;z-index: 100000000;display: flex;align-items: center;}
.videoParent > div video{width:100%;max-width:100%;}
.seeVideo {position:relative;width:215px!important;height:215px;margin-top:10px;}
.seeVideo .seeImg {width:215px;height:215px;}
.seeVideo .removeSmlieImg {position: absolute;right:0;top:0;width: 22px;height: 22px;}

/* 数据引用 */
.referenceDiv{padding:10px 25px;overflow: hidden;}
.referenceDiv > span{float:left;width: 100%;text-align: left;font-size:28px;}
.referChildDiv{float: left;width:100%;}
.referChildDiv p:first-child{margin-top:10px;}
.referChildDiv p{font-size:26px;color:#706f6f;}
.referenceDivZs {padding:10px 1px;}
</style>
