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
    </div>
    <br>
    <!--自己给自己填写，只显示-->
    <VideoPlayerCommon :options="options(item.formItemValue)"></VideoPlayerCommon>
    <br>
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
