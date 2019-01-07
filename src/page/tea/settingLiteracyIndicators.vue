<template>
    <div>
        <div class="top-back">
            <img class="img1" src="@/assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ title }}</div>
            <button type="button">确定</button>
        </div>
        <div class="setting-con">
            <group>
                <cell-box class="con-child" v-for="(item,index) in itmes" :key="index">
                    <p>{{ item.title}} <strong></strong><br><span>{{ item.msg }}</span></p>
                    <input type="checkbox" class="checkBox" :value="item" v-model="check">
                </cell-box>
            </group>
        </div>
    </div>
</template>

<script>

  import qs from 'qs';
import { Group, CellBox } from "vux";
export default {
    components:{
        Group,
        CellBox
    },
    created(){
      this.loadData();
    },
    data(){
        return{
            title:'设置素养指标',
            check:[],
            itmes:[]
        }
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        loadData(){
          var _self = this;
          this.$axios.post( process.env.API_ROOT+"app/tea/querytargets",
            qs.stringify({
              uid:_self.$route.params.uid
            })
          ).then(function(res){
            _self.itmes = res.data.infos;

          }).catch(function(err){
            _self.errorUtil(err);
          })
        }
    }
}
</script>
<style>
.setting-con .weui-cells{margin-top: 0;}

</style>

<style scoped>
.top-back {text-align: center;font-size: 36px;color: #444;padding:20px;background-color: #fff;}
.top-back .img1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
.top-back button {width: 100px;height: 50px;font-size: 30px;color: #01c269;border: 1px solid #01c269;/*no*/border-radius: 5px;/*no*/background-color: #fff;right: 20px;top:23px;position: absolute;outline: none;}
.n_title{width:80%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}


.con-child p{width: 100%;padding:30px 10px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;text-align: left;font-size: 28px;color: #444;}
.con-child:first-child p{font-size: 30px!important;}
.con-child{margin-right: 10px;font-size: 28px;color: #444;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;padding: 25px;}

.checkBox {width: 25px;height: 25px;background-color: #fff;-webkit-appearance:none;border: 1px solid #c9c9c9;/*no*/border-radius: 3px;/*no*/outline: none;padding: 2px;}
.checkBox:checked{background: url("../../assets/img/duigou.png")no-repeat center;background-size: cover;border: 1px solid #04BE02;/*no*/background-position: top left;}
</style>
