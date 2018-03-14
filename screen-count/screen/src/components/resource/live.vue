<template>
<div style="padding:.5rem;height:100%">
  <header class ='live-title'>
    <div>频道名称</div>
    <div class="text-center">状态</div>
    <div class="text-right">开创时间</div>
  </header>
  <div class="flex">
    <div >新闻综合</div>
    <div class="text-center">播放中</div>
    <div class="text-right">
      <img class='live-clock'src="../../assets/img/time.png" alt="">
      2018-01-13</div>
  </div>
  <div class="live-line live-line-gradient"></div>
  <div class="flex">
    <div >都市资讯</div>
    <div class="text-center">正常</div>
    <div class="text-right">
      <img class='live-clock'src="../../assets/img/time.png" alt="">
      2018-01-13</div>
  </div>
  <div class="live-line live-line-gradient"></div>
  <div class="flex">
    <div >娱乐频道</div>
    <div class="text-center">正常</div>
    <div class="text-right">
      <img class='live-clock'src="../../assets/img/time.png" alt="">
      2018-01-13</div>
  </div>
  <div class="live-line live-line-gradient"></div>
  <div class="flex">
    <div >经济频道</div>
    <div class="text-center">关闭</div>
    <div class="text-right">
      <img class='live-clock'src="../../assets/img/time.png" alt="">
      2018-01-13</div>
  </div>
  <div class="live-line opacity-backgroundstyle"></div>
  <div class="flex">
    <div >生活频道</div>
    <div class="text-center">关闭</div>
    <div class="text-right">
      <img class='live-clock'src="../../assets/img/time.png" alt="">
      2018-01-13</div>
  </div>
  <div class="live-line opacity-backgroundstyle"></div>
</div>
</template>
<script>
  export default {
    name: 'live',

    data() {
        return{
//          backClock:require()
        }
    }
  }
</script>
<style>
.opacity-backgroundstyle{background-color: rgba(128, 200, 212, 0.2)}
.live-title{
  display: flex;
  padding-bottom: .1rem;
  border-bottom: 1px solid rgba(234,233,233,.3);

}
.live-title>div{
  flex: 1;
}
  .text-center{
    text-align: center;
  }
  .text-right{
    text-align: right;
  }
  .flex{
    display: flex;
    margin-top: 1%;
  }
.flex>div{
  flex: 1;
  width: 100%;

}
  .live-line{
    display: block;
    width: 100%;
    height:4% ;
    margin-top:1%;
    border-radius: 10px;

  }
  .live-line-gradient{
    background: linear-gradient(to right, #5c9dfc, #48d6fd);
  }
  .live-clock{
    width:.9rem;
    height: .9rem;
  }
</style>
