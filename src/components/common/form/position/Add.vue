<!--
组件名称：positontadd
props:
  item
  iconType 图标类型，同表单名

event:
-->

<template>
  <div class="form-common form-input">
    <div class="form-wrap">
      <span class="form-name">
          <img :src="'static/icon/form/ico_'+ iconType +'.png'" class='icon_form' v-if="iconType">
        {{item.formItemName}}
      </span>
      <div class="form-inline">
        <p>{{geographic?geographic:'暂无数据'}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PositionAdd',
    props: {
      item: {default: {}},
      iconType: {default: ''}
    },
    data () {
      return {
        geographic: '',
      }
    },
    watch: {
    },
    methods: {
      getPosition(lat,lng){
        var self=this;
        var myGeo = new BMap.Geocoder();
        myGeo.getLocation(new BMap.Point(lng,lat),function (result) {
          console.log("position:", result)
          if(result){
            self.geographic = result.address
          }
        })
      },
    },
    mounted () {
      this.getPosition()
    }
  }
</script>
<style lang="less">

</style>
