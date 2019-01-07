<template>
    <div>
        <div class="top-back" v-show="show3">
            <img class="img-1" src="../../assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ task.title }}</div>
            <router-link to="" class="img-2">
                <i class="icon iconfont icon-shiyongcishu" @click="propShow"></i>
            </router-link>
        </div>
        <div class="completed_div" v-show="show3">
            <div class="taskdetails_ts" v-for="item in itmes">
                <span>{{ item.name }} :</span>
                <div class="checkbox_div">
                    {{ item.val }}
                </div>
            </div>
            <!-- <div class="taskdetails_ts">
                <span>图片上传 :</span>
                <div class="picture_div">
                    <div class="img_div">
                        <img src="../../assets/img/jinxingzhong.png" alt="">
                    </div>
                </div>
            </div> -->
        </div>

        <div class="prop_history" v-show="show">
            <div class="prop_history_content">
                <div @click="propShow2">历史任务</div>
                <!-- <div>数据提交历史</div> -->
            </div>
        </div>
        <showcycle v-show="show2" v-bind:conData="taskCycles" v-bind:indexCycle="indexCycle" @closeSelect="closeSelect" @selectCycle="selectCycle"></showcycle>
    </div>
</template>

<script>
import qs from 'qs';
import {formatDate} from '../../plugins/formatDate.js';
import showcycle from '@/page/stu/SelectionPeriod'



export default {
    components:{
        showcycle
    },
    data(){
        return{
            uid:this.$route.params.uid,
            id:this.$route.params.id,
            strTime:this.$route.params.strtime,
            endTime:this.$route.params.endtime,
            task:[],
            itmes:[],

            taskCycles:[],
            indexCycle:0,
            show:false,
            show2:false,
            show3:true,
        }
    },
    created(){
        if(this.strTime=='1970-01-01 08:00:00'){
            this.strTime=null
            this.endTime=null
        }
        this.loadData()
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return  formatDate(date, "yyyy-MM-dd hh:mm");
        }
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        propShow(){
            this.show=!this.show
        },
        propShow2(){
            this.show=!this.show
            this.show2=!this.show2
            this.show3=!this.show3
        },
        closeSelect(){
            this.show3 =true;
            this.show2=!this.show2
        },
        selectCycle(v){
            var _self = this;
            var strtime = _self.taskCycles[v].stime
            var endtime = _self.taskCycles[v].etime
            console.log(strtime)
            console.log(endtime)
            this.$axios.post( process.env.API_ROOT+"app/stu/v1/taskview",
                qs.stringify({
                    uid:_self.$route.params.uid,
                    taskid:_self.$route.params.id,
                    stime:strtime,
                    etime:endtime,
                })
            ).then(function(res){
                console.log(11)
                _self.show3 =true;
                _self.show2=!_self.show2
                _self.task = res.data.task;
                _self.itmes = res.data.itmes;
                _self.taskCycles = res.data.taskCycle;
                if(_self.zt==1){
                    _self.isshow1=true
                    _self.isshow2=false
                }else{
                    _self.isshow1=false
                    _self.isshow2=true
                }
            }).catch(function(err){
                _self.errorUtil(err);
            })
        },
        loadData(){
          var _self = this;
          this.$axios.post( process.env.API_ROOT+"app/stu/v1/taskview",
            qs.stringify({
              uid:_self.$route.params.uid,
              taskid:_self.$route.params.id,
              stime:_self.strTime,
              etime:_self.endTime,
            })
          ).then(function(res){
            console.log(res)
            _self.task = res.data.task;
            _self.itmes = res.data.itmes;
            _self.taskCycles = res.data.taskCycle;
            // _self.book = res.data.listNote;

            // console.log(_self.rw)

          }).catch(function(err){
            _self.errorUtil(err);
          })
        },
    }
}
</script>

<style scoped>
    .top-back {text-align: center;font-size: 36px;color: #444;padding:20px;background-color: #fff;position: relative;}
    .top-back .img-1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
    .top-back .img-2{position: absolute;left: 120px;top: 15px}
    .top-back .img-2 i{color: #01c269;font-size: 40px;}
    .n_title{width:80%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}


    .completed_div > div{border-bottom: 1px solid #f4f3f3;/*no*/}


    .taskdetails_ts{padding:20px 30px;font-size:28px;color:#444;overflow: hidden;}
    .taskdetails_ts span {float:left;width: 5em;text-align: right;margin-right: 10px;min-height:40px;line-height:40px;}
    .checkbox_div{float: left;width:500px;min-height:40px;line-height:40px;}

    .picture_div{overflow: hidden;}
    .img_div{width:215px;height:215px;position: relative;margin:0 15px 15px 0;float: left;}
    .img_div img{width:100%;height:100%;}



    .prop_history{position: fixed;background: rgba(0,0,0,0.5);top: 0;left: 0;right: 0;bottom: 0;}
    .prop_history_content{width: 60%;background: #fff;position: fixed;margin: 0 auto;top: 30%;left: 0px;right: 0px;box-shadow: 0 0 5px #ccc;/*no*/border-radius: 3px;/*no*/}
    .prop_history_content > div{text-align: center;font-size: 28px;color:#444;padding: 40px 0;margin: 0 20px;}
    .prop_history_content > div:first-child{border-bottom:1px solid #f4f3f3;/*no*/}
</style>
