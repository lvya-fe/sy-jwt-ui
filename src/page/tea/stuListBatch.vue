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
        
        <x-dialog v-model="showHideOnBlur" :dialog-style="{'max-width': '100%',width:'65%','background-color':'#fff',color:'#696969','border-radius':'6px','box-shadow': '0 0 4px #ccc'}" class="dialog-demo vux-1px" hide-on-blur>
            <p>{{statusTime}}</p>
        </x-dialog>
    </div>
</template>
<script>
import { LoadMore,XDialog,Cell,Group,Checklist  } from "vux";
import qs from 'qs';
export default {
    data(){
        return{
            defaultUrl:process.env.API_ROOT,
            uid:this.$route.params.uid,
            id:this.$route.params.id,
            formId:this.$route.params.formId,
            schooId:this.$route.params.schoolid,
            title:'任务1',
            stuLits:[],//学生列表

        }
    },
    components:{
        LoadMore,
        XDialog,
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
            console.log(this.uid,this.id,this.formId,this.schooId)
            let pams = {
                uid:this.uid,
                schoolId :this.schooId,
                formId : this.formId,
                taskId:this.id,
                type:1
            }
            console.log(pams);
            this.$axios.get( process.env.API_ROOT+"app/stu/v1/showStuTeaCardTaskList",{params:pams})
            .then( res =>{
                // if(res.success){
                    let resData = res.data;
                    this.title = resData[0].taskName;
                    this.stuLits = resData;
                // }
            }).catch( err =>{
                this.errorUtil(err);
            })
        },
        
        //跳转至学生任务详情 - 需要区分-任务状态   展示，填写
        toStuDetail(stuid){
            this.$router.push({path: '/stuCardDetails/'+this.uid+'/'+this.id+'/'+stuid+'/'+this.schooId});
        },
        //批量操作学生表单
        checkAll(){
            
        }
    },
    
}
</script>
<style lang="less">
    .stuListCard{
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
                right: 80px;
                top: 25px;
            }
            .img-4{
                position: absolute;
                right: 20px;
                top: 25px;
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

