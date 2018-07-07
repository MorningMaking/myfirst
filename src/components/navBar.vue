<template>
    <div class="navbarcontainer">
        <div class="lfpart">
            <span class="gamecen">水果世界</span>
            <img src="../assets/img/icon9.png" alt="">
        </div>
        <div class="rtpart">
            <span>游戏中心</span>
            <img src="../assets/img/icon8.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
  name: "navBar"
};
</script>

<style lang="less" scoped>
.navbarcontainer {
  height: 100px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px 20px 40px;
  box-sizing: border-box;
  // line-height: 100px;
  .lfpart {
    display: flex;
    align-items: center;
    .gamecen {
      //    width:304px;
      height: 60px;
      padding: 15px 89px;
      box-sizing: border-box;
      line-height: 31px;
    }
    > span {
      padding: 8px 56px;
      background: rgba(12, 45, 114, 1);
      border-radius: 10px;
      font-size: 32px;
      color: rgba(255, 255, 255, 1);
      margin-right: 20px;
    }
    > img {
      width: 86px;
      height: 64px;
    }
    .icon-wrapper {
      width: 86px;
      height: 64px;
      display: flex;
      justify-content: center;
      align-content: center;
      //  background: url("../img/icon/icon-im.png") 0 0 no-repeat;
      background-size: cover;
      text-align: center;
      position: relative;
      > span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -40%);
      }
    }
  }
  .rtpart {
    display: flex;
    align-items: center;
    > span {
      height: 44px;
      font-size: 32px;
      color: rgba(51, 51, 51, 1);
      line-height: 44px;
      margin-right: 8px;
    }
    > img {
      width: 28px;
      height: 16px;
    }
  }
}
</style>

