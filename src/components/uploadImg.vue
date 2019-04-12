<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="weui-cells weui-cells_form addClass">
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <div class="weui-uploader">
          <div class="weui-uploader__hd">
            <!-- <p class="weui-uploader__title">图片上传（可连续发送{{count}}张）</p> -->
            <!-- <div class="weui-uploader__info">{{imgList.length}}</div> -->
          </div>
          <div class="weui-uploader__bd" style="overflow:visible;">
            <ul class="weui-uploader__files" id="imgadd">
                <li v-for="(img,index) in imgList" class="weui-uploader__file imgs"  :key="index" :style="{backgroundImage: 'url(' + img + ')'}"  ><div></div><span class="delete_photo" @click="del(index)">_</span></li>
            </ul>
            <div class="weui-uploader__input-box">
              <input id="uploaderInput" class="weui-uploader__input"   @click="chooseImage" type="button">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs';

export default {
    name: 'uploadImg',
    data () {
      return {
          imgList:[],
      }
    },

    filters: {
      pic(pic) {
        return ""+pic;
      }
    },
    props:['imgs','uid','count'],
    created(){
      if(this.imgs!=null&&this.imgs.length>1) {
        var c=[]
        this.imgs.split(",").forEach(function(img) {
          c.push(img);
        });
        this.imgList=c
      }
    },
  watch: {//深度 watcher
    'imgList': {
      handler: function (val, oldVal) {
          var this_ = this;
          var imgs ="";
          this_.imgList.forEach(function(img) {
            imgs = img+","+imgs;
          });

          if(imgs.length>1){
              imgs=imgs.substring(0,imgs.length-1);
          }
          this.$emit('update:imgs', imgs);
      },
      deep: true
    }
  },
    methods: {
      del: function (index) {
        // this.imgList.pop(img);
        this.imgList.splice(index,1); 
      },
      chooseImage: function() {
        var  self_ = this;
        this.$wechat.chooseImage({
          count: 9, // 默认9
          // sizeType: ['compressed'],// 可以指定是原图还是压缩图，默认二者都有
          success: function (res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            self_.upload(localIds, 0);
          },
          cancel: function () {

          },
          fail: function (res) {
            alert("微信上传发生错误,请刷新页面重试");
          }
        });

      },
      upload(localIds, index){
        if (this.imgList.length >= this.count) {
            this.$vux.toast.show({type: 'cancel',text:"最多上传"+this.count+"张照片"})
            return;
        }
        this.$vux.loading.show({
          text: "上传第" + (index + 1) + "张图片"
        })


        var  self_ = this;
        self_.$wechat.uploadImage({
          localId: localIds[index], // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 0, // 默认为1，显示进度提示
          success: function (res) {
            var serverId = res.serverId; // 返回图片的服务器端ID
            self_.$axios.post( process.env.API_ROOT+"common/byimg",

              qs.stringify({
                media_id:serverId,
                uid:self_.uid
              })
            ).then(function(result){
                self_.$vux.loading.hide();
                var img = result.data.replace(/<[^>]+>/g, "").replace(/(^\s*)|(\s*$)/g, "");
                //img = result.message;
                //"!abc";
                self_.imgList.push(img);

                if (localIds.length > (index + 1)) {
                  self_.upload(localIds, index + 1);
                }else{
                  self_.$vux.loading.hide()
                }
            }).catch(function(err){
                 self_.$vux.loading.hide()
                 self_.$vux.toast.show({type: 'warn',text:err.message})
            })
          },
          error: function (XMLHttpRequest, textStatus,
                               errorThrown) {
                  self_.$vux.loading.hide()
          }
        });
      }
    }
}
</script>


<style>

  .delete_photo{display:block;position:absolute;width:25px;height:25px;border-radius:50%;background:#00ba0a;color:#fff;font-weight:bold;text-align:center;line-height:12px;top:-10px;right:-6px;font-size:17px;}

  .weui-uploader__file{position:relative;}
  .weui-uploader__file div{position:absolute;top:0;background-size:cover;width:100%;height:100%;}
  .weui-uploader__file a{z-index:1}
  .addClass{margin:0 30px 0 30px!important;}
  .addClass > .weui-cell{padding-left:0!important;padding-right:0!important;}
  .addClass:before,.addClass:after{content:none!important;}
  .addP{font-size:28px;color:#444;}
  .weui-uploader__input-box{background-color: rgb(242,242,242)}
  .imgs,.weui-uploader__input-box{border-radius: 3px;/*no*/width:213px;height:213px;}
  .delete_photo{top: 0;right: 0;}

</style>
<style scoped>

</style>

