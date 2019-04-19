<template>
  <div class="form-refactor full-page-bg">
    <HeaderBack title="认领招领信息"></HeaderBack>
    <div class="form-list-wrapper empty-top">
      <FormComsCustom class="form-item-outter" :formList.sync="formList" :taskState="taskState">
        <button type="button" class="weui-btn weui-btn_default btn-block btn-main" @click="submit()" slot="submit">认领</button>
      </FormComsCustom>
    </div>
  </div>
</template>

<style lang="less">
</style>

<script>
  import qs from 'qs';
  import TaskConvert from "@/utils/TaskConvert"
  import FormComsCustom from "../../../components/FormComsCustom.vue"
  import {wechatconfigInit} from '@/plugins/wechat.js';
  import { mapState } from 'vuex'
  export default {
    components: {
      FormComsCustom,
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
          taskId: '14326',
          formValueId: '16632',
          stuId: this.$route.params.stuid
        }
        let resData = resData = await ApiApp.TaskDetailStuApp.showLostFoundStuTaskDetail(params)
        this.$store.commit('taskInfo', {taskInfo: resData})
        // 查看 到结束页
        this.taskState = 4
        // 设置为自己填写
        let formList = resData.lostFoundStuListFormItemResps || resData.formItemResps;
        formList.forEach((item,index)=>{
          item.citeDataType = 0
          // 默认查询
          item.customType = 'Query'
          // 最后一个是感谢信，需要提交
          if(index == formList.length-1) {
            item.customType = 'Add'
          }
        })
        this.formList = formList
        console.log("this.taskState:", this.taskState)
        console.log("this.formList:", this.formList)
      },

      async submit() {
        let params = {
          uid: this.$route.params.uid,
          taskId: this.$route.params.id,
          formValueJson: {

          },

          stuId: this.$route.params.stuid,
          refFormValueIdStr: '',
        }
        let convertObj = TaskConvert.covertResult(this.formList)
        params = {...convertObj, ...params}
        await ApiApp.TaskStuApp.addLostFoundStuTaskFormList(params)

        params = {
          uid: '6552' ,
          id: '14326',
          stuid: '',
          schoolid: '',
        }
        this.$router.replace({path: '/Lf/task-list/' + params.uid + '/' + params.id + '/null/null'})
      }
    },
    mounted() {
      wechatconfigInit(this, qs, this.$route.params.uid, this._url_);
      this.initData()
    }
  }
</script>

