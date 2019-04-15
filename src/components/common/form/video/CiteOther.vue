<!--
组件名称：InputQuery
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

      <div class="form-wrap form-thumb" v-for="(cite,index) in item.listCiteData" :key="index">
        <div class="user-avatar">
          <img class="user-circle" :src="cite.imgUrl?cite.imgUrl:'static/img/user/avatar-default.jpg'">

          <div class="user-name">
            <span class="text-ellipsis">{{cite.name}}</span>
          </div>
          <div class="user-org">{{cite.orgNames}}</div>
        </div>

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

</style>
