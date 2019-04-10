<!--
组件名称：imgUpload
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
      <ul v-if="item.formSelectItemResps.length > 0" class="img-items">
        <li v-for="(url,i) in item.formSelectItemResps" :key="i">
            <img :src="url.value" :preview="i" alt="">
        </li>
      </ul>
      <!--无数据-->
      <NoData v-else></NoData>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'imgUpload',
    props: {
      item: {default: {}},
      iconType: {default: ''}
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
  .img-items{
      padding: 0 30px;
      margin: 0;
      font-size: 0;
      li{
          display: inline-block;
          margin: 0 22px 22px 0;
          width:215px;
          height: 215px;
          &:nth-child(3n+3){
              margin-right: 0;
          }
          img{
              width: 100%;
              height: 100%;
          }
      }
  }
</style>
