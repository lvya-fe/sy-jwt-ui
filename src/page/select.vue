<template>
    <div>
        <div class="top-back">
            <!-- <img class="img1" src="@/assets/img/back_left_green.png" alt="" @click="goback"> -->
            {{ title }}
        </div>
        <div class="radio-div">
            <div class="avatar" v-for="(item,index) in conData" :key="index" :class="{active:index==active}"
                 @click="toggle(index,item)">
                <div class="avatar-left">
                    <img src="@/assets/img/morenpic.png" alt="" v-if="item.pic==null">
                    <img :src="item.pic" alt="" else>
                </div>
                <div class="avatar-mid">
                    <p>
                        <span>{{ item.name }}</span>
                        <i class="icon iconfont" :class="item.type=='t'?'icon-laoshi':'icon-xuesheng'"></i>
                    </p>
                    <p>
                        <strong>{{ (item.type=='t')?'老师':'学生' }}</strong>
                    </p>
                </div>
                <div class="avatar-right">
                    <img src="@/assets/img/duigou.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import qs from 'qs';
    import Cookies from 'js-cookie';

    export default {
        data() {
            return {
                title: '选择账号',
                active: -1,
                token: "",
                show: false,
                conData: []
            }
        },
        created() {
            var token_ =  Cookies.get('wxtoken_');
            Cookies.get('wxtoken',token_);
            Cookies.set('iosurl',window.location.href);
            this.token = Cookies.get('wxtoken');
            this.loadData();
        },
        methods: {
            // goback(){
            //     this.$router.go(-1);
            // },
            toggle(index, item) {
              //  var httpUrl = localStorage.lasturl;
                var  httpUrl =  Cookies.get('lasturl');
                //alert(httpUrl);
                if (httpUrl != null && httpUrl != "") {
                    //学生
                    if(httpUrl.indexOf("stu777")!=-1){
                        if (item.type != 's') {
                            this.$vux.toast.show({type: 'warn', text: "无权限"});
                            return false;
                        }
                    }
                    //老师
                    if(httpUrl.indexOf("tea777")!=-1){
                        if (item.type != 't') {
                            this.$vux.toast.show({type: 'warn', text: "无权限"});
                            return false;
                        }
                    }
                }
                this.active = index;
                var _self = this;
                this.$axios.post(process.env.API_ROOT + "app/auth/selectuser",
                    qs.stringify({
                        uid: _self.$route.params.uid,
                        type: item.type,
                        id: item.id,
                        code: _self.token
                    })
                ).then(function (res) {

                    Cookies.set('lasturl',"");
                    localStorage.removeItem("lasturl");

                    Cookies.set('indexB',0);
                    Cookies.set('indexC',0);

                    //如果带后缀直接请分享页面
                    if (httpUrl != null && httpUrl != "") {
                        if(httpUrl.indexOf("stu777")!=-1||httpUrl.indexOf("tea777")!=-1){
                            location.replace(httpUrl);
                            return false;
                        }
                    }

                    if (item.type == 's') {
                        _self.$router.push({path: '/stuIndex/' + _self.$route.params.uid});
                    } else {
                        _self.$router.push({path: '/index/' + _self.$route.params.uid});
                    }


                }).catch(function (err) {
                    _self.errorUtil(err);
                })

            },
            loadData() {
                var _self = this;
                if (_self.token.length != 36) {
                    this.$axios.post(process.env.API_ROOT + "app/auth/logoout",
                        qs.stringify({})
                    ).then(function (res) {
                        localStorage.setItem("token", res.token);
                        Cookies.set('wxtoken', res.token);
                        location.replace("/app/auth/wx?uid=" + _self.$route.params.uid + "&code=" + res.token);
                    }).catch(function (err) {
                    })
                } else {
                    this.$axios.post(process.env.API_ROOT + "app/auth/queryWxSelect",
                        qs.stringify({
                            uid: _self.$route.params.uid,
                            code: _self.token
                        })
                    ).then(function (res) {
                        _self.conData = res.data;


                    }).catch(function (err) {
                        _self.errorUtil(err);
                    })
                }
            }
        }
    }
</script>
<style scoped>
    .top-back {
        text-align: center;
        font-size: 36px;
        color: #444;
        position: fixed;
        left: 0;
        right: 0;
        padding: 20px;
        background-color: #fff;
        z-index: 100;
        top: 0;
    }

    .top-back .img1 {
        position: absolute;
        width: 38px;
        height: 38px;
        left: 20px;
        top: 25px
    }

    .radio-div {
        margin-top: 100px;
    }

    .avatar:first-child {
        border-top: 1px solid #ededee; /*no*/
    }

    .avatar {
        overflow: hidden;
        padding: 20px;
        border-bottom: 1px solid #ededee; /*no*/
    }

    .avatar > div {
        float: left;
    }

    .avatar-left {
        width: 90px;
        height: 90px;
        border-radius: 100%;
        margin-right: 20px;
    }

    .avatar-left img {
        width: 90px;
        height: 90px;
        border-radius: 100%;
    }

    .avatar-mid > p {
        height: 45px;
        line-height: 45px;
    }

    .avatar-mid > p:first-child span {
        font-size: 28px;
        color: #444444;
        margin-right: 10px;
    }

    .avatar-mid > p:last-child strong {
        font-size: 26px;
        color: #959494;
        margin-right: 10px;
        font-weight: 400;
    }

    .avatar-mid > p:first-child i {
        font-size: 32px;
    }

    .avatar-mid > p:last-child img {
        width: 32px;
        height: 32px;
        margin-top: 13px;
    }

    .avatar > .avatar-right {
        float: right
    }

    .avatar-right img {
        width: 36px;
        height: 36px;
        margin-top: 25px;
        margin-right: 30px;
        display: none;
    }

    .active .avatar-right img {
        display: block;
    }

</style>
