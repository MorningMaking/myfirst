import {
    groupchat
} from './path/chat'
import {get } from '@/common/network/netaxios'

//获取聊天地址
export function getChatUrl(roomId){
    return get(groupchat+roomId)
}