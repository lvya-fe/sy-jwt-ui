# edu-common

> 通用工具和数据处理方法类


## 安装使用
```$shell

  yarn add edu-common

```


## 使用说明
- api装饰器  [ApiDecorator 点击查看](docs/ApiDecorator.md)
- 缓存数据   [Store 点击查看](docs/Store.md)
- 共享css [less 点击查看](docs/share-css.md)
- 公用api [api 点击查看](docs/api.md)


## 代码目录 说明
- |——docs 说明文档
- |——src 组件代码目录
  - |——api     api文件
  - |——coms-m    公司级 移动端 通用组件
  - |——const     常量文件
	- |——utils     通用工具类文件夹
	- |——service   通用服务类
	- |——css       公用css文件


## 开发说明和规范

- 提取多个项目中，通用的方法、类等
- 与框架无关，至少可以在react和vue中的项目使用



## 编辑项目

- 以子项目的方式引入到项目中
- 可以在src中clone项目，需要在.gitignore中添加对edu-common的忽略提交，具有请看react-cli项目中的使用方式


## 发布项目
- 更改package.json的版本号
- 执行npm login
- 执行npm publish

## LICENSE
MIT
