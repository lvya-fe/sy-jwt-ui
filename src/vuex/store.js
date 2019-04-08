import Vue from "vue"
import Vuex from "vuex"

import animation from "./modules/animation"
import task from "./modules/task"

export default new Vuex.Store({
  modules: {
    animation,
    task,
  }
})
