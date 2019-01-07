<template>
    <div>
        <div class="top-back">
            <img class="img-1" src="../../assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ info.title }}</div>
            <button type="button" class="ripple" v-if="(set.showName=='尚未获得'||set.showName=='未通过')&&set.cometype==0" @click="add()">提交</button>
        </div>
        <div class="main_content" v-if="set.showName=='尚未获得'&&set.cometype==0">

            <div class="Certificate_No">
                <span>证书编号 :</span>
                <input type="text" v-model="code">
            </div>
            <group>
                <datetime
                    v-model="value1"
                    @on-change="change"
                    title="获得日期 :"
                    @on-cancel="log('cancel')"
                    @on-confirm="onConfirm"
                    @on-hide="log('hide', $event)"
                    placeholder="请选择日期">
                </datetime>
            </group>
            <uploadImg v-bind:imgs.sync="imgs" v-bind:uid.sync="uid" v-bind:count.sync="count"></uploadImg>

            <!-- <div class="certificate_picture">
                <span>证书图片 :</span>
                <div class="picture_div">
                    <div class="img_div">
                        <img src="../../assets/img/jinxingzhong.png" alt="">
                        <i class="icon iconfont icon-banyuanchahao-"></i>
                    </div>
                    <div class="add_div">
                        <img src="../../assets/img/tj_big.png" alt="">
                    </div>
                </div>
            </div> -->
            <div class="tex_div">
                <span>备注 :</span>
                <group class="cont-tex">
                    <x-textarea :max="200" autosize :rows="8" :placeholder="msgNot" v-model="bz" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
                </group>
            </div>
            
        </div>

        <div class="main_content" v-if="set.showName=='未通过'">

            <!-- 驳回原因 -->
            <div class="reason_rejection">
                <group>
                    <cell title="驳回原因 :" align-items="flex-start" :value="con.approvalbz" value-align="left"></cell>
                    <cell title="审核时间 :" align-items="flex-start" :value="con.ctime" value-align="left"></cell>
                </group>
            </div>
            

            <div class="Certificate_No">
                <span>证书编号 :</span>
                <input type="text" v-model="code">
            </div>
            <group>
                <datetime
                    v-model="value2"
                    @on-change="change"
                    title="获得日期 :"
                    @on-cancel="log('cancel')"
                    @on-confirm="onConfirm"
                    @on-hide="log('hide', $event)"
                    placeholder="请选择日期">
                </datetime>
            </group>
            <uploadImg v-bind:imgs.sync="imgs" v-bind:uid.sync="uid" v-bind:count.sync="count"></uploadImg>

            <!-- <div class="certificate_picture">
                <span>证书图片 :</span>
                <div class="picture_div">
                    <div class="img_div">
                        <img src="../../assets/img/jinxingzhong.png" alt="">
                        <i class="icon iconfont icon-banyuanchahao-"></i>
                    </div>
                    <div class="add_div">
                        <img src="../../assets/img/tj_big.png" alt="">
                    </div>
                </div>
            </div> -->
            <div class="tex_div">
                <span>备注 :</span>
                <group class="cont-tex">
                    <x-textarea :max="200" autosize :rows="8" :placeholder="msgNot" v-model="bz" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
                </group>
            </div>
            
        </div>
        
        <div class="bh_div" v-if="set.showName=='待审核'">
            <group label-width="5em">
                <cell title="证书编号 :" align-items="flex-start" :value="con.code" value-align="left"></cell>
                <cell title="获得日期 :" align-items="flex-start" :value="con.jointime" value-align="left"></cell>
            </group>
            <div class="certificate_picture">
                <span>证书图片 :</span>
                <div class="picture_div" v-if="zsImg.length>0">
                    <div class="img_div" v-for="item in zsImg">
                        <img  :src="item" alt="" preview="st">
                    </div>
                </div>
            </div>
            <group label-width="5em" >
                <cell title="备注 :"  align-items="flex-start" :value="con.bz" value-align="left"></cell>
                <cell title="提交时间 :" align-items="flex-start" :value="con.ctime" value-align="left"></cell>
            </group>
        </div>

        <template v-if="set.showName=='已经获得'">
            <div class="acquisition_msg">
                <group>
                    <cell title="证书级别 :" align-items="flex-start" :value="info.level" value-align="left"></cell>
                    <cell title="备注 :" align-items="flex-start" :value="con.bz" value-align="left"></cell>
                </group>
            </div>
            <div class="acquisitino_date">
                <group>
                    <cell title="获得时间 :" align-items="flex-start" :value="con.ctime" value-align="left"></cell>
                </group>
            </div>
        </template>

        <template v-if="(set.showName=='尚未获得'&&set.cometype==1)">
            <div class="acquisition_msg">
                <group>
                    <cell title="证书级别 :" align-items="flex-start" :value="info.level" value-align="left"></cell>
                    <cell title="备注 :" align-items="flex-start" :value="info.bz" value-align="left"></cell>
                </group>
            </div>
            <div class="acquisitino_date">
                <group>
                    <cell title="获得条件 :" align-items="flex-start" :value="'【'+(set.grantcondition==0?gc:cj)+'】'+'素养分'+(set.gtorglstatus==0?'大于':set.gtorglstatus==1?'小于':set.gtorglstatus==2?'等于':'')+set.sort " value-align="left"></cell>
                </group>
            </div>
        </template>
    </div>
</template>

<script>

import { Group, Cell, Datetime, XTextarea  } from "vux";
import qs from 'qs';
import {wechatconfigInit,wechatopenimg} from '@/plugins/wechat.js';
import uploadImg  from '@/components/uploadImg'
import { mapState } from 'vuex'


import {formatDate} from '../../plugins/formatDate.js';


export default {
    components:{
        Group, 
        Cell,
        Datetime,
        XTextarea,
        uploadImg

    },
    data(){
        return{
            uid:this.$route.params.uid,
            id:this.$route.params.id,
            value1:'',
            value2:'',

            code:'',
            bz:'',

            info:[],
            con:[],
            set:[],

            cj:'',
            gc:'',

            msgNot:'最多输入200个汉字。',

            
            imgs:[],
            count:9,
            zsImg:[],
        }
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return  formatDate(date, "yyyy-MM-dd hh:mm");
             
        }
    },
    computed: mapState({
      _url_: state => state._url_
      
    }),
    created(){
        this.loadData()
        wechatconfigInit(this,qs,this.uid,this._url_);
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        fmtDate(inputTime) {  
            var date = new Date(inputTime);
            var y = date.getFullYear();  
            var m = date.getMonth() + 1;  
            m = m < 10 ? ('0' + m) : m;  
            var d = date.getDate();  
            d = d < 10 ? ('0' + d) : d;  
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;  
            second = second < 10 ? ('0' + second) : second; 
            return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
        },
        change (value) {
            console.log('change', value)
        },
        
        log (str1, str2 = '') {
            console.log(str1, str2)
        },
        onConfirm (val) {
            console.log('on-confirm arg', val)
            console.log('current value', this.value1)
        },
        onEvent (event) {
            console.log('on', event)
        },

        loadData(){
          var _self = this;
          this.$axios.post( process.env.API_ROOT+"app/stu/v1/viewcer",
            qs.stringify({
              uid:_self.$route.params.uid,
              cerid:_self.$route.params.id
            })
          ).then(function(res){
            _self.info = res.data.info;
            _self.con = res.data.certificateDetailInfo;
            _self.code=res.data.certificateDetailInfo.code;
            _self.bz=res.data.certificateDetailInfo.bz;
            _self.set = res.data.set;
            _self.cj = res.data.scenename;
            _self.gc = res.data.itemname;
            console.log(_self.set.showName)
            if(_self.set.showName=='待审核'){
                if(_self.con.imgs!=''&&_self.con.imgs!=null){
                    _self.zsImg=_self.con.imgs.split(',')
                }
            }
            if(_self.set.showName=='未通过'){
                _self.imgs=_self.con.imgs
            }
            _self.$previewRefresh()
          _self.value2 = _self.fmtDate(_self.con.jointime)
            console.log(res)

          }).catch(function(err){
            _self.errorUtil(err);
          })
        },
        add(){
            var _self = this;
            if(_self.set.showName=='尚未获得'){
                if(!_self.code==""&&!_self.value1==""&&!_self.bz==""){
                    var tcon=null;
                    if(_self.value1.length<=10){
                        tcon = _self.value1+' 00:00:00'
                    }else if(_self.value1.length>10){
                        tcon = _self.value1
                    }
                    this.$axios.post( process.env.API_ROOT+"app/stu/v1/addcer",
                        qs.stringify({
                            uid:_self.$route.params.uid,
                            cerid:_self.$route.params.id,
                            code:_self.code,
                            time:tcon,
                            imgs:_self.imgs,
                            bz:_self.bz,
                        })
                    ).then(function(res){
                        console.log(res)
                        _self.$vux.toast.show({type: 'success',text:"成功" });
                        _self.goback()
                        

                    }).catch(function(err){
                        _self.errorUtil(err);
                    })
                }else{
                    _self.$vux.toast.show({type: 'warn',text:"请将信息填写完整" });
                }
            }
            if(_self.set.showName=='未通过'){
                if(!_self.code==""&&!_self.value2==""&&!_self.bz==""){
                    this.$axios.post( process.env.API_ROOT+"app/stu/v1/addcer",
                        qs.stringify({
                            uid:_self.$route.params.uid,
                            cerid:_self.$route.params.id,
                            code:_self.code,
                            time:_self.value2+' 00:00:00',
                            imgs:_self.imgs,
                            bz:_self.bz,
                        })
                    ).then(function(res){
                        console.log(res)
                        _self.$vux.toast.show({type: 'success',text:"成功" });
                        _self.goback()
                        

                    }).catch(function(err){
                        _self.errorUtil(err);
                    })
                }else{
                    _self.$vux.toast.show({type: 'warn',text:"请将信息填写完整" });
                }
            }
        }
        
    }
}
</script>
<style>
    .main_content .weui-cell{padding: 30px;font-size: 28px;text-align: left;} 
    .main_content .weui-cells{margin-top: 0;} 
    .main_content .weui-cell .weui-cell__ft{text-align: left;padding-left: 30px;}

    .cont-tex .weui-cells{height: 100%;}
    .cont-tex .weui-cells:before{content:none;}
    .cont-tex .weui-textarea {font-size: 26px;color: #444;}
    .weui-textarea-counter{height: 30px;}
    .cont-tex .weui-cells:after{height:1px;/*no*/}



    .reason_rejection .vux-no-group-title{font-size: 28px;}
    .reason_rejection .vux-no-group-title .weui-cell{padding-top: 30px;padding-bottom: 30px;color: #444;}
    .reason_rejection .vux-no-group-title .weui-cell .weui-cell__ft{color: #444;}
    .reason_rejection .vux-no-group-title .weui-cell .vux-cell-bd{margin-right: 20px;}
    .reason_rejection .vux-no-group-title:before,.reason_rejection .weui-cell:before{content: none;}
    .reason_rejection .weui-cell:last-child{border-top: 1px solid #f4f4f4;/*no*/}


    .bh_div .vux-label{font-size: 28px!important;}
    .bh_div .vux-no-group-title .weui-cell{padding:30px 20px;color: #444;}
    .bh_div .vux-no-group-title .weui-cell .weui-cell__ft{color: #444;font-size: 28px!important;}
    .bh_div .vux-no-group-title .weui-cell .vux-cell-bd{margin-right: 20px;text-align: right;}
    .bh_div .vux-no-group-title:before,.bh_div .weui-cell:before{content: none;}
    .bh_div .weui-cell:last-child{border-top: 1px solid #f4f4f4;/*no*/}
    .bh_div .weui-cell{padding: 30px;font-size: 28px;text-align: left;} 
    .bh_div .weui-cells{margin-top: 0;} 
    .bh_div .weui-cell .weui-cell__ft{text-align: left;padding-left: 10px;}


    .acquisition_msg .vux-no-group-title{font-size: 28px;margin: 0 20px;}
    .acquisitino_date .vux-no-group-title{font-size: 28px;padding: 30px 20px;margin:0;}
    .acquisition_msg .vux-no-group-title .weui-cell{padding-top: 30px;padding-bottom: 30px;color: #444;}
    .acquisition_msg .vux-no-group-title .weui-cell .weui-cell__ft,.acquisitino_date .vux-no-group-title .weui-cell .weui-cell__ft{color: #444;}
    .acquisition_msg .vux-no-group-title .weui-cell .vux-cell-bd,.acquisitino_date .vux-no-group-title .weui-cell .vux-cell-bd{margin-right: 20px;}
    .acquisition_msg .vux-no-group-title:before,.acquisition_msg .vux-no-group-title:after{content: none;}
    .acquisitino_date .vux-no-group-title:before{content: none;}

    .datetimeCon{padding:10px 30px 0;font-size:28px;overflow: hidden;}
    .datetimeCon > .weui-cells{margin-top: 0;}
    .datetimeCon .weui-cell div{float:left;width: 100%;text-align: left;color:#444;padding:0;font-size:28px;flex: none;padding:10px 0!important;}
    .datetimeCon .weui-cell {display: block;overflow: hidden;padding:0!important;}
    .datetimeCon .weui-cells:after,.datetimeCon .weui-cells:before{content:none;}
    .datetimeCon .weui-cell .weui-cell__ft{text-align: left;padding-left: 30px;}

    .dp-header .dp-right,.dp-header .dp-left{font-size:36px!important;}
    .dp-content .dp-item .scroller-component .scroller-item{font-size:30px!important;}

</style>

<style scoped>

    .top-back {text-align: center;font-size: 36px;color: #444;padding:20px;background-color: #fff;position: relative;}
    .top-back .img-1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
    .top-back button {width: 100px;height: 50px;font-size: 36px;color: #01c269;border: none;background-color: #fff;right: 20px;top:20px;position: absolute;outline: none;font-weight: 400}
    .n_title{width:80%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}



    .Certificate_No {padding:20px 30px;font-size:28px;color:#444;}
    .Certificate_No input{width:500px;height:65px;line-height:65px;border:1px solid #c4c5c6;/*no*/border-radius:5px;/*no*/padding-left:20px;outline:none;}

    .certificate_picture{padding:20px 30px 30px 20px;font-size:28px;color:#444;border-bottom: 1px solid 
    #f4f3f3;/*no*/}
    .certificate_picture span{width:5em;text-align:right;display: inline-block;}
    .picture_div{margin: 20px 0;overflow: hidden;}
    .img_div,.add_div{width:215px;height:215px;position: relative;margin:0 15px 15px 0;float: left;}
    .img_div i{position: absolute;right:0;top:-8px;width:32px;height:32px;}
    .img_div img,.add_div img{width:100%;height:100%;}



    .tex_div{font-size:28px;color:#444;}
    .tex_div > span{padding:20px 30px;}
    .cont-tex{padding:10px 20px 10px 20px!important;}


</style>
