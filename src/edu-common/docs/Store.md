[<< 返回目录 ](http://code.tfedu.net/frontend/edu-common/blob/master/README.md)

## 功能说明
- 统一web端和手机端的 数据缓存
- 去掉重复代码
- 目前基于store.js封装

## 使用说明

> web端使用说明
- web端的特殊情况，需要兼容360的兼容模式，页localStorage和sessionStorage在双模式中不共享，但cookie能共享
- web端除了cookie中数据需要保存一段时间，其余数据应该都是临时性的，用sessionStorage即可，尽量不要用localStorage

```js
// 在index.js或main.js中统一导入，暴露成全局的方便共享使用
import { Store } from 'edu-common'
// 默认用sessionStorage
window.store = Store.sessionStore  // store是小写，兼容store.js的用法
window.Cookies = Store.cookieStore 

// 如果非要使用localStorage,请使用，不建议使用
window.localStore= Store.localStore 
```


> 手机端使用说明
- 手机端缓存数据应该都是临时性的，用sessionStorage即可，
- 需要长期缓存时用localStorage

```js
// 在index.js或main.js中统一导入，暴露成全局的方便共享使用
import { Store } from 'edu-common'
// 默认用sessionStorage
window.store = Store.sessionStore
window.localStore= Store.localStore 
```

## 参数说明
- Store.sessionStore，基于store.js封装sessionStorage
- Store.localStore，基于store.js封装localStorage
- Store.cookieStore, 基于store.js封装cookie

## 示例

```js

// Store current user
store.set('user', { name:'Marcus' })

// Get current user
store.get('user')

// Remove current user
store.remove('user')

// Clear all keys
store.clearAll()

// Loop over all stored values
store.each(function(value, key) {
	console.log(key, '==', value)
})

更多示例参考： https://github.com/marcuswestin/store.js

```
