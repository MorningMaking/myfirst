<template>
    <div class="keepercontainer">
        <game-show v-on:curtab="curtabnum"></game-show>
        <div class="createroom" @click="toCreateroom" v-if="curtabNum!=1">
            <span>创建房间</span>
        </div>
    </div>
</template>

<script>
import gameShow from "./gameshow";
import MugenScroll from "vue-mugen-scroll";
export default {
  components: {
    gameShow,
    MugenScroll
  },
  data() {
    return {
      loading: false,
      topHeight:'',
      showcreate:'',
      curtabNum:0
    };
  },
  methods: {
    toCreateroom() {
      this.$router.push("/newroom");
    },
    curtabnum(tabnum){
      this.curtabNum=tabnum
    },
    isToBottom() {
      event.stopPropagation();
      const BodyEl = document.documentElement;
      const Body = document.body;
      let outH = Body.scrollHeight,
        currentH = Body.offsetHeight,
        offH =
          Body.scrollTop > BodyEl.scrollTop ? Body.scrollTop : BodyEl.scrollTop;
      this.topHeight=offH;
     // console.log(currentH,offH,outH)
    }
  },
  mounted() {
  //document.addEventListener("scroll", this.isToBottom);
  },
    beforeDestroy() {
      // 去除滚动加载监控
  //document.removeEventListener("scroll", this.isToBottom);
    },
    watch:{
      //  topHeight(c,o){
      //      if(o-c>0){
      //        this.showcreate=''
      //      }
      //      else{
      //        this.showcreate='showcreteenter'
      //      }
      //  }
    }
};
</script>

<style lang="less" scoped>
.keepercontainer {
    min-height: 102vh;
    display: flex;
    flex-direction: column;
  .createroom {
    width: 100%;
    padding: 20px 0px;
    background: #fff;
    display: flex;
    justify-content: center;
    position: fixed;
    bottom:0;
    left: 0;
  //  transform: translateY(0px);
  //  transition:transform .5s linear;
    span {
      height: 80px;
      box-sizing: border-box;
      background: rgba(12, 45, 114, 1);
      border-radius: 10px;
      padding: 23px 170px;
      font-size: 36px;
      color: rgba(255, 255, 255, 1);
      line-height: 30px;
    }
  }
  .showcreteenter{
    transform: translateY(120px);
  }
}
</style>
