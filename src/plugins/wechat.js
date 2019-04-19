/**
 * Created by duanhong on 2018/1/9.
 */
import Cookies from 'js-cookie';

export function wechatconfigInit(self_,qs,cropId,httpUrl) {

  var jsApiList = ['previewImage'];
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

   // alert(httpUrl+"-"+window.location.href);

 if (!isiOS) {
    httpUrl = window.location.href;
 }else { // IOS仅可使用第一次进入应用的URL来签名
     if (httpUrl == undefined || httpUrl == "") {
         httpUrl = window.location.href;
      //   httpUrl = Cookies.get('iosurl');
     }
   //  alert(httpUrl);
 }

  //延迟 提高页面初始化加载速度 异步签名处理
  setTimeout(()=>{
    httpUrl = window.location.href
    console.log("httpUrl", httpUrl, cropId)
    self_.$axios.post( process.env.API_ROOT+"getWeixinSign",
      qs.stringify({
        uid:cropId,
        url:httpUrl
      })
    ).then(function(result){

      console.log("sign result:", result)

      self_.$wechat.config({
        beta: true,
        debug: false,
        appId: result.appId,
        timestamp: result.timestamp,
        nonceStr: result.nonceStr,
        signature: result.signature,
        jsApiList: [
          'checkJsApi',
          'chooseImage',
          'uploadImage',
          'getLocation',
          'uploadVoice'
        ]
      });
    }).catch(function(err){
      self_.$vux.toast.show({type: 'warn',text:err.message})
    })
  }, 1000)
};

export function wechatopenimg(self_,adess,imgs) {
  var arrayObj = new Array();
  imgs.forEach(function(img) {
    arrayObj.push("http://img2.lvya.org/upImg" + img + "!ex");
  });
  self_.$wechat.previewImage({
    current: "http://img2.lvya.org/upImg" + adess + "!ex", // 当前显示图片的http链接
    urls: arrayObj // 需要预览的图片http链接列表
  });
};

