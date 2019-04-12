<!--
组件名称：InputQuery
props:
  item
  iconType 图标类型，同表单名

event:
-->

<template>
  <div class="form-common form-item form-textarea">
    <QueryTextCommon :item="item" ></QueryTextCommon>
  </div>
</template>

<script>
  import QueryTextCommon from "../../form-coms/query-text-common.vue"
  export default {
    name: 'InputQuery',
    props: {
      item: {default: {}},
      iconType: {default: ''}
    },
    data () {
      return {
      }
    },
    components:{
      QueryTextCommon
    },
    methods: {
    },
    mounted () {
    }
  }
</script>
<style lang="less">

</style>
