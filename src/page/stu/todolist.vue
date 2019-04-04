<template>
    <div>
        <div class="top-back">
            <img class="img-1 ripple" src="../../assets/img/back_left_green.png" alt="" @click="goback">
            <p class="n_title">待办</p>
        </div>
        <!-- <group>
            <cell-box class="con-child ripple" v-for="todo in todos" :key="todo.id"  >
                <div class="link_div" @click="goTodo(todo)">
                    <span>{{todo.title}}
                        <strong v-if="todo.taskid==null" v-show="todo.state=='O'">
                            <img src="../../assets/img/weishangchuan.png" alt="">
                        </strong>
                        <strong v-if="todo.taskid==null" v-show="todo.state=='N'">
                            <img src="../../assets/img/yibohui_s.png" alt="">
                        </strong>
                        <strong v-if="todo.taskid" v-show="todo.state=='N'">
                            <img src="../../assets/img/bohui.png" alt="">
                        </strong>
                    </span>
                    <img src="../../assets/img/you.png" alt="">
                </div>
            </cell-box>
        </group> -->
      <div class="empty-top"></div>
        <div class="todoChange">
            <div class="ripple" v-for="(todo,index) in todos" :key="index" @click.stop="goTodo(todo)">
                <div class="leftParent">
                    <img class="first-img" :src="todo.sceneImg">
                </div>
                <div class="ne-div">
                    <p>
                        <span>{{ todo.title }}<img v-if="todo.type=='2'" src="../../assets/img/dbzs.png" alt=""></span>
                    </p>
                    <p>
                        <span>
                            <img src="../../assets/img/dbchangjing.png">
                            {{ todo.sceneName }}
                        </span>
                        <span>
                            <img class="marginLeftImg" src="../../assets/img/dbguocheng.png">
                            {{ todo.itemName }}
                        </span>
                    </p>
                </div>
                <img class="clickHl" @click.stop="seeWindew(todo.id,todo.type)" src="../../assets/img/dbhl.png" alt="">
            </div>
            <p class="loadJz" v-if="loadShow">数据过多,系统正在拼命加载中...</p>
        </div>
        <div class="no-msg-div" v-if="todos.length<=0&&loadShow==false">
            <img src="@/assets/img/zanwushuju.png" alt="">
            <span>暂无数据</span>
        </div>
        <div v-transfer-dom class="todoStyle">
            <confirm v-model="show"
            title="是否忽略?"
            @on-cancel="onCancel"
            @on-confirm="onConfirm"
            confirm-text="取消"
            cancel-text="确定">
            </confirm>
        </div>
    </div>


</template>

<script>
import { Tab, TabItem, CellBox, Group, TransferDom, Confirm } from "vux";

import qs from 'qs';
export default {
    directives: {
        TransferDom
    },
    components: {
        Tab,
        TabItem,
        CellBox,
        Group,
        Confirm
    },
    data(){
        return{
            index: 0,
            todos:[],
            completes:[],
            show:false,
            todoId:null,
            todoType:null,
            loadShow:true,
        }
    },
    created(){
        this.loadData();
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        goTodo(todo){
            if(todo.type=='1'){
              // this.$router.push({path: '/studentTaskDetails/'+this.$route.params.uid+'/'+todo.id+'/'+null+'/'+null+'/'+0});
              this.$router.push({path: '/task-details/'+this.$route.params.uid+'/'+todo.id+'/'+null+'/'+0});
            }
            if(todo.type=='2'){
                 this.$router.push({path: '/CertificateRUploadRejection/'+this.$route.params.uid+'/'+todo.id});
            }
        },
        loadData(){
            var _self = this;
            var id = _self.$route.params.id;
            if(id==0){
                id = null;
            }
            this.$axios.post( process.env.API_ROOT+"app/stu/v1/task/queryTODO",
                qs.stringify({
                    uid:_self.$route.params.uid,
                    sceneitemid:id
                })
            ).then(function(res){
                _self.todos = res.data.todos;
                _self.completes = res.data.completes;
                _self.loadShow=false;
                console.log(res)
            }).catch(function(err){
                _self.errorUtil(err);
            })
        },
        seeWindew(id,type){
            this.show=true
            this.todoId=id
            this.todoType=type
            console.log(id,type)
        },
        onCancel(){
            var _self = this;
            this.$axios.post( process.env.API_ROOT+"app/stu/v1/task/ignoreTODO",
                qs.stringify({
                    uid:_self.$route.params.uid,
                    ignoreType:_self.todoType,
                    ignoreId:_self.todoId,
                })
            ).then(function(res){
                console.log(res)
                _self.$vux.toast.show({type: 'success',text:"成功" });
                _self.todos.forEach(function(el,index){
                    if(el.id==_self.todoId){
                        _self.todos.splice(index,1);
                    }
                })
            }).catch(function(err){
                _self.errorUtil(err);
            })
        },
        onConfirm(){
        },
    }
}
</script>
<style>
    .vux-x-dialog .weui-dialog{max-width:520px;-webkit-transform: translate(0,0);transform: translate(0,0);left:0;top:0;}
    .vux-x-dialog .weui-dialog__bd {padding: 0 1.6em .8em;min-height: 40px;font-size: 15px;line-height: 1.3;word-wrap: break-word;word-break: break-all;color: #999;}
    .vux-x-dialog .weui-dialog__title {font-size: 28px;color: #444;}
    .vux-x-dialog .weui-dialog__ft {line-height: 65px;}
    .todoStyle .weui-dialog__ft .weui-dialog__btn_default {font-size: 28px;color: #fff;background-color: #11c772;}
    .todoStyle .weui-dialog__ft .weui-dialog__btn_primary {font-size: 28px;color: #fff;background-color: #8f8e8e;}
</style>

<style scoped>
    .top-back {text-align: center;font-size: 36px;color: #444;padding:20px;background-color: #fff;position: relative;}
    .top-back .img-1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
    .n_title{width:80%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}


    .todoChange{position: relative;}
    .todoChange >div{padding: 25px;text-align: left;color: #444;overflow: hidden;border-bottom: 1px solid #f4f3f3;/*no*/margin-bottom: 30px;position: relative;}
    .todoChange >div:last-child{border-bottom:none;}
    .leftParent{width: 80px;float: left;}
    .leftParent .first-img {width: 80px;height: 80px;float: left;border-radius:100%;}
    .todoChange .ne-div{float: left;height: 80px;margin-left: 20px;}
    .todoChange .ne-div p:first-child{position: relative;font-size: 28px;}
    .todoChange .ne-div p:first-child img{width:36px;height:36px;vertical-align: middle;margin: -5px 0 0 10px;}
    .todoChange .ne-div p:nth-child(2){font-size: 26px;color:#acafb7;overflow: hidden;}
    .todoChange .ne-div p:nth-child(2) span img{width:28px;vertical-align: middle;margin-top:-2px;/*no*/}
    .todoChange .ne-div p:nth-child(2) span{float:left;width:250px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
    .marginLeftImg{margin-left:10px;}
    .clickHl{position: absolute;right: 50px;top:40px;width: 36px;height: 36px;}

    .loadJz{font-size: 26px;text-align:center;color:#acafb7;padding:20px 0;}

    .no-msg-div{color: #999!important;text-align: center;line-height: 64px;margin-top: 50px;}
    .no-msg-div img{width: 70px;height: 70px;display: inline-block;vertical-align: middle}
    .no-msg-div span{height: 70px;display: inline-block;vertical-align: middle;font-size:28px;}
</style>
