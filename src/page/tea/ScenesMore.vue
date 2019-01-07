<template>
    <div>
        <div class="top-back">
            <img class="img1" src="@/assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ sceneInfo.orgname }}</div>
        </div>
        <div class="title-div" ref="topInfo">
            <flexbox :gutter="0" wrap="wrap">
                <flexbox-item :span="1/4" v-for="scenes in sceneInfo.list" :key="scenes.index">
                 <router-link :to="'/sceneDetails/'+uid+'/'+scenes.id">
                <div class="flex-demo">
                  <div class="set-div">
                    <img :src="scenes.img" alt="">
                    <span class="notice-num" v-show="scenes.untreatedTask>0">{{ scenes.untreatedTask>99?'•••':scenes.untreatedTask }}</span>
                  </div>
                  <p class="tit-p">{{ scenes.title.substring(0,4) }}</p>
                </div>
              </router-link>
                </flexbox-item>
            </flexbox>
            <divider v-show="isShow">君子藏器于身,待时而动</divider>
        </div>
    </div>
</template>
<script>
import { Flexbox,  FlexboxItem, Divider } from "vux";
import qs from 'qs';
export default {
    components:{
        Flexbox,
        FlexboxItem,
        Divider
    },

    data(){
      return{
        isShow:true,
        uid:this.$route.params.uid,
        orgid:this.$route.params.orgid,
        sceneInfo:[]
      }
    },
    created(){
      this.loadData();
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        loadData(){
          localStorage.setItem('indexB',0);
          localStorage.setItem('indexC',0);
          var _self = this;
          this.$axios.post( process.env.API_ROOT+"app/tea/sceneInfoByOrg",
            qs.stringify({
              uid:_self.$route.params.uid,
              orgid:_self.$route.params.orgid
            })
          ).then(function(res){
            _self.sceneInfo = res.data;
          }).catch(function(err){
            _self.errorUtil(err);
          })

        }
    }
    ,
    mounted(){
      let topH = this.$refs.topInfo.offsetHeight;
      if(topH>=this.fullHeight){
        this.isShow=true;
      }else{
        this.isShow=false;
      }
    }
}
</script>
<style>
.flex-demo {position: relative;}
.title-div .flex-demo {margin-bottom: 20px;}
.notice-num {position: absolute;top: -0.133333rem;border-radius: 100%;background-color: #ef1a00;color: #fff;width: 0.466667rem;height: 0.466667rem;line-height: 0.466667rem;text-align: center;
}
.left-arrow:before{content:none;}

</style>

<style scoped>
.top-back {text-align: center;font-size: 36px;color: #444;position: fixed;left:0;right:0;padding:20px;background-color: #fff;z-index: 100;top: 0;}
.top-back .img1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
.n_title{width:55%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}


.title-div{padding: 40px 50px 10px;margin-top: 80px;}
.set-div{text-align: center}
.set-div{width:115px;height:115px;border-radius: 5px;/*no*/margin: 0 auto;}
.set-div img{width:115px;height:115px;}
.set-div span{right:5px;}
.tit-p{width:115px;margin: 0 auto; text-align: center;font-size: 26px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;color:#444;padding-top:5px;}

</style>
