<!--
组件名称：DesTextQuery
props:
  item
  iconType 图标类型，同表单名

event:
-->

<template>
  <!--文本使用 textarea-->
  <div class="form-common form-item form-textarea">
    <QueryTextCommon :item="item" ></QueryTextCommon>
  </div>
</template>

<script>
  import QueryTextCommon from "../../form-coms/query-text-common.vue"
  export default {
    name: 'DesTextQuery',
    props: {
      item: {default: {}},
      iconType: {default: ''}
    },
    components:{
      QueryTextCommon
    },
    data () {
      return {

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
