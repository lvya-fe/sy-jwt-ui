<template>
  <div class="index">

  </div>
</template>
<script>

import qs from 'qs';
import { Group, Cell, Flexbox, FlexboxItem } from 'vux'



export default {
  name:'index',
  data(){
    return{
      uid:this.$route.params.uid,
      phone:this.$route.params.phone,
      type:this.$route.params.type
    }
  },
  components: {
  },
  filters: {
  },
  created(){
    this.loadData();
  },
  methods:{

    loadData(){
      var _self = this;
      this.$axios.post( process.env.API_ROOT+"app/auth/jwtLogIn",
        qs.stringify({
          uid:_self.$route.params.uid,
          phone:_self.$route.params.phone,
          type:_self.$route.params.type
        })
      ).then(function(res){
          alert(res.errorDesc);
          localStorage.setItem("token",res.data);
          alert("登陆成功重新返回主页");

          if(_self.type=="stu"){
            _self.$router.push({path: '/stuIndex/'+_self.uid});
          }
          if(_self.type=="tea"){
            _self.$router.push({path: '/index/'+_self.uid});
          }
      }).catch(function(err){
        _self.errorUtil(err);
      })
    }
  }
}
</script>

<style scoped>
.main{ margin-bottom: 100px;}
.add_class{padding:30px 0;border-bottom: 1px solid #ededee;/*no*/}
.add_class > div {text-align: center;}
.add_class > div p{font-size: 28px;color: #444;}
.flex-demo {position: relative;}
.notice-num {position: absolute;top: -10px;border-radius: 100%;background-color: #ef1a00;color: #fff;width: 35px;height:35px;line-height:35px;text-align: center}
.add_class .flex-demo img{width: 70px;}
.title-div{padding: 30px 50px 10px;border-bottom: 1px solid #ededee;/*no*/}
.title-div .flex-demo {margin-bottom: 20px;}
.set-div{text-align: center}
.set-div{width:115px;height:115px;border-radius: 5px;/*no*/margin: 0 auto;}
.set-div img{width:100%;}
.set-div span{right:5px;}
.title-div .vux-flexbox-item:last-child .set-div {background-color: #767674;line-height: 115px;}
.title-div .vux-flexbox-item:last-child .set-div img {width: 50%;vertical-align: middle}
.tit-p{width:115px;margin: 0 auto; text-align: center;font-size: 24px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;color: #444;}
.list-con-div{position: relative;height:650px;}
.list-con-div ul li {overflow:hidden;padding: 15px 20px;border-bottom: 1px solid #ededee;/*no*/}
.list-con-left {float: left;width: 90px;height: 90px;border-radius: 100%;border: 1px solid #ccc;/*no*/margin-right: 20px;}
.list-con-left img{width: 100%;}
.list-con-right {float: left;width: 580px;}
.name-date {overflow: hidden;padding-bottom: 10px;}
.name-date span:first-child{float: left;color: #393a3f;font-size: 28px;}
.name-date span:last-child{float: right;color: #7a7a7b;font-size: 20px;}
.art-p{overflow: hidden;text-overflow:ellipsis;white-space: nowrap;font-size: 24px;color:#444;}
._v-container{height:650px!important;}

.no-msg-div{color: #999;text-align: center;line-height: 64px;margin-top: 50px;}
.no-msg-div img{width: 70px;height: 70px;display: inline-block;vertical-align: middle}
.no-msg-div span{height: 70px;display: inline-block;vertical-align: middle;font-size:28px;}
</style>
