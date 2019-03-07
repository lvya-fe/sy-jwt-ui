<template>
    <div>
      <div v-show="show">
        <div class="top-back">
            <img class="img1" src="@/assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ title }}</div>
            <button type="button" @click="add">确定赋分</button>
        </div>
        <div class="input-div">
            <div class="input-title" @click="show=!show">
              <a>选择素养指标</a>
            </div>
            <div class="input-body">
                <div class="input-child" v-for="(item,index) in data" :key="index">
                    <span>{{ item.title }}</span>
                    <input type="text" name="" id="" v-model="item.score" placeholder="请输入指标分数" onkeyup="value=value.match(/^-?[0-9]\d*$/)||value.match(/-?/)">
                    <img src="@/assets/img/shanchu.png" alt="" @click="remove(index)">
                </div>
            </div>
        </div>
      </div>
        <selecttag  v-bind:uid="uid" v-show="!show" @closeSelect = "closeSelect" @qd = "qd"></selecttag>
        
    </div>


</template>

<script>

  import qs from 'qs';
  import selecttag from "@/components/tea/selecttag";
  import {ToastPlugin,AlertPlugin,LoadingPlugin,Group, CellBox } from 'vux'
  import Bus from '@/plugins/eventBus.js'
  export default {
    components: {
      selecttag,
      Group,
      LoadingPlugin,
      ToastPlugin,
      AlertPlugin,
      LoadingPlugin,
      CellBox
    },
      data(){
          return{
              uid:this.$route.params.uid,
              id:this.$route.params.id,
              show:true,
              title:'手动赋分',
              data:[],
              commitParams:{}
          }
      },
      created() {
        Bus.$on('commitData',(data)=>{
          this.commitParams = data;
        });
      },
      methods:{
          goback(){
              this.$router.go(-1);
          },
          closeSelect(){
               this.show =true;
          },
          qd(infos){
               if(infos.length > 0) {
                 infos.forEach(element => {
                   element.score = null;
                   this.data.push(element);
                 });
               }
                this.data = infos;
               this.show =true;
          },
          remove(index){
              this.data.splice(index, 1);
          },
        add(){
          console.log(this.data);
          if(this.data.length == 0){
            this.$vux.toast.show({type: 'warn',text:"请选择指标" });
            return;
          }
          else{
            this.data.forEach(element =>{
              element.score = element.score == null ? 0 :element.score;
            })
          }
          this.commitParams.scorejson = JSON.stringify(this.data);
          this.$axios.post(process.env.API_ROOT+"app/tea/task/joinTeaAddScore",qs.stringify(this.commitParams))
          .then((res) =>{
            this.$vux.toast.show({type: 'success',text:"成功" });
            this.$router.go(-2);
          }).catch((err) =>{
              console.log(err)
              this.errorUtil(err);
          })
          
          
        }

      }
  }
</script>

<style scoped>
.top-back {text-align: center;font-size: 36px;color: #444;padding:20px;background-color: #fff;position: fixed;top:0;left: 0;right: 0;}
.top-back .img1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
.top-back button {padding: 0 10px;height: 50px;font-size: 30px;color: #01c269;border: 1px solid #01c269;/*no*/border-radius: 5px;/*no*/background-color: #fff;right: 20px;top:23px;position: absolute;outline: none;}
.n_title{width:55%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}



.input-div{margin-top: 100px;}
.input-title a{font-size: 26px;color: #fff;background-color: #01c269;height: 65px;line-height: 65px;display: inline-block;padding: 0 10px;border-radius: 3px;/*no*/margin: 20px;}

.input-child {overflow: hidden;padding: 0 20px;margin-bottom: 20px;}
.input-child span {max-width:400px;;font-size: 26px;color: #444;float: left;height: 65px;line-height: 65px;margin-right: 20px;}
.input-child input {font-size: 26px;color: #444;float: left;height: 65px;line-height: 65px;border: 1px solid #b2b0b0;/*no*/border-radius: 3px;/*no*/width: 220px;margin-right: 20px;padding: 0 5px;outline: none;}
.input-child img{width: 36px;height: 36px;margin-top: 14.5px;}

input::-webkit-input-placeholder,input:-moz-placeholder,input::-moz-placeholder,input:-ms-input-placeholder{color: #b2b0b0}

</style>
