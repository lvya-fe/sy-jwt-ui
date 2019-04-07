<template>
    <div>
        <div class="top-back">
            <img class="img-1" src="../../assets/img/back_left_green.png" alt="" @click="goback">
            发布记录
            <button type="button" @click="add1()">发布</button>
        </div>
        <group class="cont-tex add_tex">
            <x-textarea :max="200" autosize :rows="8" v-model="textmsg" @on-focus="onEvent" @on-blur="onEvent" placeholder="此刻你想说些什么" ></x-textarea>
        </group>
        <uploadImg v-bind:imgs.sync="imgs" v-bind:uid.sync="uid" v-bind:count.sync="count"></uploadImg>

        <!-- <div class="picture_div">
            <div class="img_div">
                <img src="../../assets/img/jinxingzhong.png" alt="">
                <i class="icon iconfont icon-banyuanchahao-"></i>
            </div>
            <div class="add_div">
                <img src="../../assets/img/tj_big.png" alt="">
            </div>
        </div> -->
    </div>
</template>

<script>
import { Group, Cell, XTextarea,  Confirm  } from "vux";
import {wechatconfigInit,wechatopenimg} from '@/plugins/wechat.js';
import uploadImg  from '@/components/uploadImg'
import { mapState } from 'vuex'
import qs from 'qs';
export default {
    components:{
        Group,
        Cell,
        XTextarea,
        Confirm,
        uploadImg
    },
    data(){
        return{
            uid:this.$route.params.uid,
            id:this.$route.params.id,
            textmsg:'',
            imgs:[],
            count:9,
        }
    },
    computed: mapState({
      _url_: state => state.animation._url_
    }),
    created(){
      wechatconfigInit(this,qs,this.uid,this._url_);
    //  this.loadData();
    },
    methods:{
        goback(){
          this.$emit('closeSelect');
        },
        add1(){
          this.$emit('add1',this.textmsg,this.imgs);
        },
        onEvent () {
            this.textmsg=this.textmsg.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,'')
        },
    }
}
</script>

<style>
    .cont-tex .weui-cells{height: 100%;}
    .cont-tex .weui-textarea {font-size: 26px;color: #444;}
    .weui-textarea-counter{height: 30px;}

    .add_tex .weui-cells{margin-top: 0;}
    .add_tex .weui-cells::before{content:none;}
    .add_tex .weui-cells:after{height:1px;/*no*/}
</style>

<style scoped>
    .top-back {text-align: center;font-size: 36px;color: #444;padding:20px;background-color: #fff;position: relative;}
    .top-back .img-1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
    .top-back button {width: 100px;height: 50px;font-size: 36px;color: #01c269;border: none;background-color: #fff;right: 20px;top:20px;position: absolute;outline: none;}

    .tex_div{font-size:28px;color:#444;}
    .tex_div > span{padding:20px 30px;}
    .cont-tex{padding:10px 20px 10px 20px!important;}



    .picture_div{margin: 20px 30px;overflow: hidden;}
    .img_div,.add_div{width:215px;height:215px;position: relative;margin:0 15px 15px 0;float: left;}
    .img_div i{position: absolute;right:0;top:-8px;width:32px;height:32px;}
    .img_div img,.add_div img{width:100%;height:100%;}
</style>
