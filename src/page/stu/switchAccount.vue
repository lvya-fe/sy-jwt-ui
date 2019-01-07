<template>
    <div>
        <div class="top-back">
            <img class="img1" src="../../assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ title }}</div>
        </div>
        <div class="radio-div">
            <div class="avatar" :class="{active:index==active}" v-for="(item,index) in conData" :key="index" @click="toggle(index)">
                <div class="avatar-left">
                    <img src="../../assets/img/toupiao.png" alt="">
                </div>
                <div class="avatar-mid">
                    <p>
                        <span>{{ item.name }}</span>
                        <img v-if='item.pic==null' src="../../assets/img/morenPic.png" alt="">
                        <img v-if='item.pic!=null' :src="item.pic" alt="">
                    </p>
                    <p>
                        <strong>{{ item.orgname }}</strong>
                    </p>
                </div>
                <div class="avatar-right">
                    <img src="../../assets/img/duigou.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            uid:this.$route.params.uid,
            title:'',
            active:0,
            show:false,
            conData:[],
        }
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        toggle(index){
            this.active=index
        },
        loadData(){
          var _self = this;
          this.$axios.post( process.env.API_ROOT+"app/stu/v1/wxoauth",
            qs.stringify({
              uid:_self.$route.params.uid
            })
          ).then(function(res){
            var type = res.data.type;
            if(type=="all"){
                _self.conData=res.data.webUsers;
            }else if(type=="tea"){
                window.location.href="/m/#/index/"+_self.uid;
            }else if(type=="stu"){
                window.location.href="/wx/index?uid="+_self.uid;
            }
            console.log(_self)

          }).catch(function(err){
            _self.errorUtil(err);
          })
        }
    }
}
</script>
<style scoped>
.top-back {text-align: center;font-size: 36px;color: #444;position: fixed;left:0;right:0;padding:20px;background-color: #fff;z-index: 100;top: 0;}
.top-back .img1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
.n_title{width:80%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}


.radio-div{margin-top: 100px;}
.avatar:first-child{border-top: 1px solid #ededee;/*no*/}
.avatar{overflow: hidden;padding: 20px;border-bottom: 1px solid #ededee;/*no*/}
.avatar > div {float: left;}
.avatar-left{width: 90px;height:90px;border-radius: 100%;margin-right: 20px;}
.avatar-left img {width: 100%;}
.avatar-mid > p{height: 45px;line-height: 45px;}
.avatar-mid > p:first-child span {font-size: 30px;color: #444444;margin-right: 10px;}
.avatar-mid > p:last-child strong {font-size: 20px;color: #959494;margin-right: 10px;}
.avatar-mid > p:first-child img {width: 32px;height: 32px;}
.avatar-mid > p:last-child img {width: 32px;height: 32px;margin-top: 13px;}
.avatar > .avatar-right{float: right}
.avatar-right img {width: 36px;height: 36px;margin-top: 25px;margin-right: 30px;display: none;}

.active .avatar-right img{display: block;}

</style>
