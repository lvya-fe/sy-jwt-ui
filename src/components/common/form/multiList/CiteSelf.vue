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

      <!-- 单条 多条 逐行显示-->
      <ul class="itemsWrap" v-if="item.listCiteData.length > 0">
        <div v-for="cite in item.listCiteData">
          <li v-for="text in doList(cite.val || cite.imgUrl)">
            {{text}}
          </li>
        </div>
      </ul>
      <!--无数据-->
      <NoData v-if="item.listCiteData.length == 0"></NoData>
    </div>
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
    computed: {
      doList(){
        return function (imgs) {
          // return "/upImg/1554196941753.jpg,/upImg/1554196932366.jpg,/upImg/1554196941753.jpg,/upImg/1554196932366.jpg,/upImg/1554196941753.jpg,/upImg/1554196932366.jpg,/upImg/1554196941753.jpg,/upImg/1554196932366.jpg,/upImg/1554196941753.jpg".split(',')
          return imgs.split(',')
        }
      }
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
