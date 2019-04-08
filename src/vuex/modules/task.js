// 任务
const state = {
  taskInfo: {},
}

const mutations = {
  taskInfo (state, payload) {
    state.taskInfo = payload.taskInfo
  },
}

export default {
  state,
  mutations
}
