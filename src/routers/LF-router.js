// 失物招领 Lost and Found  简写 LF
export default [
  {
    path: '/LF/publish',
    meta: {
      title: '发布招领信息'
    },
    component: (resolve) => {
      require(['../page/LF/publish/publish.vue'], resolve)
    }
  },{
    path: '/LF/task-list/:uid/:taskid/:id/',
    meta: {
      title: '招领列表'
    },
    component: (resolve) => {
      require(['../page/LF/task-list/TaskList.vue'], resolve)
    }
  },{
    path: '/LF/task-details/:uid/:id/:stuid/:schoolid',
    meta: {
      title: '发布招领信息'
    },
    component: (resolve) =>  {
      require(['../page/LF/task-details/TaskDetails.vue'], resolve)
    }
  }]
