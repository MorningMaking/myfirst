<template>
    <div class="adheadcontainer">
        <div @click="changebord(0)">
            <p :class="currenttab==0?'currentbord':''">自设广告</p>
        </div>
        <div @click="changebord(1)">
            <p :class="currenttab==1?'currentbord':''">赏金广告</p>
        </div>
    </div>    
</template>

<script>

export default {
  data() {
    return {
      currenttab: 0
    };
  },
  methods: {
    changebord(tabnum) {
      this.currenttab = tabnum;
     this.$emit('changeadcur',tabnum)
   //   this.setIsMyBord(tabnum);
    },
  },

};
</script>

<style lang="less" scoped>
.adheadcontainer {
  margin: 20px 0px;
  padding: 40px 0px;
  margin-bottom:20px;
  background: #fff;
  display: flex;
  justify-content: center;
//   flex: 1;
  > div {
    flex: auto;
    // height: 60px;

    > p {
      margin: 0 auto;
      width: 166px;
      height: 60px;
      padding: 17px 24px;
      border: 2px solid rgba(12, 45, 114, 1);
      font-size: 28px;
      color: rgba(12, 45, 114, 1);
      line-height: 22px;
      border-radius: 10px;
      box-sizing: border-box;
    }
    .currentbord {
      background: rgba(12, 45, 114, 1);
      color: #fff;
    }
  }
}
</style>
