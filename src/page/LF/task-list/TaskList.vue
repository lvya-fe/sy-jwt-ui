<template>
  <div class="task-list">
    <HeaderBack title="任务列表"></HeaderBack>

    <div class="tab-con" id="tab-con" :class="{fixTitle:whether}">
      <tab :line-width=2 active-color='#16c775' v-model="type" class="footer-tab">
        <tab-item class="vux-center" v-for="item in typeList" :key="item.type" @on-item-click="tab">{{ item.name }}
          ({{ item.num }})
        </tab-item>
      </tab>
    </div>

    <div class="search">
        <group>
          <x-input placeholder="搜索你丢的物品" show-clear="false" class="search-input">
          </x-input>
        </group>
        <x-icon type="ios-search-strong" class="search-icon" size="20"></x-icon>
    </div>
    <unclaimed v-show="toogleTask==0"></unclaimed>
    <claim v-show="toogleTask==1"></claim>
  </div>
</template>

<script>


  import {XSwitch, Tab, TabItem, Group,XInput} from "vux";
  import BScroll from 'better-scroll'
  import Scroll from "@/components/common/scroll.vue";
  import Unclaimed from './unclaimed.vue'
  import Claim from './claim.vue'

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
            type: 1
          },
          {
            name: '已认领',
            type: 0
          }
        ],
        value:'a',
        toogleTask:1,
        stuData:[]
      }
    },
    computed: {

    },
    watch: {
    },

    filters: {
    },
    methods: {
      tab(index) {
          this.toogleTask = index;
      },
      //角色判断
      roleJudgment(){
        debugger;
        if(this.$route.query.roleType) Cookies.set('roleType', this.$route.query.roleType);

        if(this.$route.query.roleType == 'tea'){
          this.teaClaimInitData();
        }else{
          this.stuClaimInitData();
        }
      },
      //老师查询未认领或已认领信息列表
      async teaClaimInitData(){
          let params = {
            uid: this.$route.params.uid,
            sceneId: this.$route.query.sceneId,
            selectType:this.toogleTask == 1 ? "UNCOMMIT" : "COMMIT"
          }
          await ApiApp.TaskTeaApp.teaQueryInfo(params);
      },
      //学生查询未认领信息列表
      async stuClaimInitData(){
          let params = {
            uid: this.$route.params.uid,
            sceneId:this.$route.query.sceneId,
            selectType:this.toogleTask == 1 ? "UNCOMMIT" : "COMMIT"
          };
          this.stuData = await  ApiApp.TaskStuApp.stuQueryUnclaimedInfo(params);

      }
    },
    mounted() {
      this.roleJudgment();
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
