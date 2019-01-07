<template>
    <div>
        <div class="top-back">
            <img class="img1" src="../../assets/img/back_left_green.png" alt="" @click="goback">
            {{ title }}
            <button type="button" @click="add()">提交</button>
        </div>
        <group class="cont-tex">
            <x-textarea :max="200" :placeholder="msgNot"  v-model="msg" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
        </group>
    </div>
</template>

<script>
  import qs from 'qs';
import { XTextarea, Group } from "vux";
export default {
    components: {
        XTextarea,
        Group
    },
    data(){
        return{
            uid:this.$route.params.uid,
            id:this.$route.params.id,
            msg:'',
            title:'审核驳回',
            msgNot:'最多输入200个汉字。'
        }
    },
    methods:{
        goback(){
          this.$emit('closeSelect');
        },
        add(){
          this.$emit('add',this.msg);
        },

        onEvent (event) {
            console.log('on', event)
        }
    }
}
</script>
<style>
.cont-tex .weui-cells{height: 100%;}
.cont-tex .weui-textarea {height: 250px;font-size: 26px;color: #444;}
.weui-textarea-counter{height: 50px;}
.cont-tex .weui-cells:before,.weui-cells:after{height:1px;/*no*/}

.weui-cells:after,.weui-cells:before{ height:1px!important;/*no*/}
</style>


<style scoped>
.top-back {text-align: center;font-size: 36px;color: #444;position: fixed;left:0;right:0;padding:20px;background-color: #fff;z-index: 100;top: 0;    border-bottom: 1px solid #ededee;/*no*/}
.top-back .img1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
.top-back button {width: 100px;height: 50px;font-size: 30px;color: #01c269;border: 1px solid #01c269;/*no*/border-radius: 5px;/*no*/background-color: #fff;right: 20px;top:23px;position: absolute;outline: none;}
.cont-tex{height: 300px;margin-top: 100px;border-bottom: 1px solid #ededee;/*no*/}

</style>
