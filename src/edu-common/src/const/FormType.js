/**
 * 表单类型 type
 *
 *
 1 单行input 2 多行textarea 3 日期时间 4 单项选择 5 多项选择 6 图片上传 7 平分 8 描述文本 9 地理位置 10 选人插件,
 11 显示项 12 学生信息 13 系统信息 14 邮箱 15 电话 16选择列表 17 多选列表 18自动编号
 19 整数 20 小数 21 百分数 22 日期 23 公式 24 引用 25 省市区 26 邮编 27 身份证 28 音频 29 视频

 结构说明

 */
class FormType {
  constructor(){
    const list = {
      1: {
        name: '单行input',
        type: 'input'
      },
      2: {
        name: '多行textarea',
        type: 'textarea'
      },
      3: {
        name: '日期时间',
        type: 'datetime'
      },
      4: {
        name: '单项选择',
        type: 'radio'
      },
      5: {
        name: '多项选择',
        type: 'checkbox'
      },
      6: {
        name: '图片上传',
        type: 'imgUpload'
      },
      7: {
        name: '评分',
        type: 'rate'
      },
      8: {
        name: '描述文本',
        type: 'desText'
      },
      9: {
        name: '地理位置',
        type: 'position'
      },
      10: {
        name: '选人插件',
        type: 'selectMember'
      },
      11: {
        name: '显示项',
        type: 'show'
      },
      12: {
        name: '学生信息',
        type: 'stuInfo'
      },
      13: {
        name: '系统信息',
        type: 'sysInfo'
      },
      14: {
        name: '邮箱',
        type: 'email'
      },
      15: {
        name: '电话',
        type: 'phone'
      },
      16: {
        name: '选择列表',
        type: 'selectList'
      },
      17: {
        name: '多选列表',
        type: 'multiList'
      },
      18: {
        name: '自动编号',
        type: 'autoList'
      },
      19: {
        name: '整数',
        type: 'int'
      },
      20: {
        name: '小数',
        type: 'decimal'
      },
      21: {
        name: '百分数',
        type: 'percent'
      },
      22: {
        name: '日期',
        type: 'date'
      },
      23: {
        name: '公式',
        type: 'formula'
      },
      24: {
        name: '引用',
        type: 'quote'
      },
      25: {
        name: '省市区',
        type: 'PCD' // province city district
      },
      26: {
        name: '邮编',
        type: 'postCode'
      },
      27: {
        name: '身份证',
        type: 'ID' //identification card
      },
      28: {
        name: '音频',
        type: 'audio'
      },
      29: {
        name: '视频',
        type: 'video'
      },
    }

    this.list = list
  }

}

export default new FormType()
