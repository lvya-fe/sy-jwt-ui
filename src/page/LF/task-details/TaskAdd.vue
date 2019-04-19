<template>
  <div class="form-refactor full-page-bg">
    <HeaderBack></HeaderBack>
    <div class="form-list-wrapper empty-top">
      <FormComs class="form-item-outter" :formList.sync="formList" :taskState="taskState">
        <button type="button" class="weui-btn weui-btn_default btn-block btn-main" @click="submit()" slot="submit">提交</button>
      </FormComs>
    </div>
  </div>
</template>

<style lang="less">
</style>

<script>
  import qs from 'qs';
  import TaskConvert from "@/utils/TaskConvert"
  import FormComs from "../../../components/FormComs"
  import {wechatconfigInit} from '@/plugins/wechat.js';
  import { mapState } from 'vuex'
  export default {
    components: {
      FormComs,
    },
    data() {
      return {
        formList: [],// 表单类型
        taskState: {}, // 任务
      }
    },
    computed: mapState({
      _url_: state => state.animation._url_
    }),
    methods: {
      async initData(){
        // 学生数据
        let params = {
          uid: this.$route.params.uid,
          taskid: this.$route.params.id,
          stime:'',
          etime:'',
      }
        let resData = {}
        // 角色判断
        if(Cookies.get('roleType') == 'tea') {
          resData = await ApiApp.TaskTeaApp.teaTaskView(params)
        } else {
          resData = await ApiApp.TaskStuApp.taskView(params)
        }

        resData = TaskConvert.doTaskData(resData)
        this.$store.commit('taskInfo', {taskInfo: resData})

        // 填写页面 学生自己填的 先用原来的，其他用新的
        this.taskState = resData.taskState
        this.formList= resData.formItemResps;
        console.log("this.taskState:", this.taskState)
        console.log("this.formList:", this.formList)
      },

      async submit() {
        let params = {
          uid: this.$route.params.uid,
          taskid: this.$route.params.id,
        }
        let convertObj = TaskConvert.covertResult(this.formList)
        params = {...convertObj, ...params}
        await ApiApp.TaskStuApp.addtask(params)

        params = {
          uid: this.$route.params.uid ,
          taskid: this.$route.params.id,
        }
        this.$router.replace({path: '/Lf/task-list/' + params.uid, query: {
          sceneId: this.$route.query.sceneId
        }})
      }
    },
    mounted() {
      wechatconfigInit(this, qs, this.$route.params.uid, this._url_);
      this.initData()
    }
  }
</script>

