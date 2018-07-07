import * as types from './mutation-types.js'

//验证通过的标记方法
export const setIsMyBord =function({commit,state},ismybord){
  commit(types.SET_IS_MY_BORD,ismybord)
}
