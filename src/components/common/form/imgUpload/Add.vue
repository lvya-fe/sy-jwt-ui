<!--
组件名称：imgUpload
props:
  item
  iconType 图标类型，同表单名

event:
-->

<template>
  <div class="form-common form-input">
    <div class="form-wrap">
      <span class="form-name">
          <img :src="'static/icon/form/ico_'+ iconType +'.png'" class='icon_form' v-if="iconType">
        {{item.formItemName}}
      </span>
      <input type="text" class="form-inline" v-model="item.formItemValue"  @input="filterText" placeholder="请输入内容">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'imgUpload',
    props: {
      item: {default: {}},
      iconType: {default: ''}
    },
    data () {
      return {
      }
    },
    watch: {
    },
    methods: {
      filterText () {
        this.item.formItemValue = this.item.formItemValue.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,'')
      }
    },
    mounted () {

    }
  }
</script>
<style lang="less">

</style>
