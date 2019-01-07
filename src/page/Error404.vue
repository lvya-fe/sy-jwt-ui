<template>
    <div class="body-error">
        <img src="@/assets/img/error.png" alt="">
        <p>无法连接网络,请检查网络并<span @click="goback">刷新重试</span></p>
    </div>
</template>

<script>
export default {
	data(){
        return{
        }
    },
    methods:{
        goback(){
            this.$router.go(-1);
        }
    }

}
</script>

<style scoped>
.body-error{color: #444;font-size: 26px;text-align: center;width:100%;position: absolute;top:50%; left:50%;transform: translate(-50%,-50%);}
.body-error img{width: 314px;height: 271px;}
.body-error p{margin-top: 10px;}
.body-error a{color: #2ed184;vertical-align: middle;}
</style>
