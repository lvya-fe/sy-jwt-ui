<template>
    <div>
        <div class="top-back">
            <img class="img-1" src="../../assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ info.title }}</div>
        </div>
        <template v-if="set.showName=='已经获得'">
            <div class="acquisition_msg">
                <group>
                    <cell title="证书级别 :" align-items="flex-start" :value="info.level" value-align="left"></cell>
                    <cell title="备注 :" align-items="flex-start" :value="con.approvalbz" value-align="left"></cell>
                </group>
            </div>
            <div class="acquisitino_date">
                <group>
                    <cell title="获得时间 :" align-items="flex-start" :value="con.ctime" value-align="left"></cell>
                </group>
            </div>
        </template>
        <template v-if="(set.showName=='尚未获得'&&con.code=='系统发放')">
            <div class="acquisition_msg">
                <group>
                    <cell title="证书级别 :" align-items="flex-start" :value="info.level" value-align="left"></cell>
                    <cell title="备注 :" align-items="flex-start" :value="con.approvalbz" value-align="left"></cell>
                </group>
            </div>
            <div class="acquisitino_date">
                <group>
                    <cell title="获得条件 :" align-items="flex-start" :value="'【'+set.title+'】'+'素养分'+(set.gtorglstatus==0?'大于':set.gtorglstatus==1?'小于':set.gtorglstatus==2?'等于':'')+set.sort " value-align="left"></cell>
                </group>
            </div>
        </template>
    </div>
</template>

<script>
import { Group, Cell } from "vux";
import qs from 'qs';
import {formatDate} from '../../plugins/formatDate.js';


export default {
    components:{
        Group, 
        Cell
    },
    data(){
        return{
            uid:this.$route.params.uid,
            id:this.$route.params.id,

            info:[],
            con:[],
            set:[],
            
        }
    },
    created(){
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
        loadData(){
          var _self = this;
          this.$axios.post( process.env.API_ROOT+"app/stu/v1/viewcer",
            qs.stringify({
              uid:_self.$route.params.uid,
              cerid:_self.$route.params.id
            })
          ).then(function(res){
              console.log(res)
            _self.info = res.data.info;
            _self.con = res.data.certificateDetailInfo;
            _self.set = res.data.set;


          }).catch(function(err){
            _self.errorUtil(err);
          })
        },
    }
}
</script>

<style>
    .acquisition_msg .vux-no-group-title{font-size: 28px;margin: 0 20px;}
    .acquisitino_date .vux-no-group-title{font-size: 28px;padding: 30px 20px;margin:0;}
    .acquisition_msg .vux-no-group-title .weui-cell{padding-top: 30px;padding-bottom: 30px;color: #444;}
    .acquisition_msg .vux-no-group-title .weui-cell .weui-cell__ft,.acquisitino_date .vux-no-group-title .weui-cell .weui-cell__ft{color: #444;}
    .acquisition_msg .vux-no-group-title .weui-cell .vux-cell-bd,.acquisitino_date .vux-no-group-title .weui-cell .vux-cell-bd{margin-right: 20px;}
    .acquisition_msg .vux-no-group-title:before,.acquisition_msg .vux-no-group-title:after{content: none;}
    .acquisitino_date .vux-no-group-title:before{content: none;}

</style>


<style scoped>
    .top-back {text-align: center;font-size: 36px;color: #444;padding:20px;background-color: #fff;position: relative;}
    .top-back .img-1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
    .acquisition_msg{border-bottom: 5px solid #f4f4f4;/*no*/}    
    .n_title{width:80%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}


</style>
