<!--
组件名称：InputQuery
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
    <!-- 单条 多条 逐行显示-->
    <CiteOtherCommon
      :cite="cite"
      v-for="(cite,index) in item.listCiteData"
      :key='index'
      v-if="item.listCiteData.length>0">
    </CiteOtherCommon>
    <!--无数据-->
    <NoData v-if="item.listCiteData.length == 0"></NoData>
  </div>
</template>

<script>
  import CiteOtherCommon from "../../form-coms/cite-other-common"
  export default {
    name: 'InputQuery',
    props: {
      item: {type: Object, default: {}},
      iconType: {type: String, default: ''}
    },
    components: {
      CiteOtherCommon,
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
