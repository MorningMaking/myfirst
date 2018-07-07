<template>
    <div class="showcontainer">
      <div class="roomtype">
          <div>
              <span :class="curtab==0?'curtype':''"  @click="changetab(0)">我创建的</span>
          </div>
          <div>
            <span :class="curtab==1?'curtype':''"  @click="changetab(1)">赏金房间</span>
          </div>
          <div>
            <span :class="curtab==2?'curtype':''"  @click="changetab(2)">我玩过的</span>
          </div>

      </div>
      <!-- <keep-alive>

      </keep-alive> -->
      <creater-room v-if="curtab==0"></creater-room>
      <money-room v-if="curtab==1"></money-room>
      <player-room v-if="curtab==2"></player-room>
      <share-mask v-if="showmask" @closemask="closesharemask"></share-mask>
    </div>       
</template>

<script>
import shareMask from "./mask";
import User from '@/common/model/UserModel.js'
import createrRoom from "./createrroom";
import playerRoom from "./playerroom";
import moneyRoom from './moneyroom'

export default {
  data() {
    return {
      gamelist: [],
      showmask: false,
      curtab: ''
    };
  },
  components: {
    shareMask,
    createrRoom,
    playerRoom,
    moneyRoom
  },
  methods: {
    closesharemask() {
      this.showmask = false;
    },
    changetab(tabnum){
      this.curtab=tabnum
      this.$emit('curtab',tabnum)
    }
  },
  mounted(){
    let tabnum=this.$route.query.tab
    this.curtab=tabnum?tabnum:0
  }
};
</script>

<style lang="less" scoped>
.showcontainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  .roomtype {
    display: flex;
    padding: 40px 0px;
    background: #fff;
    margin-top: 20px;
    > div {
      flex: auto;
      display: flex;
      justify-content: center;
      > span {
        height: 60px;
        box-sizing: border-box;
        text-align: center;
        padding: 0px 22px;
        font-size: 26px;
        color: rgba(12, 45, 114, 1);
        line-height: 60px;
        border: 2px solid rgba(12, 45, 114, 1);
        border-radius: 10px;
      }
      .curtype {
        color: #fff;
        background: rgba(12, 45, 114, 1);
      }
    }
  }
  .showbox {
    padding: 19px;
    height: 170px;
    box-sizing: border-box;
    margin: 20px 10px;
    background: #fff;
    border-radius: 10px;
    display: flex;
    .gamemsg {
      display: flex;
      align-items: center;
      .usermsg {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 9px;
        .usrimg {
          width: 100px;
          height: 100px;
          margin-bottom: 10px;
        }
        > span {
          height: 21px;
          font-size: 22px;
          color: rgba(179, 179, 182, 1);
          line-height: 21px;
        }
      }
      .gameabout {
        display: flex;
        flex-direction: column;
        > div {
          height: 23px;
          font-size: 24px;
          color: rgba(51, 51, 51, 1);
          line-height: 23px;
          margin-bottom: 15px;
        }
        .tintgray {
          font-size: 22px;
          color: rgba(179, 179, 182, 1);
          line-height: 40px;
        }
      }
    }
    .gameoperation {
      display: flex;
      .creteroper {
        display: flex;
        flex-direction: column;
        .creterrow {
          justify-content: flex-end;
          display: flex;
          > div {
            margin-left: 20px;
            padding: 10px 17px;
            height: 23px;
            font-size: 24px;
            color: rgba(12, 45, 114, 1) !important;
            line-height: 23px;
            border: 2px solid rgba(12, 45, 114, 1);
            border-radius: 10px;
            .labeloper {
              color: rgba(12, 45, 114, 1);
              text-decoration: none;
            }
          }
        }
        > div:first-child {
          margin-bottom: 34px;
        }
      }
      .playeroper {
        display: flex;
        flex-direction: column;
        > div {
          margin-left: 20px;
          padding: 10px 17px;
          height: 23px;
          font-size: 24px;
          color: rgba(12, 45, 114, 1);
          line-height: 23px;
          border: 2px solid rgba(12, 45, 114, 1);
          border-radius: 10px;
          .labeloper {
            color: rgba(12, 45, 114, 1);
            text-decoration: none;
          }
        }
        > div:first-child {
          margin-bottom: 34px;
        }
      }
    }
  }
}
</style>


<style>
.showcontainer .mint-cell-title {
  flex: 0;
}
.showcontainer .mint-cell-wrapper {
  padding: 0px;
  background-size: 120% 0px;
}

.showcontainer .mint-cell-wrapper .mint-cell-value {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.showcontainer .mint-cell-swipe-button {
  width: 100px;
  font-size: 32px;
  text-align: center;
  line-height: 170px;
}
</style>
