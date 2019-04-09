import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import animation from "./modules/animation"
import task from "./modules/task"

export default new Vuex.Store({
  modules: {
    animation,
    task,
  }
})
