<template>
    <div>
        <div class="me" v-show="show">
            <div class="avatar">
                <div class="avatar-left ripple">
                    <router-link :to="'/setStuAvatar/'+uid">
                    <img v-if='stu.pic==null' src="../../assets/img/morenPic.png" alt="">
                    <img v-if='stu.pic!=null' :src="stu.pic" alt="">
                    </router-link>
                </div>
                <div class="avatar-mid">
                    <p>
                        <span>{{stu.name}}</span>
                        <strong></strong>
                        <i class="icon iconfont icon-xuesheng"></i>
                    </p>
                    <p>
                        <img src="../../assets/img/nvxing.png" alt="" v-if="stu.sex=='W'">
                        <img src="../../assets/img/nanxing.png" alt="" v-if="stu.sex=='M'">
                    </p>
                </div>

                <div class="avatar-right ripple">
                    <img @click="logoout_()" src="../../assets/img/qiehuan.png" alt="">
                </div>

            </div>
            <router-link to="">
                <div class="belongs">
                    <span>班级</span>
                    <span>{{stu.orgname}}</span>
                </div>
            </router-link>
            <router-link to="">
                <div class="belongs" @click="show=false">
                    <span>社团</span>
                    <span></span>
                    <img src="@/assets/img/you.png" alt="">
                </div>
            </router-link>
            <router-link :to="'/inquiry/'+uid">
                <div class="belongs ripple">
                    <span>问询</span>
                    <span></span>
                    <img src="../../assets/img/you.png" alt="">
                </div>
            </router-link>
            <BottomNav v-bind:type="2" v-bind:uid="uid"></BottomNav>
        </div>
        <showorg v-show="!show" @closeSelect = "closeSelect" v-bind:conData="associations"></showorg>
    </div>
</template>
<script>

import qs from 'qs';
import BottomNav from '@/components/stu/studentBottom'
import showorg from '@/components/stu/showorg'

export default {
    name:'me',
    data(){
        return{
            uid:this.$route.params.uid,
            stu:{},
            associations:[],
            show:true
        }
    },
    components: {
        BottomNav,
        showorg
    },
    created(){
        this.loadData();
    },
    methods:{
        closeSelect(){
            this.show = true;
        },
        loadData(){
          var _self = this;
          this.$axios.post( process.env.API_ROOT+"app/stu/v1/personalCenter",
            qs.stringify({
              uid:_self.$route.params.uid
            })
          ).then(function(res){
            console.log(res)
            _self.stu = res.data.stu;
            _self.associations = res.data.associations;

          }).catch(function(err){
            _self.errorUtil(err);
          })
        },

        logoout_(){
            var _self = this;
            this.$axios.post(process.env.API_ROOT + "auth/logoout",
              qs.stringify({})
            ).then(function (res) {
              localStorage.setItem("token",res.token);
              location.replace("/auth/wx?uid="+_self.uid+"&code="+res.token);
            }).catch(function (err) {
            })
          }
        }
}
</script>
<style scoped>
 #app{margin-top: 0;}

.avatar{overflow: hidden;padding: 20px;border-bottom: 1px solid #ededed;/*no*/text-align: left;}
.avatar > div {float: left;}
.avatar-left{width: 100px;height:100px;border-radius: 100%;margin-right: 20px;}
.avatar-left img {width: 100px;height:100px;border-radius: 100%;}
.avatar-mid > p{height: 45px;line-height: 45px;}
.avatar-mid > p:first-child{margin-top:5px;}
.avatar-mid > p:first-child span {font-size: 30px;color: #444444;margin-right: 10px;}
.avatar-mid > p:first-child strong {font-size: 20px;color: #959494;margin-right: 10px;}
.avatar-mid > p:first-child i {font-size: 32px;}
.avatar-mid > p:last-child img {width: 32px;height: 32px;margin-top: 13px;}
.avatar > .avatar-right{float: right}
.avatar-right img {width: 40px;height: 40px;margin-top: 25px;}

.belongs{padding: 40px 30px;border-bottom: 1px solid #ededed;/*no*/overflow: hidden;position: relative;}
.belongs span:first-child{font-size: 28px;color: #444;float: left;}
.belongs span:nth-child(2){font-size: 26px;color: #8e8c8c;float: right;margin-right: 30px;}
.belongs > img{position: absolute;right: 20px;width: 24px;height: 24px;top: 47px;}

</style>
