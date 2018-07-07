<template>
  <div>
    <!--<canvas ref="canvasId" id="canvasId" width="350" height="583">-->

    <!--</canvas>-->

    <img :src="imgurl"/>
  </div>

</template>

<script>
  import QRCode from 'qrcode'
  import {SynthesisShare, SynthesisElement} from '@/common/library/Synthesis.js'

  export default {
    name: "index",
    data() {
      return {
        imgurl: '',
        ctx: null,
        canvas: '',
        imgdata: "",
        background: "",
        synthesisShare: null,
      }
    },
    async mounted() {
      // let canvas = document.createElement("canvas")
      // canvas.width = 350
      // canvas.height = 583
      // let ctx = canvas.getContext("2d")
      //
      // let bg = await this.loadImage('http://apps-1255573444.cosgz.myqcloud.com/gamecenter/default/qr_background_1.png')
      // let qrurl = await QRCode.toDataURL('https://apps-1255573444.file.myqcloud.com', {errorCorrectionLevel: 'H'})
      // let code = await this.loadImage(qrurl)
      // let head = await this.loadImage('https://thirdwx.qlogo.cn/mmopen/vi_32/zsqUykGFlPicUFB1EGhPyFSot0nX49wEr1jdI59n5ZYor9gFzEap8FQm05dOzWblsUHgv3ibzbWIy4xpBgR0j59Q/132')
      // ctx.drawImage(bg, 0, 0, 350, 583)
      // ctx.drawImage(code, 14, 477, 81, 81)
      // ctx.drawImage(head, 4, 281, 56, 56)
      //
      // this.imgurl = canvas.toDataURL('image/png')
      this.testSynthesis()
    },
    methods: {
      loadImage(url) {
        return new Promise((resolve, reject) => {
          let img = new Image();
          img.setAttribute('crossOrigin', '*');
          if (!url) {
            reject('err')
          }
          img.src = url
          img.onload = () => {
            resolve(img)
          }
        })
      },
      async testSynthesis() {
        let w = 700
        let h = 1166
        this.synthesisShare = new SynthesisShare(w, h)
        let es = []
        let bgEle = await this.getSynthesisElement('http://apps-1255573444.cosgz.myqcloud.com/gamecenter/default/qr_background_1.png', 0, 0, 700, 1166)
        es.push(bgEle)
        let qrurl = await QRCode.toDataURL('https://apps-1255573444.file.myqcloud.com', {errorCorrectionLevel: 'H'})
        let qrEle = await this.getSynthesisElement(qrurl, 28, 954, 162, 162)
        es.push(qrEle)
        let headEle = await this.getSynthesisElement('https://thirdwx.qlogo.cn/mmopen/vi_32/zsqUykGFlPicUFB1EGhPyFSot0nX49wEr1jdI59n5ZYor9gFzEap8FQm05dOzWblsUHgv3ibzbWIy4xpBgR0j59Q/132', 8, 562, 112, 112)
        es.push(headEle)

        this.imgurl = this.synthesisShare.synthesisImage(es)
      },
      async getSynthesisElement(url, x, y, w, h) {
        let e = new SynthesisElement()
        await e.init(url, x, y, w, h)
        return e
      }
    }
  }
</script>

<style lang="less" scoped>
  #canvasId {
    width: 700px;
    height: 1166px;
  }
</style>
