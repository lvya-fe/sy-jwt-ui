<template>
  <div class="all-list">
    <div class="list" v-for="i in 8">
      <div class="list-img">
        <img src="static/img/header/claim.png" alt="">
      </div>
      <div class="list-info">
        <div class="title">
          捡到一辆自行车
        </div>
        <div class="info">
          <span>发布人: <span>袁雯 </span></span>
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
