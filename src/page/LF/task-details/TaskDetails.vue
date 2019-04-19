<template>
  <div class="form-refactor full-page-bg">
    <HeaderBack title="认领信息详情"></HeaderBack>
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
          taskId: this.$route.params.id,
          formValueId: '16629',
          stuId: this.$route.params.stuid
        }
        let resData = {}
        // 角色判断
        if(Cookies.get('roleType') == 'tea') {
          resData = await ApiApp.TaskDetailTeaApp.showLostFoundTeaToStuTaskDetail(params)
        } else {
          resData = await ApiApp.TaskDetailStuApp.showLostFoundStuTaskDetail(params)
        }

        this.$store.commit('taskInfo', {taskInfo: resData})
        // 查看 到结束页
        this.taskState = 4
        // 设置为自己填写
        let formList = resData.lostFoundStuListFormItemResps || resData.formItemResps;
        formList.forEach((item,index)=>{
          item.citeDataType = 0
        })
        this.formList = formList
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

