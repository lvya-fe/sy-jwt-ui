<template>
  <div class="claim">
    <div class="info">发布招领信息</div>
    <div class="guide">
      <div class="title">操作指南</div>
      <div class="content">
        我是操作指南我是操作指南我是操作指南我是操作指南我是操作指南我是操作指南我是操作
        指南我是操作指南我是操作指南我是操作指南我是操作指南我是操作指南我是操作指南我是操作指南我是操作指南
      </div>
    </div>
    <div class="goods">
      <div class="title">物品分类</div>
      <div class="goods-btn">
        <ul class="btn-list">
          <li><span>通用</span></li>
          <li><span>通用</span></li>
          <li><span>通用</span></li>
          <li><span>通用</span></li>
          <li><span>通用</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
      }
    },
    components: {

    },
    created(){
    },
    methods:{

    }
  }
</script>
<style lang="less">
  @font_color:#696969;
  @border-color:#BCBCBC;
  @border-left-color:#169BD5;
  @border-color-list:#EBEBEB;
  .claim .info{
    height: 1.06rem;
    line-height: 1.06rem;
    text-align: center;
    font-size: 0.45rem;
    border-bottom: 1px solid @border-color;
    margin-bottom: 0.3rem;
    color:#444;
  }
  .claim .guide,.goods{
    padding-left:0.27rem;
    .title{
      border-left: 0.14rem solid @border-left-color;
      padding-left: 0.27rem;
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.4rem;
      color:#333333;
    }
    .content{
      padding:20px;
      text-indent: 0.86rem;
      text-align: justify;
      font-size:0.4rem;
      color:@font_color;
    }
  }
  .claim .goods-btn .btn-list{
    padding:0.27rem;
    list-style:none;
    li{
      display: inline-block;
      height: 0.95rem;
      width: 2rem;
      line-height: 0.95rem;
      border: 0.03rem solid @border-color-list;
      text-align: center;
      border-radius: 0.27rem;
      cursor: pointer;
      font-size: 0.4rem;
      margin-right: 0.15rem;
      margin-bottom: 0.2rem;
      color:@font_color;
    }
  }
</style>
