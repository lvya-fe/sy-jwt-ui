import Vue from "vue"
import Vuex from "vuex"

import animation from "./modules/animation";

export default new Vuex.Store({
    state: animation.state,
    mutations: animation.mutations
})
