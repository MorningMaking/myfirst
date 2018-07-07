<template>
    <div class="homecontainer">
        <game-navbar></game-navbar>
        <personal-cen class="personalbox"/>
        <menu-tab class="menuitmes"></menu-tab>
        <msg-box/>
    </div>
</template>

<script>
import gameNavbar from '@/components/navBar'
import personalCen from '@/components/personalcen'
import menuTab from './menutab'
import msgBox from '@/components/messagebox'
 
export default {
    components:{
        gameNavbar,
        personalCen,
        menuTab,
        msgBox
    },
    mounted(){
       
    }
}
</script>

<style lang="less" scoped>
.homecontainer{
    display:flex;
    flex-direction: column;
    min-height: 100vh;
    .personalbox{
        margin:20px 0px;
        
    }
    .menuitmes{
        margin-bottom: 20px;
    }
}
</style>
