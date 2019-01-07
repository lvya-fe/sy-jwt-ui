<template>
    <div>
        <div class="myCha">
            <div class="top-back">
                <img class="img1" src="@/assets/img/back_left_green.png" alt="" @click="goback">
                <div class="n_title">{{ title }}</div>
            </div>

            <div class="student-con">
                <div class="top-search">
                    <input type="text" ref="search" placeholder="输入要搜索的学生姓名" @keyup="Search">
                    <img src="@/assets/img/sousuo.png" alt="">
                </div>


              <div class="select-div">
                <strong @click="changePopup">
                  <span>{{titleSpan}}</span>
                  <span class="sj-span"></span>
                </strong>
              </div>
            </div>
        </div>
        <div class="list-con-div">
            <ul>
                <li v-for="(item,index) in conData" :key="index">
                  <router-link :to="'/StudentDetails/'+uid+'/'+item.id">
                    <div class="list-con-left">
                        <img v-if="item.pic!=null&&item.pic!=''" :src="item.pic" alt="">
                        <img v-if="item.pic==null||item.pic==''" src="@/assets/img/morenPic.png" alt="">
                    </div>
                    <div class="list-con-right">
                        <p class="name-date">
                            <span>{{ item.name }}</span>
                        </p>
                        <p class="art-p">{{ item.orgname }}</p>
                    </div>
                    <div class="position-right">
                        <i class="icon iconfont icon-hexinsuyang"></i>
                        <span>{{ item.score }}</span>
                    </div>
                  </router-link>
                </li>
            </ul>
            <Infinite v-on:infinite="infiniteMore" v-on:scrollinit="scrollinit"  style="padding-top: 20px"></Infinite>
            <p class="loadJz" v-if="loadShow">数据过多,系统正在拼命加载中...</p>
        </div>



        <div class="popup-div" v-show="show" @click="changePopup1">
            <div class="popup-child" v-for="(item,index) in orgs" :key="index" @click="toggle(index,item)" :class="{selected:index==active}">
                {{ item.name }}
            </div>
        </div>
    </div>
</template>

<script>
  import qs from 'qs';
  import Infinite from "@/components/vue-scroll";
  export default {
      data(){
          return{
              uid:this.$route.params.uid,
              title:'我的学生',
              titleSpan:'不限',
              isaction:true,
              active:0,
              pageNo:1,
              keyword:null,
              orgid:null,
              show:false,
              conData:[],
              orgs:[],
              loadShow:true,
          }
      },
    components:{
      Infinite
    },
      created(){
        this.loadData();
      },
      methods:{
        goback(){
            this.$router.go(-1);
        },

        Search(){
          this.keyword  =  this.$refs.search.value;
          this.conData=[];
          this.pageNo=1;
          this.isaction=true;
          this.query('string');
        },
        scrollinit($state) {
          this.state = $state;
          this.state.loaded();
        },
        infiniteMore($state) {
          this.state = $state;
          this.query();
        },
        loadData(){
          var _self = this;
          this.$axios.post(process.env.API_ROOT + "app/tea/Mystu/"+this.uid,
            qs.stringify({
            })
          ).then(function (res) {
            res.data.orgs.push({id:null,name:'不限'});
            res.data.orgs.reverse();
            _self.orgs= res.data.orgs;
            _self.conData=res.data.stuInfos;
            console.log(res,'看数据')

            if(res.data.stuInfos.length<15){
              if(_self.state!=null){
                if(_self.conData.length==0){
                  _self.state.completed("暂无数据");
                }else{
                  _self.state.completed("没有更多数据了");
                }
              }
            }
            _self.loadShow=false;
          }).catch(function (err) {
            _self.errorUtil(err);
          })

        },
        query(string){
          var _self = this;
          _self.loadShow=true;
          if(!_self.isaction){
            if(_self.state!=null){
              _self.state.completed("");
              _self.state.loaded();
            }
            return false;
          }
          _self.isaction=false;
          if(string!=null&&string!=undefined&&string=='string'){
            _self.pageNo= 1;
          }else{
            _self.pageNo= _self.pageNo+1;
          }
          
          this.$axios.post( process.env.API_ROOT+"app/tea/Mystu/"+this.uid,
            qs.stringify({
              pageNo:_self.pageNo,
              orgid:_self.orgid,
              keyword:_self.keyword
            })
          ).then(function(res){
            console.log(res,'kankan ')
            res.data.stuInfos.forEach(function(item) {
              _self.conData.push(item);
            });

            _self.$nextTick(function(){
              if(_self.state!=null){
                _self.state.loaded();
              }
              if(res.data.stuInfos.length==15){
                _self.isaction=true;
              }
              if(res.data.stuInfos.length<15){
                if(_self.state!=null){
                    if(_self.conData.length==0){
                       _self.state.completed("暂无数据");
                    }else{
                       _self.state.completed("没有更多数据了");
                    }
                }
              }
            });
            _self.loadShow=false;
          }).catch(function(err){
            _self.errorUtil(err);
          })

        },

          toggle(index,item){
              this.active=index
              this.titleSpan=item.name
              this.orgid=item.id
              this.show=false
              this.conData=[];
              this.pageNo=1;
              this.$refs.search.value ="";
              this.keyword="";
              this.isaction=true;
              this.query('string');
          },
          changePopup(){
              this.show=!this.show
          },
          changePopup1(){
              this.show=false
          }
      }
}
</script>

<style scoped>
.myCha{position:fixed;top:0;left:0;right:0;z-index: 10;background: #fff;}
.top-back {text-align: center;font-size: 36px;color: #444;padding:20px;background-color: #fff;}
.top-back .img1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
.n_title{width:55%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}


.top-search{background-color: #f4f4f4;padding: 20px 20px 0 20px;text-align: center;position: relative;}
.top-search input{width: 80%;height: 55px;line-height: 55px;border: 1px solid #e7e6e6;/*no*/border-radius: 5px;/*no*/padding: 10px 0 10px 60px;position: relative;font-size:26px;}
.top-search img {position: absolute;width: 28px;height: 28px;left: 11%;top: 43px;}

.select-div {overflow: hidden;padding: 20px 40px;background-color: #f4f4f4;}
.select-div strong {font-weight: 400}
.select-div strong span {float: left;font-size: 30px;color: #444;}
.select-div strong span:last-child{margin-right: 60px;}
.sj-span{width: 0;height: 0;border-width: 15px;border-style: solid;border-color: #444 transparent transparent transparent;margin-top: 15px;margin-left: 15px;}

.list-con-div{margin-top:280px;}
.list-con-div ul li {overflow:hidden;padding: 15px 20px;border-bottom: 1px solid #ededee;/*no*/position: relative;}
.list-con-left {float: left;width: 90px;height: 90px;border-radius: 100%;margin-right: 20px;}
.list-con-left img{width: 90px;height: 90px;border-radius: 100%;}
.list-con-right {float: left;width: 580px;}
.name-date {overflow: hidden;padding-bottom: 10px;width: 50%}
.name-date span{float: left;color: #393a3f;font-size: 28px;}
.art-p{overflow: hidden;text-overflow:ellipsis;white-space: nowrap;font-size: 26px;width: 50%;color: #c6c2c2}
.position-right{position: absolute;right: 30px;top: 35px;}
.position-right i{font-size: 36px;float: left;color: #01c269;margin-right:5px;}
.position-right span{width: 100px;height: 50px;font-size: 26px;color: #444;float: left;height: 50px;line-height: 50px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}


.popup-div {position: fixed;top:280px;bottom:0;left:0;right:0;z-index: 100000;background-color: rgba(0,0,0,0.6);overflow: auto;}
.popup-child{padding: 20px 40px;border-bottom: 1px solid #ededee;/*no*/font-size: 26px;color: #444;background-color: #fff;}

.selected{color: #2ed184!important;}
.loadJz{font-size: 26px;text-align:center;color:#acafb7;padding:20px 0;}

</style>
