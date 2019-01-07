<template>
  <div>
    <div class="title-div">
      <template  v-for="item in sceneInfos">
        <div class="title-header">
            <span>{{item.orgname}}</span>
            <router-link :to="'/scenesMore/'+uid+'/'+item.orgid">更多<img src="@/assets/img/you.png" alt="">
            </router-link>
        </div>
        <flexbox :gutter="0" wrap="wrap">
          <flexbox-item  :span="1/4" v-for="scenes in item.list"  :key="scenes.index">
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
      </template>
      <!-- 暂无数据时显示 -->
      <div class="no-msg-div" v-if="sceneInfos.length<=0">
        <img src="@/assets/img/zanwushuju.png" alt="">
        <span>暂无数据</span>
      </div>
    </div>

  <BottomNav v-bind:type="2" v-bind:uid="uid"></BottomNav>
  </div>
</template>
<script>

import { Flexbox,  FlexboxItem } from "vux";
import qs from 'qs';
import BottomNav from '@/components/tea/bottomNav'
export default {
    data(){
        return{
          uid:this.$route.params.uid,
          sceneInfos:[]
        }
    },
    created(){
      this.loadData();
    },
    components:{
        Flexbox,
        BottomNav,
        FlexboxItem
    },
    methods:{
      loadData(){
        localStorage.setItem('indexB',0);
        localStorage.setItem('indexC',0);
        var _self = this;
        this.$axios.post( process.env.API_ROOT+"app/tea/sceneInfolist",
          qs.stringify({
            uid:_self.$route.params.uid
          })
        ).then(function(res){
          _self.sceneInfos = res.data;
        }).catch(function(err){
          _self.errorUtil(err);
        })

      }
    }
}
</script>
<style>
.flex-demo {position: relative;}
.title-div .flex-demo {margin-bottom: 20px;}
.notice-num {position: absolute;top: -0.133333rem;border-radius: 100%;background-color: #ef1a00;color: #fff;width: 0.466667rem;height: 0.466667rem;line-height: 0.466667rem;text-align: center;
}



</style>

<style scoped>
.title-div{padding: 20px 30px 100px;}
.set-div{text-align: center}
.set-div{width:115px;height:115px;border-radius: 5px;/*no*/margin: 0 auto;}
.set-div img{width:115px;height:115px;}
.set-div span{right:5px;}
.tit-p{width:115px;margin: 0 auto; text-align: center;font-size: 26px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;color:#444;padding-top:5px;}


.title-header{overflow: hidden;margin-bottom: 30px;}
.title-header > span {float: left;font-size: 28px;color: #444;border-left: 5px solid #01c269;/*no*/padding-left: 10px;}
.title-header > a {float: right;font-size:26px;color: #444;padding-top: 5px;}
.title-header > a img {width:25px;height:25px;margin-bottom:-2px;}
.vux-flexbox{border-bottom: 1px solid #ededee;margin-bottom: 25px;}
.vux-flexbox:last-child{border-bottom: 0;}

.no-msg-div{color: #999;text-align: center;line-height: 64px;margin-top: 50px;}
.no-msg-div img{width: 70px;height: 70px;display: inline-block;vertical-align: middle}
.no-msg-div span{height: 70px;display: inline-block;vertical-align: middle;font-size:28px;}
</style>
