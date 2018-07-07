<template>
  <div class="errorpagecontainer">
    <img src="../../assets/img/icon11.png" alt="">
    <span>{{noticetext}}</span>
    <div>
      <router-link to="/newroom" tag="span">
        创建
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "err802",
    data(){
      return{
        noticetext:'该房间已达最大人数'
      }
    }
  }
</script>


<style lang="less" scoped>
  .errorpagecontainer {
    height: 100vh;
    display: flex;
    background: #fff;
    flex-direction: column;
    align-items: center;
    > img {
      margin-top: 140px;
      width: 520px;
      height: 373px;
    }
    > span {
      margin-top: 33px;
      font-weight: bold;
      font-size: 36px;
      color: rgba(51, 51, 51, 1);
    }
    > div {
      margin-top: 100px;
      > span {
        font-size: 28px;
        color: rgba(255, 255, 255, 1);
        padding: 17px 53px;
        background: rgba(33, 66, 108, 1);
        border-radius: 10px;
      }
    }
  }
</style>
