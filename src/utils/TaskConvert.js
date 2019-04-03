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
        order: index,
        formSelectItemResps: formSelectItemResps, //多项选择
      })
    })
    return newData
  }
}

export default new TaskConvert()
