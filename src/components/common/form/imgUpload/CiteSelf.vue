<!--
组件名称：imgUpload
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

    <div class="form-wrap form-thumb" v-for="(cite,index) in item.listCiteData" v-if="item.listCiteData.length>0">

      <div class="form-content form-user-custom">
        <div class="result-content cite-img-content">
          <div class="img-thumb-item" v-for="img,i in uploadImgs(cite.val || cite.imgUrl)">
            <img :src="img" :preview="i">
          </div>
        </div>
      </div>
    </div>
    <!--无数据-->
    <NoData v-else></NoData>
  </div>
</template>

<script>
  export default {
    name: 'imgUpload',
    props: {
      item: {default: {}},
    },
    data () {
      return {
        iconType: ''
      }
    },
    computed: {
      uploadImgs(){
        return function (imgs) {
          // return "/upImg/1554196941753.jpg,/upImg/1554196932366.jpg,/upImg/1554196941753.jpg,/upImg/1554196932366.jpg,/upImg/1554196941753.jpg,/upImg/1554196932366.jpg,/upImg/1554196941753.jpg,/upImg/1554196932366.jpg,/upImg/1554196941753.jpg".split(',')
          return  imgs ?imgs.split(','):[]
        }
      }
    },
    watch: {
      item() {
        this.iconType = FormType.list[this.item.formItemType].type
      }
    },
    methods: {
    },
    created () {
      this.iconType = FormType.list[this.item.formItemType].type
    }
  }
</script>
<style lang="less">

</style>
