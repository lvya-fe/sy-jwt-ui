<template>
    <div class="header-nav">
      <img class="nav-left" src="static/img/header/back_left_green.png" alt="" @click="goBack">
      <div class="nav-title">{{ title?title: ''}}</div>
    </div>
</template>

<style lang="less">
  @import "less/header.less";
</style>

<script>
  export default {
    props: {
      title: {type: String, default: ''}
    },
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

