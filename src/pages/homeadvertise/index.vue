<template>
    <div class="homeadcontainer">
        <home-adhead v-on:changecurtab="getcurtab"></home-adhead>
        <game-centerad v-if="curtabnum==1"></game-centerad> 
        <busy-centerad v-if="curtabnum==0"></busy-centerad>
    </div>
</template>

<script>
import gameCenterad from "./gamecenad";
import busyCenterad from "./busycenter";
import homeAdhead from "./homeadhead";
export default {
  data() {
    return {
      curtabnum: 0
    };
  },
  components: {
    gameCenterad,
    busyCenterad,
    homeAdhead
  },
  methods: {
    getcurtab(tabnum){
        console.log(tabnum)
        this.curtabnum = tabnum;
    }
  }
};
</script>

<style lang="less" scoped>
.homeadcontainer {
}
</style>
