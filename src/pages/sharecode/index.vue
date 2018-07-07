<template>
  <div class="container">
    <div class="main">
      <img v-if="previewImg" :src="previewImg"/>
      <div class="tip">（长按保存图片，可从相册选择保存的图片分享）</div>
    </div>
    <div class="palace">
      <div :class="{activity:currIndex===index}" class="palace-item" v-for="(item,index) in images"
           v-bind:key="index + ''" @click="changePreview(index)">
        <img :src="item"/>
      </div>
    </div>
  </div>
</template>

<script>
  import QRCode from 'qrcode'
  import {SynthesisShare, SynthesisElement} from '@/common/library/Synthesis.js'
  import User from "@/common/model/UserModel.js"
  import {wxentry} from '@/common/config/index.js'

  export default {
    name: "shareCode",
    data() {
      return {
        bgs: [
          'http://apps-1255573444.cosgz.myqcloud.com/gamecenter/default/qr_background_1.png',
          'http://apps-1255573444.cosgz.myqcloud.com/gamecenter/default/qr_background_1.png',
          'http://apps-1255573444.cosgz.myqcloud.com/gamecenter/default/qr_background_1.png',
          'http://apps-1255573444.cosgz.myqcloud.com/gamecenter/default/qr_background_1.png',
          'http://apps-1255573444.cosgz.myqcloud.com/gamecenter/default/qr_background_1.png',
          'http://apps-1255573444.cosgz.myqcloud.com/gamecenter/default/qr_background_1.png',
          'http://apps-1255573444.cosgz.myqcloud.com/gamecenter/default/qr_background_1.png',
          'http://apps-1255573444.cosgz.myqcloud.com/gamecenter/default/qr_background_1.png',
          'http://apps-1255573444.cosgz.myqcloud.com/gamecenter/default/qr_background_1.png',
          'http://apps-1255573444.cosgz.myqcloud.com/gamecenter/default/qr_background_1.png',
        ],
        images: [],
        currIndex: 0,
        previewImg: '',
        synthesisShare: null,
        roomId: ""
      }
    },
    mounted() {
      this.roomId = this.$route.params.roomId
      this.createImages()
    },
    methods: {
      async createImages() {
        try {
          let head = User.headImage.replace('http://', 'https://')
          let w = 700
          let h = 1166
          this.synthesisShare = new SynthesisShare(w, h)

          for (let i = 0; i < this.bgs.length; i++) {
            let bg = this.bgs[i]
            let l = await this.doSynthesis(
              bg,
              wxentry + '?roomId=' + this.roomId,
              head
            )

            this.images.push(l)
          }
          this.previewImg = this.images[0]
        } catch (err) {
          console.log(err);
        }
      },
      async doSynthesis(bg, qr, head) {
        let es = []
        let bgEle = await this.getSynthesisElement(bg, 0, 0, 700, 1166)
        es.push(bgEle)
        let qrurl = await QRCode.toDataURL(qr, {errorCorrectionLevel: 'H'})

        let qrEle = await this.getSynthesisElement(qrurl, 28, 954, 162, 162)
        es.push(qrEle)
        let headEle = await this.getSynthesisElement(head, 8, 562, 112, 112)
        es.push(headEle)

        let result = this.synthesisShare.synthesisImage(es)

        // console.log(result);
        return result
      },
      async getSynthesisElement(url, x, y, w, h) {
        let e = new SynthesisElement()
        await e.init(url, x, y, w, h)
        return e
      },
      changePreview(index) {
        this.currIndex = index
        this.previewImg = this.images[index]
      }
    },
  }
</script>

<style lang="less" scoped>
  .container {
    background: white;
    height: 1334px;
    .main {

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        margin-top: 40px;
        width: 350px;
        height: 583px;
      }
      .tip {
        margin-top: 10px;
        height: 21px;
        font-size: 20px;
        font-family: PingFang-SC-Medium;
        color: rgba(51, 51, 51, 1);
        line-height: 40px;
      }
    }
    .palace {
      width: 750px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      height: auto;
      flex-wrap: wrap;
      margin-top: 40px;
      .palace-item {
        margin-top: 20px;
        margin-right: 10px;
        width: 120px;
        height: 200px;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 120px;
          height: 200px;
        }
      }
      .activity {
        border: 2px red solid;
      }
    }
  }
</style>
