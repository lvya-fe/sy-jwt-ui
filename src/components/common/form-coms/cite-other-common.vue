<!--
组件名称：引用他人 普通表单组件
props:
  item
  iconType 图标类型，同表单名

event:
-->

<template>
  <div class="form-wrap form-cite-column">
    <div class="user-avatar">
      <img class="user-circle" :src="cite.imgUrl?cite.imgUrl:'static/img/user/avatar-default.jpg'">
    </div>

    <div class="form-content form-user-custom">
      <div class="user-name">
        <img class="user-icon" src="static/img/user/user-icon.png">
        <span class="text-ellipsis">{{cite.name}}</span>
      </div>
      <div class="user-org">
        <img class="user-icon" src="static/img/user/org.png">
        <span>{{cite.orgNames}}</span>
      </div>
      <div class="user-result"><img class="user-icon" src="static/img/user/result.png">
        <div class="result-content">
          <pre>{{cite.val}}</pre><slot name="unit"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CiteOtherCommon',
    props: {
      cite: {type: Object, default: {}},
    },
    data () {
      return {
      }
    },
    watch: {
      item () {
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
