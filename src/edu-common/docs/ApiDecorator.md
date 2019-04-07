[<< 返回目录 ](http://code.tfedu.net/frontend/edu-common/blob/master/README.md)

## 功能说明
- 统一用装饰器封装处理api
- 去掉重复代码
- 目前基于axios封装
- 依赖 utils/AxiosInterceptor.js和service/DoApi.js

## 使用说明

```js

// 可根据需求导入
import { get, post, url} from 'edu-common'

```

## 参数说明
- get，封装get请求，默认调用 axios.get
- post，封装get请求，默认调用 axios.post
- url, 需要传入的url路径

## 示例

```js

// get请求
@url("/exercise/statisticsSubject")
@get
getStatisticsSubject() {}


// post请求
@url("/sso/oauth2/login")
@post
login() {}

```
