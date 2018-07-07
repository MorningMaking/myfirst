<template>
    <div class="newroomcontainer">
        <div class="roomthumnail">
            <img :src="roomImage" alt="">
             <input type="file" ref="imagePut" @change="changeImage($event)" style="display:none"
           accept="image/gif,image/jpeg,image/jpg,image/png"/>
            <div class="changemask"  @click="toggleImg">
                    <span>更换</span>
             </div>
            <span>房间形象/添加图片</span>
        </div>
        <div class="roomdetail">
            <div>
                <h1>房间名称:</h1>
                <input type="text" placeholder="请输入房间名称" maxlength="16" v-model="roomName">
                <span>{{roomName.length+'/16'}}</span>
            </div>
            <div>
                <h1>房间人数:</h1>
                <input type="number" placeholder="请输入房间人数" maxlength="16" v-model="roomNum" ref="roomnumber">
            </div>
            <!-- <div>
                <h1>房间名称:</h1>
                <input type="text" placeholder="请输入房间名称" maxlength="4" v-model="roomcode">
                <span>{{roomname.length+'/4'}}</span>
            </div> -->
        </div>
        <div class="competeset">
          <div class="competescore">
                <mt-switch v-model="isRelive">
                    <span v-if="isRelive" class="openscore">开</span>
                    <span v-if="!isRelive" class="closesocre">关</span>
                </mt-switch>
                <span>复活技能</span>
            </div>
            <div class="competescore">
                <mt-switch v-model="competescore" @change="roomScore=1">
                    <span v-if="competescore" class="openscore">开</span>
                    <span v-if="!competescore" class="closesocre">关</span>
                </mt-switch>
                <span>竞赛对战</span>
            </div>
            
            <div class="scorerule" v-if="competescore">
                <h1>积分规则:</h1>
                <div>一轮每人
                    <input type="number" placeholder="点击输入" v-model="roomScore" ref="roomscore">
                    积分
                </div>
            </div>
            <div class="winnerrule"  v-if="competescore">
                <div>赢家规则:</div>
                <div>每天24:00确定房间所有轮中的最高积分者为赢家。赢家 获取所竞赛的积分。</div>
            </div>
        </div>
        <div class="completeroom" @click="createroom">
            <span>完成</span>     
        </div>
    </div>
</template>

<script>
import { Switch } from "mint-ui";
import { imageUpload } from "@/common/api/imageUpload";
import { createNewRoom } from "@/common/api/room";
import { MessageBox } from "mint-ui";
import {defaultRoomIcon} from '@/common/config/index'
export default {
  data() {
    return {
      roomName: "",
      roomNum: "",
      roomcode: "",
      competescore: false,
      roomImage: "",
      roomScore: 1,
      isRelive:false
    };
  },
  methods: {
  async createroom() {
      let roomScore = this.competescore? this.roomScore : 0;
      if (this.roomName == "") {
        MessageBox("提示", "房间名字不能为空");
      } else {
        let numcheck=/^[1-9]*[1-9][0-9]*$/;
       if(this.roomNum!=""&&!numcheck.test(this.roomNum)){
          MessageBox("提示", "请填写正确的房间人数");
       }else if(this.roomScore!=""&&!numcheck.test(this.roomScore)){
           MessageBox("提示", "请输入大于0的整数个积分");
       }else{
          await createNewRoom(this.roomImage, this.roomName, this.roomNum, roomScore,this.isRelive?1:0);
          this.$router.push("/room");
       }
       
      }
    },
    toggleImg() {
      this.$refs.imagePut.click();
    },
    async changeImage(e) {
      let file = e.target.files[0];
      imageUpload(file).then(res => {
        this.roomImage = "https://" + res;
      });
    },
    
  },
  mounted(){
      this.roomImage=defaultRoomIcon
  }

};
</script>

<style lang="less" scoped>
.newroomcontainer {
  .roomthumnail {
    padding: 41px 0px;
    background: #fff;
    margin: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    > img {
      width: 201px;
      height: 201px;
      margin-bottom: 19px;
      border-radius: 10px;
    }
    > span {
      font-size: 28px;
      color: rgba(179, 179, 182, 1);
      line-height: 9px;
    }
    .changemask {
      position: absolute;
      width: 201px;
      height: 201px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      top: 40px;
      display: flex;
      justify-content: center;
      > span {
        margin-top: 74px;
        color: #fff;
        font-size: 36px;
        height: 60px;
        line-height: 60px;
        color: rgba(255, 255, 255, 1);
        padding: 0px 35px;
        border: 2px solid #fff;
        border-radius: 10px;
      }
    }
  }
  .roomdetail {
    margin-bottom: 20px;
    > div {
      display: flex;
      align-items: center;
      height: 100px;
      padding: 0px 19px;
      background: #fff;
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      > h1 {
        font-size: 32px;
        color: rgba(51, 51, 51, 1);
        //  line-height: 9px;
        margin-right: 20px;
      }
      input {
        flex: 2;
        font-size: 32px;
      }
      > span {
        font-size: 32px;
        color: rgba(179, 179, 182, 1);
        // line-height: 9px;
      }
    }
  }
  .competeset {
    .competescore {
      margin:20px 0px;
      display: flex;
      align-items: center;
      height: 100px;
      padding: 25px 40px;
      box-sizing: border-box;
      background: #fff;
      position: relative;
      > span {
        margin-left: 10px;
        font-size: 28px;
        color: rgba(179, 179, 182, 1);
      }
      .openscore {
        position: absolute;
        left: 15px;
        top: 0;
        color: #fff;
      }
      .closesocre {
        position: absolute;
        right: 30px;
        top: 0;
        color: #fff;
      }
    }
    .scorerule {
      border-top: 1px solid rgba(229, 229, 229, 1);
      align-items: center;
      display: flex;
      height: 100px;
      padding: 0px 19px;
      background: #fff;
      margin-bottom: 10px;
      > h1 {
        font-size: 32px;
        color: rgba(51, 51, 51, 1);
      }
      > div {
        display: flex;
        align-items: center;
        font-size: 32px;
        color: rgba(179, 179, 182, 1);

        input {
          margin: 0px 10px;
          text-align: center;
          width: 120px;
          height: 50px;
          border-radius: 4px;
          font-size: 22px;
          border: 2px solid rgba(179, 179, 182, 1);
        }
      }
    }
    .winnerrule {
      > div {
        padding: 26px 19px;
        font-size: 28px;
        color: rgba(51, 51, 51, 1);
        background: #fff;
        border-bottom: 1px solid rgba(229, 229, 229, 1);
      }
    }
  }
  .completeroom {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    > span {
      background: rgba(12, 45, 114, 1);
      border-radius: 10px;
      font-size: 36px;
      color: rgba(255, 255, 255, 1);
      padding: 10px 215px;
    }
  }
}
</style>

<style>
.newroomcontainer .mint-switch .mint-switch-core {
  width: 78px;
  height: 40px;
  background: rgba(12, 45, 114, 1) !important;
  border-radius: 200px;
  border: 0;
}
.mint-switch .mint-switch-core:after {
  width: 38px;
  height: 38px;
  border-radius: 200px;
  background: rgba(255, 255, 255, 1);
  left: 2px;
  transform: translateX(-2px);
}
.mint-switch .mint-switch-core:before {
  width: 78px;
  height: 40px;
  border-radius: 200px;
  background-color: rgba(179, 179, 182, 1);
}
</style>
