<template>
    <div class="competecontainer">
        <div class="competeitems" v-for="(item,index) in  competeDataList" :key="index">
            <div class="competetimes">
                <span>{{timestampToTime(item[0].playTime*1000)}}</span>
            </div>
            <div class="competetabs">
                <div>玩家头像</div>
                <div>昵称</div>
                <div>竞赛积分</div>
                <div>最高积分</div>
            </div>
            <div class="competeplayer" v-for="(player,playindex) in item" :key="'player'+playindex" >
                <div>
                    <img :src="player.headImage" alt="" class="headimage">
                </div>
                <div>{{player.nickname}}</div>
                <div :style="player.roomScore>0?{color:'rgba(12, 45, 114, 1)'}:{color:'red'}">{{player.roomScore>0?'+'+player.roomScore:player.roomScore}}</div>
                <div>{{player.matchScore}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: gamescoreMapState,
  mapActions: gamescoreMapActions
} = createNamespacedHelpers("gamescore");
import { getMatchScore } from "@/common/api/scorebord";

export default {
  data() {
    return {
      competeDataList: [],
      roomId: ""
    };
  },
  computed: {
    ...gamescoreMapState(["ismybord"])
  },
  methods: {
    ...gamescoreMapActions(["setIsMyBord"]),
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + ".";
      var M =
        (date.getMonth() + 1 < 10
          ?  (date.getMonth() + 1)
          : date.getMonth() + 1) + ".";
      var D = date.getDate() + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

      return Y + M + D;
    },
    pickData(dataArr) {
      let data = dataArr;
      let arr = [];
      let innerArr = [];
      if (data && data.length > 0) {
        //获取第一条数据的游戏时间
        let { playTime } = data[0];
        console.log(playTime);
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          if (this.timestampToTime(playTime*1000) ==this.timestampToTime(item["playTime"]*1000) ) {
            innerArr.push(item);
            if (i === data.length - 1) {
              arr.push(innerArr);
            }
          } else {
            playTime = item["playTime"];
            arr.push(innerArr);
            innerArr = [];
            innerArr.push(item);
          }
        }
        return arr;
      }
    }
  },
  mounted() {
    this.roomId = this.$route.params.roomId;
    getMatchScore(this.roomId).then(res => {
      this.competeDataList = this.pickData(res.data);
      console.log(this.competeDataList);
    });
  }
};
</script>

<style lang="less" scoped>
.competecontainer {
  
  .competeitems {
    margin-bottom: 20px;
    .competetimes {
      display: flex;
      justify-content: center;
      > span {
        height: 45px;
        box-sizing: border-box;
        padding: 17px 32px 9px 32px;
        background: #fff;
        font-size: 24px;
        border-radius: 20px 20px 0px 0px;
        line-height: 20px;
      }
    }
    .competetabs {
      height: 60px;
      background: #fff;
      display: flex;
      align-items: center;
      border-radius: 10px 10px 0px 0px;
      > div {
        flex: 1;
        text-align: center;
      }
    }
    .competeplayer {
      display: flex;
      height: 100px;
      align-items: center;
      background: #fff;
      border-top: 1px solid #ddd;
      > div {
        flex: 1;
        display: flex;
        justify-content: center;
        .headimage {
          border-radius: 50%;
          width: 60px;
          height: 60px;
        }
      }
    }
  }
}
</style>
