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
        toogleTask:0
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
      throttleScroll(){
      /*  debugger;
        this.scroll  = document.documentElement.scrollTop || document.body.scrollTop;
        let menuTop = document.querySelector('.task-list').offsetTop;
        console.log(menuTop)
        if (_self.scroll > menuTop) {
          this.searchBarFixed = true
        } else {
          this.searchBarFixed = false
        }*/
      }
    },
    mounted() {
     // window.addEventListener('scroll', this.throttleScroll, false);
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
