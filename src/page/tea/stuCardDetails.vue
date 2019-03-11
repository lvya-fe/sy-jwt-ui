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
                <li class="fields-item" v-for="item in curFieldsLists" :key="item.order">
                    <div class="fieldsWrap" v-if="item.formItemType == 1">
                        <span>{{item.formItemName}}</span>
                        <input type="text" v-model="item.formItemValue" placeholder="请输入">
                    </div>
                    <div class="fieldsWrap txtarea" v-if="item.formItemType == 2">
                        <p class="vux-1px-b"><span>{{item.formItemName}}</span></p>
                        <x-textarea :max="200" v-model="item.formItemValue"  placeholder="请输入" :show-counter="false"></x-textarea>
                    </div>
                    <group class="fieldsDatetime hasIco" v-if="item.formItemType == 3">
                        <img src="../../assets/img/ico_datetime.png" alt="">
                        <datetime v-model="item.formItemValue" format="YYYY-MM-DD HH:mm"  @on-change="change" :title="item.formItemName"></datetime>
                    </group>
                    <div class="fieldsWrap radios" v-if="item.formItemType == 4">
                        <p class="vux-1px-b"><span>{{item.formItemName}}</span></p>
                        <group v-if="item.formSelectItemResps.length >0 ">
                            <radio :options="item.formSelectItemResps" @on-change="change"></radio>
                        </group>
                    </div>
                    <div class="fieldsWrap radios" v-if="item.formItemType == 5">
                        <p class="vux-1px-b"><span>{{item.formItemName}}</span></p>
                        <group v-if="item.formSelectItemResps.length >0 ">
                            <checklist label-position="left" :options="item.formSelectItemResps" v-model="item.itemValArr" @on-change="change"></checklist>
                        </group>
                    </div>
                    <group class="positionWrap hasIco" v-if="item.formItemType == 9">
                        <img src="../../assets/img/ico_position.png" alt="">
                        <cell :title="item.formItemName" :value="item.formItemValue"></cell>
                    </group>
                    <div class="fieldsWrap hasIco" v-if="item.formItemType == 14">
                        <img src="../../assets/img/ico_email.png" alt="">
                        <span>{{item.formItemName}}</span>
                        <input type="email" v-model="item.formItemValue" placeholder="请输入">
                    </div>
                    <div class="fieldsWrap hasIco" v-if="item.formItemType == 15">
                        <img src="../../assets/img/ico_phone.png" alt="">
                        <span>{{item.formItemName}}</span>
                        <input type="text" v-model="item.formItemValue" placeholder="请输入">
                    </div>
                    <group class="fieldsWrap selectList" v-if="item.formItemType == 16" @click.native="showCheckList(item)">
                        <cell :title="item.formItemName" ></cell>
                        <span class="ico-right">请选择</span>
                    </group>
                    <div class="fieldsWrap hasIco" v-if="item.formItemType == 26">
                        <span>{{item.formItemName}}</span>
                        <input type="text" v-model="item.formItemValue" placeholder="请输入">
                    </div>
                    <div class="fieldsWrap hasIco" v-if="item.formItemType == 27">
                        <img src="../../assets/img/ico_idcard.png" alt="">
                        <span>{{item.formItemName}}</span>
                        <input type="text" v-model="item.formItemValue" placeholder="请输入">
                    </div>
                    <div class="fieldsWrap" v-if="item.formItemType == 19">
                        <span>{{item.formItemName}}</span>
                        <input type="text" v-model="item.formItemValue" placeholder="请输入">
                    </div>
                    <div class="fieldsWrap" v-if="item.formItemType == 20">
                        <span>{{item.formItemName}}</span>
                        <input type="text" v-model="item.formItemValue" placeholder="请输入">
                    </div>
                    <div class="fieldsWrap" v-if="item.formItemType == 21">
                        <span>{{item.formItemName}}</span>
                        <input type="text" class="padr30" v-model="item.formItemValue" placeholder="请输入百分数(如：60.23)">
                        <span class="percent">%</span>
                    </div>
                    <group  class="hasIco" v-if="item.formItemType == 22">
                        <img src="../../assets/img/ico_date.png" alt="">
                        <calendar :title="item.formItemName" v-model="item.formItemValue" placeholder="请选择"></calendar>
                    </group>
                    <group  class="hasIco" v-if="item.formItemType == 25">
                        <img src="../../assets/img/ico_address.png" alt="">
                        <x-address :title="item.formItemName" v-model="item.itemValArr" :list="addressData" placeholder="请选择"></x-address>
                    </group>
                    <div class="fieldsWrap hasIco" v-if="item.formItemType == 28">
                        <template>
                            <div>
                                <img src="../../assets/img/ico_audio.png" alt="">
                                <span>{{item.formItemName}}</span>
                                <div class="addAudio vux-1px-t">
                                    <span>添加音频</span>
                                    <span>大文件请点击</span>
                                </div>
                            </div>
                        </template>
                        <template style="display:none;">
                            <div>
                                <aplayer v-if="item.valex!=null&&item.valex!=''&&item.valex!=undefined" :autoplay="null" :music="{
                                    title: '数据来源自',
                                    author: '绿芽',
                                    url: item.valex,
                                    pic: '',
                                    lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
                                    }">
                                </aplayer>
                            </div>
                        </template>
                    </div>
                    <div class="fieldsWrap hasIco" v-if="item.formItemType == 29">
                        <img src="../../assets/img/ico_video.png" alt="">
                        <span>{{item.formItemName}}</span>
                        <div class="addVideo">
                            <div class="inputFile">
                                <input type="file" name="" @change="tirggerFile($event)">
                            </div>
                            <span>大文件请点击</span>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="btnsWrap">
                <x-button type="primary" action-type="button" @click.native="submit">提交</x-button>
                <x-button type="primary" action-type="button">提交并切换学生</x-button>
                <x-button action-type="button">返回</x-button>
            </div>
            <x-dialog v-model="showHideOnBlur" :dialog-style="{'max-width': '100%',width:'80%','background-color':'#fff',color:'#696969','border-radius':'6px','box-shadow': '0 0 4px #ccc'}" class="dialog-demo vux-1px" hide-on-blur>
                <group :title="popData.formItemName" v-if="popType == 0">
                    <radio :options="popData.formSelectItemResps" v-model="popData.formItemValue" @on-change="change"></radio>
                </group>
                <div v-if="popType == 1">
                    <checklist :title="popData.formItemName"  label-position="left" :options="popData.formSelectItemResps" v-model="popData.formItemValue" @on-change="change"></checklist>
                </div>
                <flexbox>
                    <flexbox-item>
                        <x-button type="default cancel" action-type="button"  @click.native="showHideOnBlur = false">取消</x-button>
                    </flexbox-item>
                    <flexbox-item>
                        <x-button class="vux-1px-l confirm" action-type="button" type="default" @click.native="showHideOnBlur = false">确定</x-button>
                    </flexbox-item>
                </flexbox>
            </x-dialog>
        </form>
        
    </div>
</template>
<script>
import { LoadMore,Group,XDialog,Cell,XInput,XTextarea,Datetime,XAddress,ChinaAddressV4Data,Calendar,Radio,Checklist,XButton,Flexbox,FlexboxItem} from "vux";
import qs from 'qs';
import aplayer from "vue-aplayer";
// import {formatDate} from '@/plugins/formatDate.js';
// import BScroll from "better-scroll";
import showcycle from '@/page/tea/SelectionPeriod'
export default {
    data(){
        return{
            defaultUrl:process.env.API_ROOT,
            uid:this.$route.params.uid,
            id:this.$route.params.id,
            // cycleid:this.$route.params.cycleid,
            // back:this.$route.params.back,
            stuid:this.$route.params.stuid,
            schoolId:this.$route.params.schoolid,
            title:'刘同学',
            stuLits:[],//学生列表
            curFieldsLists:[],//当前学生字段合集
            addressData: ChinaAddressV4Data, //省市区组件需要
            // statusTime:'',
            showHideOnBlur:false,//选择列表，多选择列表弹框是否显示
            popType:null,//选择列表，多选择列表弹框类型   0：选择列表 1：多选择
            popData:{},//弹框显示数据

        }
    },
    components:{
        Group,
        aplayer,
        LoadMore,
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
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        getStuInfos(){
            this.$axios.get( process.env.API_ROOT+"app/stu/v1/showTeaTaskDetail",{params:{
                    uid:this.uid,
                    schoolId:Number(this.schoolId),
                    stuId:Number(this.stuid),
                    taskId:Number(this.id),
                }}
            ).then( res =>{
                // if(res.success){
                    let resData = res.data;
                    this.title = resData.stuName != undefined ? resData.stuName : '同学1';
                    this.curFieldsLists = resData.formItemResps;
                    //省市区，需要一个数组信息
                    if(this.curFieldsLists.length >0){
                        this.curFieldsLists.forEach(element => {
                            if(element.formItemType == 25){
                                element = Object.assign(element,{
                                    itemValArr: element.formItemValue != ''? element.formItemValue.split(',') : []
                                })
                            }
                        })
                    }
                // }
            }).catch( err =>{
                this.errorUtil(err);
            })
        },
        //日期时间 变更函数
        change (key,value) {
            console.log('change',key, value)
        },
        //点击显示对应状态的时间
        showCheckList(item){
            this.popType = item.formItemType == 16 ? 0 : 1;
            this.popData = item;
            // this.statusTime = txt;
            this.showHideOnBlur = !this.showHideOnBlur;
        },
        //上传视频 的方法
        tirggerFile(event){
            let file = event.target.files[0];
            let param = new FormData(); // 创建form对象
            param.append('file', file, file.name); // 通过append向form对象添加数据
            // param.append('type', '1'); // 添加form表单中其他数据
            // param.append('uid',this.uid);
            console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
            let config = {
                // headers: {'Content-Type': 'multipart/form-data'}
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
            // 添加请求头
            this.$axios.post(this.defaultUrl + 'v1/uploadFile', param,qs.stringify({'uid':this.uid}), config)
                .then(res => {
                console.log(res,"11111111111111111111111111111111")
            })
        },
        //手动关闭遮罩层x-dialog弹框
        closeMask(){

        },
        submit(){
            //app/stu/v1/addStuTaskFormList
            if(this.curFieldsLists.length == 0) return;
            let formValueJson = [];
            let formItemValues = [];
            this.curFieldsLists.forEach( ele => {
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
                // if(res.success){
                    console.log(res,"789789")
                // }
            }).catch( err =>{
                this.errorUtil(err);
            })
        }
    },
    
}
</script>
<style lang="less">
.weui-check__label:active{background-color: #fff !important;}
    .stuCardDetails{
        background-color: #ebebeb;
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
            padding:20px;
            text-align: center;
            font-size: 36px;
            color: #444;
            background-color: #fff;
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
                right: 20px;
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
                    img{
                        position: absolute;
                        left: 30px;
                        top: 36px;
                        height: 36px;
                        width: 36px;
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
                    &.positionWrap{
                        .weui-cell__ft:after{
                            right: 4px;
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
                            padding-right: 30px;
                        }
                    }
                    .weui-cell.vux-x-textarea{
                        padding-left: 0;
                        padding-right: 0;
                    }
                    &.txtarea,&.radios{
                        p{padding-bottom: 30px;}
                    }
                    &.txtarea{
                        .weui-cell:before{
                            border: none;
                        }
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
                    .addAudio{
                        margin: 30px -30px 0 -90px;
                        padding: 30px 30px 0;
                        span:nth-child(1){
                            color: #1abe7f;
                        }
                        span:nth-child(2){
                            float: right;
                            padding-right: 42px;
                            background: url('../../assets/img/ico_addMedia.jpg') no-repeat right center;
                            background-size: 40px 46px;
                            color: #c9c7c8;
                        }
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
                            color: #999;
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
                }
            }
            .btnsWrap{
                padding: 30px;
                background-color: #ebebeb;
                .weui-btn{
                    font-size: 30px;
                }
                .weui-btn_primary{
                    background-color: #1bb876;
                    color: #fff;
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
        // .stuLists{
        //     .stulist-item{
        //         margin-top: 40px;
        //         .stuInfo{
        //             position: relative;
        //             padding: 30px;
        //             box-sizing: border-box;
        //             height: 120px;
        //             background-color: #fff;
        //             .avatar{
        //                 margin-right: 24px;
        //                 width: 60px;
        //                 height: 60px;
        //                 border-radius: 50%;
        //                 display: inline-block;
        //                 vertical-align: middle;
        //             }
        //             .name{
        //                 display: inline-block;
        //                 vertical-align: middle;
        //                 font-size: 30px;
        //                 color: #333;
        //             }
        //             .status{
        //                 position: absolute;
        //                 right: 30px;
        //                 top: 45px;
        //                 display: inline-block;
        //                 height: 30px;
        //                 line-height: 30px;
        //                 padding: 4px 12px;
        //                 border-radius: 15px;
        //                 border: 1px solid #000;
        //                 font-size: 14px;
        //                 color: #cfcfcf;
        //             }
        //         }
        //         .fieldLists{
        //             .fieldlist-item{
        //                 background-color: #fff;
        //                 dl{
        //                     padding: 0 30px;
        //                     font-size: 30px;
        //                     dt{
        //                         position: relative;
        //                         padding: 27px 0;
        //                         color: #333;
        //                         p{
        //                             position: absolute;
        //                             right: 0;
        //                             top: 27px;
        //                             width: 460px;
        //                             color: #656565;
        //                             text-align: left;
        //                             &.hasVal{
        //                                 text-align: right;
        //                             }
        //                             img{
        //                                 margin-left: 30px;
        //                                 height: 26px;
        //                                 width: 18px;
        //                             }
        //                             .noData{
        //                                 float: right;
        //                             }
        //                         }
        //                         img{
        //                             height: 36px;
        //                             width: 36px;
        //                         }
        //                         img,span{
        //                             display: inline-block;
        //                             vertical-align: middle;
        //                         }
        //                     }
        //                     dd{
        //                         // background-color: #fafafa;
        //                         color: #696969;
        //                         border-radius: 6px;
        //                         img{
        //                             max-width: 100%;
        //                         }
        //                         p{
        //                             padding: 30px;
        //                         }
        //                     }
        //                 }
                        
        //             }
        //         }
        //     }
        // }
        // .dialog-demo{
        //     .weui-mask{
        //         background: transparent;
        //     }
        //     p{
        //         margin: 85px 0;
        //         font-size: 26px;
        //     }
        // }
    }
</style>

