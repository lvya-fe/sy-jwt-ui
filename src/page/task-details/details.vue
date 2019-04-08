<template>
  <div class="task-details full-page-bg">
    <Header></Header>
    <div class="empty-top"></div>
    <router-view></router-view>
  </div>
</template>

<style lang="less">

</style>

<script>
  import Header from "../../components/common/layout/header"
  export default {
    components: {
      Header,
    },
    data() {
      return {
        title: ''
      }
    },
    methods: {

    }
  }
</script>

