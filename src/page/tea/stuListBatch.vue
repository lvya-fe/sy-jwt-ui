<template>
    <div class="stuListBatch">
        <div class="top-back">
            <img class="img-1" src="../../assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ title }}</div>
            <span class="img-2">
                <i class="icon iconfont icon-shiyongcishu ripple"></i>
            </span>
            <img class="img-3" src="../../assets/img/ico_search.png" alt="">
            <span class="img-4" @click="checkAll" alt="">全选</span>
        </div>
        <ul>
            <li v-for="item in stuLits" :key="item.stuId">
                <span></span>
            </li>
        </ul>
    </div>
</template>
<script>
import { LoadMore,XDialog,Cell,Group,Checklist  } from "vux";
import qs from 'qs';
export default {
    data(){
        return{
            uid:this.$route.params.uid,
            id:this.$route.params.id,
            formId:this.$route.params.formId,
            schooId:this.$route.params.schoolid,
            title:'任务1',
            stuLits:[],//学生列表
            // commonList:[],
            isCheckAll:false,
            checkedids:[],//选中学生id合集

        }
    },
    components:{
        LoadMore,
        Cell,
        Group,
        Checklist 
    },
    created(){
        this.getStuLists();
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        getStuLists(){
            this.$vux.loading.show({
                text: '加载中...'
            });
            let pams = {
                uid:this.uid,
                schoolId :this.schooId,
                formId : this.formId,
                taskId:this.id,
                type:1
            }
            this.$axios.get( process.env.API_ROOT+"app/stu/v1/showStuTeaCardTaskList",{params:pams})
            .then( res =>{
                if(res.success){
                    this.$vux.loading.hide();
                    let resData = res.data;
                    this.title = resData[0].taskName;
                    this.stuLits = resData;
                    if(this.stuLits != null && this.stuLits.length>0){
                        this.stuLits.forEach( ele => {
                            //暂时无用
                            if([1,3].includes(ele.taskState)){
                                ele = Object.assign(ele,{
                                    checked:false
                                })
                            }
                        })
                    }
                }
            }).catch( err =>{
                this.errorUtil(err);
            })
        },
        
        //跳转至学生任务详情 - 需要区分-任务状态   展示，填写
        toStuDetail(stuid){
            this.$router.push({path: '/stuCardDetails/'+this.uid+'/'+this.id+'/'+stuid+'/'+this.schooId});
        },
        //复选框选择事件
        checkedChange(val){

        },
        //批量操作学生表单
        checkAll(){
            console.log('11111111111')
            console.log(this.stuLits)
            this.isCheckAll = !this.isCheckAll;
            this.stuLits.forEach(ele => {
                if(ele.checked == undefined) return;
                ele.checked = this.checkAll ? true : false;
            })
        }
    },
    
}
</script>
<style lang="less">
    .stuListBatch{
        background-color: #ebebeb;
        .top-back {
            padding:20px;
            text-align: center;
            font-size: 36px;
            color: #444;
            background-color: #fff;
            img{
                width: 38px;
                height: 38px;
            }
            .img-1{
                position: absolute;
                left: 20px;
                top: 25px;
            }
            .img-2{
                position: absolute;
                left: 80px;
                top: 15px;
                i{
                    color: #01c269;
                    font-size: 40px;
                }
            }
            .img-3{
                position: absolute;
                right: 110px;
                top: 25px;
            }
            .img-4{
                position: absolute;
                right: 20px;
                top: 14px;
                font-size: 34px;
            }
            .n_title{
                width:55%;
                margin:0 auto;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }

    }
</style>

