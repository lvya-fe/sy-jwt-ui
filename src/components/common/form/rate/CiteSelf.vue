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
      <!--单条 通行显示-->
      <CiteSelfCommon
        :cite="cite"
        v-for="(cite,index) in item.listCiteData"
        :length="item.listCiteData.length"
        :key='index'
        v-if="item.listCiteData.length == 1">
      </CiteSelfCommon>
    </div>

    <!-- 多条 逐行显示-->
    <CiteSelfCommon
      :cite="cite"
      class="cite-self-multi"
      v-for="(cite,index) in item.listCiteData"
      :length="item.listCiteData.length"
      :key='index'
      v-if="item.listCiteData.length>1">
    </CiteSelfCommon>
    <!--无数据-->
    <NoData v-if="item.listCiteData.length == 0"></NoData>

  </div>
</template>

<script>
  import CiteSelfCommon from "../../form-coms/cite-self-common"
  export default {
    name: 'InputQuery',
    props: {
      item: {default: {}},
      iconType: {default: ''}
    },
    components: {
      CiteSelfCommon,
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
