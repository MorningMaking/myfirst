<template>
    <div class="axiscontainer">
        <!-- 放到msgbox组件中去 -->
        <div class="outercirecl">
            <div class="middlecircle">
                <div class="innercircle">
                </div>
            </div>
        </div>
        <p class="timeline" >
        </p>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.axiscontainer {
  .outercirecl {
    width: 28px;
    height: 28px;
    background: rgba(12, 45, 114,.6);
    border-radius: 50%;
    .middlecircle {
      width: 20px;
      height: 20px;
      background: rgba(12, 45, 114,.7);
      border-radius: 50%;
      transform: translate(4px,4px);
      .innercircle {
        width: 12px;
        height: 12px;
        background: rgba(12, 45, 114, 1);
        border-radius: 50%;
        transform: translate(4px,4px);
      }
    }
  }
  .timeline{
      height: 100%;
      width:4px;
      background:rgba(12, 45, 114,1);
      transform: translate(12px,-14px);
  }
}
</style>
