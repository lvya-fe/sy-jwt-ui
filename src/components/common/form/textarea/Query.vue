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
  .textarea{
    position: relative;
    textarea:disabled{
      height: 150px;
      overflow: hidden;
      background-color: #fafafa;
    }
    .weui-cell{
      padding: 30px;
    }
    .weui-cell__bd{
      padding-right: 30px;
    }
    .readAll{
      .weui-textarea{
          padding-bottom: 0;
          height: auto;
          overflow: auto;
      }
    }
    .weui-textarea{
        padding: 15px;
        padding-bottom: 0;
    }
    .moreTxt{
        position: absolute;
        padding-left: 50px;
        right: 30px;
        bottom: 30px;
        background:linear-gradient(right,rgba(250,250,250,0),rgba(250,250,250,1));
        color: #1abe7f;
    }
  }
</style>
