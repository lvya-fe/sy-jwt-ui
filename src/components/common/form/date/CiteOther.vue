<!--
组件名称：CiteSelf
props:
  item
  iconType 图标类型，同表单名

event:
-->

<template>
  <div class="form-common form-item">
    <div class="form-wrap">
      <span class="form-name">
          <img :src="'static/icon/form/ico_'+ iconType +'.png'" class='icon_form' v-if="iconType">
        {{item.formItemName}}
      </span>
    </div>
    <div class="form-wrap" v-for="(cite,index) in item.listCiteData">
      <div class="user-avatar">
        <img class="user-circle" src="static/img/user/avatar-default.jpg">
      </div>

      <div class="form-content form-user-custom">
        <div class="user-name">
          <img class="user-icon" src="static/img/user/user-icon.png">
          <span class="text-ellipsis">{{cite.name}}</span>
        </div>
        <div class="user-org"><img class="user-icon" src="static/img/user/org.png">{{cite.orgNames}}</div>
        <div class="user-result"><img class="user-icon" src="static/img/user/result.png">
          <div class="result-content">
            <pre>{{cite.val}}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CiteSelf',
    props: {
      item: {type: Object, default: {}},
      iconType: {type: String, default: ''}
    },
    data () {
      return {
      }
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

</style>
