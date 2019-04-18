<!--
组件名称：imgUpload
props:
  item
  iconType 图标类型，同表单名

event:
-->

<template>
  <div class="form-common form-imgupload">
    <div class="form-wrap">
      <span class="form-name form-name-block">
          <img :src="'static/icon/form/ico_'+ iconType +'.png'" class='icon_form' v-if="iconType">
        {{item.formItemName}}
      </span>
    </div>
    <uploadImg :imgs.sync="item.formItemValue" v-bind:uid.sync="uid" v-bind:count.sync="count"></uploadImg>
  </div>
</template>

<script>
  import uploadImg  from '@/components/uploadImg'
  export default {
    name: 'imgUpload',
    props: {
      item: {default: {}},
      iconType: {default: ''}
    },
    components:{
      uploadImg,
    },
    data () {
      return {
        count: 9,
        uid: this.$route.params.uid
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
