<template>
    <div>
        <div class="top-back">
            <img class="img-1" src="../../assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">消息详情</div>
            
        </div>
        <div class="content">
            {{ content }}
        </div>
    </div>
</template>

<script>
  import qs from 'qs';
export default {
    data(){
        return{
            uid:this.$route.params.uid,
            id:this.$route.params.id,
            content:'',
        }
    },
    created(){
        this.loadDate()
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        loadDate(){
            var _self = this;
            this.$axios.post( process.env.API_ROOT+"app/stu/v1/MyNotificationDetails",
            qs.stringify({
                uid:_self.uid,
            })
            ).then(function(res){
                _self.content=res.data[_self.id].content
            }).catch(function(err){
            _self.errorUtil(err);
            })
        }
    }
}
</script>

<style scoped>
    .top-back {text-align: center;font-size: 36px;color: #444;padding:20px;background-color: #fff;position: relative;}
    .top-back .img-1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
    .n_title{width:80%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}


    .content{padding:20px 30px;font-size:28px;color:#444;}
</style>
