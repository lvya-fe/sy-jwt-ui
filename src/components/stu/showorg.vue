<template>
  <div>
    <div class="top-back">
      <img class="img1" src="../../assets/img/back_left_green.png" alt="" @click="goback">
      社团
    </div>
    <div class="class-con">
      <div v-for="(item,index) in conData" :key="index" >{{ item.name }}</div>
    </div>
    <div class="no-msg-div" v-if="conData.length<=0">
        <img src="../../assets/img/zanwushuju.png" alt="">
        <span>暂无数据</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      conData: {
        type: Array,
        timer:null,
        default: []
      }
    },

    data(){
      return{

      }
    },
    methods:{
      goback(){
        this.$emit('closeSelect');
      }
    }
  }
</script>

<style scoped>
  .top-back {text-align: center;font-size: 36px;color: #444;position: fixed;left:0;right:0;padding:20px;background-color: #fff;z-index: 100;top: 0;}
  .top-back .img1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
  .class-con{margin-top: 100px;overflow: hidden;padding: 20px 30px;}
  .class-con > div{float: left;font-size: 26px;color: #01c269;border: 1px solid #e2e2e2;/*no*/border-radius: 3px;/*no*/height: 60px;line-height: 60px;padding: 0 10px;min-width: 132px;text-align:center;margin: 0 15px 35px 0;}
  .class-con .selected{background-color: #01c269;color: #fff;border-color: #01c269;}

  .no-msg-div{color: #999;text-align: center;line-height: 64px;margin:0 auto;}
  .no-msg-div img{width: 70px;height: 70px;display: inline-block;vertical-align: middle}
  .no-msg-div span{height: 70px;display: inline-block;vertical-align: middle;font-size:28px;}
</style>
