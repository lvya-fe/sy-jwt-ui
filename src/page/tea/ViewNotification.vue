<template>
    <div>
        <div class="top-back">
            <img class="img1" src="@/assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ title }}</div>
        </div>
        <div class="history-details-con">
            <div>
                {{info.content}}
            </div>
            <div>
                发送时间: <span>{{info.ctime}}</span>
            </div>

            <div class="last-div" v-if="info.stuids!=null">
                通知学生:
                <p>
                  <span v-for="name in info.stuids.split(',')">{{name}}</span>
                </p>
            </div>

            <div class="last-div" v-if="info.teaids!=null">
              通知老师:
              <p>
                <span v-for="name in info.teaids.split(',')">{{name}}</span>
              </p>
            </div>

            <div class="last-div" v-if="info.orgids!=null">
              通知部门:
              <p>
                <span v-for="name in info.orgids.split(',')">{{name}}</span>
              </p>
            </div>


        </div>
    </div>
</template>

<script>

import {formatDate} from '@/plugins/formatDate.js';
import qs from 'qs';
export default {
    data(){
        return{
            title:'历史通知详情',
            info:[]
        }
    },
    created(){
      this.loadData();
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
        loadData(){
          var _self = this;
          this.$axios.post( process.env.API_ROOT+"app/tea/ViewNotificationDetails",
            qs.stringify({
              id:_self.$route.params.id,
              uid:_self.$route.params.uid
            })
          ).then(function(res){
            _self.info = res.data;

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
.n_title{width:80%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}


.history-details-con{margin-top: 100px;}
.history-details-con > div{font-size: 28px;color: #444;text-align: left;padding: 20px;word-wrap: break-word;}
.history-details-con > div span{font-size: 24px;color: #868383;}
.last-div span{ margin-right: 30px;}

</style>
