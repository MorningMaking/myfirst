<template>
    <div class="homeadheadcon">
        <div class="tabtype">
          <div>
              <span :class="curtab==0?'curtype':''"  @click="changetab(0)">商业中心</span>
          </div>
          <div>
            <span :class="curtab==1?'curtype':''"  @click="changetab(1)">游戏中心</span>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      curtab: 0
    };
  },
  methods: {
    changetab(tabnum) {
      this.curtab = tabnum;
      this.$emit("changecurtab", tabnum);
    }
  }
};
</script>

<style lang="less" scoped>
.homeadheadcon {
  margin-bottom: 20px;
  .tabtype {
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
}
</style>
