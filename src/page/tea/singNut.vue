<template>
    <div>
        <div class="top-back">
            <img class="img1" src="@/assets/img/back_left_whit.png" alt="" @click="goback">
            加分
            <button type="button" @click="jf">确定</button>
        </div>
        <div class="input-div">
            <div class="input-body">
                <div class="input-child" v-for="(item,index) in conData" :key="index">
                    <span>{{ item }}</span>
                    <input type="number" name="" id="" placeholder="请输入指标分数">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast  } from "vux";

export default {
    components: {
        Toast 
    },
    data(){
        return{
            title:'审核通过',
            conData:['自信乐观','团队合作','承担责任','高效执行','沟通交流']
        }
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        jf(){
            this.$vux.toast.text('加分成功', 'middle')
            this.$router.go(-1);
        },
    }
}
</script>

<style scoped>
.top-back {text-align: center;font-size: 36px;color: #444;position: fixed;left:0;right:0;padding:20px;background-color: #01c269;color:#fff;z-index: 100;top: 0;}
.top-back .img1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
.top-back button {padding: 0 10px;height: 50px;font-size: 30px;color: #01c269;border: 1px solid #01c269;/*no*/border-radius: 5px;/*no*/background-color: #fff;right: 20px;top:23px;position: absolute;outline: none;}


.input-div{margin-top: 120px;}
.input-title a{font-size: 26px;color: #fff;background-color: #01c269;height: 65px;line-height: 65px;display: inline-block;padding: 0 10px;border-radius: 3px;/*no*/margin: 20px;}

.input-child {overflow: hidden;padding: 0 20px;margin-bottom: 20px;}
.input-child span {max-width:400px;;font-size: 26px;color: #444;float: left;height: 65px;line-height: 65px;margin-right: 20px;}
.input-child input {font-size: 26px;color: #444;float: left;height: 65px;line-height: 65px;border: 1px solid #b2b0b0;/*no*/border-radius: 3px;/*no*/width: 220px;margin-right: 20px;padding: 0 5px;outline: none;}
.input-child img{width: 36px;height: 36px;margin-top: 14.5px;}

input::-webkit-input-placeholder,input:-moz-placeholder,input::-moz-placeholder,input:-ms-input-placeholder{color: #b2b0b0}   

</style>
