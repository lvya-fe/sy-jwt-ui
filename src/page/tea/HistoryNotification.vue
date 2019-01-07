<template>
    <div>
        <div class="top-back">
            <img class="img1" src="@/assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ title }}</div>
        </div>
        <div class="history-con">
          <template  v-for="info in list">
            <router-link :to="'/ViewNotification/'+uid+'/'+info.id">
                <div>
                    <p>{{info.content}}</p>
                    <p>{{info.ctime}}</p>
                    <img class="back-a" src="@/assets/img/you.png" alt="">
                </div>
            </router-link>
          </template>
          <Infinite v-on:infinite="infiniteMore" ></Infinite>
        </div>
    </div>
</template>

<script>

import qs from 'qs';
import {formatDate} from '@/plugins/formatDate.js';
import Infinite from "@/components/vue-scroll";

export default {
  components:{
    Infinite
  },
    data(){
        return{
            title:'历史通知',
            uid:this.$route.params.uid,
            pageNo:1,
            isaction:true,
            list:[]
        }
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm");
      }
    },
    created(){
      this.loadData();
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        infiniteMore($state) {
          this.state = $state;
          this.loadData();
        },
      loadData(){
          var _self = this;
          if(!_self.isaction){
            if(_self.state!=null){
              _self.state.loaded();
            }
            return false;
          }
          _self.isaction=false;

          this.$axios.post( process.env.API_ROOT+"app/tea/HistoryNotificationDetails",
            qs.stringify({
              pageNo:_self.pageNo,
              uid:_self.$route.params.uid
            })
          ).then(function(res){
            _self.list = res.data.resultList;
            _self.pageNo = _self.pageNo+1;
            _self.$nextTick(function(){
              if(_self.state!=null){
                _self.state.loaded();
              }
              if(_self.list.length==10){
                _self.isaction=true;
              }
              if(  _self.list.length<10){
                if(_self.state!=null){
                  _self.state.completed("没有更多数据了");
                }
              }

              if(  _self.list.length==0&&_self.pageNo==2){
                if(_self.state!=null) {
                  _self.state.completed("");
                }
              }
            });
          }).catch(function(err){
            _self.errorUtil(err);
          })

        }
    }
}
</script>
<style scoped>
.top-back {text-align: center;font-size: 36px;color: #444;position: fixed;left:0;right:0;padding:20px;background-color: #fff;z-index: 100;top: 0;}
.top-back .img1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
.n_title{width:55%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}


.history-con{margin-top: 100px;position: relative;}
.history-con a > div{padding: 20px;text-align: left;color: #444;border-bottom: 1px solid #f4f3f3;/*no*/position: relative}
.history-con a > div p{overflow: hidden;text-overflow:ellipsis;white-space: nowrap;padding-right: 50px;}
.history-con a > div p:first-child{font-size: 28px}
.history-con a > div p:nth-child(2){font-size: 18px;color: #868383;text-align: right;}
.history-con .back-a{position: absolute;right: 20px;top: 45px;width: 24px;height: 24px;}

</style>
