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

    <CiteSelfCommon :cite="cite" v-for="(cite,index) in item.listCiteData" :key='index' v-if="item.listCiteData.length>0"></CiteSelfCommon>
    <NoData v-else></NoData>

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
