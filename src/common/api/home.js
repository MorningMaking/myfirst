import {messagePoint} from './path/home'
import {get, post, put, deleter, patch } from '@/common/network/netaxios'

//获得首页节点消息
export function getMessageList(pageSize,pageNum){
    let params={
        pageSize,
        pageNum
    }
    return get(messagePoint,params)
}