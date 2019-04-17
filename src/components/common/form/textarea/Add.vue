<!--
组件名称：teaxaadd
props:
  item
  iconType 图标类型，同表单名

event:
-->

<template>
  <div class="form-common form-textarea-add">
    <div class="form-wrap">
      <span class="form-name form-name-block vux-1px-b">
          <img :src="'static/icon/form/ico_'+ iconType +'.png'" class='icon_form' v-if="iconType">
        {{item.formItemName}}
      </span>
    </div>
    <div class="form-wrap">
      <x-textarea v-model="item.formItemValue" placeholder="请输入内容" :show-counter="false"></x-textarea>
    </div>
  </div>
</template>

<script>
  import {XTextarea} from "vux";
  export default {
    name: 'TextAreaAdd',
    props: {
      item: {default: {}},
      iconType: {default: ''}
    },
    components: {
      XTextarea,
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
