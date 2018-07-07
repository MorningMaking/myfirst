import * as types from './mutation-types'

export const setUserType = function ({commit, state}, {type}) {
  commit(types.SET_USER_TYPE, type)
}

export const setUserToken =function({commit,state},token){
  commit(types.SET_USER_TOKEN,token)
}