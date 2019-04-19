<template>
  <div class="all-list">
    <div class="list"  v-for="i in 8">
      <div class="list-img">
        <img src="static/img/header/claim.png" alt="">
      </div>
      <div class="list-info">
        <div class="title">
          失物招领的标题失物招领的标题失物招领的标题
        </div>
        <div class="publisher-info">
          <span>发布人: <span>张晓峰 </span></span>
        </div>
        <div class="info ">
          <span>认领人: <span>小明 </span></span>
          <span class="time"> 2019-01-02 12:12:34</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {XInput} from "vux";

  export default {
    props: {
    },
    components: {
      XInput
    },
    data () {
      return {
      }
    },
    computed: {
    },
    watch: {
    },
    methods: {
    },
    mounted () {
    }
  }
</script>

<style lang="less">
  @import "less/task-list.less";
</style>
