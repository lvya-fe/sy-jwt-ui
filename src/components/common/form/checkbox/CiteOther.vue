<!--
组件名称：InputQuery
props:
  item
  iconType 图标类型，同表单名

event:
-->

<template>
  <div class="form-common form-item">
    <div class="form-wrap field-block">
      <p class="form-name-block vux-1px-b">
        <img :src="'static/icon/form/ico_'+ iconType +'.png'" class='icon_form' v-if="iconType">
        {{item.formItemName}}
      </p>

      <!-- 单条 多条 逐行显示-->
      <div class="form-wrap form-cite-column cite-other-multi" v-if="item.listCiteData.length > 0" v-for="cite in item.listCiteData">
        <div class="user-avatar">
          <img class="user-circle" :src="cite.imgUrl?cite.imgUrl:'static/img/user/avatar-default.jpg'">

          <div class="user-name">
            <span class="text-ellipsis">{{cite.name}}</span>
          </div>
          <div class="user-org">{{cite.orgNames}}</div>
        </div>

        <div class="form-content form-user-custom">
          <div class="user-result">
            <div class="result-content">
              <ul class="itemsWrap" >
                <li v-for="text in doList(cite.val || cite.imgUrl)">
                  {{text}}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!--无数据-->
      <NoData v-if="item.listCiteData.length == 0"></NoData>
    </div>
  </div>
</template>

<script>
  import CiteOtherCommon from "../../form-coms/cite-other-common"
  export default {
    name: 'InputQuery',
    props: {
      item: {default: {}},
      iconType: {default: ''}
    },
    components: {
      CiteOtherCommon,
    },
    computed: {
      doList(){
        return function (imgs) {
          // return "/upImg/1554196941753.jpg,/upImg/1554196932366.jpg,/upImg/1554196941753.jpg,/upImg/1554196932366.jpg,/upImg/1554196941753.jpg,/upImg/1554196932366.jpg,/upImg/1554196941753.jpg,/upImg/1554196932366.jpg,/upImg/1554196941753.jpg".split(',')
          return imgs.split(',')
        }
      }
    },
    data () {
      return {
      }
    },
    watch: {
    },
    methods: {
    },
    mounted () {
    }
  }
</script>
<style lang="less">

</style>
