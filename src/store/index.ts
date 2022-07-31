import { createStore } from 'vuex'
import common from './common'
import talk from './talk'
import user from './user'
import graph from './graph'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    common,
    talk,
    user,
    graph
  }
})
