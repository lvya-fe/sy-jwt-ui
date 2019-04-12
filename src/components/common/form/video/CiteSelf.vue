<!--
组件名称：video
props:
  item
  iconType 图标类型，同表单名

event:
-->

<template>
  <div class="form-common form-item">
    <div class="form-wrap field-block form-thumb">
      <p class="form-name-block">
        <img :src="'static/icon/form/ico_'+ iconType +'.png'" class='icon_form' v-if="iconType">
        {{item.formItemName}}
      </p>
    </div>

    <div class="form-wrap form-thumb" v-for="(cite,index) in item.listCiteData">
      <div class="form-content form-user-custom">
        <div class="cite-video-content">
          <VideoPlayerCommon :options="options(cite.val)"></VideoPlayerCommon>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import VideoPlayerCommon from '../../../../components/common/video/video-player-common.vue'
  export default {
    name: 'CiteSelf',
    components: {
      VideoPlayerCommon,
    },
    props: {
      item: {default: {}},
    },
    data () {
      return {
        iconType: ''
      }
    },
    computed: {
      options(){
        return function (val) {
          return {
            valex: val
          }
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
