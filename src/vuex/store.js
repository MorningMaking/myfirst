import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'

import gamescore from './module/gamescore'


Vue.use(Vuex)

const debug = process.env.NODE_ENV === 'development'

// 只用 state 和 mutations   不用常量，不用getters（过滤state数据） 和 actions（异步提交 mutation）
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  modules: {
    gamescore
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations',
    './module/gamescore'
  ], () => {

    const newGameScore = require('./module/gamescore').default

    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations'),
      modules: {
          gamescore:newGameScore
      }
    })
  })
}
