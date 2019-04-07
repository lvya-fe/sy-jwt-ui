import axiosOrigin from 'axios'
// import { Loading } from 'element-ui'
// 服务端不需loading
const Loading = require("element-ui").Loading

let loadingInstance = ''
let loadingCount = 0

let resetLoading = function() {
  loadingInstance && loadingInstance.close();
  loadingInstance = ''
  loadingCount = 0
}


const JSONbig = require('json-bigint-string');

var config = {}
if (process.server) { //ssr
  // 默认 当前 前端域名
  if(process.env.isLocal) { // 研发环境从本地服务代理，如：localhost:1818
    config.baseURL = `http://${process.env.HOST || '0.0.0.0'}:${process.env.NUXT_PORT || 3030}`
  } else { // 线上环境从统一从前端前端入口域名走, 80端口
    config.baseURL = `http://${process.env.HOST || '0.0.0.0'}`
  }

  console.log("config.baseURL:", config.baseURL, process.env.HOST, process.env.isLocal)
  
} else {
  config.baseURL = window.GateWayServer?window.GateWayServer.replace('/api', ''):''
  console.log("config.baseURL:", config.baseURL)
}

var axios = axiosOrigin.create(config)

axios.defaults.headers.get['Content-Type']='application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type']='application/json';

axios.interceptors.request.use(function(config) {
  // 在发送请求之前做某事
  // 增加api标识
  config.url = "/api" + config.url
  try {
    loadingInstance = Loading.service({});
    loadingCount++
  } catch(err) {
    resetLoading()
  }
  
  // 导出excel处理
  if(/exportExcelAward.json/.test(config.url)) {
    try {
      window.open(config.url)
      return false
    } catch(err) {
    }
  }
  
  // 活动类型添加 activityCategoryId
  // ToDo 临时在intro界面将activityCategoryId存在sessionStorage中，应该是url传入
  if(/activity/.test(config.url) || /vacation-analyze/.test(config.url)) {
    try {
      config.url = config.url + "&activityCategoryId=" + (sessionStorage.ActivityCategoryId?sessionStorage.ActivityCategoryId:1)
    } catch(err) {
    }
  }

  return config;
}, function(error) {
  return Promise.reject(error);
});

axios.defaults.transformResponse =  [function (data) {
  // Do whatever you want to transform the data
  return JSONbig.parse(data);
}]


axios.interceptors.response.use(async function(response) {
  // loading处理
  try {
    loadingCount--
    if (loadingCount <= 0) loadingInstance.close();
    setTimeout(function () {
      resetLoading()
    }, 5000)
  } catch(err) {
    resetLoading()
  }

  // Do something with response data
  if(response && process.server && response.config) { // 服务端打印日志
    console.log("=====================seperate line=====================")
    console.log("axios from server url:", response.config.url)
  }
  // 非接口类 请求，直接返回
  if(!response) response = ''
  if(!response || !response.data || !response.data.code) return response;


  let data = response.data.data || '';
  let code = response.data.code;

  // token超时需要重新刷新token, 600测试用
  // token超时直接退出
  if(code == 301) {
    try {
      if(!!Cookies) Cookies.clearAll()
      if(window) window.location.href = "/"
    } catch(error) {
      console.log(response,error)
    }
    // if(!!Cookies) {
    //   axios.get(serverUrl+"/sso/oauth2/refresh?accessToken=" + Cookies.get("accessToken") + "&refreshToken=" +  Cookies.get("refreshToken")).then(function(res){
    //     console.log("res:", res)

    //     axios.get(response.config.url).then((resData) => {
    //       //更新token
    //     })
    //   })
    // }
  }

  if(code == 'OK' || code == 200) {
    if(process.server) { // 服务端打印日志
      console.log("response:", JSON.stringify(data))
    }
    if(data == undefined) return '';
    return data;
  } else {
    console.log('axios加载失败:', response.data);
  }
  return response;
}, function(error) {
  // Do something with response error
  try {
    resetLoading()
    return Promise.reject(error);
  } catch(err) {}
});

export default axios
