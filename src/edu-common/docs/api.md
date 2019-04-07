[<< 返回目录 ](http://code.tfedu.net/frontend/edu-common/blob/master/README.md)

## 功能说明
- 通用api
- 与后端微服务对应


## 包括内容
- Wisdom 智慧教育 通用接口服务
- Course 课程服务
- Navigation 目录导航服务
- Prepare 备课夹服务
- Share 共享服务
- 不断积累丰富中，如果单个api内容过多，可以建立文件夹管理

## 使用说明

- 可以用多种使用方式

1 按需引入

```

  在需要引用api的地方，引入 
  如引入 备课服务 Prepare
  import Prepare from 'edu-common/src/api/Prepare'
  
  使用时： Prepare.xxx
  
```


2 vue可以全局引入

```

  在main.js中引入 如引入 备课服务 Prepare
  import Prepare from 'edu-common/src/api/Prepare'
  Vue.prototye.Prepare = Prepare
  
  使用时：this.Prepare.xxx
  
```

3 以子模块的方式引入，方便更新和修改

```

  添加edu-common为项目子模块，添加到src中
  git submodule add http://code.tfedu.net/frontend/edu-common.git src/edu-common
  
  如引入 备课服务 Prepare
  import Prepare from '@/edu-common/src/api/Prepare'
    
  使用时： Prepare.xxx
  
```
