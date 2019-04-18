<template>
  <div class="form-container">
    <component :is="getFormType(formItem)" :item.sync="formItem" v-for="(formItem,index) in formList" :key="index" :iconType="currentIconType(formItem)"></component>

    <div class="btn-block-wrapper" v-if="formList.length > 0 && !noback">
      <!--提交按钮-->
      <slot name="submit"></slot>
      <button type="button" class="weui-btn weui-btn_default btn-block btn-back" @click="goBack()">返回</button>
    </div>
  </div>
</template>

<script>
  import FormType from "../edu-common/src/const/FormType"

  // 以下是表单组件 4各一组，不要分开
  import InputAdd from "./common/form/input/Add"
  import InputQuery from "./common/form/input/Query"
  import InputCiteSelf from "./common/form/input/CiteSelf"
  import InputCiteOther from "./common/form/input/CiteOther"

  import TextareaAdd from "./common/form/textarea/Add"
  import TextareaQuery from "./common/form/textarea/Query"
  import TextareaCiteSelf from "./common/form/textarea/CiteSelf"
  import TextareaCiteOther from "./common/form/textarea/CiteOther"

  import DatetimeAdd from "./common/form/datetime/Add"
  import DatetimeQuery from "./common/form/datetime/Query"
  import DatetimeCiteSelf from "./common/form/datetime/CiteSelf"
  import DatetimeCiteOther from "./common/form/datetime/CiteOther"

  import RadioAdd from "./common/form/radio/Add"
  import RadioQuery from "./common/form/radio/Query"
  import RadioCiteSelf from "./common/form/radio/CiteSelf"
  import RadioCiteOther from "./common/form/radio/CiteOther"

  import CheckboxAdd from "./common/form/checkbox/Add"
  import CheckboxQuery from "./common/form/checkbox/Query"
  import CheckboxCiteSelf from "./common/form/checkbox/CiteSelf"
  import CheckboxCiteOther from "./common/form/checkbox/CiteOther"

  import ImgUploadAdd from "./common/form/imgUpload/Add"
  import ImgUploadQuery from "./common/form/imgUpload/Query"
  import ImgUploadCiteSelf from "./common/form/imgUpload/CiteSelf"
  import ImgUploadCiteOther from "./common/form/imgUpload/CiteOther"

  import RateAdd from "./common/form/rate/Add"
  import RateQuery from "./common/form/rate/Query"
  import RateCiteSelf from "./common/form/rate/CiteSelf"
  import RateCiteOther from "./common/form/rate/CiteOther"

  import DesTextAdd from "./common/form/desText/Add"
  import DesTextQuery from "./common/form/desText/Query"
  import DesTextCiteSelf from "./common/form/desText/CiteSelf"
  import DesTextCiteOther from "./common/form/desText/CiteOther"

  import PositionAdd from "./common/form/position/Add"
  import PositionQuery from "./common/form/position/Query"
  import PositionCiteSelf from "./common/form/position/CiteSelf"
  import PositionCiteOther from "./common/form/position/CiteOther"

  import SelectMemberAdd from "./common/form/selectMember/Add"
  import SelectMemberQuery from "./common/form/selectMember/Query"
  import SelectMemberCiteSelf from "./common/form/selectMember/CiteSelf"
  import SelectMemberCiteOther from "./common/form/selectMember/CiteOther"

  import ShowAdd from "./common/form/show/Add"
  import ShowQuery from "./common/form/show/Query"
  import ShowCiteSelf from "./common/form/show/CiteSelf"
  import ShowCiteOther from "./common/form/show/CiteOther"

  import StuInfoAdd from "./common/form/stuInfo/Add"
  import StuInfoQuery from "./common/form/stuInfo/Query"
  import StuInfoCiteSelf from "./common/form/stuInfo/CiteSelf"
  import StuInfoCiteOther from "./common/form/stuInfo/CiteOther"

  import SysInfoAdd from "./common/form/sysInfo/Add"
  import SysInfoQuery from "./common/form/sysInfo/Query"
  import SysInfoCiteSelf from "./common/form/sysInfo/CiteSelf"
  import SysInfoCiteOther from "./common/form/sysInfo/CiteOther"

  import EmailAdd from "./common/form/email/Add"
  import EmailQuery from "./common/form/email/Query"
  import EmailCiteSelf from "./common/form/email/CiteSelf"
  import EmailCiteOther from "./common/form/email/CiteOther"

  import PhoneAdd from "./common/form/phone/Add"
  import PhoneQuery from "./common/form/phone/Query"
  import PhoneCiteSelf from "./common/form/phone/CiteSelf"
  import PhoneCiteOther from "./common/form/phone/CiteOther"

  import SelectListAdd from "./common/form/selectList/Add"
  import SelectListQuery from "./common/form/selectList/Query"
  import SelectListCiteSelf from "./common/form/selectList/CiteSelf"
  import SelectListCiteOther from "./common/form/selectList/CiteOther"

  import MultiListAdd from "./common/form/multiList/Add"
  import MultiListQuery from "./common/form/multiList/Query"
  import MultiListCiteSelf from "./common/form/multiList/CiteSelf"
  import MultiListCiteOther from "./common/form/multiList/CiteOther"

  import AutoListAdd from "./common/form/autoList/Add"
  import AutoListQuery from "./common/form/autoList/Query"
  import AutoListCiteSelf from "./common/form/autoList/CiteSelf"
  import AutoListCiteOther from "./common/form/autoList/CiteOther"

  import IntAdd from "./common/form/int/Add"
  import IntQuery from "./common/form/int/Query"
  import IntCiteSelf from "./common/form/int/CiteSelf"
  import IntCiteOther from "./common/form/int/CiteOther"

  import DecimalAdd from "./common/form/decimal/Add"
  import DecimalQuery from "./common/form/decimal/Query"
  import DecimalCiteSelf from "./common/form/decimal/CiteSelf"
  import DecimalCiteOther from "./common/form/decimal/CiteOther"

  import PercentAdd from "./common/form/percent/Add"
  import PercentQuery from "./common/form/percent/Query"
  import PercentCiteSelf from "./common/form/percent/CiteSelf"
  import PercentCiteOther from "./common/form/percent/CiteOther"

  import DateAdd from "./common/form/date/Add"
  import DateQuery from "./common/form/date/Query"
  import DateCiteSelf from "./common/form/date/CiteSelf"
  import DateCiteOther from "./common/form/date/CiteOther"

  import FormulaAdd from "./common/form/formula/Add"
  import FormulaQuery from "./common/form/formula/Query"
  import FormulaCiteSelf from "./common/form/formula/CiteSelf"
  import FormulaCiteOther from "./common/form/formula/CiteOther"

  import QuoteAdd from "./common/form/quote/Add"
  import QuoteQuery from "./common/form/quote/Query"
  import QuoteCiteSelf from "./common/form/quote/CiteSelf"
  import QuoteCiteOther from "./common/form/quote/CiteOther"

  import PCDAdd from "./common/form/PCD/Add"
  import PCDQuery from "./common/form/PCD/Query"
  import PCDCiteSelf from "./common/form/PCD/CiteSelf"
  import PCDCiteOther from "./common/form/PCD/CiteOther"

  import PostCodeAdd from "./common/form/postCode/Add"
  import PostCodeQuery from "./common/form/postCode/Query"
  import PostCodeCiteSelf from "./common/form/postCode/CiteSelf"
  import PostCodeCiteOther from "./common/form/postCode/CiteOther"

  import IDAdd from "./common/form/ID/Add"
  import IDQuery from "./common/form/ID/Query"
  import IDCiteSelf from "./common/form/ID/CiteSelf"
  import IDCiteOther from "./common/form/ID/CiteOther"

  import AudioAdd from "./common/form/audio/Add"
  import AudioQuery from "./common/form/audio/Query"
  import AudioCiteSelf from "./common/form/audio/CiteSelf"
  import AudioCiteOther from "./common/form/audio/CiteOther"

  import VideoAdd from "./common/form/video/Add"
  import VideoQuery from "./common/form/video/Query"
  import VideoCiteSelf from "./common/form/video/CiteSelf"
  import VideoCiteOther from "./common/form/video/CiteOther"

  export default {
    props: {
      formList: {default: []},
      taskState: {default: ''}
    },
    components:{
      InputAdd,
      InputQuery,
      InputCiteSelf,
      InputCiteOther,

      TextareaAdd,
      TextareaQuery,
      TextareaCiteSelf,
      TextareaCiteOther,

      DatetimeAdd,
      DatetimeQuery,
      DatetimeCiteSelf,
      DatetimeCiteOther,

      RadioAdd,
      RadioQuery,
      RadioCiteSelf,
      RadioCiteOther,

      CheckboxAdd,
      CheckboxQuery,
      CheckboxCiteSelf,
      CheckboxCiteOther,

      ImgUploadAdd,
      ImgUploadQuery,
      ImgUploadCiteSelf,
      ImgUploadCiteOther,

      RateAdd,
      RateQuery,
      RateCiteSelf,
      RateCiteOther,

      DesTextAdd,
      DesTextQuery,
      DesTextCiteSelf,
      DesTextCiteOther,

      PositionAdd,
      PositionQuery,
      PositionCiteSelf,
      PositionCiteOther,

      SelectMemberAdd,
      SelectMemberQuery,
      SelectMemberCiteSelf,
      SelectMemberCiteOther,

      ShowAdd,
      ShowQuery,
      ShowCiteSelf,
      ShowCiteOther,

      StuInfoAdd,
      StuInfoQuery,
      StuInfoCiteSelf,
      StuInfoCiteOther,

      SysInfoAdd,
      SysInfoQuery,
      SysInfoCiteSelf,
      SysInfoCiteOther,

      EmailAdd,
      EmailQuery,
      EmailCiteSelf,
      EmailCiteOther,

      PhoneAdd,
      PhoneQuery,
      PhoneCiteSelf,
      PhoneCiteOther,

      SelectListAdd,
      SelectListQuery,
      SelectListCiteSelf,
      SelectListCiteOther,

      MultiListAdd,
      MultiListQuery,
      MultiListCiteSelf,
      MultiListCiteOther,

      AutoListAdd,
      AutoListQuery,
      AutoListCiteSelf,
      AutoListCiteOther,

      IntAdd,
      IntQuery,
      IntCiteSelf,
      IntCiteOther,

      DecimalAdd,
      DecimalQuery,
      DecimalCiteSelf,
      DecimalCiteOther,

      PercentAdd,
      PercentQuery,
      PercentCiteSelf,
      PercentCiteOther,

      DateAdd,
      DateQuery,
      DateCiteSelf,
      DateCiteOther,

      FormulaAdd,
      FormulaQuery,
      FormulaCiteSelf,
      FormulaCiteOther,

      QuoteAdd,
      QuoteQuery,
      QuoteCiteSelf,
      QuoteCiteOther,

      PCDAdd,
      PCDQuery,
      PCDCiteSelf,
      PCDCiteOther,

      PostCodeAdd,
      PostCodeQuery,
      PostCodeCiteSelf,
      PostCodeCiteOther,

      IDAdd,
      IDQuery,
      IDCiteSelf,
      IDCiteOther,

      AudioAdd,
      AudioQuery,
      AudioCiteSelf,
      AudioCiteOther,

      VideoAdd,
      VideoQuery,
      VideoCiteSelf,
      VideoCiteOther,
    },
    data() {
      return {
        noback:false
      }
    },
    computed: {
      currentIconType () {
        return function (formItem) {
          let form = FormType.list[formItem.formItemType]
          return form.icon ? form.type : false
        }
      },
    },
    methods: {
      // FromType类型，参考 https://shimo.im/sheets/SbmJwF5ul5wmb4jO/
      // 动态组件，规则 表单类型 + 操作类型，如 Input + Add
      getFormType(formItem) {
        let formType = ''
        formType = FormType.list[formItem.formItemType] && FormType.list[formItem.formItemType].type
        // 组件首字母大写
        if(formType) formType = formType.substring(0,1).toUpperCase() + formType.substring(1);
        // console.log("orginType:", formType)
        if((this.taskState == 1 || this.taskState == 3) && formItem.citeDataType == 0) {
          formType += 'Add'
        } else if(formItem.citeDataType == 0){
          formType += 'Query'
        } else if(formItem.citeDataType == 1 && formItem.dataRangeType == 0){
          formType += 'CiteSelf'
        } else if(formItem.citeDataType == 1 && (formItem.dataRangeType == 1 || formItem.dataRangeType == 2)){
          formType += 'CiteOther'
        }
        console.log("formType:", formType)
        return formType
      },

      goBack(){
        this.$router.go(-1)
      }
    },
    mounted() {
      this.noback = this.$route.query.noback;
    }
  }
</script>
