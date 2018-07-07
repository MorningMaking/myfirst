<template>
    <div class="playercontrainer">
        <div class="showbox" v-for="(gameitem,index) in gamelist" :key=index >
            <div class="gamemsg">
                <div class="usermsg">
                    <a :href="togame+gameitem.roomId">
                      <img :src="gameitem.roomImage" alt="" class="image-file usrimg">
                    </a>
                   
                </div>
                <div class="gameabout">
                    <div>房间名称: {{gameitem.roomName}}</div>
                    <div class="tintgray roomcount">
                      <span> 竞赛积分:{{gameitem.roomScore}}</span>
                      <span> 能否复活:{{gameitem.isRelive?'能':'否'}}</span>
                    </div>
                    <div class="tintgray">创建者:{{gameitem.nickname}}</div>
                </div>
            </div>
            <div class="gameoperation">
              <div class="creteroper">
                  <div class="creterrow">
                    <div  class="labeloper" @click="toExit(gameitem.roomId,index)">
                        <span>退出</span>
                    </div>
                    <div @click="tochat(gameitem.roomId)">对话</div>
                    <div>
                      <router-link :to="{path:'/gamescore/'+gameitem.roomId}" class="labeloper">
                        <span>排行</span>
                      </router-link>
                    </div>
                  </div>
                  <div class="cretersecondrow" >
                    <div @click="shareRoomQR(gameitem.roomId,index)">图片分享</div>
                    <div @click="shareRoom(gameitem.roomId,index)">微信分享</div>
                  </div>
              </div>
              </div>
        </div>
        <div class="maskpic" v-if="showmask==true"  @click="showmask=false">
          <div>
              <img src="../../assets/img/icon10.png" alt="" >
          </div>
        </div>
        <mugen-scroll :handler="fetchData" :should-handle="!loading" v-if="gamelist.length != 0" class="scrolltext">
          {{shownotice}}
        </mugen-scroll>
    </div>
</template>

<script>
import { getRoomList, getExitRoom } from "@/common/api/room";
import { MessageBox } from "mint-ui";
import { getChatUrl } from "@/common/api/chat";
import { shareGameRoom } from "@/common/api/wxshare";
import user from "@/common/model/UserModel";
import MugenScroll from "vue-mugen-scroll";
export default {
  name: "createrroom",
  components: {
    MugenScroll
  },
  data() {
    return {
      gamelist: [],
      showmask: false,
      curtab: 0,
      curURL: "",
      loading: false,
      temppg: 1,
      scrollflag: 1,
      shownotice: "加载中",
      togame:
        "http://dis.ccnfgame.com/knifemanagerapi/v1/public/wx/entry?roomId="
    };
  },
  mounted() {
    getRoomList("played").then(res => {
      this.gamelist = res.data;
    });
    //  console.log(user)
  },
  methods: {
    toExit(roomId, inx) {
      console.log(roomId);
      MessageBox.confirm("确定退出房间吗?")
        .then(action => {
          getExitRoom(roomId).then(res => {
            console.log(res);
          });
          this.gamelist.splice(inx, 1);
        })
        .catch(err => {
          console.log(err);
        });
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
    tochat(roomId) {
      getChatUrl(roomId).then(res => {
        location.href = res.data;
      });
    },
    shareRoom(roomId, inx) {
      this.showmask = true;
      shareGameRoom(
        roomId,
        this.gamelist[inx].gameName,
        this.gamelist[inx].roomImage,
        user.nickname
      ).then(res => {
        console.log(res);
      });
    },
    fetchData() {
      this.loading = true;
      //  if(document.body.scrollHeight-(document.documentElement.scrollTop+document.documentElement.clientHeight)==0){
      this.temppg++;
      //  console.log(this.temppg)
      if (this.temppg > 1 && this.scrollflag == 1) {
        // console.log(this.scrollflag)
        getRoomList("played", this.temppg, 5).then(res => {
          for (let i = 0; i < res.data.length; i++) {
            this.gamelist.push(res.data[i]);
          }
          if (res.data.length < 5) {
            this.scrollflag = 0;
            this.shownotice = "";
          }
        });
      }
      //  }
      this.loading = false;
    }
  }
};
</script>



<style lang="less" scoped>
.playercontrainer {
  padding-bottom: 140px;
  .showbox {
    padding: 19px;
    height: 170px;
    box-sizing: border-box;
    margin: 20px 10px;
    background: #fff;
    border-radius: 10px;
    display: flex;
  //  overflow: auto;
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
            padding: 0px 8px;
            height: 35px;
            font-size: 22px;
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
        .cretersecondrow {
          justify-content: flex-end;
          display: flex;
          > div {
            margin-left: 10px;
            padding: 0px 3px;
            height: 35px;
            font-size: 22px;
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
          padding: 10px 17px;
          height: 23px;
          font-size: 24px;
          color: rgba(12, 45, 114, 1);
          line-height: 23px;
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
  .scrolltext{
    text-align: center;
  }
}
</style>

<style>
.playercontrainer .mint-cell-title {
  flex: 0;
}
.playercontrainer .mint-cell-wrapper {
  padding: 0px;
  background-size: 120% 0px;
}

.playercontrainer .mint-cell-wrapper .mint-cell-value {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.creatercontrainer .mint-cell-swipe-button {
  width: 100px;
  font-size: 32px;
  text-align: center;
  line-height: 170px;
}
</style>
