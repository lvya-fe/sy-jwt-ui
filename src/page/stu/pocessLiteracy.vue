<template>
    <div>
        <div class="index_top">
            <img class="img-1" src="../../assets/img/back_left_green.png" alt="" @click="goback">
            <i class="icon iconfont icon-hexinsuyang ts-img"></i>
            <p class="number_p">{{sumScore}}</p>
        </div>
        <div v-if="status=='gc'" class="process_content">
            <div class="flow_content" v-if='listItemMap!=null && listItemMap.length>0'>
                <p><i class="icon iconfont icon-yewuguochengliebiao"></i>过程得分</p>
                <div v-for="child in listItemMap" :key="child.index">
                    <span>{{ child.targetTitle }}</span>
                    <strong>{{ child.score>=0?'+'+child.score:child.score }}</strong>
                </div>
            </div>
            <div class="flow_content" v-for="item in flowCon" :key="item.index">
                <p><i class="icon iconfont icon-renwu"></i>{{ item.title }}</p>
                <div v-for="child in item.listStuLog" :key="child.index">
                    <span>{{ child.targetTitle }}</span>
                    <strong>{{ child.score>=0?'+'+child.score:child.score }}</strong>
                </div>
            </div>

        </div>
        <img v-if="status=='gc'&&(listItemMap==null||listItemMap.length<=0)&&flowCon.length<=0" class="zw_img" src="../../assets/img/sy_zw.png" alt="">



        <div v-if="status=='cj'" class="process_content" v-for="child in listItemMap" :key="child.index">
            <div class="cj_div">
                <div class="flow_content" v-if='child.listItemScoreMap!=null && child.listItemScoreMap.length>0'>
                    <p><i class="icon iconfont icon-yewuguochengliebiao"></i>{{ child.item.title }}</p>
                    <div  v-for="cjContent in child.listItemScoreMap" :key="cjContent.index">
                        <span>{{ cjContent.targetTitle }}</span>
                        <strong>{{ cjContent.score>=0?'+'+cjContent.score:cjContent.score }}</strong>
                    </div>
                </div>
                <div class="flow_content" v-for="item in child.listTask" :key="item.index">
                    <p><i class="icon iconfont icon-renwu"></i>{{ item.title }}</p>
                    <div v-for="child in item.listStuLog" :key="child.index">
                        <span>{{ child.targetTitle }}</span>
                        <strong>{{ child.score>=0?'+'+child.score:child.score }}</strong>
                    </div>
                </div>
            </div>
        </div>
        <img v-if="status=='cj'&&(listItemMap==null||listItemMap.length<=0)" class="zw_img" src="../../assets/img/sy_zw.png" alt="">

    </div>
</template>

<script>
import qs from 'qs';
export default {
    data(){
        return{
            flowCon:[],
            listItemMap:[],
            sumScore:0,

            status:this.$route.params.status,
        }
    },
    created(){
        this.loadData();
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        loadData(){
          var _self = this;
          var obj = {};
          var vKey=null;
          var vKey2=null;
          var url=null;
          obj.uid=_self.$route.params.uid;
          if(_self.status=='cj'){
            url='app/stu/v1/sceneScore'
            vKey = 'sceneId'
            obj[vKey] = _self.$route.params.itemId
          }else if(_self.status=='gc'){
            url='app/stu/v1/itemScore'
            vKey = 'itemId'
            vKey2 = 'sceneid'
            obj[vKey] = _self.$route.params.itemId
            obj[vKey2] = ''
          }
          obj[vKey] = _self.$route.params.itemId
          console.log(obj)
          this.$axios.post( process.env.API_ROOT+url,
            qs.stringify(obj)
          ).then(function(res){
           _self.flowCon = res.data.listTask;
           _self.listItemMap = res.data.listItemMap;
           _self.sumScore = res.data.sumScore;
            console.log(res)

          }).catch(function(err){
            _self.errorUtil(err);
          })
        },
    }
}
</script>

<style scoped>
    .index_top{position: relative;text-align: center;padding: 0 0 30px;}
    .ts-img{font-size: 76px;color: #2ed184;}
    .img-1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
    .number_p{color: #2ed184;font-size: 36px;}


    .flow_content{overflow: hidden;padding: 20px;position: relative;border-bottom: 5px solid #f4f3f3;/*no*/}
    .flow_content > p{font-size: 28px;color: #444;margin-bottom: 20px;padding:10px 0;border-bottom: 1px solid #f4f3f3;/*no*/}
    .flow_content > div{float: left;width: 33%;padding:5px 0;font-size: 26px;}    
    .flow_content > div strong{color: #16c775;font-size: 26px;}  

    .process_content i{color: #999;margin-right: 10px}


    .cj_div{border-bottom: 10px solid #f4f3f3;/*no*/}

    .zw_img{width:212px;display: block;margin: 200px auto 0;}
</style>
