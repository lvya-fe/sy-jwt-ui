<!--
组件名称：InputQuery
props:
  item
  iconType 图标类型，同表单名

event:
-->

<template>
  <div class="form-common form-item readVideo">
    <div class="form-wrap field-block form-thumb">
      <p class="form-name-block">
        <img :src="'static/icon/form/ico_'+ iconType +'.png'" class='icon_form' v-if="iconType">
        {{item.formItemName}}
      </p>
    </div>

    <!--自己给自己填写，只显示-->
    <div class="form-wrap-media">
      <VideoPlayerCommon :options="options(item.formItemValue)"></VideoPlayerCommon>
    </div>
    <br>
  </div>
</template>

<script>
  import VideoPlayerCommon from '../../../../components/common/video/video-player-common.vue'
  export default {
    name: 'InputQuery',
    props: {
      item: {default: {}},
      iconType: {default: ''}
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
  .readVideo{
    margin: 0 -30px;
  }
</style>
