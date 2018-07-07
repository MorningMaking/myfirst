import flexible from 'lib-flexible'
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import './assets/style/mintui.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import store from './vuex/store'

Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(VueAwesomeSwiper, /* { default global options } */)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
