<template>
  <div>
    <div class="me" v-show="show">
        <div class="avatar">
            <div class="avatar-left">
                  <router-link :to="'/setTeaAvatar/'+uid">
                    <img src="@/assets/img/toupiao.png" v-show="info.info.pic==''||info.info.pic==null" alt="">
                    <img :src="info.info.pic" v-show="info.info.pic!=''||info.info.pic!=null" alt="">
                    </router-link>
            </div>
            <div class="avatar-mid">

                <p>
                    <span>{{info.info.nickname}}</span>
                    <i class="icon iconfont icon-laoshi"></i>
                </p>
                <p>
                    <img src="@/assets/img/nanxing.png" alt="" v-if="info.info.sex!='w'">
                    <img src="@/assets/img/nvxing.png" alt=""  v-else>
                </p>

            </div>
            <div class="avatar-right" @click="quehuan">
                <img src="@/assets/img/qiehuan.png"  alt="">
            </div>
        </div>
        <router-link to="">
             <div class="belongs" @click="type=1;show=false">
                <span>所属部门</span>
                <span>{{info.c1name}}</span>
                <img src="@/assets/img/you.png" alt="">
            </div>
        </router-link>
        <router-link to="">
            <div class="belongs" @click="type=2;show=false">
                <span>教授班级</span>
                <span>{{info.c2name}}</span>
                <img src="@/assets/img/you.png" alt="">

            </div>
        </router-link>
        <router-link :to="'/MyStudent/'+uid">
            <div class="belongs">
                <span>我的学生</span>
                <span>{{info.stus}}人</span>
                <img src="@/assets/img/you.png" alt="">
            </div>
        </router-link>
    </div>
    <showorg v-show="!show" @closeSelect = "closeSelect" v-bind:conData="info.orgs" v-bind:type="type"></showorg>
    <BottomNav v-bind:type="4" v-bind:uid="uid"></BottomNav>
  </div>
</template>
<script>

  import BottomNav from '@/components/tea/bottomNav'
  import showorg from '@/components/tea/showorg'
  import qs from 'qs';
  export default {
    name:'me',
    data(){
      return{
        uid:this.$route.params.uid,
        type:1,
        info:[],
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
    methods: {
      closeSelect(){
        this.show = true;
      },
      loadData(){
        var _self = this;
        this.$axios.post(process.env.API_ROOT + "app/tea/my/" + this.uid,
          qs.stringify({})
        ).then(function (res) {
          _self.info = res.data;
          console.log(res)
        }).catch(function (err) {
          _self.errorUtil(err);
        })

      },
      quehuan(){
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
.avatar-mid > p:first-child {margin-top:5px;}
.avatar-mid > p:first-child span {font-size: 28px;color: #444444;margin-right: 10px;}
.avatar-mid > p:first-child strong {font-size: 26px;color: #959494;margin-right: 10px;}
.avatar-mid > p:first-child img {width: 32px;height: 32px;}
.avatar-mid > p:first-child i {font-size: 32px;}
.avatar-mid > p:last-child img {width: 32px;height: 32px;margin-top: 13px;}
.avatar > .avatar-right{float: right}
.avatar-right img {width: 40px;height: 40px;margin-top: 25px;}

.belongs{padding: 40px 30px;border-bottom: 1px solid #ededed;/*no*/overflow: hidden;position: relative;}
.belongs span:first-child{font-size: 28px;color: #444;float: left;}
.belongs span:nth-child(2){font-size: 26px;color: #8e8c8c;float: right;margin-right: 30px;}
.belongs > img{position: absolute;right: 20px;width: 24px;height: 24px;top: 47px;}

</style>
