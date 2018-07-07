<template>
    <div class="enterroomcontainer">
        <div class="roomcontent">
            <img :src="roomInfo.roomImage" alt="">
            <div>
                <h1>{{gameInfo.gameName}}</h1>
                <p>{{roomInfo.roomName}}</p>
                <span>{{"\""+userInfo
.nickname+"\""}}邀请您进入{{gameInfo.gameName}}房间</span>
            </div>
        </div>
        <div class="enternotice"  v-if="roomInfo.roomScore>0">
            进入房间自动扣取竞赛积分 “{{roomInfo.roomScore}}” 分。
        </div>
        <div class="winnerrule" v-if="roomInfo.roomScore>0">
                <div>赢家规则:</div>
                <div>每天24:00确定房间所有轮中的最高积分者为赢家。赢家 获取所竞赛的积分。</div>
        </div>
        <div class="submitbtn">
          <a :href="entergame">
            <span>进入</span>
          </a>
          
        </div>
    </div>
</template>

<script>
import { getShareRoomInfor } from "@/common/api/room";

export default {
  data() {
    return {
      roommsg: {},
      shareId: "",
      gameInfo: "",
      roomInfo: {},
      userInfo: "",
      entergame:
        "http://dis.ccnfgame.com/knifemanagerapi/v1/public/wx/entry?roomId="
    };
  },
  async mounted() {
    this.shareId = this.$route.query.shareId;
    let shareInfor = await getShareRoomInfor(this.shareId);
    this.roomInfo = shareInfor.data.roomInfo;
    this.userInfo = shareInfor.data.userInfo;
    this.gameInfo = shareInfor.data.gameInfo;
    this.entergame = this.entergame + this.roomInfo.roomId;
  }
};
</script>

<style lang="less" scoped>
.enterroomcontainer {
  .roomcontent {
    padding: 20px;
    background: #fff;
    display: flex;
    align-items: center;
    margin: 20px 10px;
    border-radius: 10px;
    > img {
      width: 130px;
      height: 130px;
      border-radius: 10px;
      margin-right: 10px;
    }
    > div {
      display: flex;
      flex-direction: column;
      h1 {
        font-size: 28px;
        color: rgba(51, 51, 51, 1);
        height: 40px;
        line-height: 40px;
        
      }
      > p {
        font-size: 24px;
        color: rgba(51, 51, 51, 1);
        height: 40px;
        line-height: 40px;
      }
      > span {
        font-size: 24px;
        color: rgba(179, 179, 182, 1);
        height: 40px;
        line-height: 40px;
      }
    }
  }
  .enternotice {
    height: 100px;
    line-height: 100px;
    padding: 0px 20px;
    background: #fff;
    font-size: 28px;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 20px 0px;
  }
  .winnerrule {
    margin-bottom: 92px;
    > div {
      padding: 26px 19px;
      font-size: 28px;
      color: rgba(51, 51, 51, 1);
      background: #fff;
      border-bottom: 1px solid rgba(229, 229, 229, 1);
    }
  }
  .submitbtn {
    display: flex;
    justify-content: center;
    > a {
      margin-top: 50px;
      text-decoration: none;
      span {
        padding: 13px 215px;
        border-radius: 10px;
        background: rgba(12, 45, 114, 1);
        font-size: 36px;
        color: #fff;
        font-family: PingFang-SC-Medium;
      }
    }
  }
}
</style>
