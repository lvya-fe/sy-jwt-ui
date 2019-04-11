import { LoadMore,Loading,Group,XDialog,InlineLoading,Cell,XInput,XTextarea,Datetime,XAddress,ChinaAddressV4Data,Calendar,Radio,Checklist,XButton,Flexbox,FlexboxItem} from "vux";
import qs from 'qs';
import aplayer from "vue-aplayer";
// import {formatDate} from '@/plugins/formatDate.js';
// import BScroll from "better-scroll";
import Bus from '@/plugins/eventBus.js'
import SelectStu from '@/components/stu/select'
import SelectTea from '@/components/tea/select2'
import radioList from '@/components/common/com-radios'
import {wechatconfigInit,wechatopenimg} from '@/plugins/wechat.js';
import uploadImg  from '@/components/uploadImg'
import { mapState } from 'vuex'
import VideoPlayerCommon from "@/components/common/video/video-player-common.vue"
import FormCommon from "@/components/common/cite/cite-other/form-common.vue"
import TaskConvert from "@/utils/TaskConvert"
// import showcycle from '@/page/tea/SelectionPeriod'
import FormComsItem from '../../components/FormComsItem'
import reviewRejected from "@/components/tea/ReviewRejected";
export default {
  data(){
    return{
      uid:this.$route.params.uid,
      id:this.$route.params.id,
      // cycleid:this.$route.params.cycleid,
      // back:this.$route.params.back,
      stuid: this.$route.query.stuid || this.$route.params.stuid,
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
      //选人插件
      formShow:true,
      hasbgColor:true,
      roleType: '',
      //表单提交审核等状态
      formCommitState:'',
      isRuleApproval:false, //是否设置了规则引擎
      rejectedShow:false,//驳回弹框是否显示
    }
  },
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
    VideoPlayerCommon,
    radioList,
    FormCommon,
    SelectStu,
    SelectTea,
    FormComsItem,
    reviewRejected,
  },
  created(){
    wechatconfigInit(this,qs,this.uid,this._url_);
    this.getStuInfos();
  },
  computed: mapState({
    _url_: state => state.animation._url_

  }),
  methods: {
    goback() {
        this.$router.go(-1);
    },
    //获取学生表单信息
    async getStuInfos() {
      this.$vux.loading.show({
        text: '加载中...'
      });

      // 学生数据
      let params = {
        uid: this.uid,
        taskid: Number(this.id),
        stime: '',
        etime: ''
      }
      let resData = {}
      // 角色判断
      if(this.$route.query.roleType) Cookies.set('roleType', this.$route.query.roleType)
      try{
        if (Cookies.get('roleType') === 'tea') {
          // teaTaskView taskView
          this.roleType = 'tea'

          // /app/tea/task/16547/view

          if (this.$route.query.stuid) { // 教师帮学生填写
            params.stuId = this.$route.query.stuid
            resData = await this.$axios.post(process.env.API_ROOT + 'app/tea/task/taskView', qs.stringify(params))
          }
          else if( this.$route.query.teaDoType) { // 教师负责人
            
            resData = await this.$axios.post(process.env.API_ROOT + 'app/tea/task/' + this.$route.params.stuid+"/view", qs.stringify(params))
            this.formCommitState = resData.data.info.state;
          } else {
            resData = await this.$axios.post(process.env.API_ROOT + 'app/tea/task/teaTaskView', qs.stringify(params))
          }
        } else {
          this.roleType = 'stu'
          resData = await this.$axios.post(process.env.API_ROOT + 'app/stu/v1/taskview', qs.stringify(params))
        }
      } catch (err) {
        this.errorUtil(err);
      }
      this.$vux.loading.hide()
      if (resData.success) {
        this.isRuleApproval = resData.data.isRuleApproval;
        resData = TaskConvert.doTaskData(resData.data)
      }

      this.title = resData.name;
      this.formState = resData.taskState;
      this.curFieldsLists = resData.formItemResps;
      // 省市区，需要一个数组信息
      if(this.curFieldsLists.length >0){
        this.curFieldsLists.forEach(element => {
          if(['2','8'].includes(element.formItemType)){
            let bool = false;
            bool = element.formItemValue.split(/\r?\n|\r/).length>3 ? false :true;
            this.$set(element, 'readAll', bool);
            this.$set(element, 'showBtn', bool);
            this.$set(element, 'btntxt', '全文');
          }
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
            element.formSelectItemResps = element.formSelectItemResps == null ? [] : element.formSelectItemResps;
          }
        })
      }
      this.$previewRefresh();
    },
    //审核通过
    pass() {
      // isRuleApproval 是否设置有规则引擎
      if (this.isRuleApproval) {
        this.$router.push({
          path: '/InputNutrients/' + this.uid + '/' + this.info.id
        });
      } else {
        this.$axios.post(process.env.API_ROOT + "app/tea/task/" + this.id + "/dispass",
          qs.stringify({
            uid: this.uid
          })
        ).then( res=> {
          this.$vux.toast.show({
            type: 'success',
            text: "成功"
          });

          this.$router.go(-1);

        }).catch( err => {
          this.errorUtil(err);
        })
      }

    },
    //驳回
    addRejected(msg) {
      console.log("1111222222222222")
      this.$axios.post(process.env.API_ROOT + "app/tea/task/" + this.$route.params.id + "/decline",
        qs.stringify({
          uid: this.$route.params.uid,
          text: msg
        })
      ).then((res)=> {
        this.$vux.toast.show({
          type: 'success',
          text: "成功"
        });
        this.rejectedShow = false;
        this.$router.go(-1);

      }).catch( err => {
        this.errorUtil(err);
      })
    },
    closeSelect(){
      this.rejectedShow = false;
    },
    //获取学生填写记录
    getHistoryList() {
      this.$axios.get(process.env.API_ROOT + "app/stu/v1/getStuToStuTaskSubmitHistory", {
          params: {
            uid: this.uid,
            schoolId: Number(this.schoolId),
            stuId: Number(this.stuid),
            taskId: Number(this.id),
          }
        }
      ).then(res => {
        if (res.success) {
          this.historyList = res.data;
          console.log(this.historyList);
        }
      }).catch(err => {
        this.errorUtil(err);
      })
    },
    //选择列表，多选择列表点击确定使用
    checkListCommit() {
      if (this.popData.formItemType == '17' && this.popData.itemValArr.length > 0) {
        this.popData.formItemValue = this.popData.itemValArr.join(',');
      }
      this.curFieldsLists[this.curIndex] = this.popData;
      this.showHideOnBlur = false;
    },
    //多行文本  查看全文
    readAll(index){
      this.$nextTick(()=>{
        this.curFieldsLists[index].readAll = !this.curFieldsLists[index].readAll;
        this.curFieldsLists[index].btntxt = this.curFieldsLists[index].btntxt == '全文' ? '收起':'全文';
      })
    },
    change(value) {
      console.log('change', value)
    },
    //单选更改事件
    changeRadio(val, index) {
      this.curFieldsLists[index].formItemValue = val;
    },
    //多项选择选择值
    checkListChange(value, index) {
      this.curFieldsLists[index].formItemValue = value.length > 0 ? value.join(',') : '';
    },
    //省市区
    changeAddress(ids, names) {
      this.tempAddress = names;
    },
    addressShow(index) {
      this.curIndex = index;
    },
    addressHide() {
      this.curFieldsLists[this.curIndex].formItemValue = this.tempAddress.length > 0 ? this.tempAddress.join(',') : '';
    },
    //点击显示对应状态的时间
    /**
     * {item}字段数据 {index}当前索引 {state}字段状态 {type}是否引用字段
     */
    showCheckList(item, index, state, type) {
      if (![1, 3].includes(state) || type != 0) return;
      this.popType = item.formItemType == 16 ? 0 : 1;
      this.popData = Object.assign({}, item);
      this.curIndex = index;
      this.showHideOnBlur = !this.showHideOnBlur;
    },
    //获取视频地址----------
    obtainVideo(index) {
      var _self = this;
      this.$axios.get(process.env.API_ROOT + "oss/2/get/code/" + _self.authorizationCode,
        qs.stringify({})
      ).then(function (res) {
        if (res.isSuccess) {
          console.log(res, '获取视频')
          if (res.data.path != 'ok') {
            _self.playerOptions.sources[0].src = res.data.path
            // _self.itmes.forEach(function(el){
            //     if(el.id==_self.propId){
            //         el.val=res.data.path;
            //     }
            // })
            _self.curFieldsLists[index].formItemValue = res.data.path;
            _self.upDataShow = false;
          } else {
            _self.$vux.toast.show({type: 'warn', text: '暂无文件'});
          }
        }
      }).catch(function (err) {
        _self.errorUtil(err);
      })
    },
    uploadVideo(id, e, type, index) {
      //e.target.value文件名
      try {
        this.curIndex = index;
        var file = e.target.files[0];
        var formdata = new FormData();
        formdata.append('file', file);
        this.ossconfig(id, formdata, type);
      } catch (e) {
        this.$vux.loading.hide();
        this.$vux.toast.show({type: 'warn', text: '当前设备不支持,请在电脑端上传'});
      }
    },
    ossconfig(id, formdata, type) {
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

          _self.doUpload(id, formdata, type, res.data.domain, res.data.url);

        }
      });
    },
    doUpload(id, formdata, type, domain, url) {
      this.$axios.post(url, formdata, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: (progressEvent) => {
          // 对原生进度事件的处理
          if (progressEvent.lengthComputable) {
            this.percent = parseInt(progressEvent.loaded / progressEvent.total * 100) + '%';
            this.toastShow = true;
          }
        }
      }).then(res => {
        this.toastShow = false;
        console.log(res);
        if (res.code == '200') {
          if (type == "mp4") {//视频
            this.playerOptions.sources[0].src = domain + res.url
          }
          this.curFieldsLists[this.curIndex].formItemValue = domain + res.url;
          this.upDataShow = false;

        } else {
          this.$vux.toast.show({type: 'warn', text: '暂无文件'});
        }

      }).catch(err => {
        console.log(err);
      })
    },
    //播放视频
    playMP4(index) {
      this.playerOptions.sources[0].src = this.curFieldsLists[index].formItemValue;
      this.videoPropShow = true;
    },
    //音视频大文件上传
    changeFile(val, index) {
      if (val != "" && val != undefined) {
        var _self = this;
        this.playerOptions.sources[0].src = val[0];
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
      this.si = 2;
      this.btnGc = true;
      var time = window.setInterval(() => {
        if (this.si === 0) {
          this.si = 0;
          this.btnGc = false;
          window.clearInterval(time)
        } else {
          this.si -= 1;
        }
      }, 1000)
    },
    //上传视频弹窗
    upDataVideo(id, cad, index) {
      this.upDataShow = true;
      this.propId = id;
      this.propsta = cad;
      if (index != -1) {
        this.curIndex = index;
      }

      if (this.si == 0) {
        this.$axios.get(process.env.API_ROOT + "oss/2/" + cad + "/get/code",
          qs.stringify({})
        ).then((res) => {
          if (res.isSuccess) {
            console.log(res, '验证码');
            this.authorizationCode = res.data.code
            this.upDataUrl = 'http://' + window.location.host + '/t/#/views/tea/upVideo/' + this.propsta + '/' + this.authorizationCode
            this.countdown();

            this.inlineDescList = [];

            res.data.list.forEach(v => {
              var obj = {};
              obj.key = v.url;
              obj.value = v.url;
              obj.inlineDesc = "上传于:" + v.time;
              this.inlineDescList.push(obj);
            });
          } else {
            this.$vux.toast.show({type: 'warn', text: res.errorDesc});
          }
        }).catch(function (err) {
          this.errorUtil(err);
        })
      }
    },
    //获取地理位置 --1
    getMap() {
      var self_ = this;
      this.$wechat.ready(function () {
        self_.$wechat.getLocation({
          success: function (res) {
            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            self_.addressDetail(latitude, longitude);

          },
          cancel: function (res) {
            alert('用户拒绝授权获取地理位置');
          }
        });
      });
    },
    //--2
    addressDetail(lat, lng) {
      var self = this;
      var geolocation = new BMap.Geolocation();
      var myGeo = new BMap.Geocoder();
      myGeo.getLocation(new BMap.Point(lng, lat), function (result) {
        if (result) {
          self.geographic = result.address
        }
      })
    },
    verifyField(val, type) {
      if (val == '') return;
      switch (type) {
        case '26': //邮编
          if (!/^[1-9]\d{5}(?!\d)$/.test(val)) {
            this.$vux.toast.show({type: 'warn', text: '邮编填写不正确'});
          }
          break;
        case '14': //邮箱
          if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(val)) {
            this.$vux.toast.show({type: 'warn', text: '邮箱填写不正确'});
          }
          break;
        case '27': //身份证
          if (!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(val)) {
            this.$vux.toast.show({type: 'warn', text: '身份证填写不正确'});
          }
          break;
        case '15': //电话
          if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(val)) {
            this.$vux.toast.show({type: 'warn', text: '电话填写不正确'});
          }
          break;
      }
    },
    //小数，百分数  校验小数点后最多两位
    verifyFix(val, index) {
      if (val.indexOf('.') == -1) return;
      if (val.split('.')[1].length > 2) {
        this.curFieldsLists[index].formItemValue = val.substring(0, val.indexOf(".") + 3);
      }
    },
    //选人插件-相关方法
    selectionPlugin(id,type,index){
      this.xr=id
      if(type==1){
        this.type=3
      }else if(type==2){
        this.type=1
      }else if(type==3){
        this.type=2
      }
      this.tsshow= true;
      this.formShow = false;
      this.hasbgColor = false;
      this.curIndex = index;
    },
    qx(){
      this.tsshow = false;
      this.formShow = true;
      this.hasbgColor = true;
    },
    qd(obj){
      if(obj.length == 0) return;
      this.curFieldsLists[this.curIndex].formSelectItemResps = [];
      let pids = [];
      obj.forEach( (a) => {
        this.curFieldsLists[this.curIndex].formSelectItemResps.push({
          'id': a.id,
          'value': a.name
        });
        pids.push(a.id);
      })
      this.curFieldsLists[this.curIndex].formItemValue = pids.join(',');
      this.formShow = true;
      this.hasbgColor = true;
      this.tsshow = false;
    },

    deleteVideo(index) {
      this.curFieldsLists[index].formItemValue = ''
    }
  }
}
