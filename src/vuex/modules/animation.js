// 切換動畫

const state = {
  isLoading: false,
  _url_: window.location.href,
  direction: 'forward'
}

const mutations = {
  updateLoadingStatus (state, payload) {
    state.isLoading = payload.isLoading
  },
  updateDirection (state, payload) {
    state.direction = payload.direction
  }
}

export default {
  state,
  mutations
}
