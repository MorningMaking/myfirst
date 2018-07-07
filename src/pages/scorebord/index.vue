<template>
  <div class="scorecontainer">
    <heador @changecur="changecurtab"/>
    <!-- <keep-alive> -->
    <top-score :roomId="roomId" v-if="curtab==0"/>
    <grand-score :roomId="roomId" v-if="curtab==1"/>
    <compet-score :roomId="roomId" v-if="curtab==2"/>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
  import heador from "./header";
  import topScore from "./topscore";
  import grandScore from './grandscore';
  import competScore from './competscore'

  export default {
    data() {
      return {
        curtab: '0',
        roomId: ""
      };
    },
    created(){
      this.roomId = this.$route.params.roomId
    },
    mounted() {

    },
    components: {
      heador,
      topScore,
      grandScore,
      competScore
    },
    methods: {
      changecurtab(tabnum) {
        this.curtab = tabnum
      }
    }
  };
</script>

<style lang="less" scoped>
  .scorecontainer {
    min-height: 100vh;
   
  }
</style>
