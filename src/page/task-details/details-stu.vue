<template>
  <div class="task-details">
    <FormCommon :item.sync="item" v-for="item in curFieldsLists"></FormCommon>
  </div>
</template>

<style lang="less">
</style>

<script>
  import qs from 'qs';
  import TaskConvert from "@/utils/TaskConvert"
  import FormCommon from "@/components/common/cite/cite-other/form-common.vue"
  export default {
    components:{
      FormCommon,
    },
    data() {
      return {
        curFieldsLists:[],//当前学生字段合集
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
          taskid: Number(this.$route.params.id),
          stime: '',
          etime: ''
        }
        let resData = {}
        // 角色判断
        if(this.$route.query.roleType) Cookies.set('roleType', this.$route.query.roleType)
        try{
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

        this.curFieldsLists = resData.formItemResps;
      }
    },
    mounted() {
      this.initData()
    }
  }
</script>

