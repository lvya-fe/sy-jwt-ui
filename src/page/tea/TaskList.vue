<template>
  <div>
    <div v-show="isshow">
      <div class="top-back">
        <img class="img-1" v-show="!noback" src="@/assets/img/back_left_green.png" alt="" @click="goback">

        <img src="@/assets/img/cishu.png" @click="isshow=!isshow" class="img-2" v-if="taskinfo.cycle!=0">

        {{ taskinfo.title }}
        <group class="right-btn" v-show="taskinfo.jointimetype==1">
          <x-switch title=" " v-model="taskinfo.islock" @on-change="changeTask"></x-switch>
        </group>
      </div>
      <div class="tab-con">
        <tab :line-width=2 active-color='#16c775' v-model="index" class="footer-tab">
          <tab-item class="vux-center" v-for="item in tarkName" :key="item.index" @on-item-click="tab">{{ item.name }}
            ({{ item.num }})
          </tab-item>
        </tab>
        <div class="tab-swiper vux-center" v-show="index == 0">
          <group>
            <template>
              <Scroll ref="scroll" class="scroll-content" :dataList="write" @scrollToEnd="QueryWrite" :showLoad="showWriteLoading">
                <cell-box class="con-child" :link="'/AuditOperation/'+uid+'/'+stu.id" v-for="(stu, index) in write" :key="index">
                  <p>{{stu.type=='teaToStu'||stu.type=='stu'?stu.stuName:stu.teaName}}<br><span>{{stu.type=='tea'?stu.teaOrgName.split(',')[0]:stu.type=='stu'?stu.stuOrgName:stu.type=='teaToStu'?stu.stuOrgName+' 填写老师：'+stu.teaName:''}}</span>
                  </p>
                  <p><br><span>{{stu.ctime}}</span></p>
                  <img class="right-img" src="@/assets/img/you.png" alt="">
                </cell-box>
              </Scroll>
            </template>
            <div class="no-msg-div" v-if="write<=0">
              <img src="@/assets/img/zanwushuju.png" alt="">
              <span>暂无数据</span>
            </div>
          </group>

        </div>
        <p class="drop-down" v-if="dropDown">
          <img src="../../assets/img/upgx.gif" alt="">
        </p>
        <div class="tab-swiper vux-center" v-show="index == 1">
          <div class="task-con-div bscroll" ref="bscroll">
            <div class="bscroll-container">
              <group class="pareLvea">
                <!--@change="btn($event)"-->
                <template  v-for="stu in nowrite">
                  <cell-box class="con-child">
                    <p>{{stu.type=='stu'||stu.type=='teaToStu'?stu.stuName:stu.teaName}}<br><span>{{ stu.type=='stu'||stu.type=='teaToStu'?stu.stuOrgName:stu.teaOrgName.split(',')[0] }} {{ stu.type=='teaToStu'?'数据填写人：'+stu.teaName:'' }}</span></p>
                    <input type="checkbox" class="checkBox" :value="(stu.type=='tea')?stu.teaId:stu.stuId" v-model="selectStuId" >
                  </cell-box>
                </template>
                <div class="no-msg-div" v-if="nowrite<=0">
                  <img src="@/assets/img/zanwushuju.png" alt="">
                  <span>暂无数据</span>
                </div>
                <load-more v-show="loadshow" :show-loading="loadStatus" :tip="loadStatus?'正在加载':'暂无数据'"></load-more>
              </group>
            </div>
          </div>


          <button type="button" class="pl-btn" @click="sendNotice(nowrite[0].type)" ref="up_btn"
                  :disabled="selectStuId.length==0">批量通知
          </button>
        </div>

      </div>
    </div>
    <showcycle v-show="!isshow" v-bind:conData="taskCycles" v-bind:indexCycle="indexCycle" @closeSelect="closeSelect"
               @selectCycle="selectCycle"></showcycle>
  </div>
</template>

<script>


  import {XSwitch, Tab, TabItem, Swiper, SwiperItem, CellBox, Group, Checker, CheckerItem, LoadMore} from "vux";
  import qs from 'qs';
  import {formatDate} from '@/plugins/formatDate.js';
  import showcycle from "@/components/tea/showcycle";

  import BScroll from 'better-scroll'

  import Scroll from "@/components/common/scroll.vue";

  export default {
    components: {
      XSwitch,
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      CellBox,
      Group,
      Checker,
      showcycle,
      CheckerItem,
      LoadMore,
      Scroll
    },
    data() {
      return {
        uid: this.$route.params.uid,
        id: this.$route.params.id,
        taskid: this.$route.params.taskid,
        back: this.$route.params.back,
        lastid_write: 0,
        lastid_nowrite: 0,
        taskinfo: [],
        taskCycles: [],
        selectStuId: [],
        write: [],
        indexCycle: 0,
        nowrite: [],
        isshow: true,
        stime: null,
        etime: null,
        tarkName: [
          {
            name: '已填写',
            num: '0'
          },
          {
            name: '未填写',
            num: '0'
          }
        ],
        value: false,
        index: 0,
        toggle: 0,


        loadStatus: true,
        loadshow: false,
        dropDown: false,
        status: true,
        ztSta: true,
        pageNo: 1,
        pageSize: 10,
        showWriteLoading: false,
      }
    },
    watch: {
      selectStuId(val, oldVal) {//监听
        if (val.length > 0) {
          this.$refs.up_btn.style.background = "#04BE02"
          this.$refs.up_btn.style.borderColor = "#04BE02"
        } else {
          this.$refs.up_btn.style.background = "#444"
          this.$refs.up_btn.style.borderColor = "#444"
        }
      }
    },

    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm");
      }
    },
    mounted() {
      let _this = this;
      //事件委托
      document.querySelector(".footer-tab").addEventListener("click", function (e) {
        let target = e.target;//事件发生的元素
        let nodeList = e.target.parentNode.children;//同级元素集合
      })
    },
    created() {
      this.loadData();

    },
    computed: {
      noback: function () {
        return this.back == 1 ? true : false;
      }
    },
    methods: {
      closeSelect() {
        this.isshow = true;
      },
      to(type, id) {
        this.$router.push({path: '/AuditOperation/' + this.uid + '/' + id});
      },
      changeTask(v) {
        var _self = this;
        this.$axios.post(process.env.API_ROOT + "app/tea/task/updatelock",
          qs.stringify({
            uid: _self.uid,
            taskid: _self.taskid,
            zt: v ? 'Y' : 'N'
          })
        ).then(function (res) {

        }).catch(function (err) {
          _self.errorUtil(err);
        })

      },
      selectCycle(v) {
        var cycles = this.taskCycles[v];
        this.isshow = true;
        this.write = [];
        this.nowrite = [];

        this.stime = cycles.stime;
        this.etime = cycles.etime;
        this.indexCycle = v;

        var _self = this;
        this.$axios.post(process.env.API_ROOT + "app/tea/task/queryCount",
          qs.stringify({
            uid: _self.uid,
            taskid: _self.taskid,
            stime: _self.stime,
            etime: _self.etime
          })
        ).then(function (res) {
          _self.tarkName[0].num = res.data.taskWriteStuCount;
          _self.tarkName[1].num = res.data.taskNoWriteStuCount;
        }).catch(function (err) {
          _self.errorUtil(err);
        })

        if (this.index == 0) {
          this.QueryWrite();
        } else {
          this.QueryNoWrite();
        }
      },
      goback() {
        this.$router.go(-1);
      },

      tab(index) {
        this.pageNo = 1
        this.write = []
        if (index == 0) {
          this.QueryWrite();
        } else {
          this.QueryNoWrite();
        }
      },
      sendNotice(type) {
        if (type == 'tea' || type == 'teaToStu') {
          this.$vux.toast.show({type: 'warn', text: '暂无权限'});
        } else {
          var stus = [];
          for (var i = 0, len = this.selectStuId.length; i < len; i++) {
            var stuid = this.selectStuId[i];
            for (var j = 0, len = this.nowrite.length; j < len; j++) {
              if (this.nowrite[j].stuid == stuid) {
                var obj = this.nowrite[j];
                obj.id = stuid;
                stus.push(obj);
                break;
              }
            }
          }

          var json = {sceneid: this.id, relateid: this.taskid, relatetype: '4', sendids: stus, ptype: '3'};
          var jsonsrt = JSON.stringify(json);
          this.$cookie.set('notified', jsonsrt, 1);
          this.$router.push({path: '/notified/' + this.uid + '/' + this.id});
        }
      },
      loadData() {
        var _self = this;
        this.$axios.post(process.env.API_ROOT + "app/tea/task/index",
          qs.stringify({
            uid: _self.uid,
            taskid: _self.taskid
          })
        ).then(function (res) {
          console.log(res, 'loadData')
          // _self.indexCycle =  res.data.taskCycles.length-1;
          _self.taskinfo = res.data.taskinfo;
          _self.taskCycles = res.data.taskCycles.reverse();


          _self.tarkName[0].num = res.data.taskWriteStuCount;
          _self.tarkName[1].num = res.data.taskNoWriteStuCount;


          if (_self.taskCycles.length > 0) {
            var cycles = _self.taskCycles[_self.taskCycles.length - 1];
            _self.stime = cycles.stime;
            _self.etime = cycles.etime;
          }

          _self.QueryWrite();

        }).catch(function (err) {
          _self.errorUtil(err);
        })
      },

      QueryWrite() {
        var _self = this;
        this.$axios.post(process.env.API_ROOT + "app/tea/task/queryWriteForms",
          qs.stringify({
            uid: _self.uid,
            lastid: _self.lastid_write,
            taskid: _self.taskid,
            stime: _self.stime,
            etime: _self.etime,
            pageNo: this.pageNo++,
            pageSize: this.pageSize,
          })
        ).then(function (res) {
          _self.write = _self.write.concat(res.data)
          if(res.data.length == 0) _self.showWriteLoading = false
        }).catch(function (err) {
          _self.errorUtil(err);
        })
      },
      QueryNoWrite() {
        var _self = this;
        this.$axios.post( process.env.API_ROOT+"app/tea/task/queryNoWriteForms",
          qs.stringify({
            uid:_self.uid,
            lastid:_self.lastid_nowrite,
            taskid:_self.taskid,
            stime:_self.stime,
            etime:_self.etime
          })
        ).then(function(res){
          console.log(res,'未填写人员')
          if(_self.lastid_nowrite>0){
            res.data.forEach(function(el){
              _self.nowrite.push(el)
            })
            if(res.data.length==0){
              _self.status=false
            }else{
              _self.ztSta=true;
            }
          }else{
            _self.status=true
            _self.ztSta=true;
            _self.nowrite = res.data;
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
                  _self.lastid_nowrite=0;
                  _self.QueryNoWrite()
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
                    // _self.pageNo+=1
                    if(_self.nowrite[_self.nowrite.length-1].type=='tea'){
                      _self.lastid_nowrite=_self.nowrite[_self.nowrite.length-1].teaId
                    }else{
                      _self.lastid_nowrite=_self.nowrite[_self.nowrite.length-1].stuId
                    }
                    setTimeout(function(){
                      _self.QueryNoWrite();
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

        }).catch(function(err){
          _self.errorUtil(err);
        })
      },
      tabIndex(target, nodeList) {
        for (let i = 0; i < nodeList.length; i++) {
          if (target === nodeList[i]) {
            this.index = i;
          }
        }
      }
    }
  }
</script>
<style>
  .right-btn .weui-cells:after {
    content: none;
  }

  .tab-con .vux-tab {
    height: 85px;
    background-color: #f4f4f4
  }

  .tab-con .vux-tab-container, .tab-con .vux-tab-wrap {
    height: 85px;
    padding-top: 0;
  }

  .tab-con .vux-tab .vux-tab-item {
    font-size: 28px;
    line-height: 85px;
  }

  .tab-con .vux-slider {
    border-bottom: 1px solid #e3e2e2; /*no*/
    padding-bottom: 20px;
  }

  .weui-cells:before {
    content: none !important;
  }

  .weui-cell_access.vux-cell-box:after {
    content: none !important;
  }

  .tab-swiper .vux-no-group-title:after {
    content: none !important;
  }
</style>


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

  .top-back .img-1 {
    position: absolute;
    width: 38px;
    height: 38px;
    left: 20px;
    top: 25px
  }

  .top-back .img-2 {
    position: absolute;
    width: 38px;
    height: 38px;
    left: 120px;
    top: 25px
  }

  .top-back .img-2 img {
    width: 42px;
    height: 42px;
  }

  .right-btn {
    position: absolute;
    right: 25px;
    top: 0;
  }

  .tab-con {
    margin-top: 100px;
    margin-bottom: 100px;
  }

  .tab-swiper .con-child {
    margin-right: 10px;
    font-size: 28px;
    color: #444;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 25px;
  }

  .con-child p:nth-child(2) span {
    display: block;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .con-child p strong {
    font-size: 28px;
    color: #868383;
    font-weight: 400;
    margin-left: 10px;
  }

  .con-child p strong img {
    width: 24px;
    height: 24px;
  }

  .con-child p {
    width: 100%;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    font-size: 28px;
  }

  .con-child p span {
    font-size: 26px;
    color: #868383;
  }

  .con-child .right-img {
    position: absolute;
    right: 30px;
    width: 24px;
    height: 24px;
  }

  .checkBox {
    width: 25px;
    height: 25px;
    background-color: #fff;
    -webkit-appearance: none;
    border: 1px solid #c9c9c9; /*no*/
    border-radius: 5px /*bo*/;
    outline: none;
    padding: 2px;
  }

  .checkBox:checked {
    background: url("../../assets/img/duigou.png") no-repeat center;
    background-size: cover;
    border: 1px solid #04BE02; /*no*/
    background-position: top left;
  }

  .pl-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100px;
    line-height: 100px;
    font-size: 30px;
    background-color: #444;
    outline: none;
    color: #fff;
    border: 1px solid #444;
  }

  .no-msg-div {
    color: #999;
    text-align: center;
    line-height: 64px;
    margin-top: 50px;
  }

  .no-msg-div img {
    width: 70px;
    height: 70px;
    display: inline-block;
    vertical-align: middle
  }

  .no-msg-div span {
    height: 70px;
    display: inline-block;
    vertical-align: middle;
    font-size: 28px;
  }

  .task-con-div {
    position: absolute;
    bottom: 100px;
    top: 190px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .pareLvea {
    position: relative;
  }

  .drop-down {
    position: absolute;
    top: 190px;
    left: 0px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .drop-down img {
    width: 50px;
    height: 50px;
  }
</style>
