<template>
  <div class="task-details full-page-bg">
    <HeaderBack></HeaderBack>
    <div class="empty-top"></div>
    <router-view></router-view>
  </div>
</template>

<style lang="less">

</style>

<script>
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

