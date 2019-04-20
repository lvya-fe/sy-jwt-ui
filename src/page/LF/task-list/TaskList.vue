<template>
  <div class="task-list">
    <HeaderBack title="任务列表"></HeaderBack>

    <div class="tab-con" id="tab-con">
      <tab :line-width=2 active-color="#16c775" v-model="type">
        <tab-item class="vux-center" v-for="item,index in typeList" :key="index" @on-item-click="tab">{{ item.name }}
          ({{ item.num}})
        </tab-item>
      </tab>
    </div>

    <div class="search">
        <group>
          <x-input placeholder="搜索你丢的物品" :show-clear="true" class="search-input">
          </x-input>
        </group>
        <x-icon type="ios-search-strong" class="search-icon" size="20"></x-icon>
    </div>
    <unclaimed v-show="type==0" :stuRespList="stuRespList"></unclaimed>
    <claim v-show="type==1" :stuRespList="stuRespList"></claim>

  </div>
</template>

<script>


  import {XSwitch, Tab, TabItem, Group,XInput} from "vux";
  import BScroll from 'better-scroll'
  import Scroll from "@/components/common/scroll.vue";
  import Unclaimed from './unclaimed.vue'
  import Claim from './claim.vue'

  const pageSize = 100

  export default {
    components: {
      XSwitch,
      Tab,
      TabItem,
      Scroll,
      XInput,
      Group,
      Unclaimed,
      Claim,
      BScroll
    },
    data() {
      return {
        uid: this.$route.params.uid,
        taskId: this.$route.params.id,
        type: 0,
        typeList: [
          {
            name: '未认领',
            type: "UNCOMMIT",
            num:0
          },
          {
            name: '已认领',
            type: "COMMIT",
            num:0
          }
        ],
        stuRespList:[],
      }
    },
    computed: {

    },
    watch: {

    },
    methods: {
      tab(index) {
          // tab选项
          let query = {
            ...this.$route.query,
            selectType:this.typeList[index].type
          }
          this.$router.replace({path: '/LF/task-list/' + this.uid, query})
          this.roleJudgment(this.typeList[this.type].type)
      },
      //角色判断
      roleJudgment(selectType){
        if(this.$route.query.roleType) Cookies.set('roleType', this.$route.query.roleType);
        if(this.$route.query.roleType == 'tea'){
          this.teaClaimInitData(selectType);
        }else{
          this.stuClaimInitData(selectType);
        }
      },
      // tab bar处理
      doTabNum(selectType, num) {
        if(selectType == 'UNCOMMIT') {
          this.typeList[0].num = num
        } else {
          this.typeList[1].num = num
        }
      },

      //老师查询未认领或已认领信息列表
      async teaClaimInitData(selectType){
          let params = {
            uid: this.$route.params.uid,
            sceneId: this.$route.query.sceneId,
            selectType: selectType,
            pageSize: pageSize
          }
          let data = await ApiApp.TaskTeaApp.showLostFoundTeaToStuTaskList(params)
          this.stuRespList = data.stuRespList;

          this.doTabNum(selectType, data.stuRespList.length)
      },
      //学生查询未认领信息列表
      async stuClaimInitData(selectType){
          let params = {
            uid: this.$route.params.uid,
            sceneId:this.$route.query.sceneId,
            selectType: selectType,
            pageSize: pageSize
          };
          let data = await  ApiApp.TaskStuApp.showLostFoundStuTaskList(params)
          this.stuRespList = data.stuRespList

          this.doTabNum(selectType, data.stuRespList.length)
      }
    },
    mounted() {
      // 初始化 未认领
      this.type = this.$route.query.selectType == "COMMIT" ? 1: 0
      // 同时加载两个tab
      this.roleJudgment("UNCOMMIT")
      this.roleJudgment("COMMIT");
    },
  }
</script>

<style lang="less">
  @import "less/task-list.less";
  .isFixed {
    position: fixed;
    top: 0;
    z-index: 999;
  }
</style>
