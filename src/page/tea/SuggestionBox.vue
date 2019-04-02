<template>
    <div>
        <div class="top-back">
            <img class="img1" src="@/assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ title }}</div>
        </div>

        <p class="drop-down" v-if="dropDown">
            <img src="../../assets/img/upgx.gif" alt="">
        </p>
        <div class="list-con-div bscroll"  ref="bscroll">
            <div class="bscroll-container">
                <ul>
                    <li v-for="(item,index) in conData" :key="index" :class="{lookY:item.lookY}">
                        <div class="list-con-left">
                            <img v-if='item.stu.pic==null' src="../../assets/img/morenpic.png" alt="">
                            <img v-if='item.stu.pic!=null' :src="item.stu.pic" alt="">
                            <p>{{ item.stu.name }}</p>
                        </div>
                        <div class="list-con-right">
                            <p class="noLook" :class="{yesLook:item.down}" a="f">
                                {{ item.content }}
                            </p>
                        </div>
                        <div class="bottom-div">
                            <div class="">
                                {{ item.ctime }}
                            </div>
                            <img @click="toggle(index)" :class="{tranX:item.down}" class="tran-img" src="@/assets/img/back_left.png" alt="" v-show="item.btnshow">
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 暂无数据时显示 -->
            <div class="no-msg-div" v-if="conData.length<=0">
                <img src="@/assets/img/zanwushuju.png" alt="">
                <span>暂无数据</span>
            </div>
        </div>
    </div>
</template>

<script>
import qs from 'qs';
import {formatDate} from '@/plugins/formatDate.js';
import BScroll from "better-scroll";

export default {
    data(){
        return{
        uid:this.$route.params.uid,
        title:'意见箱',
        conData:[],
        dropDown:false
        }
    },
    created(){
        this.query();
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm");
        }
    },
    mounted(){
        var _self=this
        _self.$nextTick(() => {
            if (!_self.scroll) {
                _self.scroll = new BScroll(_self.$refs.bscroll, {
                    click: true,
                    scrollY: true,
                    probeType: 3
                });
            }else{
                _self.scroll.refresh();
            }
            _self.scroll.on('scroll', (pos) => {
                // console.log(pos.y,_self.dropDown)
                //如果下拉超过50px 就显示下拉刷新的文字
                if(pos.y>50){
                    _self.dropDown = true
                }else{
                    _self.dropDown = false
                }
            })
            // touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
            _self.scroll.on('touchEnd', (pos) => {
                // 下拉动作
                if(pos.y > 50){
                    _self.query()
                    _self.dropDown = false
                }
                // //上拉加载 总高度>下拉的高度+10 触发加载更多
                // if(_self.scroll.maxScrollY>pos.y+10){
                //     console.log("加载更多")
                //     //使用refresh 方法 来更新scroll  解决无法滚动的问题
                //     _self.scroll.refresh()
                // }
                // console.log(_self.scroll.maxScrollY+"总距离----下拉的距离"+pos.y)
            })
            // console.log(_self.scroll.maxScrollY)
        });
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        toggle:function(index){
            this.conData[index].down=!this.conData[index].down;
        },
        query(){
            var _self = this;
            this.$axios.post( process.env.API_ROOT+"app/tea/querylistOpinion",
                qs.stringify({
                uid:_self.uid,
                })
            ).then(function(res){
                // _self.conData =  res.data;
                _self.conData=[];
                res.data.forEach(function(item) {
                _self.conData.push(
                        {
                            stu:item.stu,
                            lookY:false,
                            down:false,
                            btnshow:false,
                            ctime:item.ctime,
                            content:item.content
                        }
                    );
                });
                console.log(res)

            }).catch(function(err){
                _self.errorUtil(err);
            })
        }
    },
}
</script>
<style>

</style>

<style scoped>
.top-back {text-align: center;font-size: 36px;color: #444;padding:20px 20px 10px 20px;background-color: #fff;}
.top-back .img1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
.n_title{width:80%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}



.list-con-div{position: absolute;bottom:0;top:90px;left:0;right:0;}
.list-con-div ul li {overflow:hidden;padding: 15px 20px;border-bottom: 1px solid #f4f4f4;/*no*/position: relative;}
.list-con-left {float: left;width: 90px;height: 90px;border-radius: 100%;margin-right: 20px;}
.list-con-left img{width: 90px;height:90px;border-radius: 100%;}
.list-con-left p{width:90px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;text-align:center;font-size: 28px;}
.list-con-right {float: left;width: 580px;font-size: 26px;color: #444;}

.bottom-div{width: 100%;padding-top: 10px;position: relative;clear: both;}
.bottom-div div:nth-child(1){float: left;width: 580px;color: #444;font-size: 24px;margin-left:110px;}

.noLook{max-height: 120px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp:3;overflow: hidden;}
.yesLook{max-height: 10000px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp:1000;overflow: hidden;}
.tran-img{transform:rotate(-90deg);-ms-transform:rotate(-90deg); -moz-transform:rotate(-90deg);-webkit-transform:rotate(-90deg);-o-transform:rotate(-90deg); width: 38px;height: 38px;position: absolute;right: 0;top: 10px;}
.tranX{transform:rotate(90deg);-ms-transform:rotate(90deg); -moz-transform:rotate(90deg);-webkit-transform:rotate(90deg);-o-transform:rotate(90deg); width: 38px;height: 38px;position: absolute;right: 0;top: 10px;}

.lookY p,.lookY div{color:#a9a9ac!important;}

.no-msg-div{color: #999;text-align: center;line-height: 64px;margin-top: 50px;}
.no-msg-div img{width: 70px;height: 70px;display: inline-block;vertical-align: middle}
.no-msg-div span{height: 70px;display: inline-block;vertical-align: middle;font-size:28px;}

.bscroll{width: 100%;overflow: hidden;}
.drop-down{position: absolute;top:90px;left:0px;width: 100%;height: 50px;line-height:50px;text-align: center;}
.drop-down img{width:50px;height:50px;}
</style>
