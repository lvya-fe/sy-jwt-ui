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
        <img :src="'static/icon/form/ico_'+ iconType +'.png'" class='icon_form' v-if="iconType">
        {{item.formItemName}}
      </p>
      <!--自己给自己填写，只显示-->
      <ul class="itemsWrap" v-if="item.formSelectItemResps.length > 0">
          <li v-for="(person,index) in item.formSelectItemResps" :key="index">{{person.value}}</li>
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
      item: {type: Object, default: {}},
      iconType: {type: String, default: ''}
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
