<!--
组件名称：引用他人 普通表单组件
props:
  item
  iconType 图标类型，同表单名

event:
-->

<template>
  <div class="form-wrap">
    <!--多条-->
    <div class="form-content form-user-custom" v-if="length>1">
        <div class="result-content">
          {{cite.val}}
        </div>
    </div>
    <!--单条-->
    <span v-else class="form-name form-inline-right">{{cite.val}}</span>
  </div>
</template>

<script>
  export default {
    name: 'CiteOtherCommon',
    props: {
      cite: {type: Object, default: {}},
      length: {type: Number, default: 0},
    },
    data () {
      return {
      }
    },
    watch: {
      item () {
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
