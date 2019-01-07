<template>
    <div>
        <div class="top-back">
             <img class="img1" src="@/assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ info.title }}</div>
        </div>
        <div class="history-details-con">
            <div>
                负责老师: <span>{{ fzrnames }}</span>
            </div>
           <!--  <div>
                素养指标: <span>客户至上</span>
            </div> -->
            <div class="last-div">
                参与范围:
                <span>
                    <template v-if="info.golimitstatus==0">不限</template>
                    <template v-if="info.golimitstatus==1">{{orgname}}</template>
                    <template v-if="info.golimitstatus==2">{{stuname}}</template>
                </span>
            </div>
            <!-- <div class="last-div">
                简介:
                <span>
                    {{ info.content }}
                </span>
            </div> -->
        </div>
    </div>
</template>

<script>
    import qs from 'qs';
export default {
    data(){
        return{
            info:[],
            fzrnames:"",
            uid:this.$route.params.uid,
            id:this.$route.params.id,
            stuname:"",
            orgname:"",
            title:'新青年,三下乡',
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
          this.$axios.post( process.env.API_ROOT+"app/tea/"+_self.id+"/sceneView",
            qs.stringify({
              uid:_self.$route.params.uid
            })
          ).then(function(res){
            _self.info = res.data.scene;
            _self.fzrnames = res.data.fzrnames;
            _self.stuname = res.data.stuname;
            _self.orgname = res.data.orgname;
          }).catch(function(err){
            _self.errorUtil(err);
          })


        },
    }
}
</script>
<style scoped>
.top-back {text-align: center;font-size: 36px;color: #444;position: fixed;left:0;right:0;padding:20px 20px 10px 20px;background-color: #fff;z-index: 100;top: 0;}
.top-back .img1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}

.history-details-con{margin-top: 90px;}
.history-details-con > div{margin:0 20px;font-size: 28px;color: #444;text-align: left;padding: 20px;border-bottom: 1px solid #f4f4f4;/*no*/}
.history-details-con > div span{color: #868383;}
.history-details-con .last-div {margin: 0;padding: 20px 40px;}
.last-div span{ margin-right: 30px;}

.n_title{width:55%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}

</style>
