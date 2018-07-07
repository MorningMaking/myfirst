<template>
  <div class="scodatacontainer">
    <div class="datahead">
      <div>头像</div>
      <div>昵称</div>
      <div>最高关卡</div>
      <div>奖品</div>
      <div>最高分</div>
      <div>排名</div>
    </div>
    <div class="mybord" v-for="(item,index) in bordList" :key="index">
      <div>
        <img :src="item.headImage" alt="" class="headimg">
      </div>
      <span>{{item.nickname}}</span>
      <span>{{item.grade}}</span>
      <span>{{item.prize}}</span>
      <span>{{item.score}}</span>
      <span class="hightlight">{{index+1}}</span>
    </div>
    <mugen-scroll :handler="fetchData" :should-handle="!loading" v-if="bordList.length > 0" class="scrolltext">
         {{shownotice}}
    </mugen-scroll>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import MugenScroll from "vue-mugen-scroll";
const {
  mapState: gamescoreMapState,
  mapActions: gamescoreMapActions
} = createNamespacedHelpers("gamescore");

import { topScoreRank } from "@/common/api/scorebord";

export default {
  props: {
    roomId: ""
  },
  components: {
    MugenScroll
  },
  data() {
    return {
      bordList: [],
      ismine: "",
      loading: false,
      temppg: 1,
      scrollflag: 1,
      shownotice: "加载中",
    };
  },
  computed: {
    ...gamescoreMapState(["ismybord"])
  },
  methods: {
    ...gamescoreMapActions(["setIsMyBord"]),
    fetchData() {
      this.loading = true;
      //  if(document.body.scrollHeight-(document.documentElement.scrollTop+document.documentElement.clientHeight)==0){
      this.temppg++;
      //console.log('temppg',this.temppg)
      if (this.temppg > 1 && this.scrollflag == 1) {
        // console.log(this.scrollflag)
        topScoreRank(this.roomId,5,this.temppg).then(res => {
          for(let i=0;i<res.data.length;i++){
            this.bordList.push(res.data[i])
          }
          if (res.data.length <5) {
            this.scrollflag = 0;
            this.shownotice = "";
          }
        });
      }
      //  }
      this.loading = false;
    }
  },
  mounted() {
    topScoreRank(this.roomId).then(data => {
      this.bordList = data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.scodatacontainer {
  .datahead {
    display: flex;
    background: #fff;
    padding: 18px 0px;
    align-items: center;
    height: 60px;
    box-sizing: border-box;
    border-radius: 10px 10px 0px 0px;
    box-shadow: 1px 0px 0px rgba(229, 229, 229, 1);
    border-bottom: 2px solid #ddd;
    > div {
      text-align: center;
      flex: 1;
      height: 23px;
      font-size: 24px;
      color: rgba(51, 51, 51, 1);
      line-height: 23px;
    }
  }
  .mybord {
    display: flex;
    padding: 40px 0px;
    background: #fff;
    height: 100px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    border-bottom:1px solid #ddd;
    > div {
      display: flex;
      justify-content: center;
      flex: 1;
      .headimg {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    }

    > span {
      flex: 1;
      text-align: center;
      height: 40px;
      font-size: 22px;
      color: rgba(122, 122, 123, 1);
      line-height: 40px;
      text-overflow: ellipsis; //值为clip表示剪切，ellipsis时为显示省略号
      overflow: hidden;
      white-space: nowrap;
    }
    .hightlight {
      font-size: 28px;
      color: rgba(219, 177, 119, 1);
    }
  }
  .scrolltext{
    text-align: center;
  }
}
</style>
