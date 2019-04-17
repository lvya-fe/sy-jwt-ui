<!--
组件名称：inputadd
props:
  item
  iconType 图标类型，同表单名

event:
-->

<template>
  <div class="form-common form-datetime form-datetime-add">
    <div class="form-wrap">
      <span class="form-name form-name-block">
          <img :src="'static/icon/form/ico_'+ iconType +'.png'" class='icon_form' v-if="iconType">
          <Datetime v-model="item.formItemValue" class="date" format="YYYY-MM-DD HH:mm" @on-change="change" :title="item.formItemName"></Datetime>
      </span>

    </div>
  </div>
</template>

<script>
  import {Datetime} from "vux";
  export default {
    name: 'InputAdd',
    props: {
      item: {default: {}},
      iconType: {default: ''}
    },
    components: {
      Datetime,
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
