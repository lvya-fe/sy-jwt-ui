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

    <!--文本 单条 多条 显示一样-->
    <div class="form-wrap-column" v-for="(cite,index) in item.listCiteData" :key='index' v-if="item.listCiteData.length>0">
      <div class="result-content textarea-bg">
        <pre>{{cite.val}}</pre>
      </div>
      <div class="result-content textarea-bg">
        <pre>{{cite.val}}</pre>
      </div>
    </div>
    <NoData v-else></NoData>

  </div>
</template>

<script>
  export default {
    name: 'InputQuery',
    props: {
      item: {type: Object, default: {}},
      iconType: {type: String, default: ''}
    },
    components: {
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
