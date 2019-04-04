<template>
    <div class="stuListCard">
        <div class="top-back" v-show="topShow">
            <img class="img-1" src="../../assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ title }}</div>
            <span class="img-2" style="display:none;" @click="openCycle">
                <i class="icon iconfont icon-shiyongcishu ripple"></i>
            </span>
            <img class="img-3" style="display:none;" src="../../assets/img/ico_search.png" alt="">
            <img class="img-4" style="display:none;" src="../../assets/img/batch.png" @click="batch" alt="">
        </div>
       <div class="empty-top"></div>
        <p class="drop-down" v-show="dropDownShow">
            <img src="../../assets/img/upgx.gif" alt="">
        </p>
        <div class="bscroll"  ref="bscroll">
            <!-- <load-more v-if="stuLits.length == 0" :show-loading="false" :tip="'暂无数据'" background-color="#fbf9fe"></load-more> -->
            <ul class="stuLists">
                <li class="stulist-item" v-for="item in stuLits" :key="item.stuId" @click="toStuDetail(item.stuId,item.pageNo)">
                    <div class="stuInfo">
                        <img src="../../assets/img/img_avatar.png" class="avatar" alt="">
                        <span class="name">{{item.stuName}}</span>
                        <span class="status" @click.stop="showTime(item.updateTimeStr)">{{item.taskStateName}}</span>
                    </div>
                    <ul class="fieldLists">
                        <!-- 1单行输出   2 多行输入  3 日期时间  4 单项选择 5 多项选择  6 图片上传   8 描述文本 9 地理位置  10 选人插件, 14 邮箱 15 电话
                        16选择列表 17 多选列表 19 整数 20 小数  21 百分数 22 日期   25 省市区  26 邮编  27 身份证 28 音频 29 视频 -->
                        <li class="fieldlist-item" v-for="(field,index) in item.formItemResps" :key="index">
                            <dl>
                                <!-- 单行 -->
                                <template v-if="field.formItemType == '1'">
                                    <dt>
                                        <span>{{field.formItemName}}</span>
                                        <p v-if="[1,-1,3].includes(item.taskState)" :class="{'hasVal':field.formItemValue !=''}">{{field.formItemValue == ''? '请输入':field.formItemValue}}</p>
                                        <p v-else :class="{'hasVal':field.formItemValue !=''}">{{field.formItemValue}}</p>
                                    </dt>
                                </template>
                                <!-- 多行 -->
                                <template v-if="field.formItemType == '2'">
                                    <dt>
                                        <span>{{field.formItemName}}</span>
                                    </dt>
                                    <template v-if="field.citeDataType == 0">
                                        <dd class="hasbgColor" v-if="[1,-1,3].includes(item.taskState)">
                                            <x-textarea disabled :max="200" v-model="field.formItemValue"  placeholder="请输入" :show-counter="false"></x-textarea>
                                        </dd>
                                        <dd class="textarea readOnly" :class="{'hasbgColor':field.formItemValue != '' && field.formItemValue != null}" v-else>
                                            <div v-if=" field.formItemValue != '' ">
                                                <x-textarea  disabled v-model="field.formItemValue" :show-counter="false"></x-textarea>
                                                <span class="moreTxt" v-show="!field.readAll">全文</span>
                                            </div>
                                            <img v-else src="../../assets/img/noData.png" alt="">
                                        </dd>
                                    </template>
                                    <template v-if="field.citeDataType != 0">
                                        <dd class="textarea" :class="{'hasbgColor':field.formItemValue != '' && field.formItemValue != null}">
                                            <p v-if="field.formItemValue != '' && field.formItemValue != null">{{field.formItemValue}}</p>
                                            <img v-else src="../../assets/img/noData.png" alt="">
                                        </dd>
                                    </template>
                                </template>
                                <!-- 日期时间 -->
                                <template v-if="field.formItemType == '3'">
                                    <dt>
                                        <img src="../../assets/img/ico_datetime.png" alt="">
                                        <span>{{field.formItemName}}</span>
                                        <p :class="{'hasVal':field.formItemValue !=''}">
                                            {{field.formItemValue}}
                                            <template v-if="field.formItemValue =='' && [1,-1,3].includes(item.taskState)">
                                                <div class="noData">
                                                    <span>请选择</span>
                                                    <img src="../../assets/img/ico_right.png" alt="">
                                                </div>
                                            </template>
                                        </p>
                                    </dt>
                                </template>
                                <!-- 单选，多选 -->
                                <template v-if="field.formItemType == '4'">
                                    <dt>
                                        <span>{{field.formItemName}}</span>
                                    </dt>
                                    <dd v-if="field.formSelectItemResps != null && field.formSelectItemResps.length>0">
                                        <group >
                                            <radio :options="field.formSelectItemResps" v-model="field.formItemValue" disabled ></radio>
                                        </group>
                                    </dd>

                                </template>
                                <template v-if="field.formItemType == '5'">
                                    <dt>
                                        <span>{{field.formItemName}}</span>
                                    </dt>
                                    <dd v-if="field.formSelectItemResps != null && field.formSelectItemResps.length>0">
                                        <checklist disabled label-position="left" :options="field.formSelectItemResps" v-model="field.itemValArr" ></checklist>
                                    </dd>
                                </template>
                                <!-- 图片上传未完成 -->
                                <template v-if="field.formItemType == '6'">
                                    <dt>
                                        <img src="../../assets/img/ico_pic.png" alt="">
                                        <span>{{field.formItemName}}</span>
                                    </dt>
                                    <dd class="fieldImg" v-if="[1,-1].includes(item.taskState) && field.formItemValue =='' ">
                                        <img src="../../assets/img/tj_big.png" alt="">
                                    </dd>
                                    <dd class="imgWrapper" v-if="![1,-1].includes(item.taskState) && field.formItemValue !=''">
                                        <ul class="img-items">
                                            <li v-for="(url,i) in field.itemValArr" :key="i">
                                                <img :src="url" :preview="i" alt="">
                                            </li>
                                        </ul>
                                    </dd>
                                    <dd v-else class="multiple">
                                        <img src="../../assets/img/noData.png" alt="">
                                    </dd>
                                </template>
                                <!-- 文本描述 -->
                                <template v-if="field.formItemType == '8'">
                                    <dt>
                                        <span>{{field.formItemName}}</span>
                                    </dt>
                                    <dd class="textarea readOnly" :class="{'hasbgColor':field.formItemValue != '' && field.formItemValue != null}">
                                        <div v-if=" field.formItemValue != '' ">
                                            <x-textarea  disabled v-model="field.formItemValue" :show-counter="false"></x-textarea>
                                            <span class="moreTxt" v-show="!field.readAll">全文</span>
                                        </div>
                                        <img v-else src="../../assets/img/noData.png" alt="">
                                    </dd>
                                </template>
                                <!-- 地理位置 -->
                                <template v-if="field.formItemType == '9'">
                                    <dt>
                                        <img src="../../assets/img/ico_position.png" alt="">
                                        <span>{{field.formItemName}}</span>
                                        <p :class="{'hasVal':field.formItemValue !=''}">
                                            {{field.formItemValue}}
                                            <template v-if="field.formItemValue =='' && [1,-1,3].includes(item.taskState)">
                                                <div class="noData">
                                                    <span>请选择</span>
                                                    <img src="../../assets/img/ico_right.png" alt="">
                                                </div>
                                            </template>
                                        </p>
                                    </dt>
                                </template>
                                <!-- 选人插件未完成 -->
                                <template v-if="field.formItemType == '10'">
                                    <dt>
                                        <img src="../../assets/img/ico_people.png" alt="">
                                        <span>{{field.formItemName}}</span>
                                        <p v-if="[1,-1,3].includes(item.taskState) && field.citeDataType ==0 ">
                                            <template>
                                                <div class="noData">
                                                    <span>请选择</span>
                                                    <img src="../../assets/img/ico_right.png" alt="">
                                                </div>
                                            </template>
                                        </p>
                                    </dt>
                                    <template v-if="![1,-1,3].includes(item.taskState) || field.citeDataType !=0 ">
                                        <dd v-if="field.formSelectItemResps !=null && field.formSelectItemResps.length >0 ">
                                            <ul class="itemsWrap" >
                                                <li v-for="val in field.formSelectItemResps" :key="val.id">{{val.value}}</li>
                                            </ul>
                                        </dd>
                                        <dd class="multiple" v-if="field.formItemValue =='' ">
                                            <img src="../../assets/img/noData.png" alt="">
                                        </dd>
                                    </template>
                                </template>
                                <!-- 邮箱 -->
                                <template v-if="field.formItemType == '14'">
                                    <dt>
                                        <img src="../../assets/img/ico_email.png" alt="">
                                        <span>{{field.formItemName}}</span>
                                        <p :class="{'hasVal':field.formItemValue !=''}">
                                            {{field.formItemValue}}
                                            <template v-if="field.formItemValue =='' && [1,-1,3].includes(item.taskState)">
                                                <div class="noData">
                                                    <span>请选择</span>
                                                    <img src="../../assets/img/ico_right.png" alt="">
                                                </div>
                                            </template>
                                        </p>
                                    </dt>
                                </template>
                                <!-- 电话 -->
                                <template v-if="field.formItemType == '15'">
                                    <dt>
                                        <img src="../../assets/img/ico_phone.png" alt="">
                                        <span>{{field.formItemName}}</span>
                                        <p :class="{'hasVal':field.formItemValue !=''}">
                                            {{field.formItemValue}}
                                            <template v-if="field.formItemValue =='' && [1,-1,3].includes(item.taskState)">
                                                <div class="noData">
                                                    <span>请选择</span>
                                                    <img src="../../assets/img/ico_right.png" alt="">
                                                </div>
                                            </template>
                                        </p>
                                    </dt>
                                </template>
                                <!-- 单选列表，多选列表未完成 -->
                                <template v-if="field.formItemType == '16'">
                                    <dt>
                                        <span>{{field.formItemName}}</span>
                                        <p :class="{'hasVal':field.formItemValue !=''}">
                                            {{field.formItemValue}}
                                            <template v-if="field.formItemValue ==''  && [1,-1,3].includes(item.taskState)">
                                                <div class="noData">
                                                    <span>请选择</span>
                                                    <img src="../../assets/img/ico_right.png" alt="">
                                                </div>
                                            </template>
                                        </p>
                                    </dt>
                                </template>
                                <template v-if="field.formItemType == '17'">
                                    <dt>
                                        <span>{{field.formItemName}}</span>
                                        <p :class="{'hasVal':field.formItemValue !=''}">
                                            <template v-if="field.formItemValue =='' &&  [1,-1,3].includes(item.taskState)">
                                                <div class="noData">
                                                    <span>请选择</span>
                                                    <img src="../../assets/img/ico_right.png" alt="">
                                                </div>
                                            </template>
                                        </p>
                                    </dt>
                                    <!-- 多选列表显示样式 ===field.citeDataType != 0 为数据引用-->
                                    <template v-if="field.citeDataType == 0">
                                        <dd v-if="field.itemValArr.length >0">
                                            <ul class="itemsWrap" >
                                                <li class="vux-1px" v-for="val in field.itemValArr" :key="val">{{val}}</li>
                                            </ul>
                                        </dd>
                                        <dd class="multiple" v-if="field.itemValArr.length ==0 && ![1,-1,3].includes(item.taskState)">
                                            <img src="../../assets/img/noData.png" alt="">
                                        </dd>
                                    </template>
                                    <template v-else>
                                        <dd v-if="field.itemValArr.length >0 ">
                                            <ul class="itemsWrap" >
                                                <li class="vux-1px" v-for="val in field.itemValArr" :key="val">{{val}}</li>
                                            </ul>
                                        </dd>
                                        <dd class="multiple" v-if="field.itemValArr.length ==0 ">
                                            <img src="../../assets/img/noData.png" alt="">
                                        </dd>
                                    </template>
                                </template>
                                <!-- 整数 -->
                                <template v-if="field.formItemType == '19'">
                                    <dt>
                                        <span>{{field.formItemName}}</span>
                                        <p :class="{'hasVal':field.formItemValue !=''}">
                                            {{field.formItemValue}}
                                            <template v-if="field.formItemValue =='' && [1,-1,3].includes(item.taskState)">
                                                <div class="noData">
                                                    <span>请选择</span>
                                                    <img src="../../assets/img/ico_right.png" alt="">
                                                </div>
                                            </template>
                                        </p>
                                    </dt>
                                </template>
                                <!-- 小数 -->
                                <template v-if="field.formItemType == '20'">
                                    <dt>
                                        <span>{{field.formItemName}}</span>
                                        <p :class="{'hasVal':field.formItemValue !=''}">
                                            {{field.formItemValue}}
                                            <template v-if="field.formItemValue =='' && [1,-1,3].includes(item.taskState)">
                                                <div class="noData">
                                                    <span>请选择</span>
                                                    <img src="../../assets/img/ico_right.png" alt="">
                                                </div>
                                            </template>
                                        </p>
                                    </dt>
                                </template>
                                <!-- 百分数 -->
                                <template v-if="field.formItemType == '21'">
                                    <dt>
                                        <span>{{field.formItemName}}</span>
                                        <p :class="{'hasVal':field.formItemValue !=''}">
                                            {{field.formItemValue == '' && [1,-1,3].includes(item.taskState)?'请输入百分数(如：62.23)':field.formItemValue}}
                                            <span class="percent">%</span>
                                        </p>
                                    </dt>
                                </template>
                                <!-- 日期 -->
                                <template v-if="field.formItemType == '22'">
                                    <dt>
                                        <img src="../../assets/img/ico_date.png" alt="">
                                        <span>{{field.formItemName}}</span>
                                        <p :class="{'hasVal':field.formItemValue !=''}">
                                            {{field.formItemValue}}
                                            <template v-if="field.formItemValue ==''  && [1,-1,3].includes(item.taskState)">
                                                <div class="noData">
                                                    <span>请选择</span>
                                                    <img src="../../assets/img/ico_right.png" alt="">
                                                </div>
                                            </template>
                                        </p>
                                    </dt>
                                </template>
                                <!-- 省市区 -->
                                <template v-if="field.formItemType == '25'">
                                    <dt>
                                        <img class="ico_address" src="../../assets/img/ico_address.png" alt="">
                                        <span>{{field.formItemName}}</span>
                                        <p :class="{'hasVal':field.formItemValue !=''}">
                                            {{field.formItemValue}}
                                            <template v-if="field.formItemValue =='' && [1,-1,3].includes(item.taskState)">
                                                <div class="noData">
                                                    <span>请选择</span>
                                                    <img src="../../assets/img/ico_right.png" alt="">
                                                </div>
                                            </template>
                                        </p>
                                    </dt>
                                </template>
                                <!-- 邮编 -->
                                <template v-if="field.formItemType == '26'">
                                    <dt>
                                        <img class="ico_postcode" src="../../assets/img/ico_postcode.png" alt="">
                                        <span>{{field.formItemName}}</span>
                                        <p :class="{'hasVal':field.formItemValue !=''}">
                                            {{field.formItemValue}}
                                            <template v-if="field.formItemValue =='' && [1,-1,3].includes(item.taskState)">
                                                <div class="noData">
                                                    <span>请选择</span>
                                                    <img src="../../assets/img/ico_right.png" alt="">
                                                </div>
                                            </template>
                                        </p>
                                    </dt>
                                </template>
                                <!-- 身份证 -->
                                <template v-if="field.formItemType == '27'">
                                    <dt>
                                        <img class="ico_idcard" src="../../assets/img/ico_idcard.png" alt="">
                                        <span>{{field.formItemName}}</span>
                                        <p :class="{'hasVal':field.formItemValue !=''}">
                                            {{field.formItemValue}}
                                            <template v-if="field.formItemValue =='' && [1,-1,3].includes(item.taskState)">
                                                <div class="noData">
                                                    <span>请选择</span>
                                                    <img src="../../assets/img/ico_right.png" alt="">
                                                </div>
                                            </template>
                                        </p>
                                    </dt>
                                </template>
                                <!-- 音频 -->
                                <template v-if="field.formItemType == '28'">
                                    <dt>
                                        <img src="../../assets/img/ico_audio.png" alt="">
                                        <span>{{field.formItemName}}</span>
                                    </dt>
                                    <!-- 数据引用 -->
                                    <template v-if="field.citeDataType == 0">
                                        <dd class="addAudio" v-if="[1,-1,3].includes(item.taskState) && field.formItemValue ==''">
                                            <span>添加音频</span>
                                            <span>大文件请点击</span>
                                        </dd>
                                        <dd v-else class="audioWrap">
                                            <img class="audio" v-if="field.formItemValue != '' && field.formItemValue != null" src="../../assets/img/img_audio.png" alt="">
                                            <img v-else class="noData" src="../../assets/img/noData.png" alt="">
                                        </dd>
                                    </template>
                                    <template v-else>
                                        <dd class="audioWrap">
                                            <img class="audio" v-if="field.formItemValue != '' && field.formItemValue != null" src="../../assets/img/img_audio.png" alt="">
                                            <img v-else class="noData" src="../../assets/img/noData.png" alt="">
                                        </dd>
                                    </template>

                                </template>
                                <!-- 视频 -->
                                <template v-if="field.formItemType == '29'">
                                    <dt>
                                        <img src="../../assets/img/ico_video.png" alt="">
                                        <span>{{field.formItemName}}</span>
                                    </dt>
                                    <!-- 数据引用 -->
                                    <template v-if="field.citeDataType == 0">
                                        <dd class="addVideo" v-if="[1,-1,3].includes(item.taskState) && field.formItemValue ==''">
                                            <img src="../../assets/img/addVideo.png" alt="">
                                            <span>大文件请点击</span>
                                        </dd>
                                        <dd v-else class="audioWrap">
                                            <img v-if="field.formItemValue != '' && field.formItemValue != null" src="../../assets/img/img_video.jpg" alt="">
                                            <img v-else class="noData" src="../../assets/img/noData.png" alt="">
                                        </dd>
                                    </template>
                                    <template v-else>
                                        <dd class="audioWrap">
                                            <img v-if="field.formItemValue != '' && field.formItemValue != null" src="../../assets/img/img_video.jpg" alt="">
                                            <img v-else class="noData" src="../../assets/img/noData.png" alt="">
                                        </dd>
                                    </template>

                                </template>
                            </dl>
                        </li>
                    </ul>
                    <div class="mask-bottom"></div>
                </li>
            </ul>
            <div class="loadMore" v-show="pullUpShow">
                <load-more :show-loading="hasNextPage" :tip="hasNextPage?'正在加载':'暂无数据'"></load-more>
            </div>
            <div class="no-msg-div" v-if="stuLits.length==0">
                <img src="@/assets/img/zanwushuju.png" alt="">
                <span>暂无数据</span>
            </div>
        </div>
        <x-dialog v-model="showHideOnBlur" :dialog-style="{'max-width': '100%',width:'65%','background-color':'#fff',color:'#696969','border-radius':'6px','box-shadow': '0 0 4px #ccc'}" class="dialog-demo vux-1px" hide-on-blur>
            <p>{{statusTime}}</p>
        </x-dialog>
        <x-dialog v-model="cycleShow" :dialog-style="{'max-width': '100%',width:'90%','background-color':'#fff',color:'#696969','border-radius':'6px','box-shadow': '0 0 4px #ccc'}" class="dialog-cycle vux-1px" hide-on-blur>
            <ul>
                <li class="cycle-item" :class="{'selected': index == 0}" v-for="(cycle,index) in cycleLists" :key="index">{{cycle.startTime}} ~ {{cycle.endTime}}</li>
            </ul>
        </x-dialog>
        <!-- <showcycle v-if="cycleShow" v-bind:conData="taskCycles" v-bind:indexCycle="indexCycle" @closeSelect="closeSelect" @selectCycle="selectCycle" v-bind:jointimetype="jointimetype" v-bind:cycle="cycle" v-bind:formZt="formZt"></showcycle> -->
    </div>
</template>
<script>
import { XDialog,Cell,Group,Radio,Checklist,Loading,XTextarea,LoadMore } from "vux";
import qs from 'qs';
import Bus from '@/plugins/eventBus.js'
// import {formatDate} from '@/plugins/formatDate.js';
import BScroll from "better-scroll";
import showcycle from '@/page/tea/SelectionPeriod'
import Cookies from 'js-cookie';
export default {
    data(){
        return{
            uid:this.$route.params.uid,
            id:this.$route.params.id,
            // cycleid:this.$route.params.cycleid,
            // back:this.$route.params.back,
            formId:this.$route.params.formId,
            schooId:this.$route.params.schoolid,
            topShow:true,//顶部信息是否显示
            title:'',
            pageNo:1,
            hasNextPage:false,//是否有下一页数据
            stuLits:[],//学生列表
            statusTime:'',
            showHideOnBlur:false,//状态时间弹框是否显示
            cycleLists:[], //任务周期列表
            cycleShow:false, //任务周期是否显示
            dropDown:false, //下拉状态
            dropDownShow:false,
            pullUp:false, //上拉状态
            pullUpShow:false
        }
    },
    components:{
        XDialog,
        Cell,
        Group,
        Radio,
        Checklist,
        Loading,
        XTextarea,
        LoadMore
    },
    created(){
        this.pageNo = Cookies.get('cardPageNo') == 'undefined' ? 1 : Number(Cookies.get('cardPageNo'));
        console.log(this.pageNo,Cookies.get('cardPageNo'))
        this.getStuLists();
        // this.getCycleLists();
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        //获取学生列表
        getStuLists(){
            console.log(this.uid,this.id,this.formId,this.schooId)
            this.$vux.loading.show({
                text: '加载中...'
            });
            let pams = {
                uid:this.uid,
                schoolId :this.schooId,
                formId : this.formId,
                taskId:this.id,
                type:1,
                pageNo:this.pageNo
            }
            this.$axios.get( process.env.API_ROOT+"app/stu/v1/showStuCardTaskList",{params:pams})
            .then( res =>{
                if(res.success){
                    this.$vux.loading.hide();
                    let resData = res.data;
                    if(resData.videoCardStuListRespList.length == 0){
                        this.topShow = false;
                        return;
                    };
                    this.title = resData.videoCardStuListRespList[0].taskName;
                    if(this.pullUp || (!this.pullUp && !this.dropDown)){
                        this.stuLits = this.stuLits.concat(resData.videoCardStuListRespList);
                        this.hasNextPage = resData.hasNextPage;
                    }
                    if(this.dropDown){
                        this.stuLits = resData.videoCardStuListRespList.concat(this.stuLits);
                    }
                    if(this.stuLits.length>0){
                        this.stuLits.forEach(element => {
                            if(element.formItemResps.length == 0) return;
                            element.formItemResps.forEach(ele =>{
                                if(['5','6','17'].includes(ele.formItemType)){
                                    ele = Object.assign(ele,{
                                        itemValArr: (ele.formItemValue != '' && ele.formItemValue != null) ? ele.formItemValue.split(',') : []
                                    })
                                }
                                if(['2','8'].includes(ele.formItemType)){
                                    let bool = false;
                                    bool = ele.formItemValue.split(/\r?\n|\r/).length>3 ? false :true;
                                    this.$set(ele, 'readAll', bool)
                                }
                            })
                        });
                    }

                    this.$nextTick(() => {
                        if (!this.scroll) {
                            this.scroll = new BScroll(this.$refs.bscroll, {
                                click: true,
                                probeType: 2,
                                bounce: true,
                                bounceTime: 50
                            });
                            this.scroll.on('scroll', (pos) => {
                                // console.log(pos.y,_self.dropDown)
                                //如果下拉超过50px 就显示下拉刷新的文字
                                if(pos.y>50){
                                    this.dropDownShow = true
                                }else{
                                    this.dropDownShow = false
                                }
                            })
                            this.scroll.on('touchEnd', (pos) => {
                                if(pos.y > 50){
                                    console.log('下拉刷新！！')
                                    this.dropDownShow = false;
                                    if(this.pageNo == 1) return;
                                    this.dropDown = true;
                                    this.pageNo--;
                                    this.getStuLists();
                                    this.scroll.refresh();
                                }
                                if(this.scroll.maxScrollY>pos.y+20){
                                    console.log('上拉加载！！')
                                    this.pullUpShow = true;
                                    if(!this.hasNextPage) return;
                                    this.pullUp = true;
                                    this.pageNo++;
                                    this.getStuLists();
                                    this.scroll.refresh();
                                    this.pullUpShow = false;
                                }
                            })
                        }
                        else{
                            this.scroll.refresh();
                        }
                    })
                }
            }).catch( err =>{
                this.errorUtil(err);
            })
        },
        //获取周期列表
        getCycleLists(){
            let pams = {
                uid:this.uid,
                schoolId :this.schooId,
                taskId:this.id,
            }
            this.$axios.get( process.env.API_ROOT+"app/stu/v1/getTaskCycleState",{params:pams})
            .then( res =>{
                if(res.success){
                    this.cycleLists = res.data;
                    console.log(this.cycleLists);

                }
            }).catch( err =>{
                this.errorUtil(err);
            })
        },
        openCycle(){
            this.cycleShow = true;
        },
        //点击显示对应状态的时间
        showTime(txt){
            this.statusTime = txt;
            this.showHideOnBlur = !this.showHideOnBlur;
        },
        //跳转至学生任务详情 - 需要区分-任务状态   展示，填写
        toStuDetail(stuid,pageNo){
            setTimeout(() => {
                Bus.$emit('stuCardListsData',this.stuLits);
                 Bus.$emit('cardListMsg',{
                    pageNo:pageNo,
                    taskId: this.id,
                    formId:this.formId,
                    schoolid:this.schooId
                });
            }, 500)
            this.$router.push({path: '/stuCardDetails2/'+this.uid+'/'+this.id+'/'+stuid+'/'+this.schooId});
        },
        //批量操作学生表单
        batch(){
            // this.$router.push({path: '/stuListBatch/'+this.uid+'/'+this.id+'/'+this.formId+'/'+this.schooId})
        }
    },

}
</script>
<style lang="less">
    .stuListCard{
        .loadMore{
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 20px 0;
            text-align: center;
            background-color: transparent;
        }
        background-color: #ebebeb;
        textarea:disabled{
            background-color: #fafafa;
            color: #656565;
            height: 150px;
            overflow-y: hidden;
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
                left: 80px;
                top: 15px;
                i{
                    color: #01c269;
                    font-size: 40px;
                }
            }
            .img-3{
                position: absolute;
                right: 90px;
                top: 25px;
            }
            .img-4{
                position: absolute;
                right: 30px;
                top: 25px;
            }
            .n_title{
                width:55%;
                margin:0 auto;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }
        .bscroll{
            height: calc(~'100vh - 96px');
            overflow: hidden;
        }
        .stuLists{
            padding-top: 1px;
            .stulist-item{
                position: relative;
                margin-top: 40px;
                max-height: 820px;
                overflow: hidden;
                .stuInfo{
                    position: relative;
                    padding: 30px;
                    box-sizing: border-box;
                    height: 120px;
                    background-color: #fff;
                    box-shadow: 0 2px 16px #f3f3f3;
                    .avatar{
                        margin-right: 24px;
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        display: inline-block;
                        vertical-align: middle;
                    }
                    .name{
                        display: inline-block;
                        vertical-align: middle;
                        font-size: 30px;
                        color: #333;
                    }
                    .status{
                        position: absolute;
                        right: 30px;
                        top: 36px;
                        padding: 5px 12px 0;
                        border-radius: 20px;
                        border: 2px solid #ecebeb;
                        // font-size: 16px !important;
                        color: #cfcfcf;
                    }
                }
                .fieldLists{
                    .fieldlist-item{
                        background-color: #fff;
                        dl{
                            padding: 0 30px;
                            font-size: 30px;
                            dt{
                                position: relative;
                                padding: 27px 0;
                                color: #333;
                                p{
                                    position: absolute;
                                    right: 0;
                                    top: 30px;
                                    width: 386px;
                                    color: #c6c6c6;
                                    text-align: left;
                                    &.hasVal{
                                        text-align: right;
                                        color:#656565;
                                    }
                                    img{
                                        margin-left: 30px;
                                        height: 26px;
                                        width: 18px;
                                    }
                                    .noData{
                                        float: right;
                                    }
                                    .percent{
                                        float: right;
                                    }
                                }
                                img{
                                    height: 36px;
                                    width: 36px;
                                    &.ico_idcard{
                                        height: 27px;
                                    }
                                    &.ico_address{
                                        width: 25px;
                                    }
                                    &.ico_postcode{
                                        height: 30px;
                                    }
                                }
                                img,span{
                                    display: inline-block;
                                    vertical-align: middle;
                                }
                            }
                            dd{
                                // background-color: #fafafa;
                                color: #696969;
                                border-radius: 6px;
                                &.hasbgColor{
                                    background-color: #fafafa;
                                    p{
                                        min-height: 120px;
                                        color: #c6c6c6;
                                    }
                                }
                                &.textarea,&.multiple{
                                    text-align: center;
                                    p{
                                        text-align: left;
                                    }
                                    img{
                                        width: 230px;
                                        height: 76px;
                                    }
                                    &.readOnly{
                                        position: relative;
                                        .moreTxt{
                                            position: absolute;
                                            right: 15px;
                                            bottom: 10px;
                                            color: #1abe7f;
                                        }
                                    }
                                }
                                &.audioWrap{
                                    text-align: center;
                                    .noData{
                                        width: 230px;
                                        height: 76px;
                                    }
                                }
                                img{
                                    max-width: 100%;
                                }
                                p{
                                    padding: 30px;
                                }
                                &.addVideo{
                                    position: relative;
                                    height: 246px;
                                    img{
                                        position: absolute;
                                        left: 0;
                                        top: 0;
                                        width: 216px;
                                        height: 216px;
                                    }
                                    span{
                                        position: absolute;
                                        right: 0;
                                        bottom: 30px;
                                        padding-right: 42px;
                                        background: url('../../assets/img/ico_addMedia.png') no-repeat right center;
                                        background-size: 32px 41px;
                                        color: #c9c7c8;
                                    }
                                }
                                &.addAudio{
                                    padding: 30px;
                                    background-color: #fafafa;
                                    span:nth-child(1){
                                        color: #1abe7f;
                                    }
                                    span:nth-child(2){
                                        float: right;
                                        padding-right: 42px;
                                        background: url('../../assets/img/ico_addMedia.png') no-repeat right center;
                                        background-size: 32px 41px;
                                        color: #c9c7c8;
                                    }
                                }
                                &.imgWrapper{
                                    .img-items{
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
                                &.fieldImg{
                                    font-size: 0;
                                    // position: relative;
                                    div{
                                        display: inline-block;
                                        img{
                                            margin-right: 20px;
                                            &:nth-child(3n+3){
                                                margin-right: 0;
                                            }
                                        }
                                    }
                                    img{
                                        margin-bottom: 30px;
                                        height: 216px;
                                        width: 216px;
                                        border-radius: 6px;
                                    }
                                }
                                .weui-cells:before,.weui-cells:after{
                                    border: none;
                                }
                                .weui-cells{
                                    margin-top: 0;
                                    background-color: #fafafa;
                                    .weui-cells_radio{
                                        padding: 0 30px;
                                    }
                                    .weui-check__label:active{background-color: transparent;}
                                    .weui-cell_radio{
                                        padding-top: 0;
                                        padding-bottom: 0;
                                        padding-right: 0;
                                        p{
                                            padding: 30px 0;
                                            font-size: 30px;
                                        }
                                        .weui-cell__ft{
                                            width: 40px;
                                            height: 40px;
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
                                    &.weui-cells_checkbox{
                                        padding: 0 30px;
                                        .weui-check_label{
                                            padding: 0;
                                            p{
                                                padding: 30px 16px;
                                                font-size: 30px;
                                            }
                                            .weui-icon-checked{
                                                height: 40px;
                                                width: 40px;
                                                background: url('../../assets/img/checkbox.png') no-repeat center center;
                                                background-size: 40px 40px;
                                                &::before{
                                                    content: ''
                                                }
                                            }
                                        }
                                        .weui-check:checked + .vux-checklist-icon-checked{
                                            height: 40px;
                                            width: 40px;
                                            background: url('../../assets/img/checkbox_ed.png') no-repeat center center;
                                            background-size: 40px 40px;
                                            &::before{
                                                content: '';
                                            }
                                        }
                                    }
                                }
                                .vux-checklist-disabled{
                                    .weui-cells.weui-cells_checkbox .weui-check_label .weui-icon-checked{
                                        background: none;
                                        &::before{
                                            content: '';
                                        }
                                    }
                                    .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked{
                                        background: url('../../assets/img/checked.png') no-repeat center center !important;
                                        background-size: 35px 31px !important;
                                    }
                                }
                                // .weui-cell_radio{
                                //     padding: 0 30px;
                                // }
                                .itemsWrap{
                                    box-sizing: border-box;
                                    font-size: 0;
                                    li{
                                        margin-bottom: 30px;
                                        margin-right: 30px;
                                        display: inline-block;
                                        padding: 20px;
                                        font-size: 28px;
                                        color: #656565;
                                        border:2px solid #ccc;
                                        border-radius: 16px;
                                        // &:first-child{
                                        //     margin-left: 0;
                                        // }
                                    }
                                }
                            }
                        }

                    }
                }
                .mask-bottom{
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    height: 180px;
                    background:-webkit-linear-gradient(bottom, rgba(255,255,255,1), rgba(255,255,255,0));
                }
            }
        }
        .no-msg-div{color: #999!important;text-align: center;line-height: 64px;margin-top: 50px;text-align:center!important;}
        .no-msg-div img{width: 70px;height: 70px;display: inline-block;vertical-align: middle}
        .no-msg-div span{height: 70px;display: inline-block;vertical-align: middle;font-size:28px;}
        .dialog-demo{
            .weui-mask{
                background: transparent;
            }
            p{
                margin: 85px 0;
                font-size: 26px;
            }
        }
        .dialog-cycle{
            .cycle-item{
                padding: 30px;
                font-size: 26px;
                &.selected{
                    color: rgb(46, 209, 132);
                    background-color: #f2f2f2;
                }
            }
        }
        .drop-down{
            position: absolute;
            top:90px;
            left:0px;
            width: 100%;
            height: 50px;
            line-height:50px;
            text-align: center;
            img{width:50px;height:50px;}
        }
    }
</style>

