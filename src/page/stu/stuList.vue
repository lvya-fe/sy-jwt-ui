<template>
    <div>
        <div class="top-back">
            <img class="img-1" v-show="!noback" src="../../assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ title }}</div>
            <!-- <span class="img-2"  v-if="!(jointimetype==0&&cycle==0)">
                <i class="icon iconfont icon-shiyongcishu ripple"></i>
            </span> -->
        </div>
        <dir class="stuListPar">
            <div class="ripple" v-for="(item,index) in conData" :key="index" @click="link(item.stuId)">
                <img class="first-img" src="../../assets/img/yiwancheng.png" v-if="item.taskState== 4">
                <img class="first-img" src="../../assets/img/jinxingzhong.png" v-if="item.taskState==1">
                <img class="first-img" src="../../assets/img/daishenhe_t.png" v-if="item.taskState==2">
                <img class="first-img" src="../../assets/img/yibohui_t.png" v-if="item.taskState==3">
                <img class="first-img" src="../../assets/img/yijieshu.png" v-if="item.taskState==0">
                <img class="first-img" src="../../assets/img/weikaiqi.png" v-if="item.taskState== -1">
                <div class="ne-div">
                    <p>
                        <span>{{ item.stuName }}</span>
                        <span>{{ item.orgName }}</span>
                    </p>
                    <p><span>{{item.updateTimeStr}}</span></p>
                    <img class="back-a" src="../../assets/img/you.png" alt="">
                </div>
            </div>
            <div class="no-msg-div" v-if="conData.length<=0">
                <img src="@/assets/img/zanwushuju.png" alt="">
                <span>暂无数据</span>
            </div>
        </dir>
    </div>
</template>

<script>
import { LoadMore } from "vux";
import qs from 'qs';
// import {formatDate} from '@/plugins/formatDate.js';
// import BScroll from "better-scroll";
// import showcycle from '@/page/tea/SelectionPeriod'


export default {
    components:{LoadMore,},
    data(){
        return{
            uid:this.$route.params.uid,
            id:this.$route.params.id,
            back:this.$route.params.back,
            formId:this.$route.params.formId,
            schoolId:this.$route.params.schoolid,
            title:'',
            conData:[],
        }
    },
    created(){
        this.query();
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm");
        }
    },
    mounted(){
        
    },
    computed: {
        noback:function(){
        return this.back == 1 ? true : false;
        }
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        query(){
            console.log(this.id)
            this.$axios.get( process.env.API_ROOT+"app/stu/v1/showStuTaskList",{
                params:{
                    uid:this.uid,
                    taskId:Number(this.id),
                    formId:Number(this.formId),
                    schoolId:Number(this.schoolId)
                }
            }).then((res)=>{
                if(res.success){
                    this.conData = res.data;
                    this.title = res.data[0].taskName;
                }
            }).catch((err)=>{
                this.errorUtil(err);
            })
        },
        link(stuid){
            this.$router.push({path: '/stuCardDetails2/'+this.uid+'/'+this.id+'/'+stuid+'/'+this.schoolId});
        },
    },
}
</script>
<style>

</style>

<style scoped>
.top-back {text-align: center;font-size: 36px;color: #444;padding:20px;background-color: #fff;}
.top-back .img-1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
.top-back .img-2{position: absolute;left: 80px;top: 15px}
.top-back .img-2 i{color: #01c269;font-size: 40px;}
.n_title{width:55%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}


.list-con-div{position: absolute;bottom:0;top:90px;left:0;right:0;}
.stuListPar{position: relative;}
.stuListPar >div{padding: 25px;text-align: left;color: #444;overflow: hidden;border-bottom: 1px solid #f4f3f3;/*no*/margin-bottom: 30px;position: relative;}
.stuListPar >div:last-child{border-bottom:none;}
.stuListPar .first-img {width: 78px;height: 78px;float: left;}
.stuListPar .ne-div{float: left;height: 78px;margin-left: 20px;}
.stuListPar .ne-div p:first-child{position: relative;font-size: 28px;}
.stuListPar .ne-div p:nth-child(2){font-size: 26px;color:#999;}
.stuListPar .back-a{position: absolute;right: 20px;top: 50px;width: 24px;height: 24px;}

.no-msg-div{color: #999!important;text-align: center;line-height: 64px;margin-top: 50px;text-align:center!important;}
.no-msg-div img{width: 70px;height: 70px;display: inline-block;vertical-align: middle}
.no-msg-div span{height: 70px;display: inline-block;vertical-align: middle;font-size:28px;}

.bscroll{width: 100%;overflow: hidden;}
.drop-down{position: absolute;top:90px;left:0px;width: 100%;height: 50px;line-height:50px;text-align: center;}
.drop-down img{width:50px;height:50px;}
</style>
