/*
* 任务数据转换
*/
class TaskConvert {

  // 处理新旧数据
  doTaskData(data) {
    let newData = {
      name: data.task.title,
      taskState: data.task.status,
      formItemResps: [] // 表单
    }

    data.itmes.forEach((item,index)=>{
      // 引用数据
      let citeData = []
      if(!item.listCiteData || item.listCiteData.length == 0){
        citeData = [item.val]
      } else {
        item.listCiteData.forEach((cite)=>{
          citeData.push(cite.val)
        })
      }
      // 多项选择
      let formSelectItemResps = []
      if(item.formSelectItems.length > 0) {
        item.formSelectItems.forEach((item)=>{
          formSelectItemResps.push({
            id: item.id,
            key: item.name,
            value: item.val
          })
        })
      }

      newData.formItemResps.push({
        choiceLimitType: null,
        choiceType: null,
        citeDataType: item.citeDataType,
        formItemDbName: '',
        formItemId: item.id,
        formItemName: item.name,
        formItemNotNull: "N",
        formItemType: item.type,
        formItemValue: citeData.toString(),
        formItemValueId: null,
        formSelectItemResps: null,
        ctime: item.ctime,
        listCiteData: item.listCiteData,
        order: index,
        dbItemName: item.dbItemName,
        formSelectItemResps: formSelectItemResps, //多项选择
      })
    })
    return newData
  }
  // 处理提交数据
  covertResult(data) {
    let obj = {}
    data.forEach(function (el) {
      var vKey = el.dbItemName
      if (el.type == 22) {
        if (el.formItemValue == null || el.formItemValue == '') {
          obj[vKey] = null
        } else if (el.formItemValue.length <= 10) {
          obj[vKey] = el.formItemValue + ' 00:00:00'
        } else if (el.formItemValue.length > 10) {
          obj[vKey] = el.formItemValue
        }
      } else if (el.type == 3) {
        if (el.formItemValue == null || el.formItemValue == '') {
          obj[vKey] = null
        } else if (el.formItemValue.length <= 16) {
          obj[vKey] = el.formItemValue + ':00'
        } else if (el.formItemValue.length > 16) {
          obj[vKey] = el.formItemValue
        }
      } else if (el.type == 5 || el.type == 17 || el.type == 25) {
        obj[vKey] = el.formItemValue.join(',')

      } else if (el.type == 9) {
        // obj[vKey] = _self.geographic
        obj[vKey] = ''
      } else {
        obj[vKey] = el.formItemValue
      }
    })
    return obj
  }
}

export default new TaskConvert()
