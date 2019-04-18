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
  </div>

</template>

<script>


  import {XSwitch, Tab, TabItem, Swiper, SwiperItem, CellBox, Group, Checker, CheckerItem, LoadMore} from "vux";
  import BScroll from 'better-scroll'
  import Scroll from "@/components/common/scroll.vue";

  export default {
    components: {
      XSwitch,
      Tab,
      TabItem,
      Scroll
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
