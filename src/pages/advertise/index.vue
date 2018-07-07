<template>
    <div class="adervertisecontainer">
        <ad-head @changeadcur="changeadtab"></ad-head>
        <keep-alive>
              <component :is="current"></component>
        </keep-alive>
    </div>
</template>

<script>
import adHead from './adhead'
import selfAdvertise from './selfadvertise'
import moneyAdvertise from './moneyad'
export default {
  name: "advertise",
  components:{
      adHead,
      selfAdvertise,
      moneyAdvertise
  },
  data() {
    return {
        adtab:0,
         current:'selfAdvertise',
    };
  },
  methods:{
      changeadtab(tabnum){
          this.adtab=tabnum;
           if(tabnum==0){
          //      this.curtab=0
                this.current='selfAdvertise'
            }else if(tabnum==1){
                this.current='moneyAdvertise'
              //  this.curtab=1
            }
      }
  }
};
</script>

<style lang="less" scoped>
.adervertisecontainer{
    display: flex;
    flex-direction: column;
   min-height: 100vh;
}
</style>
