<template>
    <div v-if="showIndex">
      <div v-if="show1">
        <div class="top-back">
            <img src="@/assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ cer.title }}</div>
        </div>
        <div class="con-body">

            <group>
              <cell-box class="con-child">
              <span>获得时间:</span>
              {{info.ctime}}
            </cell-box>
              <cell-box class="con-child">
                <span>编号:</span>
                {{info.code}}
              </cell-box>

              <cell-box class="con-child ts-child" v-if="info.imgs!=undefined">
                <img v-for="img in info.imgs.split(',')" :src="img" preview="st" alt="">
              </cell-box>

              <cell-box class="con-child">
                  <span>备注:</span>
                  {{info.bz}}
              </cell-box>
            </group>
        </div>
        <div class="btn1-div" v-if="info.status=='O'">
            <button type="button" class="by" @click="tabProp">通过</button>
            <button type="button" class="turn-down" @click="show1=!show1">驳回</button>
        </div>

      <div v-transfer-dom class="styleD">
        <confirm v-model="show"
                 title="确定要通过吗?"
                 @on-confirm="pass">
        </confirm>
      </div>
      </div>

      <reviewRejected v-show="!show1" @add="add" @closeSelect = "closeSelect"></reviewRejected>
    </div>
</template>

<script>
  import qs from 'qs';
  import {formatDate} from '@/plugins/formatDate.js';
  import reviewRejected from "@/components/tea/ReviewRejected";
  import { CellBox, Group, Flexbox, FlexboxItem, TransferDom, Confirm} from "vux";
export default {
  directives: {
    TransferDom
  },
    components: {
      CellBox,
      Group,
      Flexbox,
      reviewRejected,
      FlexboxItem,
      Confirm
    },
    created(){
      this.loadData();
    },
    data(){
        return{
          show1:true,
          showIndex:false,
            uid:this.$route.params.uid,
            show:false,
            cer:[],
            info:[]
        }
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm");
      }
    },
    methods:{

        goback(){
            this.$router.go(-1);
        },
         tabProp (){
          this.show=!this.show
        },

        closeSelect(){
          this.show1 =true;
        },
      add(msg){
        var _self = this;
        this.$axios.post( process.env.API_ROOT+"app/tea/"+_self.$route.params.id+"/certificatedetail/approvalState",
          qs.stringify({
            uid:_self.$route.params.uid,
            approvalbz:msg,
            status:'N'
          })
        ).then(function(res){
          _self.$vux.toast.show({type: 'success',text:"成功" });
          _self.show1 =true;
         // _self.loadData();
          _self.$router.go(-1);

        }).catch(function(err){
          _self.errorUtil(err);
        })
      },

       pass (){
           var _self = this;
           this.$axios.post( process.env.API_ROOT+"app/tea/"+_self.$route.params.id+"/certificatedetail/approvalState",
             qs.stringify({
               uid:_self.$route.params.uid,
               status:'Y'
             })
           ).then(function(res){
                _self.$vux.toast.show({type: 'success',text:"成功" });
              // _self.loadData();
                _self.$router.go(-1);
           }).catch(function(err){
             _self.errorUtil(err);
           })
        },
        loadData(){
          var _self = this;
          this.$axios.post( process.env.API_ROOT+"app/tea/"+_self.$route.params.id+"/certificateDeatilView",
            qs.stringify({
              uid:_self.$route.params.uid
            })
          ).then(function(res){
            _self.cer = res.data.cer;
            _self.info = res.data.info;
            _self.showIndex = true;
            _self.$previewRefresh()


          }).catch(function(err){
            _self.errorUtil(err);
          })
        }
    }
}
</script>

<style>
.weui-cells:before,.weui-cells:after,.ts-child:before{content: none!important;}

.vux-x-dialog .weui-dialog{max-width:520px;-webkit-transform: translate(0,0);transform: translate(0,0);left:0;top:0;}
.vux-x-dialog .weui-dialog__bd {padding: 0 1.6em .8em;min-height: 40px;font-size: 15px;line-height: 1.3;word-wrap: break-word;word-break: break-all;color: #999;}
.vux-x-dialog .weui-dialog__title {font-size: 28px;color: #444;}
.vux-x-dialog .weui-dialog__ft {line-height: 65px;}
.styleD .weui-dialog__ft .weui-dialog__btn_default {font-size: 28px;color: #fff;background-color: #8f8e8e;}
.styleD .weui-dialog__ft .weui-dialog__btn_primary {font-size: 28px;color: #fff;background-color: #16c775;}
</style>

<style scoped>
  [v-cloak] {
       display: none;
     }
.top-back {text-align: center;font-size: 36px;color: #444;position: fixed;left:0;right:0;padding:20px;background-color: #fff;z-index: 100;top: 0;}
.top-back img{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
.con-body{margin-top: 100px;}
.con-body .con-child{margin-right: 10px;font-size: 28px;color: #444;display:block;text-align:left;padding: 25px;    word-wrap: break-word;}
.con-child span{margin-right: 10px;float: left;min-width: 2em;}
.con-body .ts-child {padding-top: 0;}
.ts-child img{width: 200px;height: 150px;border-radius: 3px;/*no*/margin: 12px;}
.btn1-div{margin-top: 80px;}
.by{width:90%;display:block;height: 60px;line-height: 60px;color: #fff;background-color: #01c269;padding:0 20px;margin: 0 auto 20px;outline: none;border: 1px solid #01c269;/*no*/border-radius: 3px;/*no*/font-size: 26px;}
.turn-down{width:90%;display:block;height: 60px;line-height: 60px;color: #444;background-color: #f4f4f4;padding:0 20px;margin: 0 auto 20px;outline: none;border: 1px solid #dfdddd;/*no*/border-radius: 3px;/*no*/font-size: 26px;}
.n_title{width:55%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}

</style>
