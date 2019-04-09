<!--
组件名称：引用他人 多媒体组件
props:

event:
-->

<template>
  <div class="form-common form-item">
    <!--<div class="form-wrap">-->
      <!--<span class="form-name">{{item.formItemName}}</span>-->
    <!--</div>-->
    <div class="form-wrap" v-for="(cite,index) in item.listCiteData">
      <div class="user-avatar">
        <img class="user-circle" :src="cite.imgUrl?cite.imgUrl:'static/img/user/avatar-default.jpg'">
        <div class="user-name">
          <span class="text-ellipsis">{{cite.name}}</span>
        </div>
        <div class="user-org">{{cite.orgNames}}</div>
      </div>

      <div class="form-content">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FormCommon',
    props: {
      item: {type: Object, default: {}}
    },
    data () {
      return {
      }
    },
    watch: {
      options () {
      }
    },
    methods: {
    },
    mounted () {
    }
  }
</script>
<style lang="less">

</style>
