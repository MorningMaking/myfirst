import {
    roomSelfad
} from './path/advertise'
import {get, post, put, deleter, patch } from '@/common/network/netaxios'


//创建房间广告
export function createSelfAd(roomId,advert){
    let params={
        roomId,
        advert
    }
    return post(roomSelfad,params)
}

//获取房间广告
export function getRoomSelfAd(roomId){
    return get(roomSelfad+'/'+roomId)
}