<template>
    <div class="stuCardDetails">
        <div class="top-back">
            <img class="img-1" src="../../assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ title }}</div>
            <span class="img-2" style="display:none;">
                <i class="icon iconfont icon-shiyongcishu ripple"></i>
            </span>
        </div>
        <form action="" class="stuInfo">
            <ul>
                <!-- 1单行输出   2 多行输入  3 日期时间  4 单项选择 5 多项选择  6 图片上传  8  描述文本 9 地理位置  10 选人插件,
                14 邮箱 15 电话 16选择列表 17 多选列表  19 整数 20 小数
                    21 百分数 22 日期  25 省市区  26 邮编  27 身份证 28 音频 29 视频 -->
                <li class="fields-item" v-for="(item,index) in curFieldsLists" :key="item.order">
                    <!-- 单行 -->
                    <div class="fieldsWrap disflex" v-if="item.formItemType == '1'">
                        <span class="fieldInput fieldname">{{item.formItemName}}</span>
                        <input v-if=" [1,3].includes(formState) && item.citeDataType ==0 " type="text" class="txtInput" v-model="item.formItemValue"  @input="item.formItemValue=item.formItemValue.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,'')" placeholder="请输入">
                        <p class="readOnly" v-else>{{item.formItemValue}}</p>
                    </div>
                    <!-- 多行 -->
                    <div class="fieldsWrap txtarea" v-if="item.formItemType == '2'">
                        <p :class="{'vux-1px-b': ([1,3].includes(formState) && item.citeDataType ==0)}"><span>{{item.formItemName}}</span></p>
                        <x-textarea v-if=" [1,3].includes(formState) && item.citeDataType ==0 " :max="200" v-model="item.formItemValue"  placeholder="请输入" :show-counter="false"></x-textarea>
                        <div v-else>
                            <div v-if="item.formItemValue !=''" class="readOnly-block">
                                <x-textarea disabled :max="200" v-model="item.formItemValue" :show-counter="false"></x-textarea>
                            </div>
                            <div v-else class="nodata">
                                <img src="../../assets/img/noData.png" alt="">
                            </div>
                        </div>
                    </div>
                    <!-- 日期时间 -->
                    <group class="fieldsDatetime hasIco" :class="{'readonly': ![1,3].includes(formState) || item.citeDataType !=0}" v-if="item.formItemType == '3'">
                        <img src="../../assets/img/ico_datetime.png" alt="">
                        <datetime v-model="item.formItemValue" format="YYYY-MM-DD HH:mm" :readonly="[1,3].includes(formState) && item.citeDataType ==0 ? false :true"  @on-change="change" :title="item.formItemName"></datetime>
                    </group>
                    <!-- 单项选择 -->
                    <div class="fieldsWrap radios" v-if="item.formItemType == '4'">
                        <p class="vux-1px-b"><span>{{item.formItemName}}</span></p>
                        <!-- <group v-if="item.formSelectItemResps.length >0 ">
                            <radio :options="item.formSelectItemResps" :class="{'disabled':([1,3].includes(formState) && item.citeDataType ==0)}" :disabled="[1,3].includes(formState) && item.citeDataType ==0 ? false :true" v-model="item.formItemValue" @on-change="change"></radio>
                        </group> -->
                        <radioList :lists="item.formSelectItemResps" :disabled = '(![1,3].includes(formState) || item.citeDataType !=0) ? true :false' :checkVal="item.formItemValue" :index="index" @changeVal="changeRadio"></radioList>
                    </div>
                    <!-- 多项选择 -->
                    <div class="fieldsWrap radios" v-if="item.formItemType == '5'">
                        <p class="vux-1px-b"><span>{{item.formItemName}}</span></p>
                        <group v-if="item.formSelectItemResps.length >0 ">
                            <checklist label-position="left" :options="item.formSelectItemResps" :disabled="[1,3].includes(formState) && item.citeDataType ==0 ? false :true" v-model="item.itemValArr" @on-change="checkListChange(item.itemValArr,index)"></checklist>
                        </group>
                    </div>
                    <!-- 图片上传 -->
                    <div class="fieldsWrap imgUpload" v-if="item.formItemType == '6'">
                        <p><img src="../../assets/img/ico_position.png" alt=""><span>{{item.formItemName}}</span></p>
                        <uploadImg v-if="[1,3].includes(formState) && item.citeDataType ==0" :imgs.sync="item.formItemValue" v-bind:uid.sync="uid" v-bind:count.sync="count"></uploadImg>
                        <div v-else>
                            <div v-if="item.formItemValue == ''" class="nodata">
                                <img src="../../assets/img/noData.png" alt="">
                            </div>
                            <ul v-else class="img-items">
                                <li v-for="(url,i) in item.itemValArr" :key="i">
                                    <img :src="url" :preview="i" alt="">
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 文本描述 -->
                    <div class="fieldsWrap wenben" v-if="item.formItemType == '8'">
                        <p><span>{{item.formItemName}}</span></p>
                        <!-- <p class="txt" v-if="item.formItemValue != '' && item.formItemValue != null">{{item.formItemValue}}</p> -->
                        <div v-if="item.formItemValue != ''" class="readOnly-block">
                            <x-textarea disabled :max="200" v-model="item.formItemValue" :show-counter="false"></x-textarea>
                        </div>
                        <div v-else class="nodata">
                            <img src="../../assets/img/noData.png" alt="">
                        </div>
                    </div>
                    <!-- 地理位置 -->
                    <div class="fieldsWrap positionWrap hasIco disflex" v-if="item.formItemType == '9'">
                        <img src="../../assets/img/ico_position.png" alt="">
                        <span class="fieldname">{{item.formItemName}}</span>
                        <p>{{geographic}}</p>
                    </div>
                    <!-- <group class="positionWrap hasIco disflex" v-if="item.formItemType == '9'">
                        <img src="../../assets/img/ico_position.png" alt="">
                        <span class="fieldname">{{item.formItemName}}</span>
                        <p>{{geographic}}</p>
                    </group> -->
                    <!-- 选人插件 -->
                    <div class="choosePeople hasIco" v-if="item.formItemType == '10'">
                        <p @click="selectionPlugin(item.formItemId,item.choiceType)">
                            <img class="icon" src="../../assets/img/ico_people.png" alt="">
                            <span class="fieldname">{{item.formItemName}}</span>
                            <span v-if="[1,3].includes(formState) && item.citeDataType ==0" class="ico-right">请选择</span>
                        </p>
                        <!-- <ul class="itemsWrap" v-if="item.itemValArr.length >0">
                            <li v-for="val in item.itemValArr" :key="val">{{val}}</li>
                        </ul> -->
                        <div v-if="![1,3].includes(formState) || item.citeDataType !=0">
                            <div v-if="item.formItemValue == ''" class="nodata">
                                <img src="../../assets/img/noData.png" alt="">
                            </div>
                        </div>
                    </div>
                    <!-- <group class="choosePeople hasIco" v-if="item.formItemType == '10'" @click.native="selectionPlugin(item.formItemId,item.choiceType)">
                        <img src="../../assets/img/ico_people.png" alt="">
                        <cell :title="item.formItemName" :value="[1,3].includes(formState) && item.citeDataType ==0 ? '请选择' :''" :class="{'readOnly': ![1,3].includes(formState) || item.citeDataType !=0}"></cell>
                        <div v-if="![1,3].includes(formState) || item.citeDataType !=0">
                            <div v-if="item.formItemValue == ''" class="nodata">
                                <img src="../../assets/img/noData.png" alt="">
                            </div>
                        </div>
                    </group> -->
                    <!-- 邮箱 -->
                    <div class="fieldsWrap hasIco disflex" v-if="item.formItemType == '14'">
                        <img class="icon" src="../../assets/img/ico_email.png" alt="">
                        <span class="fieldname">{{item.formItemName}}</span><input type="text" @blur="verifyField(item.formItemValue,item.formItemType)" v-model="item.formItemValue" :disabled="[1,3].includes(formState) && item.citeDataType ==0 ? false :true" :placeholder="[1,3].includes(formState) && item.citeDataType ==0 && item.formItemValue == '' ? '请输入' :''" >
                    </div>
                    <!-- 电话 -->
                    <div class="fieldsWrap hasIco disflex" v-if="item.formItemType == '15'">
                        <img class="icon" src="../../assets/img/ico_phone.png" alt="">
                        <span class="fieldname">{{item.formItemName}}</span><input type="number" v-if="[1,3].includes(formState) && item.citeDataType ==0" v-model="item.formItemValue" :disabled="[1,3].includes(formState) && item.citeDataType ==0 ? false :true" :placeholder="[1,3].includes(formState) && item.citeDataType ==0 && item.formItemValue == '' ? '请输入' :''" oninput = "value=value.replace(/[^\d]/g,'')" @blur="verifyField(item.formItemValue,item.formItemType)" >
                        <p class="readPhone" v-else>{{item.formItemValue.substring(0,3)}}  {{item.formItemValue.substring(3,7)}} {{item.formItemValue.substring(7)}}</p>
                    </div>
                    <!-- 选择列表 -->
                    <group class="fieldsWrap selectList" v-if="item.formItemType == '16'" @click.native="showCheckList(item,index,formState)">
                        <cell :title="item.formItemName" ></cell>
                        <span v-if="[1,3].includes(formState) && item.citeDataType ==0" class="ico-right" :class="{'hasVal':item.formItemValue != ''}">{{item.formItemValue == '' || item.formItemValue == null ? '请选择' :item.formItemValue}}</span>
                        <span v-else class="ico-right readOnly">{{item.formItemValue}}</span>
                    </group>
                    <!-- 多选择列表 -->
                    <group class="fieldsWrap selectList" v-if="item.formItemType == '17'" @click.native="showCheckList(item,index,formState)">
                        <cell :title="item.formItemName" ></cell>
                        <span v-if="[1,3].includes(formState) && item.citeDataType ==0" class="ico-right" :class="{'hides': (item.formItemValue != '' && item.formItemValue != null) }">请选择</span>
                        <span v-else class="ico-right readOnly"></span>
                        <ul class="itemsWrap" v-if="item.itemValArr.length >0">
                            <!-- <li class="vux-1px" v-for="val in item.itemValArr" :key="val">{{val}}</li> -->
                            <li v-for="val in item.itemValArr" :key="val">{{val}}</li>
                        </ul>
                        <div v-if="![1,3].includes(formState) || item.citeDataType !=0">
                            <div v-if="item.formItemValue == ''" class="nodata">
                                <img src="../../assets/img/noData.png" alt="">
                            </div>
                        </div>
                    </group>

                    <!-- 整数 -->
                    <div class="fieldsWrap disflex" v-if="item.formItemType == '19'">
                        <span class="fieldname">{{item.formItemName}}</span>
                        <input type="number" v-model="item.formItemValue" oninput = "value=value.replace(/[^\d]/g,'')"  :disabled="[1,3].includes(formState) && item.citeDataType ==0 ? false :true" :placeholder="[1,3].includes(formState) && item.citeDataType ==0 && item.formItemValue == '' ? '请输入' : ''">
                    </div>
                    <!-- 小数 -->
                    <div class="fieldsWrap disflex" v-if="item.formItemType == '20'">
                        <span class="fieldname">{{item.formItemName}}</span>
                        <input type="number" v-model="item.formItemValue" :disabled="[1,3].includes(formState) && item.citeDataType ==0 ? false :true" :placeholder="[1,3].includes(formState) && item.citeDataType ==0 && item.formItemValue == '' ? '请输入' :''" onkeyup="value=value.match(/\d+\.?\d{0,2}/,'')" @blur="verifyFix(item.formItemValue,index)">
                    </div>
                    <!-- 百分数 -->
                    <div class="fieldsWrap disflex" v-if="item.formItemType == '21'">
                        <span class="fieldname">{{item.formItemName}}</span>
                        <input type="number" class="padr30" v-model="item.formItemValue" :disabled="[1,3].includes(formState) && item.citeDataType == 0 ? false :true" :placeholder="[1,3].includes(formState) && item.citeDataType ==0 && item.formItemValue == '' ? '请输入百分数(如：60.23)' : ''" onkeyup="value=value.match(/\d+\.?\d{0,2}/,'')"  @blur="verifyFix(item.formItemValue,index)">
                        <span class="percent">%</span>
                    </div>
                    <!-- 日期 -->
                    <group class="fieldsDatetime hasIco" :class="{'readonly': (![1,3].includes(formState) || item.citeDataType !=0)} " v-if="item.formItemType == '22'">
                        <img src="../../assets/img/ico_date.png" alt="">
                        <datetime v-model="item.formItemValue" :readonly="[1,3].includes(formState) && item.citeDataType ==0 ? false :true"  @on-change="change" :title="item.formItemName"></datetime>
                    </group>
                    <!-- 省市区 -->
                    <group  class="hasIco" v-if="item.formItemType == '25'">
                        <img class="ico_address" src="../../assets/img/ico_address.png" alt="">
                        <x-address :title="item.formItemName" v-model="item.itemValArr" :raw-value='true' @on-hide="addressHide" @on-show="addressShow(index)" @on-shadow-change="changeAddress" :class="{'disabled': (![1,3].includes(formState) || item.citeDataType != 0)}" :disabled="[1,3].includes(formState) && item.citeDataType ==0 ? false :true" :list="addressData" :placeholder="[1,3].includes(formState) && item.citeDataType ==0 && item.formItemValue == '' ? '请选择' :''"></x-address>
                    </group>
                    <!-- 邮编 -->
                    <div class="fieldsWrap hasIco disflex" v-if="item.formItemType == '26'">
                        <img class="ico_postcode icon" src="../../assets/img/ico_postcode.png" alt="">
                        <span class="fieldname">{{item.formItemName}}</span><input type="number" :disabled="[1,3].includes(formState) && item.citeDataType == 0 ? false :true" v-model="item.formItemValue" :placeholder="[1,3].includes(formState) && item.citeDataType ==0 && item.formItemValue == '' ? '请输入' :''" oninput = "value=value.replace(/[^\d]/g,'')" @blur="verifyField(item.formItemValue,item.formItemType)">
                    </div>
                    <!-- 身份证 -->
                    <div class="fieldsWrap hasIco disflex" v-if="item.formItemType == '27'">
                        <img class="ico_idcard icon" src="../../assets/img/ico_idcard.png" alt="">
                        <span class="fieldname">{{item.formItemName}}</span>
                        <input type="text" v-model="item.formItemValue" :disabled="[1,3].includes(formState) && item.citeDataType == 0 ? false :true" :placeholder="[1,3].includes(formState) && item.citeDataType ==0 && item.formItemValue == '' ? '请输入' :''" @blur="verifyField(item.formItemValue,item.formItemType)" >
                    </div>
                    <!-- 音频 -->
                    <div class="fieldsWrap hasIco" v-if="item.formItemType == '28'">
                        <img src="../../assets/img/ico_audio.png" alt="">
                        <span>{{item.formItemName}}</span>
                        <template v-if ="item.citeDataType == 0 && [1,3].includes(formState)">
                            <div class="addAudio vux-1px-t"  v-if="item.formItemValue ==''">
                                <div class="addAudioInput">
                                    添加音频
                                    <!-- <input type="file" name="" :disabled="[1,3].includes(formState) ? false :true" @change="tirggerFile($event,index)" accept="audio/mpeg"> -->
                                    <input type="file" name="" @change="uploadVideo(item.id,$event,'mp3',index)" accept="audio/mpeg">
                                </div>
                                <span @click="upDataVideo(item.id,'mp3',index)">大文件请点击</span>
                            </div>
                        </template>
                        <template v-if="(item.formItemValue !='')">
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
                        <div v-if="(item.citeDataType != 0 || ![1,3].includes(formState)) && item.formItemValue ==''" class="videoNOdata">
                            <img src="../../assets/img/noData.png" alt="">
                        </div>
                    </div>
                    <!-- 视频 -->
                    <div class="fieldsWrap hasIco" :class="{'hasUrl':(item.formItemValue !='' && item.formItemValue != null)}" v-if="item.formItemType == '29'">

                        <img src="../../assets/img/ico_video.png" alt="">
                        <span>{{item.formItemName}}</span>
                        <template v-if ="item.citeDataType == 0 && [1,3].includes(formState)">
                            <div class="addVideo" v-if="item.formItemValue =='' ">
                                <div class="inputFile">
                                    <input type="file" name="" @change="uploadVideo(item.id,$event,'mp4',index)" accept="video/*">
                                </div>
                                <span @click="upDataVideo(item.id,'mp4',index)">大文件请点击</span>
                            </div>
                            <template v-else>
                                <div class="showVideo">
                                  <VideoPlayerCommon :options="item"></VideoPlayerCommon>
                                    <!--<img src="../../assets/img/img_video.jpg" @click="playMP4(index)" alt="">-->
                                </div>
                            </template>
                        </template>
                        <template v-else>
                            <div class="showVideo" v-if="(item.formItemValue !='')">
                              <VideoPlayerCommon :options="item"></VideoPlayerCommon>
                                <!--<img src="../../assets/img/img_video.jpg" @click="playMP4(index)" alt="">-->
                            </div>
                            <div v-else class="videoNOdata">
                                <img src="../../assets/img/noData.png" alt="">
                            </div>
                        </template>
                    </div>
                </li>
            </ul>
            <div class="btnsWrap">
                <x-button type="primary" v-if="[1,3].includes(formState)" action-type="button" @click.native="submit">提交</x-button>
                <!-- <x-button type="primary" action-type="button">提交并切换学生</x-button> -->
                <x-button action-type="button" @click.native="goback">返回</x-button>
            </div>
            <!-- 选择列表，多选择列表 -->
            <x-dialog v-model="showHideOnBlur" :dialog-style="{'max-width': '100%',width:'80%', overflow:'auto', 'background-color':'#fff',color:'#696969','border-radius':'6px','box-shadow': '0 0 4px #ccc'}" :class="{'vux-1px':showHideOnBlur}" hide-on-blur>
                <h4 class="vux-1px-b">{{popData.formItemName}}</h4>
                <div class="modalWrapper">
                    <group title="" v-if="popType == 0">
                        <radio :options="popData.formSelectItemResps" v-model="popData.formItemValue"></radio>
                    </group>
                    <div v-if="popType == 1">
                        <checklist title=""  label-position="left" :options="popData.formSelectItemResps" v-model="popData.itemValArr" @on-change="change"></checklist>
                    </div>
                </div>
                <flexbox>
                    <flexbox-item>
                        <x-button type="default cancel" action-type="button"  @click.native="showHideOnBlur = false">取消</x-button>
                    </flexbox-item>
                    <flexbox-item>
                        <x-button class="confirm" action-type="button" type="default" @click.native="checkListCommit">确定</x-button>
                    </flexbox-item>
                </flexbox>
            </x-dialog>
        </form>
        <!--视频大文件上传弹框-->
        <div class="viedoPropParent" v-show="upDataShow">
            <div class="viedoProp">
                <p class="videoP1">
                    <img @click="upDataShow=false" src="@/assets/img/videoX.png" alt="">
                    <img @click="upDataVideo(propId,propsta,-1)" src="@/assets/img/videoRrefresh.png" alt="">
                </p>
                <p class="videoP2">请使用电脑访问此链接上传文件</p>
                <p class="videoP3">（上传成功前，请勿关闭此页面，一小时内有效）</p>
                <p class="videoP4">{{ upDataUrl }}</p>
                <div class="videoP5" v-if="btnGc">上传成功后，点击获取文件（<span>{{ si }}</span>S）</div>
                <div class="videoP5" v-if="!btnGc" @click="obtainVideo">点击获取文件</div>

                <div v-show="inlineDescList.length>0">
                    <checklist title="最近上传文件" :max="1" :options="inlineDescList" v-model="inlineDescListValue" @on-change="changeFile"></checklist>
                </div>
                <div v-show="inlineDescList.length<=0">
                    最近无新上传文件
                </div>
            </div>
        </div>
        <div class="weui-toast myToast" v-show="toastShow">
            <inline-loading class="toastLoading"></inline-loading>
            <p>上传中：{{percent}}</p>
        </div>
        <!-- 视频播放控件 -->
        <div class="videoParent" @click.prevent.stop="videoPropShow=false" v-if="videoPropShow">
            <video-player class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
            ></video-player>
        </div>
        <!-- 选人插件组件 -->
        <select2 v-bind:uid="uid" v-bind:orgId="orgId" v-bind:type="type" v-bind:sreach_tea="sreach_tea" v-bind:sreach_stu="sreach_stu" @qd="qd" @qx="qx" v-if="tsshow" v-bind:xr="xr"></select2>
    </div>
</template>
<script>
import { LoadMore,Loading,Group,XDialog,InlineLoading,Cell,XInput,XTextarea,Datetime,XAddress,ChinaAddressV4Data,Calendar,Radio,Checklist,XButton,Flexbox,FlexboxItem} from "vux";
import qs from 'qs';
import aplayer from "vue-aplayer";
// import {formatDate} from '@/plugins/formatDate.js';
// import BScroll from "better-scroll";
import Bus from '@/plugins/eventBus.js'
import select2 from '@/components/stu/select'
import radioList from '@/components/common/com-radios'
import {wechatconfigInit,wechatopenimg} from '@/plugins/wechat.js';
import uploadImg  from '@/components/uploadImg'
import { mapState } from 'vuex'
import VideoPlayerCommon from "@/components/common/video/video-player-common.vue"
import { setTimeout } from 'timers';
import Cookies from 'js-cookie';
// import showcycle from '@/page/tea/SelectionPeriod'
export default {
    data(){
        return{
            uid:this.$route.params.uid,
            id:this.$route.params.id,
            // cycleid:this.$route.params.cycleid,
            // back:this.$route.params.back,
            stuid:this.$route.params.stuid,
            schoolId:this.$route.params.schoolid,
            title:'',
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
            percent:'',//音视频上传百分比
            toastShow:false,
            geographic:'',//地理位置 桥接使用
            count:9,//图片上传数量

            //选人插件相关
            tsshow:false,//选人插件是否显示
            xr:'',
            orgId:'',
            sreach_stu:'',
            sreach_tea:'',
            type:null,
            //省市区
            tempAddress:[],
            //卡片列表页码
            paramsData:{},
            //音视频大文件上传相关
            upDataShow:false,
            upDataUrl:'',
            btnGc:true,
            inlineDescList:[],
            inlineDescListValue:[],
            propId:null,
            // 验证码
            obtainText:'获取验证码',
            obtainVal:'',
            si:0,
            authorizationCode:'',
            propsta:'',
        }
    },
    computed: mapState({
        _url_: state => state._url_
    }),
    components:{
        Group,
        aplayer,
        LoadMore,
        Loading,
        InlineLoading,
        XDialog,
        uploadImg,
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
        select2,
      VideoPlayerCommon,
      radioList
    },
    created(){
        wechatconfigInit(this,qs,this.uid,this._url_);
        this.getStuInfos();
        // this.getHistoryList();
        Bus.$on('stuCardListsData',(data)=>{
          this.stuListsData = data;
        });
        Bus.$on('cardListMsg',(data)=>{
          this.paramsData = data;
        });
    },
    computed: mapState({
      _url_: state => state._url_

    }),
    methods:{
        goback(){
            // this.$router.go(-1);
            Cookies.set('cardPageNo',this.paramsData.pageNo);
            console.log(this.paramsData.taskId)
            // if(this.paramsData.taskId === undefined){
                this.$router.go(-1);
            // }else{
            //     this.$router.push({path: '/stuList2Card/'+this.uid+'/'+this.paramsData.taskId+'/'+this.paramsData.formId+'/'+this.paramsData.schoolid});
            // }
        },
        //获取学生表单信息
        getStuInfos(){
            this.$vux.loading.show({
                text: '加载中...'
            });
            this.$axios.get( process.env.API_ROOT+"app/stu/v1/showStuTaskDetail",{params:{
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
                    // 省市区，需要一个数组信息
                    if(this.curFieldsLists.length >0){
                        this.curFieldsLists.forEach(element => {
                            if(['5','6','17','25'].includes(element.formItemType)){
                                element = Object.assign(element,{
                                    itemValArr: element.formItemValue != '' && element.formItemValue != null ? element.formItemValue.split(',') : []
                                })
                            }
                            if(element.formItemType == '9'){
                                if(element.formItemValue != ''){
                                    this.geographic = element.formItemValue;
                                }else{
                                    this.getMap();
                                }
                            }
                            if(element.formItemType == '10'){

                            }
                        })
                    }
                    this.$previewRefresh();
                }
            }).catch( err =>{
                this.errorUtil(err);
            })
        },
        //获取学生填写记录
        getHistoryList(){
            this.$axios.get( process.env.API_ROOT+"app/stu/v1/getStuToStuTaskSubmitHistory",{params:{
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
            if(this.popData.formItemType == '17' && this.popData.itemValArr.length>0){
                this.popData.formItemValue = this.popData.itemValArr.join(',');
            }
            this.curFieldsLists[this.curIndex] = this.popData;
            this.showHideOnBlur = false;
        },
        change (value) {
            console.log('change',value)
        },
        //单选更改事件
        changeRadio(val,index){
            this.curFieldsLists[index].formItemValue = val;
        },
        //多项选择选择值--省市区
        checkListChange(value,index){
            this.curFieldsLists[index].formItemValue = value.length>0 ? value.join(',') : '';
        },
        changeAddress(ids,names){
            if(this.curIndex != null){
                this.tempAddress = names;
            }
        },
        addressShow(index){
            this.curIndex = index;
        },
        addressHide(){
            this.curFieldsLists[this.curIndex].formItemValue = this.tempAddress.length>0 ? this.tempAddress.join(',') : '';
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
            this.$axios.get( process.env.API_ROOT+"oss/2/get/code/"+_self.authorizationCode,
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
                        _self.upDataShow=false;
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
            this.$axios.post(url, formdata,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                onUploadProgress: (progressEvent) => {
                    // 对原生进度事件的处理
                    if(progressEvent.lengthComputable){
                        this.percent = parseInt(progressEvent.loaded/progressEvent.total * 100) + '%';
                        this.toastShow = true;
                    }
                }
            }).then(res => {
                this.toastShow = false;
                console.log(res);
                if(res.code=='200'){
                    if(type=="mp4"){//视频
                        this.playerOptions.sources[0].src=domain+res.url
                    }
                    this.curFieldsLists[this.curIndex].formItemValue = domain+res.url;
                    this.upDataShow=false;

                }else{
                    this.$vux.toast.show({type: 'warn',text:'暂无文件' });
                }

            }).catch(err => {
                console.log(err);
            })
        },
        //播放视频
        playMP4(index){
            this.playerOptions.sources[0].src = this.curFieldsLists[index].formItemValue;
            this.videoPropShow = true;
        },
        //音视频大文件上传
        changeFile (val, index) {
            if(val!=""&&val!=undefined) {
                var _self = this;
                this.playerOptions.sources[0].src =val[0];
                this.curFieldsLists[index].formItemValue = val[0];
                // this.itmes.forEach(function (el) {
                //     if (el.id == _self.propId) {
                //         el.val = val[0];
                //     }
                // })
                this.upDataShow = false;
            }
        },
        //倒计时
        countdown() {
            this.si=2;
            this.btnGc=true;
            var time = window.setInterval( ()=> {
                if (this.si === 0) {
                    this.si = 0;
                    this.btnGc=false;
                    window.clearInterval(time)
                } else {
                    this.si -= 1;
                }
            }, 1000)
        },
        //上传视频弹窗
        upDataVideo(id,cad,index){
            this.upDataShow=true;
            this.propId=id;
            this.propsta=cad;
            if(index != -1){
                this.curIndex = index;
            }

            if(this.si==0){
                this.$axios.get( process.env.API_ROOT+"oss/2/"+cad+"/get/code",
                    qs.stringify({
                    })
                ).then((res)=>{
                    if(res.isSuccess){
                        console.log(res,'验证码');
                        this.authorizationCode=res.data.code
                        this.upDataUrl='http://'+window.location.host+'/t/#/views/tea/upVideo/'+this.propsta+'/'+this.authorizationCode
                        this.countdown();

                        this.inlineDescList = [];

                        res.data.list.forEach(v=>{
                           var obj = {};
                            obj.key = v.url;
                            obj.value = v.url;
                            obj.inlineDesc = "上传于:"+v.time;
                            this.inlineDescList.push(obj);
                        });
                    }else{
                        this.$vux.toast.show({type: 'warn',text:res.errorDesc });
                    }
                }).catch(function(err){
                    this.errorUtil(err);
                })
            }
        },
        //获取地理位置 --1
        getMap() {
            var  self_ = this;
            this.$wechat.ready(function(){
                self_.$wechat.getLocation({
                    success: function (res) {
                        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        var longitude = res.longitude ; // 经度，浮点数，范围为180 ~ -180。
                        self_.addressDetail(latitude,longitude);

                    },
                    cancel: function (res) {
                        alert('用户拒绝授权获取地理位置');
                    }
                });
            });
        },
        //--2
        addressDetail(lat,lng){
            var self=this;
            var geolocation = new BMap.Geolocation();
            var myGeo = new BMap.Geocoder();
            myGeo.getLocation(new BMap.Point(lng,lat),function (result) {
                if(result){
                    self.geographic=result.address
                }
            })
        },
        verifyField(val,type){
            if(val == '') return;
            switch(type){
                case '26': //邮编
                    if(!/^[1-9]\d{5}(?!\d)$/.test(val)){
                        this.$vux.toast.show({type: 'warn',text:'邮编填写不正确' });
                    }
                    break;
                case '14': //邮箱
                    if(!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(val)){
                        this.$vux.toast.show({type: 'warn',text:'邮箱填写不正确' });
                    }
                    break;
                case '27': //身份证
                    if(!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(val)){
                        this.$vux.toast.show({type: 'warn',text:'身份证填写不正确' });
                    }
                    break;
                case '15': //电话
                    if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(val)){
                        this.$vux.toast.show({type: 'warn',text:'电话填写不正确' });
                    }
                    break;
            }
        },
        //小数，百分数  校验小数点后最多两位
        verifyFix(val,index){
            if(val.indexOf('.') == -1) return;
            if(val.split('.')[1].length > 2){
                this.curFieldsLists[index].formItemValue = val.substring(0,val.indexOf(".")+3);
            }
        },
        //表单提交
        submit(){
            //app/stu/v1/addStuTaskFormList
            if(this.curFieldsLists.length == 0) return;
            for(let i=0;i<this.curFieldsLists.length;i++){
                if(this.curFieldsLists[i].formItemType == '14' && this.curFieldsLists[i].formItemValue != ''){
                    if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.curFieldsLists[i].formItemValue)){
                        this.$vux.toast.show({type: 'warn',text:'邮箱填写不正确' });
                        return;
                    }
                }
                if(this.curFieldsLists[i].formItemType == '15' && this.curFieldsLists[i].formItemValue != ''){
                    if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.curFieldsLists[i].formItemValue)){
                        this.$vux.toast.show({type: 'warn',text:'电话填写不正确' });
                        return;
                    }
                }
                if(this.curFieldsLists[i].formItemType == '26' && this.curFieldsLists[i].formItemValue != ''){
                    if(!/^[1-9]\d{5}(?!\d)$/.test(this.curFieldsLists[i].formItemValue)){
                        this.$vux.toast.show({type: 'warn',text:'邮编填写不正确' });
                        return;
                    }
                }
                if(this.curFieldsLists[i].formItemType == '27' && this.curFieldsLists[i].formItemValue != ''){
                    if(!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(this.curFieldsLists[i].formItemValue)){
                        this.$vux.toast.show({type: 'warn',text:'身份证填写不正确' });
                        return;
                    }
                }
            }

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

                if(ele.formItemNotNull=='Y'&&(ele.formItemValue==''||ele.formItemValue==null)){
                     this.$vux.toast.show({type: 'warn',text:'请将信息填写完整' });
                }
            })
            formValueJson.push({
                formItemValues:formItemValues,
                stuId:this.stuid
            })
            this.$axios.post( process.env.API_ROOT+"app/stu/v1/addStuTaskFormList",
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
        },
        //选人插件-相关方法
        selectionPlugin(id,type){
            this.xr=id
            if(type==1){
                this.type=3
            }else if(type==2){
                this.type=1
            }else if(type==3){
                this.type=2
            }
            this.tsshow= true;
        },
        qx(){
          this.tsshow = false;
        },
        qd(obj){
            this.itmes.forEach((it)=>{
                // if(it.id==this.xr){
                //     var con =[];
                //     var va =[];
                //     obj.forEach( (a) => {
                //         con.push(a.name)
                //         va.push(a.id)
                //     })
                //     it.valex=con
                //     it.val=va.join(',')
                // }
            })
          this.tsshow = false;
        },
    },

}
</script>
<style lang="less">
.scroller-item{
    font-size: 30px !important;
}
.dp-header .dp-item{
    font-size: 36px !important;
    padding: 10px !important;
    height: auto !important;
}
.vux-popup-picker .vux-popup-picker-container{
    .vux-popup-header{
        height:1rem;
        line-height: 1rem;
        .vux-popup-header-right,.vux-popup-header-left{
            font-size:32px;
        }
    }
}
.myToast{
    .toastLoading{
        width: 0.506667rem;
        height: 0.506667rem;
        margin: 30px 0 10px;
    }
    p{
        margin-bottom: 15px;
    }
}

.weui-check__label:active{background-color: #fff !important;}
textarea:disabled, input:disabled{background-color: #fff;}
    .stuCardDetails{
        height: calc(~'100vh - 96px');
        background-color: #ebebeb;
        margin-top: 76px;
        padding-top: 20px;
        textarea:disabled{
            background-color: #fafafa;
            color: #656565;
        }
         input::-webkit-input-placeholder,textarea::-webkit-input-placeholder {
             color: #c6c6c6;
             font-size: 28px;
         }
         .weui-cells{
             line-height:1.6;
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
            z-index: 10;
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
            >ul{
                background-color:#ebebeb;
            }
            .fields-item{
                list-style: none;
                margin-top: 40px;
                background-color: #fff;
                .vux-popup-picker-placeholder{
                    color:#c6c6c6;
                }
                .hasIco{
                    position: relative;
                    &.positionWrap{
                        padding: 30px;
                        font-size: 30px;
                        .fieldname{
                            margin-left: 10px;
                        }
                        img{
                            position: static;
                        }
                        p{
                           width: 460px;
                           font-size: 30px; 
                           text-align: right;
                        }
                    }
                    &.choosePeople{
                        // .weui-cell__ft{
                        //     color:#c6c6c6;
                        //     &:after{
                        //         right: 0 !important;
                        //     }
                        // }
                        // .readOnly{
                        //     .weui-cell__ft:after{
                        //         height: 0;
                        //         width: 0;
                        //     }
                        // }
                        p{
                            position: relative;
                            padding: 30px 30px 30px 75px;
                            img{
                                width: 35px;
                                height: 37px;
                                position: absolute;
                                top:28px;
                                left:30px;
                            }
                            .fieldname{
                                font-size: 30px;
                                line-height: 1;
                            }
                            .ico-right{
                                position: absolute;
                                right: 80px;
                                top: 24px;
                                color: #c6c6c6;
                                font-size: 30px;
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
                        }
                        .nodata{
                            padding:10px 0;
                            height: 96px;
                            text-align:center;
                            img{
                                position:static;
                                width: 230px;
                                height:76px;
                            }
                        }
                    }
                    img{
                        position: absolute;
                        left: 30px;
                        top: 34px;
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
                        .vux-cell-value{
                            color: #656565;
                        }
                    }
                    .disabled{
                        .weui-cell .weui-cell__ft:after{
                            border:none;
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
                        .weui-cell{
                            width: calc(~'100% - 120px');
                            .vux-cell-value{
                                color:#656565;
                            }
                            .weui-cell__ft:after{
                                // right: 0;
                                border:none;
                            }
                        }
                    }
                }

                .fieldsWrap{
                    position: relative;
                    padding: 30px;
                    color: #333;
                    font-size: 30px;
                    .readOnly,.readPhone{
                        text-align:right;
                        position: absolute;
                        right: 30px;
                        top:34px;
                        color:#656565;
                    }
                    .readPhone{
                        top:32px;
                    }
                    .readOnly-block{
                        position:static;
                        // margin: 0 30px;
                        padding-bottom:30px;
                        color:#656565;
                        p{background-color:#fafafa;}
                    }
                    // .fieldInput{
                    //     width:253px;
                    //     display:inline-block;
                    //     vertical-align: middle;
                    // }
                    // .txtInput{
                    //     position: static;
                    //     padding-top:0;
                    //     padding-bottom:0;
                    //     display:inline-block !important;
                    //     vertical-align:middle;
                    //     width: 416px;
                    //     font-size:30px;
                    //     line-height:1;
                    // }
                    .fieldname{
                        display:block;
                        width:182px;
                        overflow:hidden;
                        font-size:30px;
                    }
                    &.hasIco{
                        padding-left: 90px;
                        &.disflex{
                            display:flex;
                            display: -webkit-flex; /* Safari */
                            align-items: center;
                            padding-left: 30px;
                            .icon,input{
                                position: static;
                            }
                            .icon{
                                margin-right: 20px;
                            }
                            .fieldname{
                                display: inline-block;
                                width: 180px;
                            }
                            input{
                                padding-left: 20px;
                                width: 424px;
                            }
                        }
                    }
                    &.disflex{
                        display:flex;
                        display: -webkit-flex; /* Safari */
                        align-items: center;
                        padding-left: 30px;
                        input{
                            position: static;
                        }
                        .fieldname{
                            display: inline-block;
                            width: 253px;
                        }
                    }
                    .percent{
                        position: absolute;
                        right: 30px;
                    }
                    input{
                        position: absolute;
                        right: 30px;
                        top: 36px;
                        display:block;
                        padding:0 6px;
                        font-size:30px;
                        line-height:30px;
                        border: none;
                        outline: none;
                        width: 436px;
                        color: #656565;
                        text-align: left;
                        &:disabled{
                            border:none;
                            text-align:right;
                        }
                        &.padr30{
                            width: 416px;
                            padding-right: 30px;
                        }
                    }
                    .weui-cell.vux-x-textarea{
                        padding-left: 0;
                        padding-right: 0;
                        .weui-textarea{
                            padding: 0.15rem 0.2rem;
                        }
                    }
                    &.txtarea,&.radios,&.wenben{
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
                    &.radios{
                        .radioLists{
                            padding: 0 30px;
                            span{

                            }
                        }
                    }
                    &.imgUpload{
                        padding:0;
                        p{
                            padding: 30px;
                            img{
                                margin-top: -2px;
                                display:inline-block;
                                vertical-align:middle;
                                margin-right:14px;
                                width:36px;
                                height:36px;
                            }
                        }
                        .nodata{
                            padding:10px 0;
                            height: 96px;
                            text-align:center;
                            img{
                                position:static;
                                width: 230px;
                                height:76px;
                            }
                        }
                        .img-items{
                            padding: 0 30px;
                            margin: 0;
                            font-size: 0;
                            li{
                                display: inline-block;
                                margin: 0 22px 22px 0;
                                width:215px;
                                height: 215px;
                                &:nth-child(3n+3){
                                    margin-right: 0;
                                }
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                        }
                    }
                    &.wenben{
                        p{
                            text-align: left;
                        }
                        text-align: center;
                        img{
                            margin: 10px 0;
                            width: 230px;
                            height: 76px;
                        }
                    }
                    &.txtarea{
                        .weui-cell:before{
                            border: none;
                        }
                        .nodata{
                            padding:10px 0;
                            height: 96px;
                            text-align:center;
                            img{
                                position:static;
                                width: 230px;
                                height:76px;
                            }
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
                            background: url('../../assets/img/ico_addMedia.png') no-repeat right center;
                            background-size: 32px 41px;
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
                    .videoNOdata{
                        padding:10px 0;
                        height: 96px;
                        text-align:center;
                        img{
                            position:static;
                            width: 230px;
                            height:76px;
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
                            background: url('../../assets/img/ico_addMedia.png') no-repeat right center;
                            background-size: 32px 41px;
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
                        .vux-radio-disabled{
                            .weui-cell__ft{
                                background: none !important;
                            }
                            .weui-check:checked + .weui-icon-checked{
                                background: url('../../assets/img/checked.png') no-repeat center center !important;
                                background-size: 35px 31px !important;
                                &:before{
                                    content: '';
                                }
                            }
                        }
                        .weui-cell_radio{
                            padding: 0;
                            p{
                                padding: 30px 0;
                                font-size: 30px;
                            }
                            .weui-cell__ft{
                                padding: 0;
                                height: 40px;
                                width: 40px;
                                background: url('../../assets/img/radio1.png') no-repeat center center;
                                background-size: 40px 40px;
                            }

                            .weui-check:checked + .weui-icon-checked{
                                margin-top: 0;
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
                        .nodata{
                            padding:10px 0;
                            height: 96px;
                            text-align:center;
                            img{
                                position:static;
                                width: 230px;
                                height:76px;
                            }
                        }
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
                            &.readOnly{
                                right:0;
                                color:#656565;
                                &:after{
                                    border:none;
                                }
                            }
                            &.hasVal{
                                color:#656565;
                            }
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
                                border:2px solid #ccc;
                                border-radius: 16px;
                                color: #656565;
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
            h4{
                margin: 0;
                font-size: 30px;
                padding: 30px;
            }
            .modalWrapper{
                max-height: 630px;
                overflow: auto;
                .weui-cells{
                    margin-top: 0;
                }
            }
            .weui-cell{
                padding:30px;
                p{
                    font-size: 30px;
                    line-height: 1;
                    text-align: left;
                }
            }
            .weui-cells_radio .weui-check:checked + .weui-icon-checked:before{
                font-size: 40px;
            }
            .vux-radio-label{
                line-height: 1.5;
                font-size: 30px;
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
        .vux-checklist-disabled{
            .weui-cells.weui-cells_checkbox .weui-check_label .weui-icon-checked{
                background: none;
                &::before{
                    content: '';
                }
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
        .vux-checklist-disabled{
            .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked{
                background: url('../../assets/img/checked.png') no-repeat center center;
                background-size: 35px 31px;
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
        .viedoPropParent{position: fixed;background: rgba(0,0,0,0.5);top: 0;left: 0;right: 0;bottom: 0;z-index: 999;}
        .viedoProp{width: 85%;padding:10px 10px 30px;background: #fff;position: fixed;margin: 0 auto;top: 30%;left: 0px;right: 0px;box-shadow: 0 0 5px #ccc;/*no*/border-radius: 3px;/*no*/}
        .viedoProp > p,.viedoProp > div{text-align:center;font-size:26px;margin-bottom:10px;}
        .videoP1 {overflow: hidden;}
        .videoP1 img:first-child{width:22px;float: left;}
        .videoP1 img:last-child{width:28px;float: right;}
        .videoP2 {color:#696969;}
        .videoP3 {color:#bcbbbb;}
        .viedoProp .videoP4 {color:#16c775;word-wrap:break-word;word-break:break-all;}
        .videoP5 {color:#ffffff;background:#56ca99;width:85%;margin:0 auto;padding:15px 0;border-radius:3px;/*no*/}
    }
</style>

