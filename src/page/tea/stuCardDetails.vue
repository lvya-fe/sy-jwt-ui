<template>
    <div class="stuCardDetails">
        <div class="top-back">
            <img class="img-1" src="../../assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ title }}</div>
            <span class="img-2">
                <i class="icon iconfont icon-shiyongcishu ripple"></i>
            </span>
        </div>
        <form action="" class="stuInfo">
            <ul>
                <!-- 1单行输出   2 多行输入  3 日期时间  4 单项选择 5 多项选择  6 图片上传  7 平分  8  描述文本 9 地理位置  10 选人插件,11 显示项 12 学生信息 
                    13 系统信息 14 邮箱 15 电话 16选择列表 17 多选列表 18自动编号  19 整数 20 小数  
                    21 百分数 22 日期  23 公式   24 引用   25 省市区  26 邮编  27 身份证 28 音频 29 视频 -->
                <li class="fields-item" v-for="(item,index) in curFieldsLists" :key="item.order">
                    <!-- 单行 -->
                    <div class="fieldsWrap" v-if="item.formItemType == '1'">
                        <span>{{item.formItemName}}</span>
                        <input type="text" v-model="item.formItemValue" :disabled="[1,3].includes(formState) ? false :true" placeholder="请输入">
                    </div>
                    <!-- 多行 -->
                    <div class="fieldsWrap txtarea" v-if="item.formItemType == '2'">
                        <p class="vux-1px-b"><span>{{item.formItemName}}</span></p>
                        <x-textarea :max="200" v-model="item.formItemValue" :disabled="[1,3].includes(formState) ? false :true"  placeholder="请输入" :show-counter="false"></x-textarea>
                    </div>
                    <!-- 日期时间 -->
                    <group class="fieldsDatetime hasIco" :class="{'readonly': ![1,3].includes(formState)}" v-if="item.formItemType == '3'">
                        <img src="../../assets/img/ico_datetime.png" alt="">
                        <datetime v-model="item.formItemValue" format="YYYY-MM-DD HH:mm" :readonly="[1,3].includes(formState) ? false :true"  @on-change="change" :title="item.formItemName"></datetime>
                    </group>
                    <!-- 单项选择 -->
                    <div class="fieldsWrap radios" v-if="item.formItemType == '4'">
                        <p class="vux-1px-b"><span>{{item.formItemName}}</span></p>
                        <group v-if="item.formSelectItemResps.length >0 ">
                            <radio :options="item.formSelectItemResps" :disabled="[1,3].includes(formState) ? false :true" v-model="item.formItemValue" @on-change="change"></radio>
                        </group>
                    </div>
                    <!-- 多项选择 -->
                    <div class="fieldsWrap radios" v-if="item.formItemType == '5'">
                        <p class="vux-1px-b"><span>{{item.formItemName}}</span></p>
                        <group v-if="item.formSelectItemResps.length >0 ">
                            <checklist label-position="left" :options="item.formSelectItemResps" :disabled="[1,3].includes(formState) ? false :true" v-model="item.itemValArr" @on-change="checkListChange(item.itemValArr,index)"></checklist>
                        </group>
                    </div>
                    <!-- 地理位置 -->
                    <group class="positionWrap hasIco" v-if="item.formItemType == '9'">
                        <img src="../../assets/img/ico_position.png" alt="">
                        <span>{{item.formItemName}}</span>
                        <!-- <cell :title="item.formItemName" :value="item.formItemValue"></cell> -->
                        <input type="text" readonly v-model="geographic">
                    </group>
                    <!-- 邮箱 -->
                    <div class="fieldsWrap hasIco" v-if="item.formItemType == '14'">
                        <img src="../../assets/img/ico_email.png" alt="">
                        <span>{{item.formItemName}}</span>
                        <input type="email" v-model="item.formItemValue" :disabled="[1,3].includes(formState) ? false :true" placeholder="请输入">
                    </div>
                    <!-- 电话 -->
                    <div class="fieldsWrap hasIco" v-if="item.formItemType == '15'">
                        <img src="../../assets/img/ico_phone.png" alt="">
                        <span>{{item.formItemName}}</span>
                        <input type="text" v-model="item.formItemValue" :disabled="[1,3].includes(formState) ? false :true" placeholder="请输入">
                    </div>
                    <!-- 选择列表 -->
                    <group class="fieldsWrap selectList" v-if="item.formItemType == '16'" @click.native="showCheckList(item,index,formState)">
                        <cell :title="item.formItemName" ></cell>
                        <span class="ico-right">{{item.formItemValue == '' || item.formItemValue == null ? '请选择' :item.formItemValue}}</span> 
                    </group>
                    <!-- 多选择列表 -->
                    <group class="fieldsWrap selectList" v-if="item.formItemType == '17'" @click.native="showCheckList(item,index,formState)">
                        <cell :title="item.formItemName" ></cell>
                        <span class="ico-right" :class="{'hides': (item.formItemValue != '' && item.formItemValue != null) }">请选择</span> 
                        <!-- <div class="itemsWrap" v-if="item.formItemValue != '' && item.formItemValue != null">
                            <span v-for="val in item.itemValArr" :key="val">{{val}}</span>
                        </div> -->
                        <ul class="itemsWrap" v-if="item.itemValArr.length >0">
                            <li class="vux-1px" v-for="val in item.itemValArr" :key="val">{{val}}</li>
                        </ul>
                    </group>
                    <div class="fieldsWrap hasIco" v-if="item.formItemType == '26'">
                        <img class="ico_postcode" src="../../assets/img/ico_postcode.png" alt="">
                        <span>{{item.formItemName}}</span>
                        <input type="text" :disabled="[1,3].includes(formState) ? false :true" v-model="item.formItemValue" placeholder="请输入">
                    </div>
                    <div class="fieldsWrap hasIco" v-if="item.formItemType == '27'">
                        <img class="ico_idcard" src="../../assets/img/ico_idcard.png" alt="">
                        <span>{{item.formItemName}}</span>
                        <input type="text" v-model="item.formItemValue" :disabled="[1,3].includes(formState) ? false :true" placeholder="请输入">
                    </div>
                    <div class="fieldsWrap" v-if="item.formItemType == '19'">
                        <span>{{item.formItemName}}</span>
                        <input type="text" v-model="item.formItemValue" :disabled="[1,3].includes(formState) ? false :true" placeholder="请输入">
                    </div>
                    <div class="fieldsWrap" v-if="item.formItemType == '20'">
                        <span>{{item.formItemName}}</span>
                        <input type="text" v-model="item.formItemValue" :disabled="[1,3].includes(formState) ? false :true" placeholder="请输入">
                    </div>
                    <div class="fieldsWrap" v-if="item.formItemType == '21'">
                        <span>{{item.formItemName}}</span>
                        <input type="text" class="padr30" v-model="item.formItemValue" :disabled="[1,3].includes(formState) ? false :true" placeholder="请输入百分数(如：60.23)">
                        <span class="percent">%</span>
                    </div>
                    <group  class="hasIco" v-if="item.formItemType == '22'">
                        <img src="../../assets/img/ico_date.png" alt="">
                        <calendar :title="item.formItemName" v-model="item.formItemValue" :disabled="[1,3].includes(formState) ? false :true" placeholder="请选择"></calendar>
                    </group>
                    <group  class="hasIco" v-if="item.formItemType == '25'">
                        <img class="ico_address" src="../../assets/img/ico_address.png" alt="">
                        <x-address :title="item.formItemName" v-model="item.itemValArr" :disabled="[1,3].includes(formState) ? false :true" :list="addressData" placeholder="请选择"></x-address>
                    </group>
                    <div class="fieldsWrap hasIco" v-if="item.formItemType == '28'">
                        <img src="../../assets/img/ico_audio.png" alt="">
                        <span>{{item.formItemName}}</span>
                        <div class="addAudio vux-1px-t"  v-if="item.formItemValue =='' || item.formItemValue == null">
                            <!-- <span></span> -->
                            <div class="addAudioInput">
                                添加音频
                                <!-- <input type="file" name="" :disabled="[1,3].includes(formState) ? false :true" @change="tirggerFile($event,index)" accept="audio/mpeg"> -->
                                <input type="file" name="" :disabled="[1,3].includes(formState) ? false :true" @change="uploadVideo(item.id,$event,'mp3',index)" accept="audio/mpeg">
                            </div>
                            <span>大文件请点击</span>
                        </div>
                        <template v-if="(item.formItemValue !='' && item.formItemValue != 'null'&& item.formItemValue != null)">
                            <div class="showAudio vux-1px-t">
                                <aplayer :autoplay="null" :music="{
                                    title: '数据来源自',
                                    author: '绿芽',
                                    url: item.formItemValue,
                                    pic: '',
                                    lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
                                    }">
                                </aplayer>
                            </div>
                        </template>
                    </div>
                    <div class="fieldsWrap hasIco" :class="{'hasUrl':(item.formItemValue !='' && item.formItemValue != null)}" v-if="item.formItemType == '29'">

                        <img src="../../assets/img/ico_video.png" alt="">
                        <span>{{item.formItemName}}</span>
                        <div class="addVideo" v-if="item.formItemValue =='' || item.formItemValue == null">
                            <div class="inputFile">
                                <!-- <input type="file" name="" :disabled="[1,3].includes(formState) ? false :true" @change="tirggerFile($event,index)" accept="video/*"> -->
                                <input type="file" name="" :disabled="[1,3].includes(formState) ? false :true" @change="uploadVideo(item.id,$event,'mp4',index)" accept="video/*">
                            </div>
                            <span>大文件请点击</span>
                        </div>
                        <template v-if="(item.formItemValue !='' && item.formItemValue != 'null'&& item.formItemValue != null)">
                            <div class="showVideo">
                                <img src="../../assets/img/img_video.jpg" @click="playMP4(index)" alt="">
                            </div>
                        </template>
                        
                    </div>
                </li>
            </ul>
            <div class="btnsWrap" v-if="[1,3].includes(formState)">
                <x-button type="primary" action-type="button" @click.native="submit">提交</x-button>
                <!-- <x-button type="primary" action-type="button">提交并切换学生</x-button> -->
                <x-button action-type="button" @click.native="goback">返回</x-button>
            </div>
            <x-dialog v-model="showHideOnBlur" :dialog-style="{'max-width': '100%',width:'80%','background-color':'#fff',color:'#696969','border-radius':'6px','box-shadow': '0 0 4px #ccc'}" class="dialog-demo vux-1px" hide-on-blur>
                <group :title="popData.formItemName" v-if="popType == 0">
                    <radio :options="popData.formSelectItemResps" v-model="popData.formItemValue"></radio>
                </group>
                <div v-if="popType == 1">
                    <checklist :title="popData.formItemName"  label-position="left" :options="popData.formSelectItemResps" v-model="popData.itemValArr" @on-change="change"></checklist>
                </div>
                <flexbox>
                    <flexbox-item>
                        <x-button type="default cancel" action-type="button"  @click.native="showHideOnBlur = false">取消</x-button>
                    </flexbox-item>
                    <flexbox-item>
                        <x-button class="vux-1px-l confirm" action-type="button" type="default" @click.native="checkListCommit">确定</x-button>
                    </flexbox-item>
                </flexbox>
            </x-dialog>
        </form>
        <div class="videoParent" @click.prevent.stop="videoPropShow=false" v-if="videoPropShow">
            <video-player class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
            ></video-player>
        </div>
    </div>
</template>
<script>
import { LoadMore,Loading,Group,XDialog,Cell,XInput,XTextarea,Datetime,XAddress,ChinaAddressV4Data,Calendar,Radio,Checklist,XButton,Flexbox,FlexboxItem} from "vux";
import qs from 'qs';
import aplayer from "vue-aplayer";
// import {formatDate} from '@/plugins/formatDate.js';
// import BScroll from "better-scroll";
import Bus from '@/plugins/eventBus.js'
import showcycle from '@/page/tea/SelectionPeriod'
export default {
    data(){
        return{
            uid:this.$route.params.uid,
            id:this.$route.params.id,
            // cycleid:this.$route.params.cycleid,
            // back:this.$route.params.back,
            stuid:this.$route.params.stuid,
            schoolId:this.$route.params.schoolid,
            title:'同学',
            formState:null,//表单状态
            historyList:[],//提交历史记录
            stuLits:[],//学生列表
            curFieldsLists:[],//当前学生字段合集
            addressData: ChinaAddressV4Data, //省市区组件需要
            // statusTime:'',
            showHideOnBlur:false,//选择列表，多选择列表弹框是否显示
            popType:null,//选择列表，多选择列表弹框类型   0：选择列表 1：多选择
            popData:{},//弹框显示数据
            curIndex:null, //选择，多选择使用用 视频 音频 图片
            videoPropShow:false,
            authorizationCode:'',
            playerOptions : {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                type: "",
                src: '' //url地址
                }],
                // poster: "../../static/images/test.jpg", //你的封面地址
                // width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: true  //全屏按钮
                }
            },
            geographic:'',//地理位置 桥接使用

        }
    },
    components:{
        Group,
        aplayer,
        LoadMore,
        Loading,
        XDialog,
        Cell,
        XInput,
        XTextarea,
        Datetime,
        XAddress,
        Calendar,
        Radio,
        Checklist,
        XButton,
        Flexbox,
        FlexboxItem,
    },
    created(){
        this.getStuInfos();
        // this.getHistoryList();
        Bus.$on('stuCardListsData',(data)=>{
          this.stuListsData = data;
        });
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        //获取学生表单信息
        getStuInfos(){
            this.$vux.loading.show({
                text: '加载中...'
            });
            this.$axios.get( process.env.API_ROOT+"app/stu/v1/showTeaTaskDetail",{params:{
                    uid:this.uid,
                    schoolId:Number(this.schoolId),
                    stuId:Number(this.stuid),
                    taskId:Number(this.id),
                }}
            ).then( res =>{
                if(res.success){
                    this.$vux.loading.hide();
                    let resData = res.data;
                    this.title = resData.name;
                    this.formState = resData.taskState;
                    this.curFieldsLists = resData.formItemResps;
                    //省市区，需要一个数组信息
                    if(this.curFieldsLists.length >0){
                        this.curFieldsLists.forEach(element => {
                            if(['5','17','25'].includes(element.formItemType)){
                                element = Object.assign(element,{
                                    itemValArr: element.formItemValue != '' && element.formItemValue != null ? element.formItemValue.split(',') : []
                                })
                            }
                            if(element.formItemType == '9'){
                                this.getMap();
                            }
                        })
                    }
                }
            }).catch( err =>{
                this.errorUtil(err);
            })
        },
        //获取学生填写记录
        getHistoryList(){
            this.$axios.get( process.env.API_ROOT+"app/stu/v1/getTaskSubmitHistory",{params:{
                    uid:this.uid,
                    schoolId:Number(this.schoolId),
                    stuId:Number(this.stuid),
                    taskId:Number(this.id),
                }}
            ).then( res =>{
                if(res.success){
                    this.historyList = res.data;
                    console.log(this.historyList);
                }
            }).catch( err =>{
                this.errorUtil(err);
            })
        },
         //选择列表，多选择列表点击确定使用
        checkListCommit(){
            console.log(this.popData);
            if(this.popData.formItemType == '17' && this.popData.itemValArr.length>0){
                this.popData.formItemValue = this.popData.itemValArr.join(',');
            }
            this.curFieldsLists[this.curIndex] = this.popData;
            this.showHideOnBlur = false;
            console.log(this.popData)
        },
        change (value) {
            console.log('change',value)
        },
        checkListChange(value,index){
            this.curFieldsLists[index].formItemValue = value.length>0 ? value.join(',') : '';
            console.log(value,index)
        },
        //点击显示对应状态的时间
        showCheckList(item,index,state){
            if( ![1,3].includes(state)) return;
            this.popType = item.formItemType == 16 ? 0 : 1;
            this.popData = Object.assign({},item);
            this.curIndex = index;
            this.showHideOnBlur = !this.showHideOnBlur;
        },
        //获取视频地址----------
        obtainVideo(index){
            var _self = this;
            // this.$axios.get( process.env.API_ROOT+"oss/2/get/code/"+_self.authorizationCode,
            this.$axios.get( process.env.API_ROOT+"oss/2/get/code/",
                qs.stringify({
                })
            ).then(function(res){
                if(res.isSuccess){
                    console.log(res,'获取视频')
                    if(res.data.path!='ok'){
                        _self.playerOptions.sources[0].src=res.data.path
                        // _self.itmes.forEach(function(el){
                        //     if(el.id==_self.propId){
                        //         el.val=res.data.path;
                        //     }
                        // })
                        _self.curFieldsLists[index].formItemValue = res.data.path;
                    }else{
                        _self.$vux.toast.show({type: 'warn',text:'暂无文件' });
                    }
                }
            }).catch(function(err){
                _self.errorUtil(err);
            })
        },
        uploadVideo(id,e,type,index) {
            //e.target.value文件名
            try {
                this.curIndex = index;
                var file = e.target.files[0];
                var formdata = new FormData();
                formdata.append('file', file);
                this.ossconfig(id, formdata, type);
            }catch (e) {
                this.$vux.loading.hide();
                this.$vux.toast.show({type: 'warn',text:'当前设备不支持,请在电脑端上传' });
            }
        },
        ossconfig(id,formdata,type) {
            var _self = this;
            //process.env.API_ROOT + 'oss/2/get/config'
            this.$axios.get(process.env.API_ROOT + 'oss/2/get/config').then(res => {
                if (res.isSuccess) {
                    formdata.append('authorization', res.data.authorization);
                    formdata.append('bucket', res.data.bucket);
                    formdata.append('x-date', res.data.date);
                    formdata.append('expiration', res.data.expiration);
                    formdata.append('policy', res.data.policy);
                    formdata.append('save-key', res.data.save_key);

                    _self.doUpload(id, formdata, type,res.data.domain,res.data.url);

                }
            });
        },
        doUpload(id,formdata,type,domain,url) {
            this.$vux.loading.show({
                text: '上传中...'
            })
            var _self = this;
            this.$axios.post(url, formdata,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }).then(res => {
                _self.$vux.loading.hide();
                console.log(res);
                if(res.code=='200'){

                    if(type=="mp4"){//视频
                        _self.playerOptions.sources[0].src=domain+res.url
                    }
                    _self.curFieldsLists[_self.curIndex].formItemValue = domain+res.url;
                    // _self.upDataShow=false;

                }else{
                    _self.$vux.toast.show({type: 'warn',text:'暂无文件' });
                }

            }).catch(err => {
                console.log(err);
            })
        },
        playMP4(index){
            console.log(this.curFieldsLists[index].formItemValue);
            this.playerOptions.sources[0].src = this.curFieldsLists[index].formItemValue;
            this.videoPropShow = true;
        },
        //获取地理位置
        getMap() {
            this.$wechat.ready(() => {
                this.$wechat.getLocation({
                    success: (res) => {
                        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        var longitude = res.longitude ; // 经度，浮点数，范围为180 ~ -180。
                        this.addressDetail(latitude,longitude);

                    },
                    cancel: (res) => {
                        alert('用户拒绝授权获取地理位置');
                    }
                });
            });
        },
        addressDetail(lat,lng){
            var geolocation = new BMap.Geolocation();
            var myGeo = new BMap.Geocoder();
            myGeo.getLocation(new BMap.Point(lng,lat),(result)=> {
                if(result){
                    this.geographic=result.address
                }
            })
        },
        submit(){
            //app/stu/v1/addStuTaskFormList
            if(this.curFieldsLists.length == 0) return;
            this.$vux.loading.show({
                text: '提交中...'
            });
            let formValueJson = [];
            let formItemValues = [];
            this.curFieldsLists.forEach( ele => {
                ele.formItemValue = ele.formItemType == '9' ? this.geographic : ele.formItemValue;
                formItemValues.push({
                    formItemType: ele.formItemType,
                    formItemValue: ele.formItemValue,
                    formItemName: ele.formItemDbName
                })
            })
            formValueJson.push({
                formItemValues:formItemValues,
                stuId:this.stuid
            })
            this.$axios.post( process.env.API_ROOT+"app/stu/v1/addStuTeaTaskFormList",
            qs.stringify({
                    uid:this.uid,
                    schoolId:Number(this.schoolId),
                    formId:Number(this.formId),
                    taskId:Number(this.id),
                    stuId:Number(this.stuid),
                    formValueJson:JSON.stringify(formValueJson)
                }))
            .then( res =>{
                if(res.success){
                    this.$vux.loading.hide();
                    this.goback();
                }
            }).catch( err =>{
                this.errorUtil(err);
            })
        }
    },
    
}
</script>
<style lang="less">
.weui-check__label:active{background-color: #fff !important;}
textarea:disabled, input:disabled{background-color: #fff;}
    .stuCardDetails{
        background-color: #ebebeb;
        margin-top: 76px;
        padding-top: 20px;
         input::-webkit-input-placeholder,textarea::-webkit-input-placeholder {
             color: #c6c6c6;
             font-size: 30px;
         }
        .vux-flexbox .vux-flexbox-item{
            margin-left: 0 !important;
            
            .weui-btn{
                font-size: 30px;
                color: rgb(105, 105, 105);
                &.confirm{
                    color: #01c269;
                }
            }
            .weui-btn_default:not(.weui-btn_disabled):active{
                background-color: #F8F8F8;
            }
        }
        .top-back {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            padding:20px;
            text-align: center;
            font-size: 36px;
            color: #444;
            background-color: #fff;
            z-index: 1000;
            img{
                width: 38px;
                height: 38px;
            }
            .img-1{
                position: absolute;
                left: 20px;
                top: 25px;
            }
            .img-2{
                position: absolute;
                right: 30px;
                top: 25px;
                i{
                    color: #01c269;
                    font-size: 40px;
                }
            }
            .n_title{
                width:55%;
                margin:0 auto;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }
        .stuInfo{
            .fields-item{
                margin-top: 40px;
                background-color: #fff;
                .hasIco{
                    position: relative;
                    &.positionWrap{
                        padding: 30px;
                        img{
                            top: 0;
                            left: 30px;
                        }
                        input{margin-left: 90px;}
                        .weui-cells{
                            padding-left: 60px;
                            margin: 0;
                            &:before,&:after{
                                border: none;
                            }
                        }
                    }
                    img{
                        position: absolute;
                        left: 30px;
                        top: 36px;
                        height: 36px;
                        width: 36px;
                        &.ico_idcard{
                            top: 40px;
                            height: 27px;
                        }
                        &.ico_address{
                            left: 35px;
                            width: 25px;
                        }
                        &.ico_postcode{
                            height: 30px;
                            top: 39px;
                        }
                    }
                    .weui-cell{
                        left: 54px;
                        padding: 30px;
                        font-size: 30px;
                        width: calc(~'100% - 150px');
                        .weui-cell__ft:after{
                            content: " ";
                            display: inline-block;
                            height: 16px;
                            width: 16px;
                            border-width: 2px 2px 0 0;
                            border-color: #c8c8cd;
                            border-style: solid;
                            -webkit-transform: matrix(.71,.71,-.71,.71,0,0);
                            transform: matrix(.71,.71,-.71,.71,0,0);
                            position: relative;
                            position: absolute;
                            top: 50%;
                            margin-top: -10px;
                            right: -20px;
                            // left: 30px;
                        }
                    }
                }
                .fieldsDatetime{
                    .vux-datetime{
                        p{
                            font-size: 30px;
                        }
                        .vux-cell-value{
                            font-size: 30px;
                        }
                    }
                    &.readonly{
                        .weui-cell .weui-cell__ft:after{
                            right: 0;
                        }
                    }
                }
                
                .fieldsWrap{
                    position: relative;
                    padding: 30px;
                    color: #333;
                    font-size: 30px;
                    &.hasIco{
                        padding-left: 90px;
                    }
                    .percent{
                        position: absolute;
                        right: 30px;
                    }
                    input{
                        position: absolute;
                        right: 30px;
                        top: 40px;
                        border: none;
                        outline: none;
                        width: 476px;
                        color: #656565;
                        text-align: left;
                        &.padr30{
                            width: 446px;
                            padding-right: 30px;
                        }
                    }
                    .weui-cell.vux-x-textarea{
                        padding-left: 0;
                        padding-right: 0;
                        .weui-textarea{padding: 30px 0;}
                    }
                    &.txtarea,&.radios{
                        padding: 0;
                        p{padding: 30px;}
                        .weui-cell,.weui-cells_radio,.weui-cells_checkbox{
                            padding: 0 30px;
                        }
                        .weui-cells_checkbox{
                            p{padding-left: 0;}
                            .weui-cell__hd{padding:0;}
                        }
                    }
                    &.txtarea{
                        .weui-cell:before{
                            border: none;
                        }
                    }
                    &.hasUrl{
                        // height: 306px;
                    }
                    .addVideo{
                        position: relative;
                        margin-top: 30px;
                        margin-left: -60px;
                        height: 216px;
                        .inputFile{
                            position: relative;
                            height: 216px;
                            width: 216px;
                            background: url('../../assets/img/addVideo.png') no-repeat center center;
                            background-size: 216px 216px;
                            input[type='file']{
                                position: absolute;
                                height: 216px;
                                width: 216px;
                                left: 0;
                                top: 0;
                                opacity: 0;
                            }
                        }
                        
                        span{
                            position: absolute;
                            right: 0;
                            bottom: 0;
                            padding-right: 42px;
                            background: url('../../assets/img/ico_addMedia.jpg') no-repeat right center;
                            background-size: 40px 46px;
                            color: #c9c7c8;
                        }
                    }
                    .showVideo{
                        // width: calc(~'100% - 60px');
                        width: calc(~'100% + 60px');
                        margin-left: -60px;
                        margin-top: 30px;
                        height: auto;
                        img{
                            width: 100%;
                            position: static;
                            // width: calc(~'100% - 30px');
                            height: auto;
                            right: 60px;
                        }
                    }
                    .addAudio{
                        margin: 30px -30px 0 -90px;
                        padding: 30px 30px 0;
                        // span:nth-child(1){
                        //     color: #1abe7f;
                        // }
                        .addAudioInput{
                            position: relative;
                            display: inline-block;
                            width: auto;
                            color: #1abe7f;
                            overflow: hidden;
                            input{
                                position: absolute;
                                top: 0;
                                left: 0;
                                opacity: 0;
                            }
                        }
                        span{
                            float: right;
                            padding-right: 42px;
                            background: url('../../assets/img/ico_addMedia.jpg') no-repeat right center;
                            background-size: 40px 46px;
                            color: #c9c7c8;
                        }
                    }
                    .showAudio{
                        margin: 30px -30px 0 -90px;
                        padding: 30px 30px 0;
                    }
                    .weui-cells{
                        margin-top: 0;
                        &:after,&::before{
                            border: none;
                        }
                        .weui-cell{
                            padding: 0;
                            &:before{
                                left: 0;
                            }
                            p{
                                padding-top: 30px;
                                font-size: 30px;
                            }
                        }
                        .weui-cell_radio{
                            padding: 0;
                            // .weui-cell:not(:first-child)::before{
                            //     border-top: 0.013333rem solid #D9D9D9;
                            // }
                            p{
                                padding: 30px 0;
                                font-size: 30px;
                            }
                            .weui-cell__ft{
                                // margin-top: 4px;
                                padding: 0;
                                height: 40px;
                                width: 40px;
                                background: url('../../assets/img/radio1.png') no-repeat center center;
                                background-size: 40px 40px;
                            }
                            
                            .weui-check:checked + .weui-icon-checked{
                                margin-top: 0px;
                                margin-left: -10px;
                                height: 40px;
                                width: 40px;
                                background: url('../../assets/img/radio_check1.png') no-repeat center center;
                                background-size: 40px 40px;
                                &:before{
                                    content: '';
                                }
                            }
                        }
                    }
                    &.selectList{
                        .weui-cell{
                            p{
                                padding: 0;
                            }
                        }
                        .ico-right{
                            position: absolute;
                            right: 60px;
                            top: 0;
                            color: #c6c6c6;
                            font-size: 30px;
                            &.hides{
                                color: transparent;
                            }
                            &:after{
                                content: " ";
                                display: inline-block;
                                height: 0.213333rem;
                                width: 0.213333rem;
                                border-width: 0.026667rem 0.026667rem 0 0;
                                border-color: #c8c8cd;
                                border-style: solid;
                                -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
                                transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
                                position: relative;
                                position: absolute;
                                top: 50%;
                                margin-top: -0.133333rem;
                                right: -0.566667rem;
                            }
                        }
                        .itemsWrap{
                            box-sizing: border-box;
                            padding-top: 30px;
                            font-size: 0;
                            li{
                                margin-bottom: 2px;
                                margin-left: 30px;
                                display: inline-block;
                                padding: 20px;
                                font-size: 28px;
                                color: #999;
                                &:first-child{
                                    margin-left: 0;
                                }
                            }
                        }
                    }
                }
            }
            .btnsWrap{
                padding: 30px;
                background-color: #ebebeb;
                .weui-btn{
                    font-size: 30px;
                    padding: 10px;
                }
                .weui-btn_primary{
                    background-color: #1bb876;
                    color: #fff;
                }
                .weui-btn + .weui-btn{
                    margin-top: 40px;
                }
            }
        }
        .weui-dialog{
            .weui-cells__title{
                margin: 0;
                font-size: 30px;
                padding: 30px;
            }
            .weui-cell{
                padding:30px;
                p{
                    font-size: 30px;
                    line-height: 1;
                    text-align: left;
                }
            }
        }
        .weui-cells.weui-cells_checkbox .weui-check_label .weui-icon-checked{
            height: 40px;
            width: 40px;
            background: url('../../assets/img/checkbox.png') no-repeat center center;
            background-size: 40px 40px;
            &::before{
                content: '';
            }
        }
        .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked{
            height: 40px;
            width: 40px;
            background: url('../../assets/img/checkbox_ed.png') no-repeat center center;
            background-size: 40px 40px;
            &::before{
                content: '';
            }
        }
        .weui-cells_checkbox .weui-icon-checked:before{
            font-size: 40px;
        }
        .videoParent{
            position: fixed;
            top:0;
            bottom:0;
            left:0;
            right:0;
            width:100%;
            height:100%;
            background:#999;
            z-index: 100000000;
        }
        .video-player.video-player.vjs-custom-skin{margin-top:50%;}
        .vjs-button > .vjs-icon-placeholder:before{line-height: 2.67;}
    }
</style>

