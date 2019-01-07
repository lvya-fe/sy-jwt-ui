<template>
    <div>
        <div class="top-back">
            <img class="img-1" src="../../assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ info.title }}</div>
        </div>
        <div class="bh_div">
            <group label-width="5em">
                <cell title="证书编号 :" align-items="flex-start" :value="con.code" value-align="left"></cell>
                <cell title="获得日期 :" align-items="flex-start" :value="con.jointime" value-align="left"></cell>
            </group>
            <div class="certificate_picture">
                <span>证书图片 :</span>
                <div class="picture_div">
                    <div class="img_div">
                        <img src="../../assets/img/jinxingzhong.png" alt="">
                    </div>
                </div>
            </div>
            <group label-width="5em" >
                <cell title="备注 :"  align-items="flex-start" :value="con.bz" value-align="left"></cell>
                <cell title="提交时间 :" align-items="flex-start" :value="con.ctime" value-align="left"></cell>
            </group>
        </div>
    </div>
</template>


<script>
import { Group, Cell  } from "vux";
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
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return  formatDate(date, "yyyy-MM-dd hh:mm");
             
        }
    },
    created(){
        this.loadData()
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
    .bh_div .vux-label{font-size: 28px!important;}
    .bh_div .vux-no-group-title .weui-cell{padding-top: 30px;padding-bottom: 30px;color: #444;}
    .bh_div .vux-no-group-title .weui-cell .weui-cell__ft{color: #444;font-size: 28px!important;}
    .bh_div .vux-no-group-title .weui-cell .vux-cell-bd{margin-right: 20px;text-align: right;}
    .bh_div .vux-no-group-title:before,.bh_div .weui-cell:before{content: none;}
    .bh_div .weui-cell:last-child{border-top: 1px solid #f4f4f4;/*no*/}
    .bh_div .weui-cell{padding: 30px;font-size: 28px;text-align: left;} 
    .bh_div .weui-cells{margin-top: 0;} 
    .bh_div .weui-cell .weui-cell__ft{text-align: left;padding-left: 30px;}
</style>

<style scoped>
    .top-back {text-align: center;font-size: 36px;color: #444;padding:20px;background-color: #fff;position: relative;}
    .top-back .img-1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
    .n_title{width:80%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}



    .certificate_picture{padding:20px 30px;font-size:28px;color:#444;border-bottom: 1px solid #f4f3f3;/*no*/}
    .certificate_picture > span {width:5em;display: inline-block;text-align:right;}
    .picture_div{margin: 20px 0;overflow: hidden;}
    .img_div{width:215px;height:215px;position: relative;margin:0 15px 15px 0;float: left;}
    .img_div img{width:100%;height:100%;}
</style>
