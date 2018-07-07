<template>
  <div class="container">
    <div v-if="adList.length !== 0" class="auto-item">
      <e-switch active-text="自动加载" inactive-text="手动加载" class="switch" @change="changeType"/>
    </div>
    <div class="list">
      <ad-card @imgClick="cardImgClick" :autoLoad="autoLoad" :itemData="item" :index="index" class="card"
               v-for="(item,index) in adList" v-bind:key="Math.random()"/>
    </div>
    <e-image-preview ref="imagePreview"/>
  </div>
</template>

<script>
  import AdCard from "@/pages/rewardad/adlist/adCard";
  import ESwitch from "@/components/switch/index";
  import EImagePreview from "@/components/imagepreview/epreview";
  import {rewardAdList} from '@/common/api/reward'

  export default {
    components: {
      EImagePreview,
      ESwitch,
      AdCard,
    },
    name: "AdList",

    data() {
      return {
        adList: [],
        autoLoad: true,
        roomId: ''
      }
    },
    mounted() {
      this.roomId = this.$route.params.roomId
      rewardAdList(this.roomId, 5, 1).then(res => {
        this.adList = res.data.advertList
        console.log(this.adList)
      })
    },
    methods: {
      changeType(checked) {
        this.autoLoad = checked
      },
      cardImgClick(index) {
        this.$refs.imagePreview.show()
      }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    height: auto;
    overflow: hidden;
    .auto-item {
      width: 730px;
      height: 80px;
      background: rgba(255, 255, 255, 1);
      border-radius: 10px 10px 0px 0px;
      box-shadow: 2px 0px 0px rgba(229, 229, 229, 1);
      border-bottom: 1px solid rgba(229, 229, 229, 1); /*no*/
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 10px;
      .switch {
        margin-left: 20px;
      }
    }
    .list-view {
      height: 1046px;
    }
    .list {
      margin-left: 10px;
      flex-direction: column;
      display: flex;
      justify-content: space-between;
      :first-child {
        margin-top: 0px !important;
        border-radius: 0px;
      }

    }

  }
</style>
