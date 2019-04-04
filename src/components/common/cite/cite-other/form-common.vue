<!--
组件名称：引用他人 普通表单组件
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
        <img class="user-circle" src="../../../../assets/img/common/user/avatar-default.jpg">
        <div class="user-name">
          <span class="text-ellipsis">{{cite.name}}</span>
        </div>
        <div class="user-org">{{cite.orgNames}}</div>
      </div>

      <div class="form-content form-user-custom">
        <div class="user-name">
          <img class="user-icon" src="../../../../assets/img/common/user/user-icon.png">
          <span class="text-ellipsis">{{cite.name}}</span>
        </div>
        <div class="user-org"><img class="user-icon" src="../../../../assets/img/common/user/org.png">{{cite.orgNames}}</div>
        <div class="user-result"><img class="user-icon" src="../../../../assets/img/common/user/result.png">
        <div class="result-content">
          {{cite.val}}
        </div>
        </div>
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
