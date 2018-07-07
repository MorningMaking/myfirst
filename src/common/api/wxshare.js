import {
  wxjssdk,
  share_game,
  share_room_info
} from './path/wxshare'


import {get} from '@/common/network/netaxios'
import wxShare from "@/common/library/wx";

function getWxJssk(currentUrl) {
  let params = {
    currentUrl
  }
  return get(wxjssdk, params)
}

/**
 * 默认分享入口
 */
export async function shareEntry() {
  let currUrl = window.location.href.replace(/#.*/, "")
  let data = await getWxJssk(currUrl)
  let {entryUrl, jssdk} = data.data
  let shareData = {
    title: '水果世界管家',
    desc: '游戏管理中心',
    link: entryUrl,
    imgUrl: ''
  }
  return wxShare(jssdk, shareData)
}

/**
 * 特定分享
 * @param roomId 房间ID
 * @returns {*}
 */
export async function shareGameRoom(roomId,title,imgUrl,usrname) {
  let currentUrl = window.location.href.replace(/#.*/, "")
  let url = share_game + '/' + roomId
  let params = {
    currentUrl,
  }
  let data = await get(url, params)

  let {entryUrl, jssdk} = data.data
  let shareData = {
    title: title,
    desc: usrname+'邀请您进入游戏房间',
    link: entryUrl,
    imgUrl: imgUrl
  }
  return wxShare(jssdk, shareData)
}


export function shareRoomInfo(shareId) {
  let url = share_room_info + '/' + shareId
  let params = {}
  return get(url, params)
}

