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
      <ul class="radioLists">
        <li v-for="(radio,index) in item.formSelectItemResps" :class="{'vux-1px-t': index != 0}" :key="radio.id">
          <p :class="{'checked': item.formItemValue.split(',').includes(radio.value)}">{{radio.value}}</p>
        </li>
      </ul>
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
<style lang="less" scope>
  .field-block{
    ul{
      padding: 0 30px;
      li{
        list-style: none;
        padding: 30px 0;
        .checked{
          background: url('../../../../assets/img/checked.png') no-repeat right center;
          background-size: 35px 31px;
        }
        
      }
    }
  }
</style>