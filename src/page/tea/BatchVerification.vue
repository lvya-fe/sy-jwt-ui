<template>
    <div>
        <div class="top-back">
            <img src="@/assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ title }}</div>
        </div>

        <div class="tab-con">
            <tab :line-width=2 active-color='#16c775' v-model="index" class="footer-tab">
                <tab-item class="vux-center" v-for="item in tarkName" :key="item.index" @on-item-click="tab">{{ item.name }} ({{ item.num }})</tab-item>
            </tab>


            <div class="tab-swiper vux-center">
                  <group v-show="index != 3">
                    <template v-for="info in infos[index].list">

                      <cell-box class="con-child" link="" @click.native="to(info.type,info.id)">
                        <p>{{info.title}}<strong><img  v-if="info.type==2" src="@/assets/img/zhengshu.png" alt=""> </strong><br><span>{{info.name}} {{info.orgname}}</span></p>
                        <p><br><span>{{info.ctime}}</span></p>
                        <img class="right-img" src="@/assets/img/you.png" alt="" >
                      </cell-box>
                    </template>
                    <div class="no-msg-div" v-if="infos[index].list<=0">
                        <img src="@/assets/img/zanwushuju.png" alt="">
                        <span>暂无数据</span>
                    </div>
                  </group>


                  <group v-show="index == 3">
                    <template v-for="info in  infos[3].list">
                      <cell-box class="con-child">
                          <p>{{info.name}}<br><span>{{info.orgname}}</span></p>
                          <input type="checkbox" class="checkBox" :value="info.stuid"  v-model="selectStuId">
                      </cell-box>
                    </template>
                    <div class="no-msg-div" v-if="infos[3].list<=0">
                        <img src="@/assets/img/zanwushuju.png" alt="">
                        <span>暂无数据</span>
                    </div>
                  </group>
                <button v-show="index == 3" type="button" class="pl-btn"   @click="sendNotice" ref="up_btn" :disabled="selectStuId.length==0">批量通知</button>
            </div>
            <Infinite v-on:infinite="infiniteMore"  style="padding-top: 20px"></Infinite>
        </div>
    </div>
</template>

<script>
import { Tab, TabItem, CellBox, Group } from "vux";
import qs from 'qs';
//import VueScroller from 'vue-scroller'
import {formatDate} from '@/plugins/formatDate.js';
import Infinite from "@/components/vue-scroll";

export default {
    components:{
        Tab,
        Infinite,
        TabItem,
        CellBox,
        Group
    },
    data(){
        return{
            uid:this.$route.params.uid,
            id:this.$route.params.id,
            selectStuId:[],
            zt:'O',
            msg:"测试",
            isaction:true,
            tarkName:[
                {
                    name:'待审核',
                    num:'0'
                },
                {
                    name:'未通过',
                    num:'0'
                },
                {
                    name:'已通过',
                    num:'0'
                },
                {
                    name:'未填写',
                    num:'0'
                }
            ],

            infos:[
              {
                pageNo:1,
                zt:-1,
                list:[]
              },
              {
                pageNo:1,
                zt:-1,
                list:[]
              },
              {
                pageNo:1,
                zt:-1,
                list:[]
              },
              {
                pageNo:1,
                zt:-1,
                list:[]
              }
            ],
            title:'批量审核',
            value:false,
            index: 0,
            toggle:0,
        }
    },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  watch:{
    selectStuId(val, oldVal){//监听
      if(val.length>0){
        this.$refs.up_btn.style.background="#01c269"
        this.$refs.up_btn.style.borderColor="#01c269"
      }else{
        this.$refs.up_btn.style.background="#444"
        this.$refs.up_btn.style.borderColor="#444"
      }
    }
  },
  mounted() {

  },
  created(){
    this.loadData();
    this.query('O',0);
  },
    methods:{
      infiniteMore($state) {
        this.state = $state;
        if(this.index!=3) {
          this.query(this.zt,this.index);
        }else{
          this.query2(this.index);
        }
      },
      to(type,id){
        this.$router.push({  path: '/AuditOperation/'+this.uid+'/'+id});
      },
      goback(){
          this.$router.go(-1);
      },
      tab(index){
        if(this.state!=null){
          if (this.infos[index].zt == 0||this.infos[index].zt == -1) {
            this.isaction = true;
            this.state.reset();
          }
          if (this.infos[index].zt == 1) {
            this.isaction = false;
            this.state.completed("暂无数据")
          }
          if (this.infos[index].zt == 2) {
            this.isaction = false;
            this.state.completed("没有更多数据了");
          }
        }

        var zts = ['O','N','Y'];
        if(index!=3) {
          this.zt = zts[index];
          if (this.infos[index].zt == -1) {
            this.query(this.zt, index);
          }
        }else{
          if (this.infos[index].zt == -1) {
            this.query2(index);
          }
        }
      },
      loadData(){
        var _self = this;
        this.$axios.post( process.env.API_ROOT+"app/tea/task/BatchTaskIndex",
          qs.stringify({
            uid:_self.uid,
            sceneid:_self.$route.params.id,
          })
        ).then(function(res){
          console.log(res,'看一下数据')
          _self.tarkName[0].num=   res.data.taskcount1;
          _self.tarkName[1].num=   res.data.taskcount2;
          _self.tarkName[2].num=   res.data.taskcount3;
          _self.tarkName[3].num=   res.data.taskcount4;
        }).catch(function(err){
          _self.errorUtil(err);
        })
      },
      query(zt,index){
        var _self = this;
        this.$axios.post( process.env.API_ROOT+"app/tea/task/queryWriteBySceneid",
          qs.stringify({
            uid:_self.uid,
            sceneid:_self.$route.params.id,
            zt:zt,
            pageNo:_self.infos[index].pageNo
          })
        ).then(function(res){

          _self.infos[index].pageNo =     _self.infos[index].pageNo+1;
          res.data.forEach(function(item) {
            _self.infos[index].list.push(item);
          });

          _self.$nextTick(function(){
            if(_self.state!=null){
              _self.state.loaded();
            }
            if(res.data.length==15){
              _self.infos[index].zt = 0;
            }
            if(res.data.length<15){
              if(_self.state!=null){
                if(  _self.infos[index].list==0){
                  _self.infos[index].zt = 1;
                  _self.state.completed("暂无数据");
                }else{
                  _self.infos[index].zt = 2;
                  _self.state.completed("没有更多数据了");
                }
              }
            }
          });

        }).catch(function(err){
          _self.errorUtil(err);
        })
      },
      query2(index){

        var _self = this;

        this.$axios.post( process.env.API_ROOT+"app/tea/task/queryNoWriteBySceneid",
          qs.stringify({
            uid:_self.uid,
            sceneid:_self.$route.params.id,
            pageNo:_self.infos[index].pageNo
          })
        ).then(function(res){

          res.data.forEach(function(item) {
            _self.infos[index].list.push(item);
          });
          _self.infos[index].pageNo = _self.infos[index].pageNo+1;
          _self.$nextTick(function(){
            if(_self.state!=null){
              _self.state.loaded();
            }
            if(res.data.length==15){
              _self.infos[index].zt = 0;
            }
            if(res.data.length<15){
              if(_self.state!=null){
                if(  _self.infos[index].list==0){
                  _self.infos[index].zt = 1;
                  _self.state.completed("暂无数据");
                }else{
                  _self.infos[index].zt = 2;
                  _self.state.completed("没有更多数据了");
                }
              }
            }
          });

        }).catch(function(err){
          _self.errorUtil(err);
        })
      },

      sendNotice(){
        var stus = [];
        for (var i=0,len=this.selectStuId.length; i<len; i++) {
          var stuid = this.selectStuId[i];
          for (var j=0,len=this.infos[3].list.length; j<len; j++) {
            if (this.infos[3].list[j].stuid==stuid){
              var obj = this.infos[3].list[j];
              obj.id = stuid;
              stus.push(obj);
              break;
            }
          }
        }
        var json = {sceneid:this.id, relateid:this.id,relatetype:'2',sendids:stus,ptype:'3'};
        var jsonsrt =  JSON.stringify(json);
        this.$cookie.set('notified', jsonsrt, 1);
        this.$router.push({path: '/notified/'+this.uid+'/'+this.id});
      },
        tabIndex(target,nodeList){
            for(let i=0;i<nodeList.length;i++){
                if(target===nodeList[i]){
                    this.index = i;
                }
            }
        }
    }
}
</script>

<style>
.tab-con .vux-tab{height: 85px;background-color: #f4f4f4}
.tab-con .vux-tab-container,.tab-con .vux-tab-wrap,.tab-con .vux-tab{height: 85px!important;padding-top: 0;}
.tab-con .vux-tab .vux-tab-item {font-size: 28px;line-height: 85px;}
.tab-con .vux-slider{border-bottom: 1px solid #e3e2e2;/*no*/padding-bottom: 20px;}


.weui-cells:before{content: none!important;}
.weui-cell_access.vux-cell-box:after{content:none!important;}

.tab-con .vux-no-group-title:after{content:none;}

</style>


<style scoped>
.top-back {text-align: center;font-size: 36px;color: #444;position: fixed;left:0;right:0;padding:20px;background-color: #fff;z-index: 100;top: 0;}
.top-back img{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
.n_title{width:55%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}


.tab-con{margin-top: 100px;margin-bottom: 100px;}


.tab-swiper .con-child{margin-right: 10px;font-size: 28px;color: #444;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;padding: 25px;}
.con-child p{width: 100%;line-height: 40px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;text-align: left;font-size: 28px;}
.con-child p:nth-child(2) span {display: block;text-align: center;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
.con-child p strong{font-size: 28px;color: #868383;font-weight: 400;margin-left: 10px;}
.con-child p strong img{width: 24px;height:24px;}
.con-child p span{font-size: 26px;color: #868383;}
.con-child .right-img{position: absolute;right: 30px;width: 24px;height: 24px;}

.checkBox {width: 25px;height: 25px;background-color: #fff;-webkit-appearance:none;border: 1px solid #c9c9c9;/*no*/border-radius: 3px;/*no*/outline: none;padding: 2px;}
.checkBox:checked{background: url("../../assets/img/duigou.png")no-repeat center;background-size: cover;border: 1px solid #04BE02;/*no*/background-position: top left;}
.pl-btn{position: fixed;bottom: 0;left:0;right:0;width: 100%;height: 100px;line-height: 100px;font-size: 30px;background-color: #444;outline: none;color:#fff;border: 1px solid #444;}

.no-msg-div{color: #999;text-align: center;line-height: 64px;margin-top: 50px;}
.no-msg-div img{width: 70px;height: 70px;display: inline-block;vertical-align: middle}
.no-msg-div span{height: 70px;display: inline-block;vertical-align: middle;font-size:28px;}

</style>
