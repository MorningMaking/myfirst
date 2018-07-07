<template>
    <div class="menucontainer">
        <div class="rowcontainer">
            <div @click="jumpTo('/room')">

                <img src="@/assets/img/icon3.png" alt="">
                <span>房间</span>
            </div>
            <div @click="jumpTo('/homead')">
                <img src="@/assets/img/icon4.png" alt="">
                <span>广告</span>
            </div>
            <div @click="tokeeper(0)">
                <img src="@/assets/img/icon1.png" alt="">
                <span>赏金攻略</span>
            </div>
             <div @click="tokeeper(1)">
                <img src="@/assets/img/icon2.png" alt="">
                <span>赏金bug</span>
            </div>
             
        </div>
    </div>    
</template>

<script>
import User from "@/common/model/UserModel.js";
export default {
    data(){
        return {
            
        }
    },
    methods: {
        jumpTo(jumpurl) {
        this.$router.push(jumpurl);
        },
        tokeeper(routenum) {
            if(routenum==0){
                 window.location.href ="http://psaasweb.ccnfgame.com/center/#/storeCenter/strategy/?appid=" +User.appId +"&channelcode=" +User.channelCode;
            }
            else{
                 window.location.href ="http://psaasweb.ccnfgame.com/center/#/storeCenter/bugEntry/?appid=" +User.appId +"&channelcode=" +User.channelCode;
            }
        
        }
    },
    mounted() {

  }
};
</script>

<style lang="less" scoped>
.menucontainer {
  padding: 40px 0px;
  background: #fff;
  display: flex;
  flex-direction: column;
  .rowcontainer {
    display: flex;
    justify-content: flex-start;
    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      //  margin-bottom: 20px;
      > img {
        width: 80px;
        height: 80px;
        margin-bottom: 18px;
      }
      > span {
        font-size: 28px;
        color: rgba(179, 179, 182, 1);
      }
    }
  }
}
</style>


