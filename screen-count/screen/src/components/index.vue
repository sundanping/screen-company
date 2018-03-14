<template>
  <article class="index" >
    <nav id="nav" :style="navBackground">导航栏</nav>

    <!--bannner 图片BEGIN-->
    <section class="banner">

      <div class="box">
          <div>
            <router-link :to="{path:'/'+user}">
               <img @mouseover="mouseover()" id="left" @mouseleave="mouseleave()" class="front" name="img" src="../assets/img/user.jpg" alt="PIC">
            </router-link>
            <router-link :to="{path:'/'+resource}">
              <img @mouseover="mouseover()" id="right"  @mouseleave="mouseleave()" name="img"
                   class="back" src="../assets/img/resource.jpg" alt="PIC">
            </router-link>
            <router-link :to="{path:'/'+product}">
              <img
                @mouseover="mouseover()" @mouseleave="mouseleave()"  id="middle" name="img"  class="active" src="../assets/img/middle.jpg" alt="PIC">
            </router-link>

          </div>
        </div>
    </section>
    <!--bannner 图片END-->
    <!--今日统计-->
    <div class="count" style="color:#fff">

      <div  data-tagName="today" @mouseenter="hoverOnWeek()" @mouseleave="leaverOnWeek()" :style="dayBack" class="bg" style="text-align: center">
        {{todayStatistics}}

      </div>
      <div  data-tagName="week" @mouseenter="hoverOnWeek()" @mouseleave="leaverOnWeek()" :style="weekBack"   class="week">
        <div :style="countBackground"></div>
        本周统计
        <div :style="countBackground"></div>
      </div>
      <div data-tagName="months" :style="monthsBack" @mouseenter="hoverOnWeek()" @mouseleave="leaverOnWeek()">
        本月统计
      </div>
    </div>
    <!--左右按钮-->
    <aside align="center" class="left-button" :style="buttonBackGround" @mouseover="mouseover()" @mouseleave="mouseleave()" @click="clickButton(0)">
      <img src="../assets/img/left-button.png" alt="" >
    </aside>
    <aside class="right-button flipx " :style="buttonBackGround" @mouseover="mouseover()" @mouseleave="mouseleave()" @click="clickButton(1)">
      <img src="../assets/img/left-button.png" alt="" >
    </aside>
  </article>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        warning: '栏目创建中，敬请期待……',
        pathName:['production','user','resource',],
        todayStatistics: '今日统计',
        currentText: '',
        tagName: '',
        index:2,
        offset:false,
        retote: false,
        front:0,
        back:0,
        user:'',
        product:'production',
        resource:'',
        reminders: false,
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
//        backgroundSize: '100% 100%'
        },
        buttonBackGround: {
          backgroundImage: 'url(' + require('../assets/img/oricle.png') + ')',
          backgroundSize: '100% 100%'
        },
        weekBackGround: {
          backgroundImage: 'url(' + require('../assets/img/bg-week.png') + ')',
          backgroundSize: '100% 100%'
        },
        countBackground:  { backgroundImage: 'url(' + require('../assets/img/border-left.png') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: ' right',
          backgroundSize: '100% 100%'
        }
      }
    },
    mounted () {
  //    导航栏
        document.getElementById('nav').style.lineHeight = document.getElementById('nav').offsetHeight+ 'px'
        let imgs= document.getElementsByName('img')
        let width =window.innerWidth
        let val=0
        setInterval(this.timer,4000)
    },
    methods: {
      mouseover() { //mouseover 事件
        this.offset = true
      },
      mouseleave () {
        this.offset = false
      },

      clickButton(x) {
        this.doInterval(x)
      },

      timer(){
        if(this.offset){
          return
        }
        else{
          this.doInterval(0)
        }
      },
      doInterval(x) {
       let imgs = document.getElementsByClassName('box')[0].getElementsByTagName('img')
       imgs[this.index].setAttribute('class','');
          if(x === 0){
              if(--this.index < 0){
                  this.index = 2
                }
                  this.front = this.back = this.index
                  if(++this.front > 2){this.front = 0}
                  if(--this.back < 0){this.back = 2}
                  imgs[this.front].style.zIndex = '1';
                  imgs[this.back].style.zIndex = '0';
          }
          else{
                if(++this.index > 2){
                  this.index = 0
                }
            this.front = this.back = this.index;
              if(++this.front > 2){this.front = 0}
              if(--this.back < 0){this.back = 2}
              imgs[this.front].style.zIndex = '0';
              imgs[this.back].style.zIndex = '1';
            }
              imgs[this.index].style.zIndex = '10';
              imgs[this.front].setAttribute('class','front')
              imgs[this.back].setAttribute('class','back')
              imgs[this.index].setAttribute('class','active');
              console.log(imgs[this.index].getAttribute('id'))
              if(imgs[this.index].getAttribute('id')=='left'){
                this.user = 'user'
              }else{
                this.user = ''
              }
              if(imgs[this.index].getAttribute('id')=='right'){
                this.resource = 'resource'
              }else{
                this.resource = ''
              }
              if(imgs[this.index].getAttribute('id')=='middle'){
                this.product = 'production'
              }else{
                this.product = ''

              }
            },
//    一期栏目中暂时没有今日 本周 本月统计  提示信息
      hoverOnWeek () {
        if(event.currentTarget.dataset.tagname=='week'){
          this.weekBack= this.weekBackGround
        }else  if(event.currentTarget.dataset.tagname=='today'){
          this.dayBack= this.weekBackGround
        }else if(event.currentTarget.dataset.tagname=='months'){
          this.monthsBack= this.weekBackGround
        }
      },
      leaverOnWeek () {
        this.dayBack= ''
        this.weekBack= ''
        this.monthsBack= ''
      },

      clearClock (){
        window.clearTimeout(this.bannerInterval)
      },

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
    position: relative;

  }
  .box {width: 100%;  height:100%;  transform-style: perserve-3d;  display: flex; position: relative;
    }
  .box>div{
    position: absolute;
    -moz-left: calc(50% - 500px);
    -webkit-left: calc(50% - 500px);
    left: calc(50% - 500px);
  }
  .box img{width:400px; position: absolute; top: 60px; transition:all .6s linear;

  }

  .front {
    left: 0px;
    transform: perspective(800px) rotateY(15deg) translateZ(0) rotateZ(0);
    /*transfrom:rotateX(-300deg) rotateY(-30deg) rotateZ(0);*/
  }
  .back {left: 600px;
    /*transfrom:rotateX(300deg) rotateY(-30deg) rotateZ(0);*/
    transform: perspective(750px) rotateY(-15deg) translateZ(0) rotateZ(0);

  }
  .active {left: 300px; transform: scale(1.2); z-index: 10;}

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
  }
  .right-button{
    position: absolute;
    top:45%;
    right:0;
    color:#fff;

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
  /*@media(min-width: 959px){*/
    /*.box img{width:310px;height: 414px; position: absolute; top: 60px; transition:all .6s linear;*/

    /*}*/
  /*}*/
  /*@media(min-width: 1024px){*/
    /*.box img{width:340px;height: 450px; position: absolute; top: 60px; transition:all .6s linear;*/

    /*}*/
  /*} !*>=1024的设备*!*/

  /*@media(min-width: 1100px) {*/
    /*.box img{width:360px;height: 480px; position: absolute; top: 60px; transition:all .6s linear;*/

    /*}*/
  /*} !*>=1100的设备*!*/
  /*@media(min-width: 1280px) {*/
    /*.box img{width:380px;height: 495px; position: absolute; top: 60px; transition:all .6s linear;*/

    /*}*/
  /*} !*>=1280的设备*!*/

  /*@media(min-width: 1666px) {*/
    /*.box img{width:400px;height: 530px; position: absolute; top: 60px; transition:all .6s linear;*/

    /*}*/
  /*}*/

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

  /*日期选择器样式修改 END*/
</style>
