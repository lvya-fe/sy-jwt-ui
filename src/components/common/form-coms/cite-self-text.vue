<!--
组件名称：引用他人 普通表单组件
props:
  item
  iconType 图标类型，同表单名

event:
-->

<template>
  <div class="form-wrap field-block">
    <div class="textarea">
      <x-textarea disabled v-model="field.val" :class="{'readAll':field.readAll}" :autosize="field.readAll" :show-counter="false"></x-textarea>
      <span class="moreTxt" @click="readAll" v-show="!field.showBtn">{{field.btntxt}}</span>
    </div>
  </div>
</template>

<script>
  import { XTextarea} from "vux";
  export default {
    name: 'CiteSelfText',
    props: {
      item: {type: Object, default: {}},
    },
    components:{
      XTextarea
    },
    data () {
      return {
        field:{}
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
      if(this.field.val == undefined) this.field.val = '' ;
      bool = this.field.val.split(/\r?\n|\r/).length > 3  || this.field.val.length > 40  ? false : true;
      this.$set(this.field, 'readAll', bool);
      this.$set(this.field, 'showBtn', bool);
      this.$set(this.field, 'btntxt', '全文');
    }
  }
</script>
<style lang="less">

</style>
