<template>
  <div>
      <div class="message">
          <div class="top_div">
            <div class="top-back">
              <img class="img1" src="../../assets/img/back_left_green.png" alt="" @click="goback">
                <div class="n_title">消息列表</div>
            </div>
            <div class="top-search">
                <input type="text" ref="search"  placeholder="搜索信息" @keyup="Search">
                <img src="../../assets/img/sousuo.png" alt="">
            </div>
          </div>
          <div class="list-con-div">
                <ul>
                  <li v-for="(item,index) in conData" :key="item.index" >
                    <router-link :to="'/msgcontent/'+uid+'/'+index">
                        <div class="list-con-left">
                        <img v-if="item.conImg!=null&&item.conImg!=''" :src="item.conImg" alt="">
                        <img v-if="item.conImg==null||item.conImg==''" src="../../assets/img/morenpic.png" alt="">
                        </div>
                        <div class="list-con-right">
                        <p class="name-date">
                            <span>{{ item.name }}</span>
                            <span>{{ item.ctime }}</span>
                        </p>
                        <p class="art-p">{{ item.content }}</p>
                        </div>
                    </router-link>
                  </li>
                </ul>
              <!-- 暂无数据时显示 -->
                <div class="no-msg-div" v-if="conData.length<=0">
                  <img src="../../assets/img/zanwushuju.png" alt="">
                  <span>暂无数据</span>
              </div>
          </div>
          <Infinite v-on:infinite="infiniteMore"   style="padding-top: 20px"></Infinite>
      </div>
  </div>
</template>
<script>
  import qs from 'qs';
  import {formatDate} from '../../plugins/formatDate.js';
  // import Infinite from '@/components/scroll';
  export default {
    name:'message',
    components: {
      // Infinite
    },
    data(){
        return{
          uid:this.$route.params.uid,
          pageNo:1,
          isaction:true,
          keyword:"",
          conData:[]
        }
    },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
    created(){
      this.query();
    },
    methods:{
      goback(){
          this.$router.go(-1);
      },
      infiniteMore($state) {
        this.state = $state;
        this.query();
      },
      Search(){
        this.keyword  =  this.$refs.search.value;
        this.conData=[];
        this.pageNo=1;
        this.isaction=true;
        this.query();
      },
      query(){
        var _self = this;
        if(!_self.isaction){
          if(_self.state!=null){
            _self.state.loaded();
          }
          return false;
        }
        _self.isaction=false;

        this.$axios.post( process.env.API_ROOT+"app/stu/v1/MyNotificationDetails",
          qs.stringify({
            pageNo:_self.pageNo,
            uid:_self.uid,
            keyword:_self.keyword
          })
        ).then(function(res){
            _self.pageNo= _self.pageNo+1;
            res.data.forEach(function(item) {
              _self.conData.push(item);
            });


            _self.$nextTick(function(){
              if(_self.state!=null){
                _self.state.loaded();
              }
              if(res.data.length==15){
                _self.isaction=true;
              }
              if(res.data.length<15){
                if(_self.state!=null){
                  if(_self.conData.length==0){
                    _self.state.completed("暂无数据");
                  }else{
                    _self.state.completed("没有更多数据了");
                  }

                }
              }
            });
        }).catch(function(err){
          _self.errorUtil(err);
        })
      }
    }
}
</script>
<style>

</style>


<style scoped>
  .top_div{position: fixed;top: 0;left: 0;right: 0;z-index: 100;}
  .top-back {text-align: center;font-size: 36px;color: #444;padding:20px;background-color: #fff;z-index: 100;}
  .top-back .img1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
  .n_title{width:80%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}




.top-search{background-color: #f4f4f4;padding: 20px;text-align: center;position: relative;}
.top-search input{width: 80%;height: 60px;line-height: 60px;border: 1px solid #e7e6e6;/*no*/border-radius: 5px;/*no*/padding: 10px 0 10px 60px;position: relative;font-size: 26px;}
.top-search img {position: absolute;width: 28px;height: 28px;left: 11%;top: 48px;}
.list-con-div{position: absolute;bottom:0;top:220px;left:0;right:0;}
.list-con-div ul li {overflow:hidden;padding: 15px 20px;border-bottom: 1px solid #ededee;/*no*/}
.list-con-left {float: left;width: 90px;height: 90px;border-radius: 100%;border: 1px solid #ccc;/*no*/margin-right: 20px;}
.list-con-left img{width: 90px;height: 90px;border-radius: 100%;}
.list-con-right {float: left;width: 580px;}
.name-date {overflow: hidden;padding-bottom: 10px;}
.name-date span:first-child{float: left;color: #393a3f;font-size: 28px;}
.name-date span:last-child{float: right;color: #7a7a7b;font-size: 24px;}
.art-p{overflow: hidden;text-overflow:ellipsis;white-space: nowrap;font-size: 26px;color:#444;}

.no-msg-div{color: #999;text-align: center;line-height: 64px;margin-top: 50px;}
.no-msg-div img{width: 70px;height: 70px;display: inline-block;vertical-align: middle}
.no-msg-div span{height: 70px;display: inline-block;vertical-align: middle;font-size:28px;}
</style>
