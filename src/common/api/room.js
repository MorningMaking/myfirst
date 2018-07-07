
import {roomlist,
       exitroom,
       createroom,
       deleteroom,
       roomSelfad,
       shareroominfor
} from './path/room'
import {get, post, put, deleter, patch } from '@/common/network/netaxios'

//获得房间列表
export function getRoomList(type,pageNum,pageSize){
    let params={
        pageNum,
        pageSize
    }
    return get(roomlist+type,params)
}

//玩家退出房间
export function getExitRoom(roomId){
    let params={
        roomId
    }
    return get(exitroom,params)
}

//创建房间
export function createNewRoom(roomImage,roomName,roomNum,roomScore,isRelive){
    roomScore=parseInt((roomScore==''?0:roomScore))
    let params={
        roomImage,
        roomName,
        roomNum,
        roomScore,
        isRelive
    }
    return post(createroom,params)
}

//创建者删除房间
export function deleteCreateRoom(roomId){

    return deleter(deleteroom,roomId)
}

//获取分享房间信息
export function getShareRoomInfor(roomId){
    return get(shareroominfor+roomId)
}

