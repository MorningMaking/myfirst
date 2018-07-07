import {
  reward_adlist,
  reward_list
} from './path/reward'
import {get} from '@/common/network/netaxios'

//赏金广告列表
export function rewardAdList(roomId, pageSize, pageNum) {
  let url = reward_adlist + '/' + roomId
  let params = {
    pageSize,
    pageNum
  }
  return get(url, params)
}

//赏金列表
export function rewardList(roomId, pageSize, pageNum) {
  let url = reward_list + '/' + roomId
  let params = {
    pageSize,
    pageNum
  }
  return get(url, params)
}
