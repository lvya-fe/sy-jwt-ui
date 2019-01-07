<template>
    <div>
        <div class="top-back">
            <img src="@/assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ title }}</div>
        </div>

        <div class="tab-con-db">
            <tab :line-width=2 active-color='#16c775' v-model="index" class="footer-tab">
                <tab-item class="vux-center" v-for="item in tarkName" :key="item.index" @on-item-click="tab">{{ item.name }} ({{ item.num }})</tab-item>
            </tab>
            <div class="contentSome">
                <p class="drop-down" v-if="dropDown">
                    <img src="../../assets/img/upgx.gif" alt="">
                </p>
                <div class="dbFirst" v-show="index==0">
                    <div class="dshDiv bscroll"  ref="bscroll">
                        <div class="bscroll-container">
                            <div class="zhYser">
                                <div class="ripple" v-for="(item,index) in pendingReview" :key="index" @click="to(item.type,item.id)">
                                    <div class="leftParent">
                                        <img class="first-img" :src="item.sceneImg">
                                        <p>{{ item.type==1&&(item.fType=='stu'||item.fType=='teaToStu')?item.name:item.type==1&&item.fType=='tea'?item.teaName:item.name }}</p>
                                    </div>
                                    <div class="ne-div">
                                        <p>
                                            <span>{{ item.title }}<img v-if="item.type==2" src="../../assets/img/dbzs.png" alt=""></span>
                                        </p>
                                        <p>{{ item.ctime }}</p>
                                        <p>
                                            <span>
                                                <img src="../../assets/img/dbchangjing.png">{{ item.sceneTitle }}
                                            </span>
                                            <span>
                                                <img class="marginLeftImg" src="../../assets/img/dbguocheng.png">{{ item.sceneItemTitle }}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <load-more v-show="loadshow" :show-loading="loadStatus" :tip="loadStatus?'正在加载':'暂无数据'"></load-more>
                        </div>
                    </div>
                </div>
                <div class="dbSecond zhYser" v-show="index==1">
                    <div class="ripple">
                        <div class="leftParent">
                            <img class="first-img" src="../../assets/img/yiwancheng.png">
                            <p>学生姓名</p>
                        </div>
                        <div class="ne-div">
                            <p>
                                <span class="leftStatusSpan greenSpanstatus"></span>
                                <span>任务的名字</span>
                            </p>
                            <p><img src="../../assets/img/dbshengyushijian.png">1天12小时23分15秒</p>
                            <p>
                                <span>
                                    <img src="../../assets/img/dbchangjing.png">场景名称
                                </span>
                                <span>
                                    <img src="../../assets/img/dbchangjing.png">场景名称
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="ripple">
                        <div class="leftParent">
                            <img class="first-img" src="../../assets/img/yiwancheng.png">
                            <p>学生姓名</p>
                        </div>
                        <div class="ne-div">
                            <p>
                                <span class="leftStatusSpan yellowSpanstatus"></span>
                                <span>任务的名字</span>
                            </p>
                            <p><img src="../../assets/img/dbbohui.png">2018:10:12 12:23:09</p>
                            <p>
                                <span>
                                    <img src="../../assets/img/dbchangjing.png">场景名称
                                </span>
                                <span>
                                    <img src="../../assets/img/dbchangjing.png">场景名称
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="ripple">
                        <div class="leftParent">
                            <img class="first-img" src="../../assets/img/yiwancheng.png">
                            <p>学生姓名</p>
                        </div>
                        <div class="ne-div">
                            <p>
                                <span class="leftStatusSpan"></span>
                                <span>任务的名字</span>
                            </p>
                            <p><img src="../../assets/img/dbweikaiqi.png">2018:10:12 12:23:09</p>
                            <p>
                                <span>
                                    <img src="../../assets/img/dbchangjing.png">场景名称
                                </span>
                                <span>
                                    <img src="../../assets/img/dbchangjing.png">场景名称
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="dbThird zhYser" v-show="index==2">
                    <div class="ripple">
                        <div class="leftParent">
                            <img class="first-img" src="../../assets/img/yiwancheng.png">
                            <p>学生姓名</p>
                        </div>
                        <div class="ne-div">
                            <p>
                                <span class="leftStatusSpan greenSpanstatus"></span>
                                <span>任务的名字</span>
                            </p>
                            <p><img src="../../assets/img/dbshengyushijian.png">1天12小时23分15秒</p>
                            <p>
                                <span>
                                    <img src="../../assets/img/dbchangjing.png">场景名称
                                </span>
                                <span>
                                    <img src="../../assets/img/dbchangjing.png">场景名称
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="ripple">
                        <div class="leftParent">
                            <img class="first-img" src="../../assets/img/yiwancheng.png">
                            <p>学生姓名</p>
                        </div>
                        <div class="ne-div">
                            <p>
                                <span class="leftStatusSpan yellowSpanstatus"></span>
                                <span>任务的名字</span>
                            </p>
                            <p><img src="../../assets/img/dbbohui.png">2018:10:12 12:23:09</p>
                            <p>
                                <span>
                                    <img src="../../assets/img/dbchangjing.png">场景名称
                                </span>
                                <span>
                                    <img src="../../assets/img/dbchangjing.png">场景名称
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Tab, TabItem, CellBox, Group, LoadMore } from "vux";
import qs from 'qs';
//import VueScroller from 'vue-scroller'
import {formatDate} from '@/plugins/formatDate.js';
import BScroll from "better-scroll";


export default {
    components:{
        Tab,
        TabItem,
        CellBox,
        Group,
        LoadMore,
    },
    data(){
        return{
            uid:this.$route.params.uid,
            id:this.$route.params.id,
            tarkName:[
                {
                    name:'待审核',
                    num:'0'
                },
                {
                    name:'待处理',
                    num:'0'
                },
                {
                    name:'待提交',
                    num:'0'
                }
            ],
            title:'待办',
            index: 0,

            //待审核数组
            pendingReview:[],
            loadStatus:true,
            loadshow:false,
            dropDown:false,
            status:true,
            ztSta:true,
            pageNo:0,
        }
    },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  watch:{
  },
  mounted() {

  },
  created(){
    this.loadData();
  },
    methods:{
      goback(){
          this.$router.go(-1);
      },
      tab(index){
        this.index=index
      },
      loadData(){
        var _self = this;
        this.$axios.post( process.env.API_ROOT+"app/tea/task/queryWriteBySceneid",
          qs.stringify({
            zt:'o',
            uid:_self.uid,
            sceneid:_self.$route.params.id,
            pageNo:_self.pageNo
          })
        ).then(function(res){
          if(res.isSuccess){
              console.log(res,'看总数据',_self.pageNo)
            if(_self.pageNo>1){
                res.data.forEach(function(el){
                    _self.pendingReview.push(el)
                })
                if(res.data==0){
                    _self.status=false
                }else{
                    _self.ztSta=true;
                }
            }else{
                _self.status=true
                _self.ztSta=true;
                _self.pendingReview=res.data
            }
            _self.$nextTick(() => {
                if (!_self.scroll) {
                    _self.scroll = new BScroll(_self.$refs.bscroll, {
                        click: true,
                        scrollY: true,
                        probeType: 3
                    });
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
                            _self.status=true;
                            _self.ztSta=true;
                            _self.loadStatus=true;
                            _self.pageNo=1;
                            _self.loadData()
                            // console.log(111)
                            _self.dropDown = false
                        }
                        //上拉加载 总高度>下拉的高度+10 触发加载更多
                        if(_self.scroll.maxScrollY>pos.y+10){
                            if(_self.status&&_self.ztSta){
                                _self.ztSta=false;
                                _self.loadStatus=true
                                _self.loadshow=true
                                console.log("加载更多")
                                _self.pageNo+=1
                                setTimeout(function(){
                                    _self.loadData();
                                    _self.scroll.refresh()
                                    _self.loadshow=false
                                },1000); 
                                //使用refresh 方法 来更新scroll  解决无法滚动的问题
                                console.log('refresh了啊')
                            }
                            if(!_self.status){
                                _self.loadStatus=false
                                console.log("暂无更多数据")
                            }
                            
                        }
                        // console.log(_self.scroll.maxScrollY+"总距离----下拉的距离"+pos.y)
                    })
                }else{
                    _self.scroll.refresh();
                }
                // console.log(_self.scroll.maxScrollY)
            });
          }
        }).catch(function(err){
          _self.errorUtil(err);
        })
      },
      to(type,id){
          if(type==1){
            this.$router.push({  path: '/AuditOperation/'+this.uid+'/'+id});
          }else{
            this.$router.push({path: '/AuditCer/'+this.uid+'/'+id});
          }
      },
      
    }
}
</script>

<style>
.tab-con-db .vux-tab{height: 85px;background-color: #ffffff}
.tab-con-db .vux-tab-container,.tab-con-db .vux-tab-wrap,.tab-con-db .vux-tab{height: 85px!important;padding-top: 0;}
.tab-con-db .vux-tab .vux-tab-item {font-size: 28px;line-height: 85px;}
.tab-con-db .vux-slider{border-bottom: 1px solid #e3e2e2;/*no*/padding-bottom: 20px;}


.weui-cells:before{content: none!important;}
.weui-cell_access.vux-cell-box:after{content:none!important;}

.tab-con-db .vux-no-group-title:after{content:none;}

</style>


<style scoped>
.top-back {text-align: center;font-size: 36px;color: #444;position: fixed;left:0;right:0;padding:20px;background-color: #fff;z-index: 100;top: 0;}
.top-back img{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
.n_title{width:55%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}


.tab-con-db{margin-top: 100px;margin-bottom: 100px;}



.zhYser{position: relative;}
.zhYser >div{padding: 25px;text-align: left;color: #444;overflow: hidden;border-bottom: 1px solid #f4f3f3;/*no*/margin-bottom: 30px;position: relative;}
.zhYser >div:last-child{border-bottom:none;}
.leftParent{width: 80px;float: left;}
.leftParent p{width:100%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;margin-top:5px;float:left;color:#999;}
.leftParent .first-img {width: 80px;height: 80px;float: left;border-radius:100%;}
.zhYser .ne-div{float: left;height: 80px;margin-left: 20px;}
.zhYser .ne-div p:first-child{position: relative;font-size: 28px;}
.zhYser .ne-div p:first-child img{width:36px;height:36px;vertical-align: middle;margin: -5px 0 0 10px;}
.zhYser .ne-div p:nth-child(2){font-size: 26px;color:#999;}
.zhYser .ne-div p:nth-child(2) img{width:28px;vertical-align: middle;margin-top:-2px;/*no*/margin-right:5px;}
.zhYser .ne-div p:nth-child(3){font-size: 26px;color:#acafb7;overflow: hidden;}
.zhYser .ne-div p:nth-child(3) span img{width:28px;vertical-align: middle;margin-top:-2px;/*no*/}
.zhYser .ne-div p:nth-child(3) span{float:left;width:250px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
.marginLeftImg{margin-left:10px;}

.leftStatusSpan {background: #d7d7d7;border: 3px solid #e9e4e4;border-radius: 50%;display:inline-block;width: 20px;height:20px;vertical-align: middle;margin-top:-3px;/*no*/}
.greenSpanstatus{background-color: #16c775!important;border-color: #bce1d0!important;}
.yellowSpanstatus{background-color: #ff7043!important;border-color: #f7bdaa!important;}



.dshDiv{position: absolute;bottom:0;top:190px;left:0;right:0;overflow: hidden;}
.pareLvea{position: relative;}
.drop-down{position: absolute;top:190px;left:0px;width: 100%;height: 50px;line-height:50px;text-align: center;}
.drop-down img{width:50px;height:50px;}
</style>
