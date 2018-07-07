<template>
    <div class="personalcontainer">
       <div class="lfpart">

           <!-- <div  :style="{backgroundImage:'url('+require('../assets/img/shareSteward/icon-img.png')+')'}"></div> -->
           <img :src="userModel.headImage" alt="" class="image-file usersurface">
           <!-- <img src="../assets/img/shareSteward/icon-img.png" alt=""> -->
           <div class="socialdata">
               <h1 class="likedata">
                   <img src="../assets/img/shareSteward/icon03.png" alt="">
                   <span>点赞: 520</span>
               </h1>
               <h1 class="concerdata">
                   <img src="../assets/img/shareSteward/icon10.png" alt="">
                   <span>关注: 253</span>
               </h1>
           </div>
       </div>
       <div class="rtpart">
           <div class="enterapp">
               <img src="../assets/img/shareSteward/icon12.png" alt="">
               <span>进入应用</span>
           </div>
           <div class="impression">
               <img src="../assets/img/shareSteward/icon24.png" alt="">
               <span>印象管家</span>
           </div>
       </div>
    </div>
</template>

<script>

import User from '@/common/model/UserModel.js'
export default {
  name: "personalcen",
  data(){
      return{
          userModel:''
      }
  },
  created(){
   this.userModel=User
  }
};
</script>

<style lang="less" scoped>
.personalcontainer {
  height: 200px;
  background: #fff;
  padding: 20px 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .lfpart {
    display: flex;
    align-items: center;
    .usersurface {
      width: 140px;
      height: 140px;
      margin-right: 20px;
      border-radius: 50%;
    }
    .socialdata {
      display: flex;
      flex-direction: column;
      .likedata {
        display: flex;
        align-items: center;
        margin-bottom: 14px;
        > img {
          width: 26px;
          height: 28px;
          margin-right: 10px;
        }
        > span {
          height: 34px;
          font-size: 24px;
          color: rgba(51, 51, 51, 1);
          line-height: 34px;
        }
      }
      .concerdata {
        display: flex;
        align-items: center;
        > img {
          width: 30px;
          height: 26px;
          margin-right: 5px;
        }
        > span {
          height: 34px;
          font-size: 24px;
          color: rgba(51, 51, 51, 1);
          line-height: 34px;
        }
      }
    }
  }
  .rtpart {
    display: flex;
    align-items: center;
    .enterapp {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 38px;
      > img {
        width: 38px;
        height: 40px;
        margin-bottom:12px;
      }
      > span {
        height: 34px;
        font-size: 24px;
        color: rgba(219, 177, 119, 1);
        line-height: 34px;
      }
    }
    .impression {
      display: flex;
      flex-direction: column;
      align-items: center;
      > img {
        width: 44px;
        height: 40px;
        margin-bottom:12px;
      }
      > span {
        height: 34px;
        font-size: 24px;
        color: rgba(219, 177, 119, 1);
        line-height: 34px;
      }
    }
  }
}
</style>


