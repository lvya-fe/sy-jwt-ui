<!--
组件名称：引用他人 普通表单组件
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
    <div class="form-wrap" v-for="(cite,index) in item.listCiteData">
      <div class="user-avatar">
        <img class="user-circle" :src="cite.imgUrl?cite.imgUrl:'static/img/user/avatar-default.jpg'">
      </div>

      <div class="form-content form-user-custom">
        <div class="user-name">
          <img class="user-icon" src="static/img/user/user-icon.png">
          <span class="text-ellipsis">{{cite.name}}</span>
        </div>
        <div class="user-org"><img class="user-icon" src="static/img/user/org.png">{{cite.orgNames}}</div>
        <div class="user-result"><img class="user-icon" src="static/img/user/result.png">
        <div class="result-content">
          {{cite.val}}
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FormCommon',
    props: {
      item: {default: {}},
      iconType: {default: ''}
    },
    data () {
      return {
      }
    },
    watch: {
      item () {
        console.log(item)
      }
    },
    methods: {
    },
    mounted () {
    }
  }
</script>
<style lang="less">

</style>
