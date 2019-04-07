<template>
  <div class="task-details">
    <component :is="getFormType(formItem)" :item="formItem" v-for="formItem,index in formList" :key="index"></component>
  </div>
</template>

<style lang="less">
</style>

<script>
  import FormType from "../edu-common/src/const/FormType"
  import InputAdd from "./common/form/input/InputAdd"
  import TextareaAdd from "./common/form/textarea/TextareaAdd"
  export default {
    props: {
      formList: {type: Array, default: []},
      taskState: {type: String, default: ''}
    },
    components:{
      InputAdd,
      TextareaAdd,
    },
    data() {
      return {

      }
    },
    methods: {
      // FromType类型，参考 https://shimo.im/sheets/SbmJwF5ul5wmb4jO/
      // 动态组件，规则 表单类型 + 操作类型，如 Input + Add
      getFormType(formItem) {
        let formType = ''
        formType = FormType.list[formItem.formItemType] && FormType.list[formItem.formItemType].type
        // 组件首字母大写
        if(formType) formType = formType.substring(0,1).toUpperCase() + formType.substring(1);

        if((this.taskState == 1 || this.taskState == 3) && formItem.citeDataType == 0) {
          formType += 'Add'
        } else if(formItem.citeDataType == 0){
          formType += 'Query'
        } else if(formItem.citeDataType == 1 && formItem.dataRangeType == 0){
          formType += 'CiteSelf'
        } else if(formItem.citeDataType == 1 && formItem.dataRangeType == 1){
          formType += 'CiteOther'
        }
        console.log("formType:", formType)
        return formType
      }
    },
    mounted() {
    }
  }
</script>

