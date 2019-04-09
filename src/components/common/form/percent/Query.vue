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
      <span class="form-name">
          <img :src="'static/icon/form/ico_'+ iconType +'.png'" class='icon_form' v-if="iconType">
        {{item.formItemName}}
      </span>
      <!--自己给自己填写，只显示-->
      <div class="form-inline percent">
        <p>{{item.formItemValue}}</p>
        <span>%</span>
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
<style lang="less" scope>
  .percent{
    position: relative;
    p{
      padding-right: 30px;
    }
    span{
      position: absolute;
      right: 0;
      top: 10px;
    }
  }
</style>
