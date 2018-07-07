<template>
  <div class="container">
    <div class="titleList">
      <span class="title" v-for="(item,index) in titleList" v-bind:key="index+'ad'">{{item}}</span>
    </div>
    <div class="itemList">
      <div class="item" v-for="(item,index) in itemList" v-bind:key="index+'ad'">
        <div class="cell">{{item.data}}</div>
        <div class="cell">{{item.fild1}}</div>
        <div class="cell">{{item.fild2}}</div>
        <div class="cell">{{item.fild3}}</div>
        <div class="cell" :class="{rank:typeof item.fild4 ==='number'}">{{item.fild4}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RTable",
    data() {
      return {
        titleList: [
          '日期',
          '广告位',
          '全部赏金',
          '我的赏金',
          '我的排名',
        ],
        itemList: [
          {
            data: '2018.5.6',
            fild1: 'xxx广告位',
            fild2: '1200',
            fild3: '无',
            fild4: '无',
          },
          {
            data: '2018.5.6',
            fild1: 'xxx广告位',
            fild2: '1200',
            fild3: '无',
            fild4: 1,
          },
          {
            data: '2018.5.6',
            fild1: 'xxx广告位',
            fild2: '1200',
            fild3: '无',
            fild4: 2,
          },
          {
            data: '2018.5.6',
            fild1: 'xxx广告位',
            fild2: '1200',
            fild3: 7,
            fild4: '无',
          },
          {
            data: '2018.5.6',
            fild1: 'xxx广告位',
            fild2: '1200',
            fild3: '无',
            fild4: 10,
          },
          {
            data: '2018.5.6',
            fild1: 'xxx广告位',
            fild2: '1200',
            fild3: '无',
            fild4: 67,
          },
        ]
      }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    height: 700px;
    .titleList {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 60px;
      justify-content: space-around;
      .title {
        width: 100px;
        height: 23px;
        font-size: 24px;
        text-align: center;
        font-family: PingFang-SC-Medium;
        color: rgba(51, 51, 51, 1);
        line-height: 40px;
      }
    }
    .itemList {
      display: flex;
      flex-direction: column;
      .item {
        width: 750px;
        height: 100px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 1px 0px 0px rgba(229, 229, 229, 1);
        border-top: 1px solid rgba(229, 229, 229, 1);
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        text-align: center;
        .cell {
          width: 115px;
          height: 22px;
          font-size: 22px;
          font-family: PingFang-SC-Medium;
          color: rgba(122, 122, 123, 1);
          line-height: 40px;
        }
        .rank {
          color: #DBB177 !important;
        }
      }
    }
  }
</style>
