<!--
组件名称：CiteOther
props:
  item
  iconType 图标类型，同表单名

event:
-->

<template>
  <div class="form-common form-item">
    <div class="form-wrap vux-1px-b">
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
    <NoData v-else></NoData>
  </div>
</template>

<script>
  import CiteOtherCommon from "../../form-coms/cite-other-common"
  export default {
    name: 'CiteOther',
    props: {
      item: {default: {}},
      iconType: {default: ''}
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
