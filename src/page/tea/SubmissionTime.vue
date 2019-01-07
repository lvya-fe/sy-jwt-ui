<template>
    <div>
        <div class="top-back">
            <img class="img1" src="../../assets/img/back_left_green.png" alt="" @click="goback">
            数据提交历史
        </div>
        <div class="class-con" v-if="content.length>0">
            <div  v-for="(item,index) in content" :key="index" @click="select(item.id,index)" :class="indexCycle1==index?'selected':''">{{ item.ctime }}<img class="right_d" src="@/assets/img/duigou.png" alt=""></div>
        </div>
        <div class="no_data" v-if="content.length<=0">
            <img src="@/assets/img/datasubmissionnone.png" alt="">
            <p>暂无提交历史</p>
        </div>
        
    </div>
    
</template>

<script> 
import qs from 'qs';
import { Radio, Group } from 'vux'
export default {
    props: {
      stime: {
        type: String,
        timer:null,
        default: "0"
      },
      etime: {
        type: String,
        timer:null,
        default: "0"
      },
      uid: {
        type: String,
        timer:null,
        default: "0"
      },
      id: {
        type: String,
        timer:null,
        default: "0"
      },
      stuid: {
        type: String,
        timer:null,
        default: "0"
      },
      indexCycle1: {
        default: 0
      },
      formZt: {
        type: String,
        timer:null,
        default: "0"
      },
      
    },
    components: {
        Radio,
        Group
    },
    data(){
        return{
            content:[],
        }
    },
    created(){
        
        console.log(this.uid)
        console.log(this.id)
        console.log(this.stuid)
        console.log(this.stime)
        console.log(this.etime)
        this.loadData();
        if(this.formZt=='X'){
            this.indexCycle1=-1
        }
    },
    methods:{
        goback(){
            this.$emit('closeSelect1');
        },
        loadData(){
          var _self = this;
          if(_self.stime=='null'||_self.stime==null){
              this.$axios.post( process.env.API_ROOT+"app/tea/task/queryHistory",
                qs.stringify({
                    uid:_self.uid,
                    taskid:_self.id,
                    stuId:_self.stuid,
                    stime:'1900-01-01 00:00:00',
                    etime:'3000-01-01 00:00:00',
                })
            ).then(function(res){
                _self.content=res.data.reverse();
                console.log(_self.content)
                
            }).catch(function(err){
                _self.errorUtil(err);
            })
          }else{
              this.$axios.post( process.env.API_ROOT+"app/tea/task/queryHistory",
                    qs.stringify({
                        uid:_self.uid,
                        taskid:_self.id,
                        stuId:_self.stuid,
                        stime:_self.stime,
                        etime:_self.etime,
                    })
                ).then(function(res){
                    _self.content=res.data.reverse();
                    console.log(_self.content)
                    
                }).catch(function(err){
                    _self.errorUtil(err);
                })
          }
          
        },
        select(id,index){
            this.$emit('selectCycle1',id,index);
        }
    }
}
</script>

<style scoped>
  .top-back {text-align: center;font-size: 36px;color: #444;position: fixed;left:0;right:0;padding:20px;background-color: #fff;z-index: 100;top: 0;}
  .top-back .img1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
  .class-con{margin-top: 100px;border-bottom:1px solid #f2f2f2;/*no*/}
  .class-con > div{font-size: 26px;color: #444;padding: 20px;border-bottom:1px solid #f2f2f2;/*no*/margin:0 10px;}
  .class-con > div:last-child{border-bottom: 0;}
  .right_d{width: 32px;height: 32px;float: right;display: none;}
  .class-con .selected .right_d{display: block;}

  .no_data{font-size:28px;color: #999;margin-top:300px;text-align: center}
  .no_data img{width:100px;height:128px;}
</style>
