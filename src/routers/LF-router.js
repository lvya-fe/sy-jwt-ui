// 失物招领 Lost and Found  简写 LF
export default [
  {
    path: '/LF/publish',
    meta: {title: '发布招领信息'},
    component: (resolve) => {
      require(['../page/LF/publish/publish.vue'], resolve)
    }
  },
  {
    path: '/LF/task-list/:uid',
    meta: {title: '招领列表'},
    component: (resolve) => {
      require(['../page/LF/task-list/TaskList.vue'], resolve)
    }
  },
  {
    path: '/LF/task-add/:uid/:taskid',
    meta: {title: '招领信息填写'},
    component: (resolve) => {
      require(['../page/LF/task-details/TaskAdd.vue'], resolve)
    }
  },
  {
    path: '/LF/task-commit/:uid/:taskid/:stuid/:schoolid',
    meta: {title: '认领招领信息'},
    component: (resolve) => {
      require(['../page/LF/task-details/TaskCommit.vue'], resolve)
    }
  },
  {
    path: '/LF/task-details/:uid/:taskid/:stuid/:schoolid',
    meta: {title: '招领信息详情'},
    component: (resolve) => {
      require(['../page/LF/task-details/TaskDetails.vue'], resolve)
    }
  }]
