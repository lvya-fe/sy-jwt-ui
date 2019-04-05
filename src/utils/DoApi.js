/*
* api 处理
*/
import Cookies from "js-cookie";

class DoApi {

  doError(err,uid) {
    if (err.data != undefined && err.data.errorCode == "ERROR") {
      this.$router.replace({path: '/error/' + uid + "/" + err.message});
    } else if (err.data != undefined && err.data.errorCode == "MISTOKEN") {
      if (localStorage.uid) {
        //保存当前url
        var httpUrl = window.location.href;

        Cookies.set('lasturl', httpUrl);
        localStorage.setItem("lasturl", httpUrl);

        this.$router.replace({path: '/start/' + localStorage.uid});
      }
      return;
    } else {
      if (err.message != "") {
        this.$vux.toast.show({type: 'warn', text: err.message});
      } else if (err.data != undefined) {
        this.$vux.toast.show({type: 'warn', text: err.data.errorDesc});
      } else {
        this.$vux.toast.show({type: 'warn', text: "未知错误"});
      }

    }
  }
}
export default new DoApi()
