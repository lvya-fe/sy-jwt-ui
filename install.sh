#!/bin/bash

npm install --registry https://registry.npm.taobao.org

cp -rf ./webconfig/webconfig_example.js  ./webconfig/webconfig.js
git submodule update --init --recursive
git submodule foreach git pull origin master

read -p "安装成功，输入任意键关闭" var
