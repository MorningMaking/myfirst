<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import User from '@/common/model/UserModel.js'
  import {shareEntry} from '@/common/api/wxshare'

  export default {
    name: 'App',
    created() {
      this.initUser()
    },
    mounted() {
      shareEntry().then(data => {
        console.log(data);
      }).catch(err=>{
        console.log(err);
      })
    },
    methods: {
      initUser() {
        let token = this.$route.query.token
        User.init(token)
      }
    }
  }
</script>

<style>
  @import "./assets/style/normalize.less";
  @import "./assets/style/common.less";

  #app {

  }
</style>
