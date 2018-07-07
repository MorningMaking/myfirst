<template>
  <div class="container">
    <panel v-for="(item ,index) in adList" v-bind:key="index+'aa'" :itemData="item"></panel>
  </div>
</template>

<script>
  import Panel from "@/pages/rewardad/rewardlist/panel";
  import {rewardList} from '@/common/api/reward'

  export default {
    components: {Panel},
    name: "RewardList",
    data() {
      return {
        adList: [],
        roomId: ''
      }
    },
    mounted() {
      // this.adList = [1, 2, 3, 4, ],
      this.roomId = this.$route.params.roomId
      rewardList(this.roomId, 5, 1).then(res => {
        this.adList = res.data
      })
    }
  }
</script>

<style scoped>

</style>
