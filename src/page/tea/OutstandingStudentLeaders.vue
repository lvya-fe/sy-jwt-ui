<template>
    <div>
        <div class="top-back" ref="topH">
            <img class="img-1" src="@/assets/img/back_left_green.png" alt="" @click="goback">
            <!-- <div class="filter_div" @click.stop="showFilter">
                <span>{{ showWz }}</span><img class="filter_img" src="@/assets/img/zs_sj.png" alt="">
                <ul class="select_fil" v-show="fliterSt">
                    <li v-for="(item,index) in filterUl" :key="index" v-if="(st!=0&&item.zt=='2')||(st==0&&item.zt=='1')" @click="tabFun(item.statu,item.title)" :class="item.title==showWz?'selected':''">
                        <img :src="item.img" alt="">
                        {{ item.title }}
                    </li>
                </ul>
            </div> -->
            <div class="n_title">{{ title }}</div>
        </div>
        <scroller class="scroll_div" :height="height" lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
            <div class="title-div">
                <flexbox :gutter="0" wrap="wrap">
                    <!-- <flexbox-item :span="1/4" v-for="(item,index) in list" :key="index" v-if="item.zt==showZ"> -->
                    <flexbox-item :span="1/4" v-for="(item,index) in list" :key="index">
                            <div class="flex-demo" @click="tabProp(item)">
                                <a :href="item.ztLink">
                                    <div class="set-div">
                                        <img class="img1" v-if="item.pic==''||item.pic==null||item.pic==undefined" src="@/assets/img/morenpic.png" alt="">
                                        <img class="img1" v-if="item.pic!=''&&item.pic!=null&&item.pic!=undefined" :src="item.pic" alt="">
                                        <img class="img2" v-if="st==0&&item.zt=='X'"  src="@/assets/img/weishangchuan.png" alt="">
                                        <img class="img2" v-if="st==0&&item.zt=='O'"  src="@/assets/img/weishenhe.png" alt="">
                                        <img class="img2" v-if="st==0&&item.zt=='N'"  src="@/assets/img/bohui.png" alt="">
                                        <img class="img2" v-if="st==0&&item.zt=='Y'"  src="@/assets/img/yitonggong.png" alt="">

                                        <img class="img2" v-if="st!=0&&item.zt=='X'"  src="@/assets/img/weihuide_s.png" alt="">
                                        <img class="img2" v-if="st!=0&&item.zt=='Y'"  src="@/assets/img/yihuode_s.png" alt="">
                                    </div>
                                    <p class="tit-p">{{ item.stuname }}</p>
                                </a>
                            </div>
                    </flexbox-item>
                </flexbox>
                <load-more :show-loading="onFetching" :tip="tsMsg" class="loadMore"></load-more>
            </div>
        </scroller>
        <div v-transfer-dom class="styleG">
            <alert v-model="show" title="该用户无证书"></alert>
        </div>
    </div>
</template>

<script>
  import qs from 'qs';
import {  Flexbox, FlexboxItem, TransferDom, Alert, Scroller, LoadMore } from "vux";
export default {
    directives: {
        TransferDom
    },
  created(){
    this.loadData();
    console.log(this.st)
    // if(this.st==0){
    //     this.showZ='O'
    //     this.showWz='未审核'
    // }else{
    //     this.showZ='Y'
    //     this.showWz='已获得'
    // }
  },
    components:{
         Flexbox,
         FlexboxItem,
         Alert,
         Scroller,
         LoadMore
    },
    data(){
        return{
            title:"",
            list:[],
            show:false,
            uid:this.$route.params.uid,
            id:this.$route.params.id,
            st:this.$route.params.st,

            num:0,
            height:0,
            onFetching:false,
            bottomCount:1,
            tsMsg:'暂无更多数据',

            // showZ:'',
            // showWz:'',
            // fliterSt:false,
            // filterUl:[
            //     {
            //         img:require('@/assets/img/zs_wsh.png'),
            //         title:'未审核',
            //         zt:'1',
            //         statu:'O'
            //     },
            //     {
            //         img:require('@/assets/img/zs_ytg.png'),
            //         title:'已通过',
            //         zt:'1',
            //         statu:'Y'
            //     },
            //     {
            //         img:require('@/assets/img/zs_bh.png'),
            //         title:'驳回',
            //         zt:'1',
            //         statu:'N'
            //     },
            //     {
            //         img:require('@/assets/img/zs_wsc.png'),
            //         title:'未上传',
            //         zt:'1',
            //         statu:'X'
            //     },
            //     {
            //         img:require('@/assets/img/zs_yhd.png'),
            //         title:'已获得',
            //         zt:'2',
            //         statu:'Y'
            //     },
            //     {
            //         img:require('@/assets/img/zs_whd.png'),
            //         title:'未获得',
            //         zt:'2',
            //         statu:'X'
            //     },
            // ]
        }
    },
    mounted(){
        let h = window.innerHeight
        let topH = this.$refs.topH.offsetHeight;
        console.log(h)
        console.log(topH)
        this.height=(h-topH-50)+'px'
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        // showFilter(){
        //     this.fliterSt=!this.fliterSt
        // },
        // tabFun(sta,tit){
        //     this.showZ=sta
        //     this.showWz=tit
        //     console.log(sta)
        // },
        onScrollBottom () {
            if(this.num<10){
                this.tsMsg='暂无更多数据'
            }else{
                if (this.onFetching) {
                    // do nothing
                } else {
                    this.onFetching = true
                    this.tsMsg='正在加载'
                    setTimeout(() => {
                        this.bottomCount += 1
                        this.$nextTick(() => {
                            console.log(this.bottomCount)
                            this.loadData()
                        })
                        this.tsMsg='加载完成'
                        this.onFetching = false
                    }, 2000)
                }
            }
        },
        loadData(){
          var _self = this;
          this.$axios.post( process.env.API_ROOT+"app/tea/"+_self.id+"/cerByQuerystu",
            qs.stringify({
              uid:_self.uid,
              pageNo:_self.bottomCount
            })
          ).then(function(res){
            _self.num=res.data.list.length;
            console.log(res.data.list)
            if(_self.list.length<=0){
                _self.list=res.data.list
            }else{
                res.data.list.forEach(function(el){
                    _self.list.push(el)
                })
            }
            _self.title = res.data.title;

          }).catch(function(err){
            _self.errorUtil(err);
          })
        },
        tabProp (item){
            if(item.zt=="X"){
                this.show=!this.show;
                return false;
            }
            this.$router.push({path: '/AuditCer/'+this.uid+'/'+item.id});
        },
        onConfirm (){

        }
    }
}
</script>
<style>
.title-div .flex-demo {margin-bottom: 20px;}
.vux-x-dialog .weui-dialog{max-width:520px;-webkit-transform: translate(0,0);transform: translate(0,0);left:0;top:0;}
.vux-x-dialog .weui-dialog__bd {padding: 0 1.6em .8em;min-height: 40px;font-size: 15px;line-height: 1.3;word-wrap: break-word;word-break: break-all;color: #999;}



.vux-x-dialog .weui-dialog{max-width:520px;}
.vux-x-dialog .weui-dialog__title {font-size: 28px;color: #444;}
.vux-x-dialog .weui-dialog__ft {line-height: 65px;}
.styleG .weui-dialog__ft .weui-dialog__btn_default {font-size: 28px;color: #fff;background-color: #8f8e8e;}
.styleG .weui-dialog__ft .weui-dialog__btn_primary {font-size: 28px;color: #fff;background-color: #16c775;}
</style>


<style scoped>
.top-back {text-align: center;font-size: 36px;color: #444;padding:20px;background-color: #fff;}
.top-back .img-1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
.n_title{width:55%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
.filter_div{position: absolute;width:25%;right:0;font-size:28px;top:25px;text-align:center;}
.filter_div > span{margin-right:10px;}
.filter_img{width:26px;height:26px;position: absolute;right:30px;top:8px;}
.select_fil{position:absolute;background:#fff;z-index:100;width:100%;box-shadow: 0 0 10px #ccc;right:5px;border-radius:3px;/*no*/}
.select_fil li{list-style:none;padding:10px 5px;line-height:40px;text-align:left;}
.select_fil .selected{background:#f0f0f0;}
.select_fil li img{width:30px;height:30px;vertical-align: middle;margin:-5px 0 0 10px;}


.title-div{padding: 10px 50px 0px;}
.set-div{text-align: center;position: relative;}
.set-div{width:115px;height:115px;border-radius: 100%;/*no*/margin: 0 auto;}
.set-div .img1{width:115px;height:115px;border-radius:100%;}
.set-div .img2{width:100%;position: absolute;top: 40px;left: 0;}
.set-div span{right:5px;}
.tit-p{width:115px;margin: 0 auto; text-align: center;font-size: 24px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;color: #444;}

.loadMore{font-size:28px;}
</style>
