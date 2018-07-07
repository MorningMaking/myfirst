import {score_rank,
  score_world,
  comeptescore} from "@/common/api/path/scorebord";
import {get} from "@/common/network/netaxios";

//最高积分
export function topScoreRank(roomId,pageSize,pageNum) {
  let url = score_rank +'/'+roomId
  let params = {
    pageSize,
    pageNum
  }
  return get(url, params)
}

//累计积分
export function getScoreWorld(pageSize,pageNum){
  let params={
    pageSize,
    pageNum
  }
  return get(score_world,params)
}

//竞赛积分
export function getMatchScore(roomId){
  return get(comeptescore+roomId)
}
