<template>
    <div class="grandsocrecontainer">
        <div class="datahead">
            <div>头像</div>
            <div>昵称</div>
            <div>累计积分</div>
            <div>排名</div>
        </div>
        <div class="mybord" v-for="(item,index) in mybordlist" :key="index" >
            <div>
                <img :src="item.headImage" alt="" class="headimg">
            </div>
            <span>{{item.nickname}}</span>
            <span>{{item.totalScore}}</span>
            <span class="hightlight">{{index + 1}}</span>
        </div>
        <mugen-scroll :handler="fetchData" :should-handle="!loading" v-if="mybordlist.length > 0" class="scrolltext">
         {{shownotice}}
    </mugen-scroll>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: gamescoreMapState,
  mapActions: gamescoreMapActions
} = createNamespacedHelpers("gamescore");
import {getScoreWorld} from "@/common/api/scorebord";
import MugenScroll from "vue-mugen-scroll";

export default {
  data() {
    return {
      mybordlist: [],
      ismine: "",
      loading: false,
      tempgrandpg: 1,
      scrollflag: 1,
      shownotice: "加载中",
    };
  },
  components: {
    MugenScroll
  },
  computed: {
    ...gamescoreMapState(["ismybord"])
  },
  methods: {
    ...gamescoreMapActions(["setIsMyBord"]),
    fetchData() {
      this.loading = true;
      //  if(document.body.scrollHeight-(document.documentElement.scrollTop+document.documentElement.clientHeight)==0){
      this.tempgrandpg++;
      console.log('tempgrandpg',this.tempgrandpg,this.scrollflag)
      if (this.tempgrandpg > 1 && this.scrollflag == 1) {
        // console.log(this.scrollflag)
        getScoreWorld(5,this.tempgrandpg).then(res => {
          for(let i=0;i<res.data.length;i++){
            this.mybordlist.push(res.data[i])
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
    getScoreWorld().then(res=>{
        this.mybordlist=res.data
    })
  }
};
</script>

<style lang="less" scoped>
.grandsocrecontainer {
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
