<template>
    <div>
        <div class="top-back">
            <img class="img1" src="../../assets/img/back_left_green.png" alt="" @click="goback">
            {{ title }}
            <button type="button" @click="qd">确定</button>
        </div>
        <div class="setting-con">
            <group>
                <cell-box class="con-child" v-for="(item,index) in itmes" :key="index">
                    <label :for="'tts_'+index">{{ item.title}} <strong></strong><br><span>{{ item.msg }}</span></label>
                    <input :id="'tts_'+index" type="checkbox" class="checkBox" :value="item" v-model="check">
                </cell-box>
            </group>
        </div>
    </div>
</template>

<script>

  import qs from 'qs';

  import {ToastPlugin,AlertPlugin,LoadingPlugin,Group, CellBox } from 'vux'
export default {
    components:{
        Group,
        LoadingPlugin,
        ToastPlugin,
        AlertPlugin,
        LoadingPlugin,
        CellBox
    },
    props: {
      uid: {
        type: String,
        timer:null,
        default: ""
      }
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
           this.$emit('closeSelect');
        },
        qd(){
          if(this.check.length<=0){
              this.$vux.toast.show({type: 'warn',width:'10em', text: "请选择指标"});
              return;
          }
          this.$emit('qd',this.check);
        },
        loadData(){
          var _self = this;
          this.$axios.post( process.env.API_ROOT+"app/tea/querytargets",
            qs.stringify({
              uid:_self.uid
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
.setting-con .weui-cells:before{border-top: none;}

</style>

<style scoped>
.top-back {text-align: center;font-size: 36px;color: #444;position: fixed;left:0;right:0;padding:20px;background-color: #fff;z-index: 100;top: 0;border-bottom: 1px solid #e3e2e2;/*no*/}
.top-back .img1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
.top-back button {width: 100px;height: 50px;font-size: 30px;color: #01c269;border: 1px solid #01c269;/*no*/border-radius: 5px;/*no*/background-color: #fff;right: 20px;top:23px;position: absolute;outline: none;}

.setting-con{margin-top: 100px;}
.con-child label{width: 100%;padding:30px 10px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;text-align: left;font-size: 28px;color: #444;}
.con-child{margin-right: 10px;font-size: 28px;color: #444;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;padding: 25px;}

.checkBox {width: 25px;height: 25px;background-color: #fff;-webkit-appearance:none;border: 1px solid #c9c9c9;/*no*/border-radius: 3px;/*no*/outline: none;padding: 2px;}
.checkBox:checked{background: url("../../assets/img/duigou.png")no-repeat center;background-size: cover;border: 1px solid #04BE02;/*no*/background-position: top left;}
</style>
