<template>
  <div>

    <div class="top-back">
        <img class="img1" src="@/assets/img/back_left_green.png" alt="" @click="goback">
        <div class="n_title">头像设置</div>
    </div>


<uploadImg v-bind:imgs.sync="imgs" v-bind:count.sync="count" v-bind:uid.sync="uid"></uploadImg>



    <div class="btn1-div">
      <button type="button" class="pl-btn" @click="add" ref="up_btn">设置</button>
    </div>

  </div>
</template>
<script>
  import {wechatconfigInit,wechatopenimg} from '@/plugins/wechat.js';
  import uploadImg  from '@/components/uploadImg'
  import { mapState } from 'vuex'
  import qs from 'qs';
  export default {
    name:'me',
    data(){
      return{
        uid:this.$route.params.uid,
        count:1,
        imgs:[]
      }
    },
   computed: mapState({
      _url_: state => state._url_
    }),
    components: {

        uploadImg
    },
    created(){
      wechatconfigInit(this,qs,this.uid,this._url_);
    //  this.loadData();
    },
    methods: {
      goback(){
            this.$router.go(-1);
        },
       add(){
          if(this.imgs==""){
              this.$vux.toast.show({type: 'cancel',text:"请上传头像"})
          }
          var _self = this;
          this.$axios.post( process.env.API_ROOT+"app/tea/addAvatar",
            qs.stringify({
              uid:_self.uid,
              avatar:_self.imgs
            })
          ).then(function(res){
             _self.$router.go(-1);
          }).catch(function(err){
            _self.errorUtil(err);
          })
        }
    }
}
</script>
<style scoped>
@import 'http://cdn.bootcss.com/weui/1.1.1/style/weui.min.css';
body {
  background-color: #fbf9fe;
}
  .top-back {text-align: center;font-size: 36px;color: #444;padding:20px;background-color: #fff;}
  .top-back .img1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
  .n_title{width:80%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}

  .weui-uploader__file{position:relative;}
  .delete_photo{display:block;position:absolute;width:25px;height:25px;border-radius:50%;background:#00ba0a;color:#fff;font-weight:bold;text-align:center;line-height:10px;top:-10px;right:-6px;font-size:17px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;}

  .btn1-div{margin-top: 80px;}
  .avatar-left{padding: 40px 30px;font-size: 28px;color: #444;}
  .btn1-div button{width:90%;color:#fff;background:#01c269;text-align:center;font-size:30px;line-height:65px;border:1px solid #01c269;outline:none;margin:20px 0 0 5%;border-radius:3px;/*no*/}


</style>
