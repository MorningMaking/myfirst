import Vue from 'vue'
import Router from 'vue-router'
import Home from 'pages/home/index'

import RewardAd from 'pages/rewardad/index'
import AdList from 'pages/rewardad/adlist/index'
import RewardList from 'pages/rewardad/rewardlist/index'
import Gamescore from 'pages/scorebord/index'
import Newroom from 'pages/room/newroom'
import Enterroom from 'pages/room/enterroom'
import Advertise from 'pages/advertise/index'
import ShareCode from 'pages/sharecode/index'
import Test from 'pages/test/index'
import homeAd from 'pages/homeadvertise/index'

//errorPage
import ErrorPage from 'pages/errorpage/index'
import err801 from 'pages/errorpage/err801'
import err802 from 'pages/errorpage/err802'
import err803 from 'pages/errorpage/err803'
import Room from 'pages/room/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {

      path: '/rewardad',
      name: 'RewardAd',
      component: RewardAd,
      children: [
        {
          path: 'adlist/:roomId',
          component: AdList
        },
        {
          path: 'rewardlist/:roomId',
          component: RewardList
        }
      ]

    },
    {
      path: '/room',
      name: 'Room',
      component: Room,
    },
    {
      path: '/gamescore/:roomId',
      name: 'Gamescore',
      component: Gamescore
    },
    {
      path: '/newroom',
      name: 'Newroom',
      component: Newroom
    },
    {
      path: '/enterroom',
      name: 'Enterroom',
      component: Enterroom
    },
    {
      path: '/advertise/:roomId',
      name: 'Advertise',
      component: Advertise
    },

    {
      path: '/errorpage',
      name: 'ErrorPage',
      component: ErrorPage,
      children: [
        {
          path: '801',
          component: err801
        },
        {
          path: '802',
          component: err802
        },
        {
          path: '803',
          component: err803
        },
      ]
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/homead',
      name: 'homeAd',
      component: homeAd
    }, {
      path: '/sharecode/:roomId',
      name: 'shareCode',
      component: ShareCode
    },

  ]
})
