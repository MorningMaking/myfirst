import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'


const store = {
  namespaced: true,
  actions,
  getters,
  state,
  mutations,
}

export default store
