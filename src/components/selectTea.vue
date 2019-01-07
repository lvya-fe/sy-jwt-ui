<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="select_talent_box" >
    <div class="weui-search-bar" id="searchBar">
      <form class="weui-search-bar__form"  @submit="Search" action="">
        <div class="weui-search-bar__box">
          <i class="weui-icon-search"></i>
          <input type="search" class="weui-search-bar__input" v-model="keyword"  id="searchInput" placeholder="搜索" required="">
          <a href="javascript:" class="weui-icon-clear" @click="keyword=''"  id="searchClear"></a>
        </div>
        <label class="weui-search-bar__label" v-show="search" @click="search=false" style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);">
          <i class="weui-icon-search"></i>
          <span>搜索</span>
        </label>
      </form>
      <a href="javascript:" class="weui-search-bar__cancel-btn" @click="search=true">取消</a>
    </div>

    <div class="select_talent_nav">
      <template v-for="tab in tabs">
      <span @click="queryOrg(tab.id)">{{tab.name}}</span>>
      </template>
    </div>

    <div class="weui-cells weui-cells_checkbox" style="margin-top:0;padding: 95px 0 50px">

      <label class="weui-cell weui-check__label" for="s0" v-if="tealist.length>0">
        <div class="weui-cell__hd">
          <input type="checkbox" class="weui-check" v-model='checked' name="checkbox1" id="s0" @change="checkedAll">
          <i class="weui-icon-checked"></i>
        </div>
        <div class="weui-cell__bd">
          <p>全选</p>
        </div>
      </label>

      <label class="weui-cell weui-check__label" for="s0" v-if="orglist.length<=0&&tealist.length<=0">
        <div class="weui-cell__hd">
          无数据
        </div>
      </label>
      <a class="weui-cell weui-cell_access" href="javascript:;"  @click="queryOrg(org.id)" v-for="org in orglist">
        <div class="weui-cell__bd">
          <p>{{org.name}}</p>
        </div>
        <div class="weui-cell__ft">
        </div>
      </a>
      <label class="weui-cell weui-check__label" v-bind:for="'s'+tea.id"  v-for="tea in tealist">
        <div class="weui-cell__hd">
          <input type="checkbox" @change="checkedOne"     name="checkbox1" v-model="checkedTeaids" v-bind:value="tea.id" class="weui-check" v-bind:id="'s'+tea.id">
          <i class="weui-icon-checked"></i>
        </div>
        <div class="weui-cell__hd">
          <img v-bind:src="tea.pic|pic" alt="" style="width:38px;height:38px;margin-right:5px;display:block">
        </div>
        <div class="weui-cell__bd">
          <p>{{tea.name}}</p>
        </div>
      </label>


      <div class="select_talent_operate" >
      已选:{{Object.keys(teaMap).length}}人
      <a href="javascript:void(0);" @click="ok" class="select_talent_a1">确定</a>
      <a href="javascript:void(0);" @click="close" class="select_talent_a2">取消</a>
     </div>
    </div>
  </div>

</template>

<script>



  import qs from 'qs';
export default {
  name: 'selectTea',
  data () {
    return {
      sum:0,
      keyword:"",
      search:true,
      checked:false,
      tealist:[],
      tabs:[],
      orglist:[],
      checkedTeaids:[],
      teaMap: new Object()
    }
  },
  filters: {
    pic(pic) {
      return "http://lvya.lvya.org/webs/"+pic;
    },
    add(v) {
      return v;
    }
  },
  watch: {//深度 watcher
    'checkedTeaids': {
      handler: function (val, oldVal) {
        if (this.tealist.length === this.checkedTeaids.length) {
          this.checked=true;
        }else{
          this.checked=false;
        }
      },
      deep: true
    },
    'selectShow': {
      handler: function (val, oldVal) {
        if (this.selectShow) {
          this.init();
        }
      },
      deep: true
    }
  },
  props:['teaids','selectShow'],
  created(){
      this.init();
    },
    methods: {


      init:function(){
        var this_ = this;
        this_.teaMap = new Object();
        this_.checkedTeaids = [];
        if(this.teaids!=""){

          this.teaids.split(",").forEach(function(id) {
            this_.teaMap[id] = id;
            this_.checkedTeaids.push(id);
          });
        }
        this.queryOrg(0);
      },
      checkedAll: function(event) {
        var this_ = this;
        this_.checkedTeaids = [];
        if (event.target.checked) {//实现反选
          this_.tealist.forEach(function(item) {
            this_.checkedTeaids.push(item.id);
            this_.teaMap[item.id] = item.id;
          });
        }else{
          this_.tealist.forEach(function(item) {
              delete this_.teaMap[item.id];
          });
        }


      },
      checkedOne: function(event) {
        var id = event.target.value;
        if (event.target.checked) {
          this.teaMap[id] = id;
        }else{
          delete this.teaMap[id];
        }
      },
      ok:function () {
        var teaids = "";
        for(var i in this.teaMap){//用javascript的for/in循环遍历对象的属性
          teaids = this.teaMap[i]+","+teaids;
        }
        if(teaids.length>1){
          teaids=teaids.substring(0,teaids.length-1);
        }

        this.$emit('update:teaids', teaids);
        this.$emit('update:selectShow', false);

        this.$emit('selectok')

      },
      close:function () {
        this.$emit('update:selectShow', false);
      },
      Search: function() {
        var uid =  this.$route.params.uid;
        var vux = this.$vux;
        var _self = this;
        this.$axios.post( global.path+uid+"/Search",

          qs.stringify({
            keyword:_self.keyword
          })
        ).then(function(res){
          _self.checked = false;
          _self.tealist = res.data.tealist;
          _self.orglist = res.data.orglist;
          _self.tabs = res.data.tabs;

          _self.checkedTeaids = [];
          _self.teaMap = new Object();

        }).catch(function(err){
          vux.toast.show({type: 'warn',text:err.message})
        })
        return false;
      },
      queryOrg(orgid){

        var uid =  this.$route.params.uid;
        var vux = this.$vux;
        var _self = this;
        this.$axios.get( global.path+uid+"/"+orgid+"/queryOrg").then(function(res){
          _self.checked = false;
          _self.tealist = res.data.tealist;
          _self.orglist = res.data.orglist;
          _self.tabs = res.data.tabs;
          _self.loading = false;
          _self.search=true;
          _self.checkedTeaids = [];
          _self.tealist.forEach(function(item) {

            if(_self.teaMap[item.id]!=null){
              _self.checkedTeaids.push(item.id);
            }
          });



        }).catch(function(err){
          vux.toast.show({type: 'warn',text:err.message})
        })
      }
    }
}
</script>


<style>
  .select_talent_box>.weui-search-bar{position:fixed;width:100%;top:0;z-index:5;}
  .select_talent_box>.select_talent_nav{position:fixed;width:100%;top:45px;z-index:4;border-bottom:1px solid #eee;box-shadow: 0px 0px 8px #ddd;}
  .select_talent_box a.weui-cell{padding-left:20px;}
  .select_talent_nav{color:#090;padding:10px 15px;background:#fff;box-sizing:border-box;overflow-x:auto;white-space:nowrap;}
  .select_talent_nav>span{display:inline-block;vertical-align:top;margin:0 5px;background:#090;color:#fff;border-radius:5px;padding:2px 7px;font-size:13px;}
  .select_talent_operate{position:fixed;padding:10px 15px;background:#fff;bottom:0;width:100%;border-top:1px solid #eee;box-shadow: 0px 0px 8px #ddd;box-sizing:border-box;line-height:30px;height:50px;}
  .select_talent_operate>a{position:absolute;display:block;border-radius:5px;width:65px;height:30px;color:#fff;top:10px;text-align:center;line-height:30px;}
  .select_talent_a1{background:#090;right:95px;}
  .select_talent_a2{background:#bbb;right:15px;}
</style>
