<template>
    <div class="msgcontainer">
        <h1>消息</h1>
        <div v-for="(val,index) in msglist" :key="index">
            <div class="msgtime">
                <h1>{{timestampToTime(val.createTime*1000,1)}}</h1>
                <p>{{timestampToTime(val.createTime*1000,0)}}</p>
            </div>
            <div class="axiscontainer">
              <div class="outercirecl">
                  <div class="middlecircle">
                      <div class="innercircle">
                      </div>
                  </div>
              </div>
              <p class="timeline" v-if="index<msglist.length-1">
              </p>
          </div>
            <div class="msgcontent">
              <img :src="val.pointImage" class="usersurface image-file" alt="">
                <!-- <img src="../assets/img/shareSteward/img_59.png" alt=""> -->
                <div>
                    <h1>{{val.pointTitle}}</h1>
                    <span>{{val.pointDesc}}</span>
                </div>
            </div>
        </div>
        <mugen-scroll :handler="fetchData" :should-handle="!loading" v-if="msglist.length != 0">
         
        </mugen-scroll>
    </div>
</template>

<script>
import { getMessageList } from "@/common/api/home";
import MugenScroll from "vue-mugen-scroll";
export default {
  name: "msgbox",
  components: {
    MugenScroll
  },
  data() {
    return {
      msglist: [],
      loading: false,
      temppg: 1,
      scrollflag: 1,
      shownotice: "加载中"
    };
  },
  mounted() {
    getMessageList().then(res => {
      this.msglist = res.data;
      //    console.log(this.msglist)
    });
  },
  methods: {
    timestampToTime(timestamp, type) {
      var date = new Date(timestamp * 1); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + ".";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + ".";
      var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      if (type == 0) {
        return Y + M + D;
      } else {
        return h + m;
      }
    },
    fetchData() {
      this.loading = true;
      //  if(document.body.scrollHeight-(document.documentElement.scrollTop+document.documentElement.clientHeight)==0){
      this.temppg++;
      console.log(this.temppg);
      if (this.temppg > 1 && this.scrollflag == 1) {
        // console.log(this.scrollflag)
        getMessageList(5, this.temppg).then(res => {
          for (let i = 0; i < res.data.length; i++) {
            this.msglist.push(res.data[i]);
          }
          if (res.data.length < 5) {
            this.scrollflag = 0;
            this.shownotice = "没有更多";
          }
        });
      }
      //  }
      this.loading = false;
    }
  }
};
</script>

<style lang="less" scoped>
.msgcontainer {
  padding: 18px;
  background: #fff;
  flex: 1;
  > h1 {
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    padding: 27px 0px;
    height: 100px;
    font-size: 28px;
    color: rgba(51, 51, 51, 1);
    line-height: 28px;
    margin-bottom: 22px;
  }
  div:last-child {
    .msgcontent {
      border: 0;
    }
  }
  > div {
    display: flex;
    .msgtime {
      display: flex;
      flex-direction: column;
      margin-left: 38px;
      margin-right: 8px;
      > h1 {
        height: 24px;
        font-size: 30px;
        color: rgba(179, 179, 182, 1);
        line-height: 24px;
        margin-bottom: 10px;
        text-align: center;
      }
      > p {
        height: 18px;
        font-size: 18px;
        color: rgba(179, 179, 182, 1);
        line-height: 18px;
      }
    }
    .axiscontainer {
      .outercirecl {
        width: 28px;
        height: 28px;
        background: rgba(12, 45, 114, 0.6);
        border-radius: 50%;
        .middlecircle {
          width: 20px;
          height: 20px;
          background: rgba(12, 45, 114, 0.7);
          border-radius: 50%;
          transform: translate(4px, 4px);
          .innercircle {
            width: 12px;
            height: 12px;
            background: rgba(12, 45, 114, 1);
            border-radius: 50%;
            transform: translate(4px, 4px);
          }
        }
      }
      .timeline {
        height: 100%;
        width: 4px;
        background: rgba(12, 45, 114, 1);
        transform: translate(12px, -14px);
      }
    }
    .msgcontent {
      display: flex;
      //    height: 138px;
      box-sizing: border-box;
      padding: 20px 0px;
      margin-left: 20px;
      border-bottom: 2px solid #ddd;
      .usersurface {
        width: 90px;
        height: 90px;
        margin-right: 20px;
      }
      > div {
        display: flex;
        flex-direction: column;
        width: 400px;
        //  overflow: hidden;
        > h1 {
          height: 28px;
          font-size: 28px;
          color: rgba(51, 51, 51, 1);
          line-height: 28px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        > span {
          // height: 100px;
          font-size: 24px;
          color: rgba(179, 179, 182, 1);
          line-height: 32px;
          // white-space: nowrap;
          // overflow: hidden;
          // text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
