<template>
  <div class="all-list">
    <div class="list" v-for="item in stuRespList" @click="toDetail(item)">
      <div class="list-img">
        <img :src='isImgUrl' alt="">
      </div>
      <div class="list-info">
        <div class="title">
          {{item.title}}
        </div>
        <div class="info">
          <span>发布人: <span>{{item.createUserName}} </span></span>
          <span class="time"> {{item.createTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {XInput} from "vux";

  export default {
    props: {
      stuRespList:Array
    },
    components: {
      XInput
    },
    data () {
      return {
      }
    },
    computed: {
      isImgUrl () {
        for(var i= 0;i<this.stuRespList.length;i++){
          return this.stuRespList[i].imgUrl==""? "static/img/header/claim.png" : this.stuRespList.imgUrl
        }
      }
    },
    watch: {
    },
    methods: {
      toDetail(item){
          let params = {
            uid:this.$route.params.uid,
            taskid: '',
            stuid:null,
            schoolid:null
          };
          this.$router.push({path: '/Lf/task-commit/' + params.uid + '/null/null/null' ,query: {
              createUserId: item.createUserId,
              formValueId: item.formValueId,
              taskId: item.taskId,
              selectType: this.$route.query.selectType,
              refFormValueId:item.refFormValueId
          }})
      }
    },
    mounted () {
    }
  }
</script>

<style lang="less">
  @import "less/task-list.less";
</style>
