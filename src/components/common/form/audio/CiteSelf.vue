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
      <span class="form-name ">
          <img :src="'static/icon/form/ico_'+ iconType +'.png'" class='icon_form' v-if="iconType">
        {{item.formItemName}}
      </span>
    </div>

    <div class="form-wrap form-thumb" v-for="(cite,index) in item.listCiteData">

      <div class="form-content form-user-custom" v-if="cite.val">
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
      <!--无数据-->
      <NoData v-else></NoData>

    </div>
  </div>
</template>

<script>
  import aplayer from "vue-aplayer"
  export default {
    name: 'CiteSelf',
    props: {
      item: {default: {}},
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
