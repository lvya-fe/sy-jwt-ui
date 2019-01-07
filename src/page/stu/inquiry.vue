<template>
    <div>
        <div class="top-back">
            <img class="img-1" src="../../assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ title }}</div>
            <router-link :to="'/inquiryList/'+uid"><i class="icon iconfont icon-wodetiwen ripple"></i></router-link>
        </div>
        <group class="cont-tex add_tex">
            <x-textarea :max="200" autosize :rows="8" :placeholder="msgNot" v-model="content" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
        </group>

        <button @click="saveData()" class="inquiry_button ripple" type="button">提交</button>
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
            title:'问询',
            msgNot:'请输入问询的内容',
            content:'',
        }
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        onEvent (event) {
        console.log('on', event)
        },
        saveData(){
              var _self = this;
              if(_self.content==null ||_self.content==""){
                _self.$vux.toast.show({type: 'warn',text:"问询内容不可为空" });
                return false;
              }
              this.$axios.post( process.env.API_ROOT+"app/stu/v1/saveInquiry",
                qs.stringify({
                  uid:_self.$route.params.uid,
                  content:_self.content
                })
              ).then(function(res){
                if(res.success){
                    _self.$vux.toast.show({type: 'success',text:"成功" });
                    _self.$router.push({path: '/inquiryList/'+_self.$route.params.uid});
                }else{
                    _self.$vux.toast.show({type: 'warn',text:"系统错误" });
                }               

              }).catch(function(err){
                _self.errorUtil(err);
              })

        }
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
    .top-back a i{position: absolute;right: 30px;top: 20px;color: #2ed184;font-size: 45px;}
    .n_title{width:80%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
    

    .tex_div{font-size:28px;color:#444;}
    .tex_div > span{padding:20px 30px;}
    .cont-tex{padding:10px 20px 10px 20px!important;}

    .inquiry_button{width:90%;color:#fff;background:#01c269;text-align:center;font-size:30px;line-height:65px;border:1px solid #01c269;outline:none;margin:20px 0 0 5%;border-radius:3px;/*no*/}
</style>
