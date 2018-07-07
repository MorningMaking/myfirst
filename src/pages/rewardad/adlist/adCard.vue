<template>
  <div class="container">
    <div class="header">
      <img @click="imgClick" :src="itemData.img"/>
    </div>
    <div class="info">
      <span>赞助商：{{itemData.sponsors}}</span>
      <div class="fill"><span>赏金加注：</span><span>{{itemData.money}}元/个</span></div>
      <div class="tip">图片广告</div>
    </div>
    <div class="time">
      <div class="num">{{itemData.residual}}</div>
      <span class="title-bottom">赏金倒计时</span>
    </div>
    <div class="operation">
      <div class="button">{{itemData.isLoaded?'取消':'加载'}}</div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "ad-card",
    props: {
      autoLoad: {
        type: Boolean,
        default: true
      },
      itemData:{
        type:Object,
        default:{}
      },
      index:{
        type:Number,
        default:-1
      },
    },
    data() {
      return {
        sponsor: "王者荣耀游戏"
      }
    },
    methods: {
      imgClick() {
        this.$emit('imgClick',this.index)
      }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    width: 730px;
    height: 180px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    margin: 5px 0px;
    align-items: center;
    font-size: 24px;
    font-family: PingFang-SC-Medium;
    .header {
      overflow: hidden;
      img {
        border-radius: 10px !important;
        margin-left: 20px;
        width: 140px;
        height: 140px;
      }
    }
    .info {
      height: 140px;
      flex-direction: column;
      display: flex;
      justify-content: space-between;
      margin-left: 20px;
      .fill {
        :last-child {
          color: #FFC313;
        }
      }
      .tip {
        width: 99px;
        height: 36px;
        font-size: 20px !important;
        line-height: 36px;
        text-align: center;
        border-radius: 4px;
        color: rgba(179, 179, 182, 1);
        border: 1px solid #B3B3B6; /*no*/
      }
    }

    .time {
      text-align: center;
      margin-left: 54px;
      .num {
        font-size: 36px;
        color: rgba(255, 192, 0, 1);
        line-height: 40px;
      }
      .title-bottom {
        color: rgba(179, 179, 182, 1);
        line-height: 40px;
      }
    }

    .operation {
      margin-left: 41px;
      .button {
        width: 80px;
        height: 44px;
        background: rgba(255, 255, 255, 1);
        border-radius: 10px;
        line-height: 44px;
        border: 2px solid #21426C;
        text-align: center;
        color: #21426C;
      }
    }
  }
</style>
