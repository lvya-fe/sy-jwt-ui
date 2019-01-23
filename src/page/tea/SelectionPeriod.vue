<template>
  <div>
    <div class="top-back">
      <img class="img1" src="../../assets/img/back_left_green.png" alt="" @click="goback">
      任务周期
    </div>
    <div class="class-con">
      <div v-for="(item,index) in conData" :key="index" @click="select(item.id)" :style="index==0?'color:#2ed184':''" :class="indexCycle==index?'selected':''">{{ item.stime + ' ~ '}} {{ (jointimetype==0&&cycle==0)?'进行中':item.etime  }}</div>
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
      },
      indexCycle: {
        default: 0
      },
      jointimetype: {
        default: 0
      },
      cycle: {
        default: 0
      },
    },
    created(){
      console.log(this.jointimetype)
      console.log(this.cycle)
      console.log(this.conData)
    },
    computed:{
      listCmputed:function(){
        var _self = this;
        return _self.conData.filter(function(item){
          return item.type==_self.type;
        })
      }
    },
    methods:{
      goback(){
        this.$emit('closeSelect');
      },
      select(index){
        this.$emit('selectCycle',index);
      }
    }
  }
</script>

<style scoped>
  .top-back {text-align: center;font-size: 36px;color: #444;position: fixed;left:0;right:0;padding:20px;background-color: #fff;z-index: 100;top: 0;}
  .top-back .img1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
  .class-con{margin-top: 100px;}
  .class-con > div{font-size: 26px;color: #444;padding: 20px;}
  .class-con .selected{background-color: #f2f2f2;}
</style>
