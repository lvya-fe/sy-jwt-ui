<!--
组件名称：CiteSelfText
props:
  item
  iconType 图标类型，同表单名

event:
-->

<template>
  <div class="form-common form-item form-textarea">
    <div class="form-wrap">
      <span class="form-name">
          <img :src="'static/icon/form/ico_'+ iconType +'.png'" class='icon_form' v-if="iconType">
        {{item.formItemName}}
      </span>
    </div>

    <!-- 单条 多条 逐行显示-->
    <div v-if="item.listCiteData && item.listCiteData.length>0" class="text-cite-item">
      <div class="form-wrap form-cite-column-self">
        <CiteSelfText :item="cite" v-for="(cite,index) in item.listCiteData" :key="index"></CiteSelfText>
      </div>
    </div>
    <!--无数据-->
    <NoData v-else></NoData>
  </div>
</template>

<script>
  import { XTextarea} from "vux";
  import CiteSelfText from "../../form-coms/cite-self-text.vue"
  export default {
    props: {
      item: {default: {}},
      iconType: {default: ''}
    },
    components: {
      CiteSelfText,
      XTextarea,
    },
    data () {
      return {
        field:[]
      }
    },
    watch: {
    },
    methods: {
    },
    created () {
    }
  }
</script>
<style lang="less">

</style>
