<template>
  <div class="container" @click="doSwitch">
    <div v-if="!isActive" class="text left">{{inactiveText}}</div>
    <div class="circular"></div>
    <div v-if="isActive" class="text">{{activeText}}</div>

  </div>
</template>

<script>

  export default {
    name: "ESwitch",
    props:{
      activeText:"",
      inactiveText:"",
    },
    data(){
      return {
        isActive:true
      }
    },
    methods:{
      doSwitch(){
        this.isActive = !this.isActive
        this.$emit('change',this.isActive)
      }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    flex-direction: row;
    width:160px;
    height:50px;
    background:rgba(33,66,108,1);
    border-radius:25px;
    .circular{
      width:40px;
      height:40px;
      background:rgba(255,255,255,1);
      border-radius: 50%;
      margin: 5px;
      position: relative;
    }
    .left{
      margin-left: 5px;
    }
    .text{
      width:110px;
      height:23px;
      font-size:24px !important;
      font-family:PingFang-SC-Medium;
      color:rgba(255,255,255,1);
      line-height:50px;
    }
  }
</style>
