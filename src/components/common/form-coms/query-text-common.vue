<!--
组件名称：引用他人 普通表单组件
props:
  item
  iconType 图标类型，同表单名

event:
-->

<template>
  <div class="form-wrap field-block">
    <p class="form-name-block">
      <img :src="'static/icon/form/ico_'+ iconType +'.png'" class='icon_form' v-if="iconType">
      {{field.formItemName}}
    </p>
    <div class="textarea" v-if="field.formItemValue != ''">
      <!-- <textarea disabled v-model="field.formItemValue" :class="{'readAll':field.readAll}" :autosize="field.readAll"></textarea> -->
      <x-textarea disabled v-model="field.formItemValue" :class="{'readAll':field.readAll}" :autosize="field.readAll" :show-counter="false"></x-textarea>
      <span class="moreTxt" @click="readAll" v-show="!field.showBtn">{{field.btntxt}}</span>
    </div>
    <!--无数据-->
    <NoData v-else></NoData>
  </div>
</template>

<script>
  import { XTextarea} from "vux";
  export default {
    name: 'CiteOtherCommon',
    props: {
      item: {type: Object, default: {}},
      iconType: {type: String, default: ''},
    },
    components:{
      XTextarea
    },
    data () {
      return {
        field:{}
      }
    },
    watch: {
      item () {
      }
    },
    methods: {
      //多行文本  查看全文
      readAll(){
        this.$nextTick(()=>{
          this.field.readAll = !this.field.readAll;
          this.field.btntxt = this.field.btntxt == '全文' ? '收起':'全文';
        })
      },
    },
    mounted () {
      this.field = Object.assign({},this.item);
      let bool = false;
      bool = this.field.formItemValue.split(/\r?\n|\r/).length > 1  || this.item.formItemValue.length > 56  ? false : true;
      this.$set(this.field, 'readAll', bool);
      this.$set(this.field, 'showBtn', bool);
      this.$set(this.field, 'btntxt', '全文');
    }
  }
</script>
<style lang="less">

</style>
