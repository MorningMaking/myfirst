<template>
    <div class="moneyadcontainer">
        <img src="http://apps-1255573444.file.myqcloud.com/gamecenter/default/moneyad.png" alt="">
    </div>
</template>

<script>
export default {
  data() {
    return {
      datarule: [
        "广告来自商业中心赞助商发布",
        "在广告加载后根据访问量由赞助商付费",
        "在赏金查看中可以看到自己的赏金",
        "赏金达到100元以上，可以提现",
        "每个广告设定访问量，达到后自动匹配下一个 广告，可以在广告查看中，选择接受的广告加载",
        "广告加载到房间游戏的再来页和复活页"
      ],
      roomId:''
    };
  },
  methods:{
    toBusinessad(){
      this.$router.push('/rewardad/adlist/'+this.roomId)
    }
  },
  mounted(){
    this.roomId=this.$route.params.roomId
  }
};
</script>

<style lang="less" scoped>
.moneyadcontainer {
  display: flex;
  background: #fff;
  flex-direction: column;
  flex: 1;
  align-items: center;
 // padding: 20px;
  >img{

    width: 750px;
  }
  > p {
    font-size: 32px;
    color: rgba(51, 51, 51, 1);
  }
  .ruledetail {
    margin-left: 63px;
    margin-right: 46px;
    > div {
      display: flex;
      > span {
        margin-top: 28px;
        font-size: 28px;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
  .confirmbtn {
    display: flex;
    justify-content: center;
    > span {
      font-size: 28px;
      color: rgba(255, 255, 255, 1);
      background:rgba(33,66,108,1);
      padding:6px 43px;
      border-radius: 10px;
      margin-top:58px;
    }
  }
}
</style>
