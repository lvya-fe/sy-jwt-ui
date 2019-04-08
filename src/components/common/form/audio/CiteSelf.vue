<!--
组件名称：audio
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

    <div class="form-wrap form-thumb" v-for="(cite,index) in item.listCiteData">
      <div class="user-avatar">
        <img class="user-circle" src="static/img/user/avatar-default.jpg">

        <div class="user-name">
          <span class="text-ellipsis">{{cite.name}}</span>
        </div>
        <div class="user-org">{{cite.orgNames}}</div>
      </div>

      <div class="form-content form-user-custom">
        <div class="result-content cite-audio-content">
          <aplayer :autoplay="null" :music="{
                                    title: '数据来源自',
                                    author: '绿芽',
                                    url: cite.val,
                                    pic: '',
                                    lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
                                    }">
          </aplayer>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import aplayer from "vue-aplayer"
  export default {
    name: 'audio',
    props: {
      item: {type: Object, default: {}},
    },
    components: {
      aplayer,
    },
    data () {
      return {
        iconType: ''
      }
    },
    computed: {
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
