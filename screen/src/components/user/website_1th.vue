<template>
  <div class="lists ">
    <div class="" id="website" :style="{width: '100%', height: '90%'}"></div>

    <div class="lists-right-website">
      <div style="background-color: rgba(213,213,213,.3)" class="count-install">
        <h1>
          累计PV：{{install[0]}}
          <!--累计PV:暂无数据-->
        </h1>
        <div style="background-color: #666;z-index: 5;width:80%">
          <div name="count" id="install2" class="prediction-linear-user"></div>
        </div>
      </div>
      <div class="count-install">
        <h1>
          累计UV：{{install[1]}}
          <!--累计UV:暂无数据-->
        </h1>
        <div style="background-color: #666;width:80%">
          <div name="count" id="start-up2" class="prediction-linear-user"></div>
        </div>
      </div>
      <div class="count-install">
        <h1>
          累计IP：{{install[2]}}
          <!--累计IP:暂无数据-->
        </h1>
        <div style="background-color: #666;width:80%">
          <div  name="count" id="regist2" class="prediction-linear-user"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  //  let clue = require('../../json/clue.json')
  //  import leiji from './leiji'
  import bus from './../../js/eventBus.js'

  export default {
    name: 'website',
    components:{
    },
    data () {
      return {
        message:{a:12},
        option:{
//          color: [ '#47abdc', '#1F6AEE'],
          color: [ '#1F6AEE'],
          textStyle: {
            color: '#fff'
          },
          legend: {
            orient: 'vertical', // 图例列表的布局朝向。
            x: 'right',
            y: 'bottom',
            textStyle: {
              color: '#fff'
            },
            data: [ 'PC', '移动']
          },
          series: [
            {
//              name: '任务统计',
              type: 'pie',
              radius: ['50%', '70%', '40%'], // 圆环
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  formatter: ' {d}%',
                  textStyle: {
                    fontSize: '14',
                    fontWeight: 'bold'
                  }
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '16',
                    fontWeight: 'bold'
                  }
                }
              },  // 折线
              labelLine: {
                normal: {
                  show: true
                }
              },  // 移入之后折线
              data: [
                {value: 400, name: 'PC'},
                {value: 400, name: '移动'}
              ]
            }
          ]
        },
//        lists: clue.data,
        install: [232, 232, 232]
      }
    },
    created () {
    },
    mounted () {
      let clientW = window.innerWidth
      let clientH = window.innerHeight
      this.getId('website').style.width=clientW*0.46/2.2+ 'px'
      this.getId('website').style.height=clientH*0.26+ 'px'
      this.drawLine()
      let self = this
      bus.$on('msg',function(res){
        console.log(res)
        self.message = res
      })
      this.setHeight()
      setTimeout(this.getWidth,500)
    },
    computed: {
    },
    methods:{
      getWidth() {

        this.setHeight()
      },
      setHeight() {
        let that = this
        console.log(that.message)
//        this.message.web_uv_accumulate
        this.install.splice(0, 3, this.message.web_pv_accumulate , this.message.web_uv_accumulate ,this.message.web_ip_accumulate)
        console.log(this.install)
        let maxValue = Math.max(...this.install);
        if (maxValue > 0) {
          this.getId('install2').style.width = (this.install[0] / maxValue) * 100 + '%'||30+'px'
          this.getId('start-up2').style.width = this.install[1] / maxValue * 100 + '%'||30+'px'
          this.getId('regist2').style.width = this.install[2] / maxValue * 100 + '%'||30+'px'
        } else {
          let countWidth = document.getElementsByName('count')
          for (let i of countWidth) {
            i.style.width = 2 + 'px'
          }
        }
      },
      drawLine () {
        let myChart = this.$echarts.init(document.getElementById('website'))
        // 绘制图表
        window.resize=function(){
          myChart.resize()
        }
        myChart.setOption(this.option)
      }
    },
    watch: {
      message:{
        handler: function (newValue,oldValue) {
          this.getWidth()
          console.log(3243242342343243)
        },
        deep: true
      }
    }
  }
</script>
<style  scoped>
  .lists{
    width: 100%;
    height: 100%;
    padding: 5px;
    display: flex;
    overflow: hidden;}
  .contents{
    height: 100% ;
    width: 100%;
  }
  .grayscale{
    -webkit-filter:grayscale(1);
  }

  .lists div{
    flex:1;
    width: 100%;
    overflow: hidden;
  }
  .lists {
    width: 100%;
    height: 100%;
    flex-basis: 100%;
    position: relative;
    padding: 5px;
    overflow: hidden;
  }

  .lists > div {
    width: 50%;
    float: left;
    overflow: hidden;
  }

  .contents > #website {
    /*min-width: 200px;*/
    color: red;
  }

  .lists-right-website {;
    padding: 3% 20px;
  }
  .count-install {
    /*flex-direction: column;*/
    height: 25%;
    padding:2% 3% 0 5%;
    margin :3% 25% 0 10%;
    overflow: hidden;
    border-radius: 5px;
  }
  .count-install:hover{
    background-color: rgba(147, 148, 149, 0.2);
  }
  .count-install  div {
    border-radius: 6px;
    height: 12px;
    /*width: 80%!important;*/
    position: relative;
    top:5%;
  }
  .count-install> div> div{
    position:absolute;
  }
  h1 {
    font-size: 18px;
  }

  .prediction-linear-user {
    display: inline-block;
    z-index: 10;
    background: -webkit-linear-gradient(to right, #5c9dfc, #5d9afd); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(to right, #5c9dfc, #5d9afd); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(to right, #5c9dfc, #5d9afd); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #5c9dfc, #5d9afd); /* 标准的语法（必须放在最后） */
  }
  #website > div canvas
  {
    top: -14%!important;
  }
</style>
<style>

</style>






<!--index.vue-->






<template>
  <article class="index" >
    <nav id="nav" :style="navBackground">
      导航栏
    </nav>
    <!--<div id='carousel'>-->
    <!--<div id="">-->
    <!--<img style="width: 100%;height: 100%;" src="../assets/img/middle.jpg" alt=""  >-->
    <!--<img style="width: 100%;height: 100%;" src="../assets/img/resource.jpg" alt="" @click.prevent='reminder()'>-->
    <!--<img style="width: 100%;height: 100%;" src="../assets/img/user.jpg" alt="" >-->
    <!--</div>-->
    <!--<div class='left'>left</div>-->
    <!--<div class='right'>right</div>-->
    <!--</div>-->
    <!--banner -->
    <carousel-3d id="carousel" name="silder" @after-slide-change="onAfterSlideChanged"  :controls-visible="true" :autoplay="true" :autoplayTimeout='5000' :controls-prev-html="msg" :controls-next-html="rightButton" :controls-width="'10%'" :controls-height="'20%'">
      <slide   name="silder" :index="0">
        <router-link  id="slide0" :to="{path:'/production'}" >
          <img style="width: 100%;height: 100%;" src="../assets/img/middle.jpg" alt=""  >

        </router-link>
      </slide>
      <slide   name="silder" id='slide1'  :index="1">
        <img style="width: 100%;height: 100%;" src="../assets/img/resource.jpg" alt="" @click.prevent='reminder()'>
        <div :class="reminders == true ?'reminder':null" class="warn-message">模块创建中...</div>
      </slide>
      <slide name="silder"  id='slide2'  :index="2">
        <router-link id="" :to="{path:'/user'}">
          <img style="width: 100%;height: 100%;" src="../assets/img/user.jpg" alt="" >
        </router-link>

      </slide>

    </carousel-3d>

    <!--bannner 图片END-->

    <!--今日统计-->
    <div class="count" style="color:#fff">
      <div  data-tagName="today" @mouseenter="hoverOnWeek()" @mouseleave="leaverOnWeek()" :style="dayBack" class="bg" style="text-align: center">
        {{todayStatistics}}
      </div>
      <div  data-tagName="week" @mouseenter="hoverOnWeek()" @mouseleave="leaverOnWeek()" :style="weekBack"   class="week">
        <!--<div   class="button-img"></div>-->
        <div :style="countBackground"></div>
        本周统计
        <div :style="countBackground"></div>

      </div>
      <div data-tagName="months" :style="monthsBack" @mouseenter="hoverOnWeek()" @mouseleave="leaverOnWeek()">
        本月统计
        <!--<div class="count-mouth" @mouseenter="warningMsg()" @mouseleave="restMessage()" data-tagName="mouth"-->
        <!--:class="(retote === true && tagName === 'mouth')?'retote':null">本月统计-->
        <!--</div>-->
      </div>
    </div>
    <!--左右按钮-->
    <aside align="center" class="left-button" :style="buttonBackGround">
      <img src="../assets/img/left-button.png" alt=""  @click="prevSlide()" >
    </aside>
    <aside class="right-button flipx " :style="buttonBackGround" >
      <img src="../assets/img/left-button.png" alt="" >
    </aside>
  </article>
</template>

<script>
  import { Carousel3d, Slide } from 'vue-carousel-3d';
  import $ from 'jquery'
  export default {
    name: 'index',
    components: {
      Carousel3d,
      Slide
    },
    data () {
      return {
        msg:'<div style="width:100%;height:200%;background-color:blue;opacity: 0;">2</div>',
        user:'',
        warning: '栏目创建中，敬请期待……',
        todayStatistics: '今日统计',
        currentText: '',
        tagName: '',
        showWarn:false,
        rightButton:'<div style="width:300px;height:200%;background-color:blue;opacity: 0;margin-right: 50%;">2</div>',
        retote: false,
        reminders:false,
        hoverd:false,
        dayBack:'',
        weekBack:'',
        monthsBack:'',
        bannerInterval: null,
        navBackground: {
          width: '360px',
          height: '72px',
          backgroundRepeat: 'no-repeat',
          lineHeight: '30px',
          backgroundSize: '100% 100%',
          top:0,
          backgroundImage: 'url(' + require('../assets/img/nav-background.png') + ')',
        },
        middleBackGround: {
          borderLeftImage: 'url(' + require('../assets/img/border-left.png') + ')'
        },
        buttonBackGround: {
          backgroundImage: 'url(' + require('../assets/img/oricle.png') + ')',
          backgroundSize: '100% 100%'
        },
        weekBackGround: {
          backgroundImage: 'url(' + require('../assets/img/bg-week.png') + ')',
          backgroundSize: '100% 100%'
        },
//      /Users/sundanping/Documents/Project/screen/screen/src/assets/img/bg-week.png
        countBackground:  { backgroundImage: 'url(' + require('../assets/img/border-left.png') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: ' right',
          backgroundSize: '100% 100%'
        }
      }
    },
    mounted () {
//    导航栏
      let self = this
      this.$nextTick(function(){
        this.setHeight()
      })
      window.onresize=function(){
        self.$nextTick(function(){
          self.setHeight()
        })
      }
      document.getElementById('nav').style.lineHeight = document.getElementById('nav').offsetHeight+ 'px'
    },
    methods: {
      onAfterSlideChanged(){
        let carousel=  document.getElementById('carousel')
        let fir = carousel.getElementsByTagName('div')[0]
      },
//    设置图片高度
      setHeight (){
        let sliders = document.getElementsByName('silder')
        let windowHeight= window.innerHeight
        let windowWidth= window.innerWidth
        console.log(windowHeight)
        for(let value of sliders){
          value.style.height=.53*windowHeight+'px'
        }
        document.getElementById('carousel').style.marginTop=.1*windowHeight+'px'
        document.getElementById('carousel').style.marginBottom=.1*windowHeight+'px'
      },
      hoverOnWeek () {
        if(event.currentTarget.dataset.tagname=='week'){
          this.weekBack= this.weekBackGround

        }else  if(event.currentTarget.dataset.tagname=='today'){
          this.dayBack= this.weekBackGround

        }else if(event.currentTarget.dataset.tagname=='months'){
          this.monthsBack= this.weekBackGround

        }
      },
      reminder () {
        let _this = this
        _this.reminders = true
        setTimeout(function(){
          _this.reminders = false
        },4000)
      },
      leaverOnWeek(){
        this.weekBack=''
        this.dayBack=''
        this.monthsBack=''
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img { border: 0; vertical-align: top; }

  /*#carousel {*/
  /*position: relative;*/
  /*z-index: 2;*/
  /*height: 200px;*/
  /*margin-top: 200px;*/

  /*transform-style: preserve-3d;*/
  /*perspective: 800px;*/
  /*}*/
  /*#carousel img {*/
  /*position: absolute;*/
  /*left: 50%;*/
  /*top: 50%;*/
  /*width: 300px;*/
  /*height: 200px;*/
  /*margin-left: -150px;*/
  /*margin-top: -100px;*/
  /*border-radius: 8px;*/

  /*transition: transform 0.5s ease-in-out;*/
  /*}*/
  /*.right{*/
  /*position: relative;float: right;*/
  /*}*/

  .file-move {
    transition: transform 1s;
  }

  @-webkit-keyframes fadeInOut {
    0% {
      opacity:1;
    }
    25% {
      opacity:0;
    }
    50% {
      opacity: 0;
    }
    75% {
      opacity:1;
    }
  }
  .transition-1s {
    -webkit-animation-name: fadeInOut;
    -webkit-animation-timing-function: ease-in-out;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;
  }




  .index{
    width:100%;
    height:100%;
  }
  nav{
    height:10%;
    font-size: 36px;
    color:#fff;
    text-align: center;
    position: relative;
    left:50% ;
    top:0!important;
    font-weight: 600;
    margin-left:-180px;
    margin-top:0;
    padding-top: 0;
  }
  section div{
    display: inline-block;
  }
  .banner{
    width: 80%;
    height:80%;
    margin-left:10%;
    padding-top:5%;
  }
  .count{
    height:40px;
    line-height:40px;
    font-size: 2.2rem;
    display: flex;
    height:10%;
    margin-top: 1rem;
    margin-left:18%;
    margin-right:18%;
  }
  .count>div{
    flex:1;
    height:4rem;
    line-height: 4rem;
    text-align: center;
  }

  .count-day{
    height:4rem;
    font-size:2.2rem;
    width: 50%;
    float: right;
    position: relative;
  }
  .week>div{
    display: inline-block;
  }
  .count-week{
    background-color: #3a8ee6;
    height:4rem;
    font-size:2.2rem;
    width: 50%;
    position: relative;
    top:-5px;
    height: 24px;
    line-height: 24px;
    /*background-color: #bde150;*/
  }
  .count-mouth{
    width: 50%;
    float: left;
    height:4rem;
    font-size:2.2rem;
    position: relative;
  }
  .week>div{
    display: inline-block;

  }
  .button-img{width: 1.6px;height:24px;position: relative;}


  middle>div{
    display: inline-block;
  }
  /*按钮*/
  .left-button{
    position: absolute;
    top:45%;
    left:0;
    color:#fff;
    z-index:-1;
  }
  .right-button{
    position: absolute;
    top:45%;
    right:0;
    color:#fff;
    z-index:-1;

  }
  /*按钮*/
  .left-button,.right-button{
    width: 60px;
    height:118px;
  }
  .left-button>img,.right-button>img{
    width: 40%;
    height:40%;
    position: absolute;
    top:0;
    left:-10px;
    right:0;
    bottom: 0;
    margin:auto;

  }
  /*右边按钮翻转*/
  .flipx {
    -moz-transform:scaleX(-1);
    -webkit-transform:scaleX(-1);
    -o-transform:scaleX(-1);
    transform:scaleX(-1);
    /*IE*/
    /*filter:FlipH;*/
  }
  .inline-block{
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .line-gradient {
    border: 2px solid;
    border-image: -webkit-linear-gradient(to right, #5c9dfc, #48c8ef, #41d6eb, #5d9afd) 30 30;
    border-image: -moz-linear-gradient(to right, #5c9dfc, #48c8ef, #41d6eb, #5d9afd) 30 30;
    border-image: linear-gradient(to right, #5c9dfc, #48c8ef, #41d6eb, #5d9afd) 30 30;
    border-image: linear-gradient(to right, #5c9dfc, #48c8ef, #41d6eb, #5d9afd) 30 30;
  }
  .border-radius-product{
    width: 16px;
    height: 32px;
    position: absolute;
  }
  .border-left-top{
    top:-6px;
    left:-3px;
    border-left:4px solid #5d9cfd;
    border-top:8px solid #5d9cfd;
  }
  /* 右上使用左上的 把left 改 right  在翻转180 就可以*/
  .border-right-top{
    top:-6px;
    right:-3px;
    border-right:4px solid #5d9cfd;
    border-top:8px solid #5d9cfd;

  }
  .border-right-bottom{
    bottom:-6px;
    right:-3px;
    border-right:4px solid #5d9cfd;
    border-bottom:8px solid #5d9cfd;
  }
  .border-left-bottom{
    bottom:-6px;
    left:-3px;
    border-left:4px solid #5d9cfd;
    border-bottom:8px solid #5d9cfd;
  }
  .retote{
    animation: rotate 0.8s ;
  }
  @keyframes rotate {
    from{transform:rotateY(0deg) ;}
    to{transform:rotateY(90deg) ;}
  }
  .reminder{
    animation: reminder 4s 1;
  }
  @keyframes reminder {
    0%{opacity: 0 ;
      border-top:0;
      border-right:0;
      border-left:0;
      border-bottom:0;
    }
    25% { opacity: 0.5;
      border-top:1px solid #fff;
    }
    50% { opacity: 1;
      border-right:1px solid #fff;

    }
    75% { opacity: 0.5;
      border-bottom:1px solid #fff;
    }
    85% { opacity:0.35 ;
      border-left:1px solid #fff;
      transform:rotateY(0deg)
    }
    100%{
      opacity:0.1 ;
      transform:rotateY(90deg)
    }
  }
  .week>div{
    width: 3px;
    height:50px;
    position: relative;
    float: left;
    left:0;
    z-index: 344;
  }
  .week>div:last-child{
    width: 3px;
    height:50px;
    position: relative;
    float: right;
  }

  .warn-message{
    position: absolute;
    top: 50%;color:#fff;
    border:1px;left:50%;
    opacity: 0;
    margin-left:-30px;
  }
</style>

<style >
  /*日期选择器样式修改 BEGIN*/
  input,button,select,textarea{outline:none;}

  .el-button + .el-button span, .el-date-table td div span {
    color: #5a5e66;
  }

  .prev-month div span, .next-month div span {
    color: #b4bccc !important;
  }
  input[type='text']{
    text-indent: 12px;
  }
  .f1{
    height:700px!important;
  }
  /*日期选择器样式修改 END*/
</style>



