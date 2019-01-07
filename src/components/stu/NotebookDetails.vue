<template>
    <div>
        <div class="top-back">
            <img class="img-1" src="../../assets/img/back_left_green.png" alt="" @click="goback">
            {{ title }}
            <button type="button" class="ripple" @click="add()">提交</button>
        </div>
        <group class="cont-tex add_tex">
            <x-textarea :max="200" autosize :rows="8" :placeholder="msgNot" v-model="msg" @on-focus="onEvent" @on-blur="onEvent"></x-textarea>
        </group>
    </div>
</template>

<script>
  import qs from 'qs';

import { Group, Cell, XTextarea  } from "vux";

export default {
    components:{
        Group, 
        Cell, 
        XTextarea
    },
    data(){
        return{
            uid:this.$route.params.uid,
            id:this.$route.params.id,
            title:'写笔记',
            msg:'',
            msgNot:'你想在笔记里写点什么哪？'
        }
    },
    methods:{
        goback(){
          this.$emit('closeSelect');
        },
        add(){
          this.$emit('add',this.msg);
        },
        onEvent () {
            this.msg=this.msg.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,'')
        },
        lod(msg){
            this.msg=msg
        },
    }
}
</script>

<style>
    .cont-tex .weui-cells{height: 100%;}
    .cont-tex .weui-textarea {font-size: 26px;color: #444;}
    .weui-textarea-counter{height: 30px;}

    .add_tex .weui-cells{margin-top: 0;}
    .add_tex .weui-cells:before,.add_tex .weui-cells:after{content:none;}
    .add_tex{border-bottom: 1px solid #f4f4f4;/*no*/}
</style>

<style scoped>
    .top-back {text-align: center;font-size: 36px;color: #444;padding:20px;background-color: #fff;position: relative;}
    .top-back .img-1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
    .top-back button {width: 100px;height: 50px;font-size: 36px;color: #01c269;border: none;background-color: #fff;right: 20px;top:20px;position: absolute;outline: none;}

    .tex_div{font-size:28px;color:#444;}
    .tex_div > span{padding:20px 30px;}
    .cont-tex{padding:10px 20px 10px 20px!important;}
</style>
