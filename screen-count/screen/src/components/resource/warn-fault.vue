<template>
  <div style="padding:.5rem;height:100%">
    <header style="margin-bottom:.3%; " class ='live-title'>
      <div>通知编号</div>
      <div class="text-center">频道名称</div>
      <div class="text-center">码频(kbps)</div>
      <div class="text-center">故障描述</div>
      <div class="text-right">开始时间</div>
    </header>
    <div v-for="item in msg" style="height: 16%;">
      <div  class="flex">
        <div class="text-indent" >{{item.id}}</div>
        <div class="text-center" >{{item.name}}</div>
        <div class="text-center"> {{item.kbps}}</div>
        <div class="text-center">{{item.fault}}</div>
        <div class="text-right">
          <img class='live-clock'src="../../assets/img/time.png" alt="">
          {{item.time}}</div>
      </div>
      <div  class="live-line live-line-gradient"></div>
    </div>


    <!--<div class="flex">-->
      <!--<div >都市资讯</div>-->
      <!--<div class="text-center">正常</div>-->
      <!--<div class="text-right">-->
        <!--<img class='live-clock'src="../../assets/img/time.png" alt="">-->
        <!--2018-01-13</div>-->
    <!--</div>-->
    <!--<div class="live-line live-line-gradient"></div>-->
    <!--<div class="flex">-->
      <!--<div >娱乐频道</div>-->
      <!--<div class="text-center">正常</div>-->
      <!--<div class="text-right">-->
        <!--<img class='live-clock'src="../../assets/img/time.png" alt="">-->
        <!--2018-01-13</div>-->
    <!--</div>-->
    <!--<div class="live-line live-line-gradient"></div>-->
    <!--<div class="flex">-->
      <!--<div >经济频道</div>-->
      <!--<div class="text-center">正常</div>-->
      <!--<div class="text-right">-->
        <!--<img class='live-clock'src="../../assets/img/time.png" alt="">-->
        <!--2018-01-13</div>-->
    <!--</div>-->
    <!--<div class="live-line live-line-gradient"></div>-->
<div class="pagination" style="text-align: right;margin-top: 1.5%">
  <span style="padding-right: 2rem">共计5条</span>
  <span @click="nextPage()"><img src="../../assets/img/first-page.png" alt=""></span>
  <span @click="nextPage()"><img src="../../assets/img/before.png" alt=""></span>
  <span @click="nextPage()" :class="fontColor==1?'font-color':null" class="page-num">1</span>
  <span @click="beforePage()" :class="fontColor==2?'font-color':null" class="page-num">2</span>
  <span @click="beforePage()"><img src="../../assets/img/next.png" alt=""> </span>
  <span @click="beforePage()"><img src="../../assets/img/last-page.png" alt=""> </span>
</div>
  </div>
</template>
<script>
  export default {
    name: 'live',

    data() {
      return{
//          backClock:require()
        fontColor:1,
        msg:[],
        message:[ {id:'005',
          name:'新闻综合',
          kbps:'2',
          fault:'推流故障,导致播放暂停',
          time:'2018-01-22 02:34:45'}],
        warning:[
          {id:'001',
          name:'新闻综合',
          kbps:'2',
          fault:'推流故障,导致播放暂停',
          time:'2018-01-19 12:34:15'},
          {id:'002',
            name:'新闻综合',
            kbps:'2',
            fault:'推流故障,导致播放暂停',
            time:'2018-01-19 15:14:15'},
          {id:'003',
            name:'生活频道',
            kbps:'2',
            fault:'阶段性黑屏导致视频无法播放',
            time:'2018-01-20 11:34:15'},
          {id:'004',
            name:'娱乐频道',
            kbps:'2',
            fault:'推流故障,导致播放暂停',
            time:'2018-01-21 08:14:15'}

        ]
      }
    },
    mounted() {
      this.msg = [...this.warning]
      console.log(this.msg)
    },
    methods:{
      beforePage(){
        this.fontColor =2
        this.msg = [...this.message]
      },
      nextPage(){
        this.fontColor =1
        this.msg = [...this.warning]
      }
    }
  }
</script>
<style scoped>
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
    overflow: hidden;
    white-space:nowrap;
    text-overflow: ellipsis;
  }
  .text-right{
    text-align: right;
  }
  .flex{
    display: flex;
    /*margin-top: 1%;*/
  }
  .flex>div{
    flex: 1;
    width: 100%;

  }
  .live-line{
    display: block;
    width: 100%;
    height:20% ;
    margin-top:.5%;
    border-radius: 10px;

  }
  .live-line-gradient{
    background: linear-gradient(to right, #5c9dfc, #48d6fd);
  }
  .live-clock{
    width:.9rem;
    height: .9rem;
  }
  .text-indent{
    text-indent: 1rem;
  }
  .pagination{
    position: absolute;
    bottom: 1.5%;
    right:35.5%;
    margin-right: .5rem;
    font-size: 1.1rem;
  }
  .pagination>span{
    cursor: pointer;
    margin: 0 .2rem;
  }
  .pagination img{
    width: .9rem;
    height: .9rem;
  }
.font-color{
  color: #ca1429;
}
</style>
