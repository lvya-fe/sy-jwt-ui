<!--
组件名称：InputQuery
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

    <!--自己给自己填写，只显示-->
    <VideoPlayerCommon :options="options(item.formItemValue)"></VideoPlayerCommon>
  </div>
</template>

<script>
  import VideoPlayerCommon from '../../../../components/common/video/video-player-common.vue'
  export default {
    name: 'InputQuery',
    props: {
      item: {type: Object, default: {}},
      iconType: {type: String, default: ''}
    },
    components: {
      VideoPlayerCommon,
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
