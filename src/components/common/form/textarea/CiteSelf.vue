<!--
组件名称：CiteOther
props:
  item
  iconType 图标类型，同表单名

event:
-->

<template>
  <div class="form-common form-item form-textarea cite-other-textarea">
    <div class="form-wrap">
      <span class="form-name">
          <img :src="'static/icon/form/ico_'+ iconType +'.png'" class='icon_form' v-if="iconType">
        {{item.formItemName}}
      </span>
    </div>

    <!-- 单条 多条 逐行显示-->
    <div v-if="item.listCiteData && item.listCiteData.length>0">
    <div class="form-wrap form-cite-column" v-for="(cite,index) in item.listCiteData">

      <div class="form-content form-user-custom">
        <div class="user-result">
          <div class="textarea">
            <x-textarea disabled v-model="cite.val" :class="{'readAll':field[index] && field[index].readAll}" :autosize="field[index].readAll" :show-counter="false"></x-textarea>
            <span class="moreTxt" @click="readAll(index)" v-show="!field[index].showBtn">{{field[index].btntxt}}</span>
          </div>
        </div>
      </div>
    </div>
    </div>
    <!--无数据-->
    <NoData v-else></NoData>
  </div>
</template>

<script>
  import { XTextarea} from "vux";
  import CiteOtherCommon from "../../form-coms/cite-other-common"
  export default {
    name: 'CiteOther',
    props: {
      item: {default: {}},
      iconType: {default: ''}
    },
    components: {
      CiteOtherCommon,
      XTextarea,
    },
    data () {
      return {
        field:[]
      }
    },
    watch: {
    },
    methods: {
      //多行文本  查看全文
      readAll(index){
        this.$nextTick(()=>{
          this.field[index].readAll = !this.field[index].readAll;
          this.field[index].btntxt = this.field[index].btntxt == '全文' ? '收起':'全文';
        })
      },
    },
    created () {
      let field = []
      this.item.listCiteData.forEach((item)=>{
        let bool = item.val.split(/\r?\n|\r/).length > 3 || item.val.length > 40 ? false : true;
        field.push({
          readAll: bool,
          showBtn: bool,
          btntxt: '全文'
        })
      })
      this.field = field
    }
  }
</script>
<style lang="less">

</style>
