<template>
    <div class="stuListCard">
        <div class="top-back">
            <img class="img-1" v-show="!noback" src="../../assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ title }}</div>
            <span class="img-2">
                <i class="icon iconfont icon-shiyongcishu ripple"></i>
            </span>
            <img class="img-3" src="../../assets/img/batch.png" alt="">
            <img class="img-4" src="../../assets/img/batch.png" alt="">
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            uid:this.$route.params.uid,
            id:this.$route.params.id,
            back:this.$route.params.back,
            formId:this.$route.params.formId,
            schooId:this.$route.params.schoolid,
            title:'测试的任务名称',
        }
    },
    created(){

    },
    methods:{

    }
}
</script>
<style lang="less">
    .stuListCard{
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

