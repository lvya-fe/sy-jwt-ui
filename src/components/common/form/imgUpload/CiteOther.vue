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
    <div class="form-wrap form-thumb" v-for="(cite,index) in item.listCiteData">
      <div class="user-avatar">
        <img class="user-circle" :src="cite.imgUrl?cite.imgUrl:'static/img/user/avatar-default.jpg'">

        <div class="user-name">
          <span class="text-ellipsis">{{cite.name}}</span>
        </div>
        <div class="user-org">{{cite.orgNames}}</div>
      </div>

      <div class="form-content form-user-custom">
        <div class="result-content cite-img-content">
          <div class="img-thumb-item" v-for="img in uploadImgs(cite.val || cite.imgUrl)">
            <img :src="img">
          </div>
        </div>
      </div>

    </div>
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
          return imgs.split(',')
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
