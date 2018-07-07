<template>
  <div class="container">
    <header class="header">
      <router-link :to="{path:'/rewardad/adlist/'+roomId}" tag="div">
        <div @click="changeTab(0)" class="button" :class="{'button-active':tab===0}"><span>广告查看</span></div>
      </router-link>
      <router-link :to="{path:'/rewardad/rewardlist/'+roomId}" tag="div">
        <div @click="changeTab(1)" class="button" :class="{'button-active':tab===1}"><span>赏金查看</span></div>
      </router-link>
    </header>

    <keep-alive>
      <router-view/>
    </keep-alive>

  </div>
</template>

<script>

  import ESwitch from "@/components/switch/index";

  export default {
    components: {ESwitch},
    name: "RewardAd",
    data() {
      return {
        //0:广告查看 1:赏金查看
        tab: 0,
        roomId:''
      }
    },
    methods: {
      changeTab(index) {
        this.tab = index
      }
    },
    mounted() {
      this.roomId=this.$route.params.roomId
      console.log(this.roomId)
      if (window.location.hash.indexOf('rewardlist') !== -1) {
        this.tab = 1
      }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    .header {
      width: 750px;
      height: 140px;
      background: rgba(255, 255, 255, 1);
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      .button {
        width: 160px;
        height: 60px;
        line-height: 60px;
        border-radius: 10px;
        border: 2px solid rgba(33, 66, 108, 1);
        text-align: center;
        span {
          width: 110px;
          height: 27px;
          font-size: 28px;
          font-family: PingFang-SC-Medium;
          color: rgba(12, 45, 114, 1);
        }
      }

      .button-active {
        background: rgba(33, 66, 108, 1);
        span {
          color: rgba(255, 255, 255, 1);
        }
      }
    }

  }
</style>
