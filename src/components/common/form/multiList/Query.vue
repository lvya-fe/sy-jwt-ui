<!--
组件名称：InputQuery
props:
  item
  iconType 图标类型，同表单名

event:
-->

<template>
  <div class="form-common form-item">
    <div class="form-wrap field-block">
      <p class="form-name-block vux-1px-b">
        {{item.formItemName}}
      </p>
      <!--自己给自己填写，只显示-->
      <ul class="itemsWrap" v-if="itemValArr.length > 0">
          <li v-for="select in itemValArr" :key="select">{{select}}</li>
      </ul>
      <div v-else class="nodata">
        <img src="../../../../assets/img/noData.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InputQuery',
    props: {
      item: {default: {}},
      iconType: {default: ''}
    },
    data () {
      return {
        // itemValArr:[]
      }
    },
    computed:{
      itemValArr(){
        return this.item.formItemValue.length>0 ? this.item.formItemValue.split(',') : [];
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
