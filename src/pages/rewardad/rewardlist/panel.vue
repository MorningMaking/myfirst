<template>
  <div class="container">
    <div class="header">
      <div class="icon">
        <img :src="itemData.img"/>
      </div>
      <div class="info">
        <span>赞助商：{{itemData.sponsors}}</span>
        <div class="fill"><span>赏金加注：</span><span>{{itemData.money}}元/个</span></div>
        <div class="tip">图片广告</div>
      </div>
    </div>
    <div class="table">
      <r-table></r-table>
    </div>
  </div>
</template>

<script>
  import RTable from "@/pages/rewardad/rewardlist/rtable";

  export default {
    components: {RTable},
    name: "panel",
    data() {
      return {
        sponsor: "王者荣耀游戏",

      }
    },
    props:{
      itemData:{
        type:Object,
        default:{}
      },
    }
  }
</script>

<style lang="less" scoped>
  .container {
    overflow: hidden;
    background: white;
    width: 750px;
    height: 858px;
    margin: 20px  0px 20px 0px;
    .header {
      display: flex;
      flex-direction: row;
      align-items: center;

      .icon {
        margin-top: 23px;
        margin-left: 30px;
        img {
          border-radius: 10px !important;
          margin-left: 20px;
          width: 120px;
          height: 120px;
        }
      }
      .info {
        margin-top: 23px;
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
    }
    .table{

    }
  }
</style>
