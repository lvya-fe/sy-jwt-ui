/**
 * 数据处理
 */
class DoArray {

  constructor() {

  }

  /**
   * 查看对象数组中的属性，返回index
   * @param list [] 源对象数据
   * @param value string 要判断相等的值
   * @param type string 要判断相等的属性值
   * return 查到返回index,否则返回-1
   */
  searchArrayIndex(list, value, type) {
    let searchIndex = -1
    if(!list || !list.length) return searchIndex
    list.forEach((item, index) => {
      if(item[type] == value) searchIndex = index
    })
    return searchIndex
  }
  
  /**
   * 查看对象数组中的属性，返回index，两个属性的比对
   * @param list [] 源对象数据
   * @param value string 要判断相等的值
   * @param type string 要判断相等的属性值
   * return 查到返回index,否则返回-1
   */
  searchArrayIndexTwo(list, value, type, value2, type2) {
    let searchIndex = -1
    if(!list || !list.length) return searchIndex
    list.forEach((item, index) => {
      if(item[type] == value && item[type2] == value2) searchIndex = index
    })
    return searchIndex
  }


  /**
   * 查看对象数组中的属性，返回 value数组
   * @param list [] 源对象数据
   * @param value string 要判断相等的值
   * @param type string 要判断相等的属性值
   * return 查到返回value数组
   */
  doArrayValue(list, type) {
    let tmp = []
    list.forEach((item) => {
      tmp.push(item[type])
    })
    return tmp
  }
}

// 导出单例，方便直接使用
export default new DoArray()
