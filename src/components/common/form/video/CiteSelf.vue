<!--
组件名称：video
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
        <div class="result-content cite-video-content">
          <VideoPlayerCommon :options="options(cite.val)"></VideoPlayerCommon>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import VideoPlayerCommon from '../../../../components/common/video/video-player-common.vue'
  export default {
    name: 'video',
    components: {
      VideoPlayerCommon,
    },
    props: {
      item: {type: Object, default: {}},
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
