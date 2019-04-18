<template>
  <div class="task-details full-page-bg">
    <HeaderBack :showBack="!noback"></HeaderBack>
    <div class="empty-top"></div>
    <router-view></router-view>
  </div>
</template>

<style lang="less">

</style>

<script>
  export default {
    data() {
      return {
        title: '',
        noback: false
      }
    },
    created() {
      this.noback = this.$route.query.noback;
    },
    methods: {

    }
  }
</script>

