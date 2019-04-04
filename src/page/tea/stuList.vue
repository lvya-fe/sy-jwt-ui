<template>
    <div>
        <div class="top-back" v-show="show3">
            <img class="img-1" v-show="!noback" src="../../assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ title }}</div>
            <span class="img-2" @click="propShow2" v-if="!(jointimetype==0&&cycle==0)">
                <i class="icon iconfont icon-shiyongcishu ripple"></i>
            </span>
        </div>
        <p class="drop-down" v-if="dropDown" v-show="show3">
            <img src="../../assets/img/upgx.gif" alt="">
        </p>
        <div class="list-con-div bscroll" :class="{'hasNoData':conData.length == 0}"  ref="bscroll" v-show="show3">
            <div class="bscroll-container">
                <div class="stuListPar">
                    <div class="ripple" v-for="(item,index) in conData" :key="index" @click="link(item.task.id,item.stu.id,item.task.joinstarttime,item.task.joinendtime,item.stu.name)">
                        <img class="first-img" src="../../assets/img/yiwancheng.png" v-if="item.task.statusName=='已完成'">
                        <img class="first-img" src="../../assets/img/jinxingzhong.png" v-if="item.task.statusName=='未完成'">
                        <img class="first-img" src="../../assets/img/daishenhe_t.png" v-if="item.task.statusName=='待审核'">
                        <img class="first-img" src="../../assets/img/yibohui_t.png" v-if="item.task.statusName=='未通过'">
                        <img class="first-img" src="../../assets/img/yijieshu.png" v-if="item.task.statusName=='已经结束'">
                        <img class="first-img" src="../../assets/img/weikaiqi.png" v-if="item.task.statusName=='尚未开始'">
                        <img class="first-img" src="../../assets/img/jinxingzhong.png" v-if="item.task.statusName=='进行中'">
                        <div class="ne-div">
                            <p>
                                <span>{{ item.stu.name }}</span>
                                <span>{{ item.stu.orgname }}</span>
                            </p>
                            <p>
                                {{ 
                                    item.task.statusName=='已完成'?'完成时间 :':
                                (item.task.statusName=='未完成'||item.task.statusName=='进行中')&&item.task.jointimetype==0?'不限制':
                                (item.task.statusName=='未完成'||item.task.statusName=='进行中')&&item.task.jointimetype==2?'剩余时间 :':
                                item.task.statusName=='待审核'?'提交时间 :':
                                item.task.statusName=='未通过'?'审核时间 :':
                                item.task.statusName=='已经结束'&&item.task.jointimetype==2?'结束时间 :':
                                item.task.statusName=='尚未开始'&&item.task.jointimetype==2?'开启时间:':'' }}
                                <span>{{ 
                                    (item.task.statusName=='尚未开始'&&item.task.jointimetype==2&&item.task.limittimes.length==0)?item.task.joinstarttime:
                                    (item.task.statusName=='尚未开始'&&item.task.jointimetype==2&&item.task.limittimes.length>0)?formatDuringNextDay(item.task.limittimes):
                                    item.task.statusName=='已完成'||item.task.statusName=='待审核'||item.task.statusName=='未通过'? item.task.joinStartTimeShow:
                                    item.task.statusName=='已经结束'&&item.task.jointimetype==2?item.task.joinendtime:
                                    (item.task.statusName=='未完成'||item.task.statusName=='进行中')&&item.task.jointimetype==2&&item.task.limittimes.length==0?formatDuring(item.task.joinendtime):
                                    (item.task.statusName=='未完成'||item.task.statusName=='进行中')&&item.task.jointimetype==2&&item.task.limittimes.length>0?formatDuringToday(item.task.limittimes):''
                                    }}</span> 
                                </p>
                            <img class="back-a" src="../../assets/img/you.png" alt="">
                        </div>
                    </div>
                    <div class="no-msg-div" v-if="conData.length<=0">
                        <img src="@/assets/img/zanwushuju.png" alt="">
                        <span>暂无数据</span>
                    </div>
                </div>
                <load-more v-show="loadshow" :show-loading="loadStatus" :tip="loadStatus?'正在加载':'暂无数据'"></load-more>
            </div>
            <!-- 暂无数据时显示 -->
            <!-- <div class="no-msg-div" v-if="conData.length<=0">
                <img src="@/assets/img/zanwushuju.png" alt="">
                <span>暂无数据</span>
            </div> -->
        </div>
        <showcycle v-if="show2" v-bind:conData="taskCycles" v-bind:indexCycle="indexCycle" @closeSelect="closeSelect" @selectCycle="selectCycle" v-bind:jointimetype="jointimetype" v-bind:cycle="cycle"></showcycle>

    </div>
</template>

<script>
import { LoadMore } from "vux";
import qs from 'qs';
import {formatDate} from '@/plugins/formatDate.js';
import BScroll from "better-scroll";
import showcycle from '@/page/tea/SelectionPeriod'


export default {
    components:{LoadMore,showcycle},
    data(){
        return{
            uid:this.$route.params.uid,
            id:this.$route.params.id,
            cycleid:this.$route.params.cycleid,
            back:this.$route.params.back,
            title:'',
            conData:[],
            pageNo:1,
            dropDown:false,
            status:true,
            ztSta:true,
            loadStatus:true,
            loadshow:false,
            taskCycles:[],
            jointimetype:'',
            cycle:'',
            show2:false,
            show3:true,
            indexCycle:0,
            formZt:'',
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
        
    },
    computed: {
        noback:function(){
        return this.back == 1 ? true : false;
        }
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        query(){
            var _self = this;
            console.log(this.id)
            if(_self.cycleid=='null'){
                _self.cycleid=null
            }
            this.$axios.post( process.env.API_ROOT+"app/tea/task/"+this.id+"/getDealTaskStu",
                qs.stringify({
                    uid:_self.$route.params.uid,
                    pageNo:_self.pageNo,
                    cycleId:_self.cycleid
                })
            ).then(function(res){
                console.log(res)
                if(res.success){
                    _self.taskCycles = res.data.taskCycle.reverse();
                    _self.jointimetype=res.data.task.jointimetype;
                    _self.cycle=res.data.task.cycle;
                    if(_self.pageNo>1){
                        res.data.listStuTask.forEach(function(el){
                            _self.conData.push(el)
                        })
                        if(_self.conData.length==res.data.total){
                            _self.status=false
                        }else{
                            _self.ztSta=true;
                        }
                    }else{
                        _self.status=true
                        _self.ztSta=true;
                        // _self.conData=res.data.listStuTask
                        _self.title=res.data.task.title
                        return;
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
                                    _self.query()
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
                                            _self.query();
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
        formatDuring(mss1){
            var time1 = mss1.replace(/-/g,'/');  // 月、日、时、分、秒如果不满两位数可不带0.
            var d1 = new Date(time1);  // 将指定日期转换为标准日期格式。Fri Dec 08 2017 20:05:30 GMT+0800 (中国标准时间)
            var c = d1.getTime()  // 将转换后的标准日期转换为时间戳。
            var d =Date.parse(new Date());

            var days = parseInt((c-d) / (1000 * 60 * 60 * 24));
            var hours = parseInt(((c-d) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = parseInt(((c-d) % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = ((c-d) % (1000 * 60)) / 1000;
            var a = days + " 天 " + hours + " 小时 " + minutes + " 分钟 "
            
            // console.log(a,'剩余时间')
            return a;
        },
        formatDuringToday(array){
            var _this = this;
            var date = new Date();
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            console.log(currentdate,'今天的日期')  
            console.log(array,'日期数组')  
            var conTime = null;
            array.forEach(function(el,index){
                if(el==currentdate){
                    conTime = _this.formatDuring(el+' 23:59:59')
                    console.log(conTime)
                }
            })
            return conTime
        },
        formatDuringNextDay(array){
            var _this = this;
            var d =Date.parse(new Date());
            console.log(d,'当前的时间戳')
            var con=null
            var indexC=null
            var stat=true
            array.forEach(function(el,index){
                if(stat){
                    var time1 = el.replace(/-/g,'/');  // 月、日、时、分、秒如果不满两位数可不带0.
                    var d1 = new Date(time1);  // 将指定日期转换为标准日期格式。Fri Dec 08 2017 20:05:30 GMT+0800 (中国标准时间)
                    var c = d1.getTime()  // 将转换后的标准日期转换为时间戳。
                    if(d<c){
                        indexC = index;
                        stat = false;
                    }
                }
            })
            con=array[indexC]+' 00:00:00'
            return con
        },
        link(id,stuid,str,end,stuname){
            var _self = this;
            this.$router.push({path: '/studentTaskDetailsTea/'+_self.uid+'/'+id+'/'+stuid+'/'+str+'/'+end+'/'+0+'/'+stuname});
        },
        propShow2(){
            this.show2=true
            this.show3=false
        },
        closeSelect(){
            this.show3 =true;
            this.show2=false;
        },
        selectCycle(v,indexv){
            this.show3 =true;
            this.show2=false;
            this.indexCycle=indexv
            this.cycleid=v
            console.log(this.cycleid)
            this.query()
        },
    },
}
</script>
<style>

</style>

<style scoped>
.top-back {text-align: center;font-size: 36px;color: #444;padding:20px;background-color: #fff;}
.top-back .img-1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
.top-back .img-2{position: absolute;left: 80px;top: 15px}
.top-back .img-2 i{color: #01c269;font-size: 40px;}
.n_title{width:55%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}


.list-con-div{position: absolute;bottom:0;top:90px;left:0;right:0;}
.stuListPar{position: relative;}
.stuListPar >div{padding: 25px;text-align: left;color: #444;overflow: hidden;border-bottom: 1px solid #f4f3f3;/*no*/margin-bottom: 30px;position: relative;}
.stuListPar >div:last-child{border-bottom:none;}
.stuListPar .first-img {width: 78px;height: 78px;float: left;}
.stuListPar .ne-div{float: left;height: 78px;margin-left: 20px;}
.stuListPar .ne-div p:first-child{position: relative;font-size: 28px;}
.stuListPar .ne-div p:nth-child(2){font-size: 26px;color:#999;}
.stuListPar .back-a{position: absolute;right: 20px;top: 50px;width: 24px;height: 24px;}

.no-msg-div{color: #999!important;text-align: center;line-height: 64px;margin-top: 50px;text-align:center!important;}
.no-msg-div img{width: 70px;height: 70px;display: inline-block;vertical-align: middle}
.no-msg-div span{height: 70px;display: inline-block;vertical-align: middle;font-size:28px;}

.bscroll{width: 100%;overflow: hidden;}
.bscroll.hasNoData{background-color:#fafafa;}
.drop-down{position: absolute;top:90px;left:0px;width: 100%;height: 50px;line-height:50px;text-align: center;}
.drop-down img{width:50px;height:50px;}
</style>
