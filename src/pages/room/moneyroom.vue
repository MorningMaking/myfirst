<template>
    <div class="moneyroom">
        <div class="showbox" v-for="(item,index) in gamelist" :key="index">
            <div class="gamemsg">
                <div class="usermsg">
                    <a :href="togame+item.roomId">
                      <img :src="item.roomImage" alt="" class="image-file usrimg">
                    </a>
                   
                </div>
                <div class="gameabout">
                    <div>房间名称:{{item.roomName}} </div>
                    <div class="tintgray roomcount">
                      <span> 总人数:{{item.roomNum?item.roomNum:'∞'}}</span>
                      <span> 已进人数:{{item.enterNum}}</span>
                    </div>
                    <div class="tintgray">竞赛积分:{{item.roomScore}}</div>
                </div>
            </div>
            <div class="gameoperation">
              <div class="creteroper">
                  <div class="creterrow">
                    <!-- <div  class="labeloper" @click="toExit()">
                        <span>退出</span>
                    </div> -->
                    <div @click="tochat(item.roomId)">对话</div>
                    <div>
                      <router-link :to="{path:'/gamescore/'+item.roomId}" class="labeloper">
                        <span>排行</span>
                      </router-link>
                    </div>
                  </div>
                  <div class="creterrow" >
                    <div @click="shareRoomQR(item.roomId,index)">图片分享</div>
                    <div @click="shareRoom(item.roomId,index)">微信分享</div>
                  </div>
              </div>
              </div>
        </div>
        <div class="maskpic" v-if="showmask==true"  @click="showmask=false">
          <div>
              <img src="../../assets/img/icon10.png" alt="" >
          </div>
        </div>
        <div class="rulecontainer">
            <p>赏金房间游戏规则:</p>
            <div class="ruledetail">
                <div v-for="(val,index) in datarule" :key="index">
                    <span>{{index+1+'、'}}{{val}}</span>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { getRoomList, deleteCreateRoom } from "@/common/api/room";
import {getChatUrl} from '@/common/api/chat'
import user from '@/common/model/UserModel'
import { shareGameRoom } from "@/common/api/wxshare";
export default {
  data() {
    return {
      gamelist: [],
      datarule: [
        "每日第一赢水果在赏金房间：每日时间22:30和微信运动同步的成绩，根据玩家积分排名，当日第一名获胜，奖励价值200元水果一份；",
        "一次通关送水果在赏金房间没有复活技能，玩家一次游戏中通关，获得价值200元水果奖励一份；",
        "奖品领取方式获奖者个人对话中，有客服发送的水果奖券，如未收到联系在线客服；",
      ],
      roomId: "",
      showmask: false,
      togame:
          "http://dis.ccnfgame.com/knifemanagerapi/v1/public/wx/entry?roomId="
    };
  },
  methods: {
    toBusinessad() {},
    tochat(roomId){
      getChatUrl(roomId).then(res=>{
        location.href=res.data
      })
    },
    shareRoomQR(roomId, index) {
        this.$router.push(
          {
            name: "shareCode",
            params: {
              roomId
            }
          }
        )
      },
      shareRoom(roomId, inx) {
        this.showmask = true;
        console.log(roomId)
        //let imgurl=this.gamelist[inx].roomImage.indexOf
        shareGameRoom(
          roomId,
          this.gamelist[inx].gameName,
          this.gamelist[inx].roomImage,
          user.nickname
        ).then(res => {
        });

      },
  },
  mounted() {
    getRoomList('race').then(res=>{
        this.gamelist=res.data
    })
  }
};
</script>

<style lang="less" scoped>
.moneyroom {
  flex: 1;
  display: flex;
  flex-direction: column;
  //margin: 20px 10px;
  .showbox {
    border-radius: 10px;
    padding: 20px 15px;
    height: 170px;
    box-sizing: border-box;
    margin: 20px 10px;
    background: #fff;
    border-radius: 10px;
    display: flex;
  // overflow: auto;
    align-items: center;
    .gamemsg {
      display: flex;
      align-items: center;
      flex: 1;
      .usermsg {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 9px;
        .usrimg {
          width: 130px;
          height: 130px;
          margin-bottom: 10px;
          border-radius: 10px;
        }
        > span {
          height: 21px;
          font-size: 22px;
          color: rgba(179, 179, 182, 1);
          line-height: 21px;
        }
      }
      .gameabout {
        display: flex;
        flex-direction: column;
        .roomcount {
          display: flex;
          > span:first-child {
            margin-right: 40px;
          }
        }
        > div {
          height: 40px;
          width: 285px;
          line-height: 40px;
          font-size: 24px;
          color: rgba(51, 51, 51, 1);
          //   margin-bottom: 15px;
          text-overflow: ellipsis; //值为clip表示剪切，ellipsis时为显示省略号
          overflow: hidden;
          white-space: nowrap;
        }
        .tintgray {
          font-size: 20px;
          color: rgba(179, 179, 182, 1);
        }
      }
    }
    .gameoperation {
      display: flex;
      .creteroper {
        display: flex;
        flex-direction: column;
        .creterrow {
          justify-content: flex-end;
          display: flex;
          > div {
            margin-left: 10px;
            padding: 0px 5px;
            height: 35px;
            font-size: 24px;
            color: rgba(12, 45, 114, 1) !important;
            line-height: 35px;
            border: 2px solid rgba(12, 45, 114, 1);
            border-radius: 10px;
            .labeloper {
              color: rgba(12, 45, 114, 1);
              text-decoration: none;
            }
          }
        }
        > div:first-child {
          margin-bottom: 34px;
        }
      }
      .playeroper {
        display: flex;
        flex-direction: column;
        > div {
          margin-left: 20px;
          padding: 0px 12px;
          height: 35px;
          font-size: 24px;
          color: rgba(12, 45, 114, 1);
          line-height: 35px;
          border: 2px solid rgba(12, 45, 114, 1);
          border-radius: 10px;
          .labeloper {
            color: rgba(12, 45, 114, 1);
            text-decoration: none;
          }
        }
        > div:first-child {
          margin-bottom: 34px;
        }
      }
    }
  }
  .maskpic {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;
    background: rgba(0, 0, 0, 0.3);
    > div {
      display: flex;
      // justify-content: center;
      img {
        // display: inline-block;
        margin-left: 198px;
        width: 432px;
        height: 733px;
      }
    }
  }
  .rulecontainer {
      background: #fff;
      padding:40px 19px;
      flex: 1;
    > p {
      font-size: 32px;
      color: rgba(51, 51, 51, 1);
    }
    .ruledetail {
      flex: 1;
      margin-left: 63px;
      margin-right: 46px;
      > div {
        display: flex;
        > span {
          margin-top: 28px;
          font-size: 28px;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
  }
}
</style>
