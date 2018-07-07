<template>
   <div class="maskcontainer" @click="handelclick">
       <div>
           <img src="../../assets/img/icon5.png" alt="" class="noticeimg">
       </div>
       
    </div> 
</template>

<script>
export default {
  methods:{
    handelclick(){
      this.$emit('closemask')
    }
  }
};
</script>

<style lang="less" scoped>
.maskcontainer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    .noticeimg {
      width: 660px;
      height: 438px;
    }
  }
}
</style>
