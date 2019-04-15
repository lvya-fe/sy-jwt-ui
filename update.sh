#!/bin/bash
read -p "请输入提交内容说明：" commitInfo

cd src/edu-common
git checkout master
git add --all
git commit -m "$commitInfo"
git pull
git push origin master

cd ../../
git add --all
git commit -m "$commitInfo"
git pull
git submodule update --init --recursive
git submodule foreach git pull origin master
git push origin test

read -p "提交成功，输入任意键关闭" var
