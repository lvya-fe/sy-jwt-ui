<!--
组件名称：InputQuery
props:
  item
  iconType 图标类型，同表单名

event:
-->

<template>
  <div class="form-common form-item">
    <div class="form-wrap" :class="{'hasIcon':iconType}">
      <img :src="'static/icon/form/ico_'+ iconType +'.png'" class='icon_form' v-if="iconType">
      <span class="form-name">
        {{item.formItemName}}
      </span>
      <!--自己给自己填写，只显示-->
      <div class="form-inline">
        <p>{{item.formItemValue}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InputQuery',
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
