// 页面切换动画
function PageAnimation(router, store) {
  // simple history management
  const history = window.sessionStorage
  let isPush = false
  let endTime = Date.now()
  let methods = ['push', 'go', 'replace', 'forward', 'back']
  // history.clear()
  let historyCount = history.getItem('count') * 1 || 0
  // history.setItem('/', 0)

  router.beforeEach(function (to, from, next) {
    console.log(to, from, next)

    store.commit('updateLoadingStatus', {isLoading: true})

    const toIndex = history.getItem(to.path)
    const fromIndex = history.getItem(from.path)

    if (toIndex) {
      if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
        store.commit('updateDirection', {direction: 'forward'})
      } else {
        // 判断是否是ios左滑返回
        if (!isPush && (Date.now() - endTime) < 377) {
          store.commit('updateDirection', {direction: ''})
        } else {
          store.commit('updateDirection', {direction: 'reverse'})
        }
      }
    } else {
      ++historyCount
      history.setItem('count', historyCount)
      to.path !== '/' && history.setItem(to.path, historyCount)
      store.commit('updateDirection', {direction: 'forward'})
    }

    if (/\/http/.test(to.path)) {
      let url = to.path.split('http')[1]
      window.location.href = `http${url}`
    } else {
      next()
    }
  })


  router.afterEach(function (to) {
    isPush = false
    store.commit('updateLoadingStatus', {isLoading: false})
  })
}

export {
  PageAnimation
}
