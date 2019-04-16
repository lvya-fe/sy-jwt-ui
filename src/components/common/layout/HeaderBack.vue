<template>
    <div class="header-nav">
      <img class="nav-left" src="static/img/header/back_left_green.png" alt="" @click="goBack">
      <div class="nav-title">{{ title?title: taskInfo.name}}</div>
    </div>
</template>

<style lang="less">
  @import "less/header.less";
</style>

<script>
  import { mapState } from 'vuex'
  export default {
    props: {
      title: {type: String, default: ''}
    },
    computed: mapState({
      taskInfo: state => state.task.taskInfo,
    }),

    data() {
      return {}
    },
    methods: {
      goBack(){
        this.$router.go(-1)
      }
    }
  }
</script>

