<template>
  <div class="task-list">
    <HeaderBack title="任务列表"></HeaderBack>

    <div class="tab-con">
      <tab :line-width=2 active-color='#16c775' v-model="type" class="footer-tab">
        <tab-item class="vux-center" v-for="item in typeList" :key="item.type" @on-item-click="tab">{{ item.name }}
          ({{ item.num }})
        </tab-item>
      </tab>
    </div>

    <div class="search">
        <group>
          <x-input placeholder="搜索你丢的物品" show-clear="false" class="search-input"></x-input>
        </group>
    </div>
    <!--<unclaimed></unclaimed>-->
    <claim></claim>
  </div>
</template>

<script>


  import {XSwitch, Tab, TabItem, Swiper, SwiperItem, CellBox, Group, Checker, CheckerItem, LoadMore,XInput} from "vux";
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
      Unclaimed,
      Claim
    },
    data() {
      return {
        uid: this.$route.params.uid,
        taskId: this.$route.params.id,
        type: 0,
        typeList: [
          {
            name: '已认领',
            type: 0
          },
          {
            name: '未认领',
            type: 1
          }
        ],
        value:'a'
      }
    },
    computed: {

    },
    watch: {
    },

    filters: {
    },
    methods: {
      tab() {

      }
    },
    mounted() {

    },
  }
</script>

<style lang="less">
  @import "less/task-list.less";
</style>
