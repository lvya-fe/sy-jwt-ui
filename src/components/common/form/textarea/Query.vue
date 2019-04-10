<!--
组件名称：InputQuery
props:
  item
  iconType 图标类型，同表单名

event:
-->

<template>
  <div class="form-common form-item form-textarea">
    <div class="form-wrap field-block">
      <p class="form-name-block vux-1px-b">
        <img :src="'static/icon/form/ico_'+ iconType +'.png'" class='icon_form' v-if="iconType">
        {{field.formItemName}}
      </p>
      <div class="textarea" v-if="field.formItemValue != ''">
        <!-- <textarea disabled v-model="field.formItemValue" :class="{'readAll':field.readAll}" :autosize="field.readAll"></textarea> -->
        <x-textarea disabled v-model="field.formItemValue" :class="{'readAll':field.readAll}" :autosize="field.readAll" :show-counter="false"></x-textarea>
        <span class="moreTxt" @click="readAll" v-show="!field.showBtn">{{field.btntxt}}</span>
      </div>
      <div v-else class="nodata">
        <img src="../../../../assets/img/noData.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { XTextarea} from "vux";
  export default {
    name: 'InputQuery',
    props: {
      item: {default: {}},
      iconType: {default: ''}
    },
    data () {
      return {
        field:{}
      }
    },
    components:{
      XTextarea
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
        bool = this.field.formItemValue.split(/\r?\n|\r/).length > 3 || this.item.val.length > 40 ? false : true;
        this.$set(this.field, 'readAll', bool);
        this.$set(this.field, 'showBtn', bool);
        this.$set(this.field, 'btntxt', '全文');
    }
  }
</script>
<style lang="less">
  .textarea{
    position: relative;
    textarea:disabled{
      height: 150px;
      overflow: hidden;
      background-color: #fafafa;
    }
    .weui-cell{
      padding: 30px;
    }
    .weui-cell__bd{
      padding-right: 30px;
    }
    .readAll{
      .weui-textarea{
          padding-bottom: 0;
          height: auto;
          overflow: auto;
      }
    }
    .weui-textarea{
        padding: 15px;
        padding-bottom: 0;
    }
    .moreTxt{
        position: absolute;
        padding-left: 50px;
        right: 30px;
        bottom: 30px;
        background:linear-gradient(right,rgba(250,250,250,0),rgba(250,250,250,1));
        color: #1abe7f;
    }
  }
</style>
