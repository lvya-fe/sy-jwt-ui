/**
 * Created by lgzhang08@gmail.com 20180706
 * url相关的url处理类
 */
class DoUrl {
  
  constructor() {
  
  }
  
  /**
   * 解析window.location.serch
   */
  getSearchByName(name) {
    var reg = new RegExp("[?|&]" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.href.match(reg);
    if(r != null) return(r[1].split('#')[0]);
    return null;
  }
  
  /*
   * json转成url格式
   * 中文encode
   */
  jsonUrlFormat(data={}) {
    let param = function(obj) {
      let query = ''
      let name, value, fullSubName, subName, subValue, innerObj, i
      for(name in obj) {
        value = obj[name]
        if(value instanceof Array) {
          for(i = 0; i < value.length; ++i) {
            subValue = value[i]
            fullSubName = name + '[]'
            innerObj = {}
            innerObj[fullSubName] = subValue
            query += param(innerObj) + '&'
          }
        } else if(value instanceof Object) {
          for(subName in value) {
            subValue = value[subName]
            fullSubName = name + '[' + subName + ']'
            innerObj = {}
            innerObj[fullSubName] = subValue
            query += param(innerObj) + '&'
          }
        } else if(value !== undefined && value !== null) {
          query += name + '=' + value + '&'
          // query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&'
        }
      }
      return query.length ? query.substr(0, query.length - 1) : query
    }
    // 递归将json转成url
    return data.toString() === '[object Object]' ? param(data) : data
  }
}

// 导出单例，方便直接使用
export default new DoUrl()
