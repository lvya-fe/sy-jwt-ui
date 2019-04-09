<template>
  <div class="task-details">
    <FormComs :formList.sync="formList" :taskState="taskState"></FormComs>
  </div>
</template>

<style lang="less">
</style>

<script>
  import qs from 'qs';
  import TaskConvert from "@/utils/TaskConvert"
  import FormComs from "../../components/FormComs"
  export default {
    components:{
      FormComs,
    },
    data() {
      return {
        formList:[],// 表单类型
        taskState: {}, // 任务
      }
    },
    methods: {
      async initData(){
        this.$vux.loading.show({
          text: '加载中...'
        });

        // 学生数据
        let params = {
          uid: this.$route.params.uid,
          schoolId:Number(this.$route.params.schoolid),
          stuId:Number(this.$route.params.stuid),
          taskId: Number(this.$route.params.id),
        }
        let resData = {}
        // 角色判断
        if(this.$route.query.roleType) Cookies.set('roleType', this.$route.query.roleType)
        try{
          if(this.$route.query.roleType == 'tea') {
            resData = await this.$axios.get(process.env.API_ROOT + 'app/stu/v1/showTeaTaskDetail', {params})
          } else {
            resData = await this.$axios.get(process.env.API_ROOT + 'app/stu/v1/showStuTaskDetail', {params})
          }

        } catch (err) {
          this.errorUtil(err);
        }
        this.$vux.loading.hide()

        resData = resData.data

        this.$store.commit('taskInfo', {taskInfo: resData})

        // 填写页面 学生自己填的 先用原来的，其他用新的
        this.taskState = resData.taskState

        // if(this.taskState == 1 || this.taskState == 3 ) {
        //   this.$router.replace({path: '/task-details/'+params.uid+'/'+params.taskid+'/'+null+'/'+null, query: {
        //       roleType: Cookies.get('roleType')
        //     }
        //   })
        //   return false
        // }


        this.formList= resData.formItemResps;
        console.log("this.taskState:", this.taskState)
        console.log("this.formList:", this.formList)
      }
    },
    mounted() {
      this.initData()
    }
  }
</script>

