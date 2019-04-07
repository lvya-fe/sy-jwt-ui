/**
 * 任务相关枚举 *
 *
 citeDataType引用数据类型：
 0 不引用 1场景数据 2系统数据

 teaDoType操作类型

 0 看，老师作为负责人时，任务是非审核类型的任务。老师可以查看用户（学生/老师）提交的数据
 1 审，老师作为负责人时，任务是审核类型的任务，老师可以审核用户（学生/老师）提交的数据
 2 处，老师作为参与人时，老师给学生填写任务。
 3 提， 老师作为参与人时，老师给自己填写任务

 showFlag 展现方式
 1 列表
 2 卡片

 isRelateStu 是否关联学生
 true关联
 false不关联

 executortype  参与人角色
 1老师
 2学生

 dataRangeType 数据范围
 0 数据归属人
 1 组织
 2 社团

 taskState 任务状态
 -1 未开始
 0 已结束
 1 进行中
 2 待审核
 3 已驳回
 4 已完成
 */
class TaskEnum {
  constructor() {
    // 引用数据类型
    this.citeDataType = {
      0: {
        name: '不引用',
      },
      1: {
        name: '场景数据',
      },
      2: {
        name: '系统数据',
      }
    }

    // teaDoType操作类型
    this.teaDoType = {
      0: {
        name: '看',
      },
      1: {
        name: '审',
      },
      2: {
        name: '处',
      },
      3: {
        name: '提'
      }
    }

    // showFlag 展现方式
    this.showFlag = {
      1: {
        name: '列表',
      },
      2: {
        name: '卡片',
      },
    }

    // isRelateStu 是否关联学生
    this.isRelateStu = {
      'true': {
        name: '关联',
      },
      'false': {
        name: '不关联',
      },
      2: {
        name: '系统数据',
      }
    }

    // executortype  参与人角色
    this.executortype = {
      1: {
        name: '老师',
      },
      2: {
        name: '学生',
      },
    }

    // dataRangeType 数据范围
    this.dataRangeType = {
      0: {
        name: '数据归属人',
      },
      1: {
        name: '组织',
      },
      2: {
        name: '社团',
      }
    }

    // taskState 任务状态
    this.isRelateStu = {
      '-1': {
        name: '未开始',
      },
      0: {
        name: '已结束',
      },
      1: {
        name: '进行中',
      },
      2: {
        name: '待审核',
      },
      3: {
        name: '已驳回',
      },
      4: {
        name: '已完成'
      }
    }
  }

}

export default new TaskEnum()
