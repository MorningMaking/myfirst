<template>
  <div v-show="visible" class="pop-view" @click.stop="coverClick" @touchmove.prevent="">
    <div class="content" @click.stop="contentClick">
      <!-- swiper -->
      <swiper :options="swiperOption">
        <swiper-slide class="slide">
          <div class="cell">
            <img src="../../../static/img_05.png"/>
            <span>{{txt}}</span>
          </div>
        </swiper-slide>

        <swiper-slide>
          <div class="cell">
            <img src="../../../static/img_60.png"/>
            <span>{{txt}}</span>
          </div>
        </swiper-slide>

        <swiper-slide>
          <div class="cell">
            <img src="../../../static/img_59.png"/>
            <span>{{txt}}</span>
          </div>
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
  export default {
    name: "EImagePreview",
    props: {},
    data() {
      return {
        imageUrl: '',
        txt: '我是广告主题我是广告主题我是广告主题我是 我是广告主题广告主题。',
        visible: false,
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true
          }
        }
      }
    },
    methods: {
      coverClick() {
        this.visible = false
      },
      contentClick() {

      },
      show() {
        this.visible = true
      },
      hide() {
        this.visible = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .pop-view {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 1);
    z-index: 3000;
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
      width: 750px;
      .cell {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 750px;
          height: 500px;
        }
        span {
          text-align: center;
          width: 638px;
          font-size: 32px;
          font-family: PingFang-SC-Medium;
          color: rgba(255, 255, 255, 1);
          line-height: 40px;
          margin-top: 40px;
        }
      }
      .swiper-pagination {
        top: 460px;
      }
    }

  }

</style>
