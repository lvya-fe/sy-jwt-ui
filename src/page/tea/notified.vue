<template>
  <div>
    <div v-show="isshow">
        <div class="top-back">
            <img class="img-1" src="@/assets/img/back_left_green.png" alt="" @click="goback">
            <router-link :to="'/HistoryNotification/'+uid" class="img-2">
                <img  src="@/assets/img/lishitongzhi.png" alt="">
            </router-link>
            <div class="n_title">{{ title }}</div>
        </div>
        <group class="cont-tex">
            <x-textarea v-model="textMsg" :max="200" :placeholder="msgNot" @on-change="lock"></x-textarea>
        </group>
        <div class="notice-div" ref="topInfo">
            <p class="notice-title">
                通知人员
                <span @click="tabProp1" v-show="data.length>0">
                    <img src="@/assets/img/shanchulv.png" alt="">
                    全部删除
                </span>
            </p>
            <div class="notice-body" >
                <img src="@/assets/img/tianjia.png" alt="" @click="isshow=!isshow">
                <span v-for="(item,index) in data" :key="index">{{ item.name }}<img src="@/assets/img/shanchub.png" alt="" @click="remove(index)"></span>
            </div>
            <div class="btn-div" ref="bottonDiv">
                <button type="button" :class="{selected:air}" :disabled="!air" @click="sendNotice">发送通知</button>
            </div>
        </div>

        <div v-transfer-dom class="styleF">
            <confirm v-model="show"
            title="确定全部删除吗?"
            @on-cancel="onCancel"
            @on-confirm="onConfirm"
            @on-show="onShow"
            @on-hide="onHide">
            </confirm>
        </div>
    </div>
    <select2 v-bind:uid="uid" v-bind:sceneid="sceneid" @qd="qd" @qx="qx" v-show="!isshow"></select2>
  </div>
</template>

<script>

import select2 from "@/components/tea/select";
import qs from 'qs';
import { XTextarea, Group, TransferDom, Confirm } from "vux";
export default {
    directives: {
        TransferDom
    },
    components: {
        XTextarea,
        Group,
      select2,
        Confirm
    },
    data(){
        return{
            data:[],
            isshow:true,
            uid:this.$route.params.uid,
            sceneid:this.$route.params.sid,
            relateid:null,
            relatetype:null,
            ptype:null,
            title:'通知',
            msgNot:'最多输入200个汉字。',
            textMsg:'',
            air:false,
            show:false
        }
    },
    created(){

      var jsonstr =   this.$cookie.get('notified');
      if(jsonstr!=undefined){
          var json = JSON.parse(jsonstr);
          this.data = json.sendids;
          this.relateid = json.relateid;
          this.relatetype = json.relatetype;
          this.ptype = json.ptype;
      }
    },
    methods:{
        qx(){
          this.isshow = true;
        },
        qd(obj,type){
          this. data = obj;
          this.isshow = true;
          this.ptype = type;
          if(this.textMsg!=0 && this.data.length>0){
                this.air=true
            }else{
                this.air=false
            }
        },
        goback(){
            this.$router.go(-1);
        },
        remove(index){
            this.data.splice(index, 1);
            if(this.textMsg!=0 && this.data.length>0){
                this.air=true
            }else{
                this.air=false
            }
        },
        sendNotice(){
          var _self = this;


          var sendids = [];
          _self.data.forEach(function(item) {
            sendids.push(item.id);
          })

          this.$axios.post( process.env.API_ROOT+"app/tea/SendNotice",
            qs.stringify({
              uid:_self.$route.params.uid,
              sendids:sendids.join(","),
              relatetype:_self.relatetype,
              relateid:_self.relateid,
              content:_self.textMsg,
              ptype:_self.ptype
            })
          ).then(function(res){
            _self.$vux.toast.show({type: 'success',text:"成功" });
            _self.$router.go(-1);
          }).catch(function(err){
            _self.errorUtil(err);
          })
        },
        lock(){
            if(this.textMsg!=0 && this.data.length>0){
                this.air=true
            }else{
                this.air=false
            }
        },
        tabProp1 (){
            this.show=!this.show
        },
        onCancel (){
        },
        onConfirm (){
            this.data.splice(0,this.data.length)
            this.$vux.toast.text('删除成功')
            if(this.textMsg!=0 && this.data.length>0){
                this.air=true
            }else{
                this.air=false
            }
        },
        onShow (){
        },
        onHide (){
        }
    },
    mounted(){
        let topH = this.$refs.topInfo.offsetTop;
        let bottonDiv = this.$refs.bottonDiv.offsetTop;
        this.$refs.topInfo.style.height=Number(parseInt(bottonDiv)-parseInt(topH))+'px'
    }
}
</script>
<style>
.vux-x-dialog .weui-dialog{max-width:520px;-webkit-transform: translate(0,0);transform: translate(0,0);left:0;top:0;}
.vux-x-dialog .weui-dialog__bd {padding: 0 1.6em .8em;min-height: 40px;font-size: 15px;line-height: 1.3;word-wrap: break-word;word-break: break-all;color: #999;}
.cont-tex .weui-cells{height: 100%;}
.cont-tex .weui-textarea {height: 250px;font-size: 26px;color: #444;}
.weui-textarea-counter{height: 50px;}
.cont-tex .weui-cells:before,.weui-cells:after{content: none;}

.vux-x-dialog .weui-dialog{max-width:520px;}
.vux-x-dialog .weui-dialog__title {font-size: 28px;color: #444;}
.vux-x-dialog .weui-dialog__ft {line-height: 65px;}
.styleF .weui-dialog__ft .weui-dialog__btn_default {font-size: 28px;color: #fff;background-color: #8f8e8e;}
.styleF .weui-dialog__ft .weui-dialog__btn_primary {font-size: 28px;color: #fff;background-color: #16c775;}

</style>


<style scoped>
.top-back {text-align: center;font-size: 36px;color: #444;padding:20px;background-color: #fff;position: fixed;top:0;left:0;right: 0;z-index: 100;}
.top-back .img-1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
.top-back .img-2{position: absolute;width: 38px;height: 38px;right: 20px;top: 25px}
.top-back .img-2 img{width: 42px;height: 42px;}
.n_title{width:55%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}


.cont-tex{height: 300px;margin-top: 100px;}


.notice-div{padding: 20px;text-align: left;overflow: auto;}
.notice-title{font-size: 30px;color: #444;margin-bottom: 10px;}
.notice-title span {margin-left: 30px;font-size: 28px;color: #16c775;}
.notice-title span img{width: 30px;height: 30px;margin-bottom: -3px;}
.notice-body{float: left;}
.notice-body > img{width: 42px;height: 42px;margin-bottom: -10px;margin-right: 30px;}
.notice-body span{font-size: 28px;color: #16c775;border:1px solid #16c775;/*no*/margin:0 30px 30px 0;display: inline-block;min-width: 50px;text-align: center;padding: 5px 25px;position: relative;}
.notice-body span img{position: absolute;top: 0;right: 0;width: 22px;height: 22px;}



.btn-div{position: fixed;bottom: 0;left:0;right:0;overflow: hidden;}
.btn-div button {background-color: #444;color: #fff;width: 100%;height: 95px;line-height: 95px;font-size:36px;border: 0;outline: none;float: left;}
.selected{background-color: #16c775!important;}



</style>
