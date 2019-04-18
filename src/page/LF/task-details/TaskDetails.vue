<template>
  <div class="form-refactor full-page-bg">
    <HeaderBack></HeaderBack>
    <div class="form-list-wrapper empty-top">
      <FormComs class="form-item-outter" :formList.sync="formList" :taskState="taskState">
        <button type="button" class="weui-btn weui-btn_default btn-block btn-back" @click="goBack()" slot="submit">提交</button>
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
      async initData() {
        this.$vux.loading.show({
          text: '加载中...'
        });

        // 学生数据
        let params = {
          uid: this.$route.params.uid,
          taskid: Number(this.$route.params.id),
          stime: '',
          etime: ''
        }
        let resData = {}
        // 角色判断
        if (this.$route.query.roleType) Cookies.set('roleType', this.$route.query.roleType)
        try {
          if (Cookies.get('roleType') === 'tea') {
            // teaTaskView taskView
            this.roleType = 'tea'
            // 教师帮学生填写
            if (this.$route.query.stuid) {
              params.stuId = this.$route.query.stuid
              resData = await this.$axios.post(process.env.API_ROOT + 'app/tea/task/taskView', qs.stringify(params))
            } else {
              resData = await this.$axios.post(process.env.API_ROOT + 'app/tea/task/teaTaskView', qs.stringify(params))
            }
          } else {
            this.roleType = 'stu'
            resData = await this.$axios.post(process.env.API_ROOT + 'app/stu/v1/taskview', qs.stringify(params))
          }
        } catch (err) {
          this.errorUtil(err);
        }
        this.$vux.loading.hide()
        if (resData.success) {
          resData = TaskConvert.doTaskData(resData.data)
        }

        this.$store.commit('taskInfo', {taskInfo: resData})

        // 填写页面 学生自己填的 先用原来的，其他用新的
        this.taskState = resData.taskState

        this.formList = resData.formItemResps;
        console.log("this.taskState:", this.taskState)
        console.log("this.formList:", this.formList)
      }
    },
    mounted() {
      this.initData()
    }
  }
</script>

