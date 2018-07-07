<template>
    <div class="headercontainer">
        <div @click="changebord(0)">
            <span :class="currenttab==0?'currentbord':''">最高积分</span>
        </div>
        <div @click="changebord(1)">
            <span :class="currenttab==1?'currentbord':''">累计积分</span>
        </div>
        <div @click="changebord(2)">
            <span :class="currenttab==2?'currentbord':''">竞赛积分</span>
        </div>
    </div>    
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: gamescoreMapState,
  mapActions: gamescoreMapActions
} = createNamespacedHelpers("gamescore");

export default {
  data() {
    return {
      currenttab: 0
    };
  },
  methods: {
    changebord(tabnum) {
      this.currenttab = tabnum;
      this.$emit('changecur',tabnum)
      this.setIsMyBord(tabnum);
    },
    ...gamescoreMapActions(["setIsMyBord"])
  },
  computed: {
    ...gamescoreMapState(["ismybord"])
  }
};
</script>

<style lang="less" scoped>
.headercontainer {
  margin: 20px 0px 10px 0px;
  padding: 40px 0px;
  background: #fff;
  display: flex;
  justify-content: center;
  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    > span{
    //  width: 166px;
      text-align: center;
      height: 60px;
      padding: 0px 25px;
      border: 2px solid rgba(12, 45, 114, 1);
      font-size: 28px;
      color: rgba(12, 45, 114, 1);
      line-height: 60px;
      border-radius: 10px;
      box-sizing: border-box;
    }
    .currentbord {
      background: rgba(12, 45, 114, 1);
      color: #fff;
    }
  }
}
</style>
