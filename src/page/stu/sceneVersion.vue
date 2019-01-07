<template>
  <div>
    <div class="top-back">
      <img class="img1" src="../../assets/img/back_left_green.png" alt="" @click="goback">
      场景版本
    </div>
    <div class="class-con">
      <div class="selected">
        <span>V2.1 场景的名字</span>
        <span>2018-10-01 14:45:00</span>
      </div>
      <div>
        <span>V2.1 场景的名字</span>
        <span>2018-10-01 14:45:00</span>
      </div>
      <div>
        <span>V2.1 场景的名字</span>
        <span>2018-10-01 14:45:00</span>
      </div>
      <div>
        <span>V2.1 场景的名字</span>
        <span>2018-10-01 14:45:00</span>
      </div>
      <div>
        <span>V2.1 场景的名字</span>
        <span>2018-10-01 14:45:00</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created(){
    },
    methods:{
      goback(){
        this.$emit('closeSelect');
      },
    }
  }
</script>

<style scoped>
  .top-back {text-align: center;font-size: 36px;color: #444;position: fixed;left:0;right:0;padding:20px;background-color: #fff;z-index: 100;top: 0;}
  .top-back .img1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
  .class-con{margin-top: 100px;}
  .class-con > div{padding: 20px 0;margin:0 20px;overflow: hidden;border-bottom:1px solid #f4f3f3;/*no*/}
  .class-con > div span{color: #444;float: left;width:50%;font-size: 28px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
  .class-con > div span:last-child{text-align: right;color: #959494;}
  .selected span{color:#01c267!important;}
</style>
