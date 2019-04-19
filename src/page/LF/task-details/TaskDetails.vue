<template>
  <div class="form-refactor full-page-bg">
    <HeaderBack title=""></HeaderBack>
    <div class="form-list-wrapper empty-top">
      <FormComs class="form-item-outter" :formList.sync="formList" :taskState="taskState"></FormComs>
    </div>
  </div>
</template>

<style lang="less">
</style>

<script>
  import qs from 'qs';
  import TaskConvert from "@/utils/TaskConvert"
  import FormComs from "../../../components/FormComs"
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
    methods: {
      async initData(){
        // 学生数据
        let params = {
          uid: this.$route.params.uid,
          taskId: Number(this.$route.params.id),
          formValueId: '16629',
          stuId: this.$route.params.stuid
        }
        let resData = {}
        // 角色判断
        resData = await ApiApp.TaskDetailStuApp.showLostFoundStuTaskDetail(params)
        this.$store.commit('taskInfo', {taskInfo: resData})
        // 填写页面 学生自己填的 先用原来的，其他用新的
        // 查看到结束页
        this.taskState = 4
        // 设置为自己填写
        resData.lostFoundStuListFormItemResps.forEach((item,index)=>{
          item.citeDataType = 0
        })
        this.formList= resData.lostFoundStuListFormItemResps;
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
      }
    },
    mounted() {
      this.initData()
    }
  }
</script>

