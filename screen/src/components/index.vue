<template>
  <article class="index" >
    <nav id="nav" :style="navBackground">
      导航栏
    </nav>
    <!--bannner 图片BEGIN-->
    <section class="banner">

      <router-link :to="{path:'/'+ bannerBackGround[0].name}">
          <div id="left" class="left transition-1s" :style="bannerBackGround[0]" @mouseenter="clearClock()" @mouseleave="startClock()">
          </div>
      </router-link>

      <router-link :to="{path:'/'+ bannerBackGround[1].name}">
          <div  id="middle" class="middle line-gradient transition-1s" @mouseenter="clearClock()" @mouseleave="startClock()">
                  <span class="border-left-top border-radius-product"></span>
                  <span class="border-right-top border-radius-product "></span>
                  <span class="border-left-bottom border-radius-product"></span>
                  <span class="border-right-bottom border-radius-product"></span>
            <div class="inline-block" :style=[bannerBackGround[1]] ></div>
          </div>
      </router-link>

      <router-link :to="{path:'/'+ bannerBackGround[2].name}">
        <div  id="right" class="right transition-1s" :style="bannerBackGround[2]" @click='reminder()' @mouseenter="clearClock()" @mouseleave="startClock()">

          <span :class="reminders === true ?'reminder':null" style=" opacity: 0;position: absolute;top:350px;left:140px;border:1px solid #fff;padding:4px;">资源创建中...</span>
        </div>
      </router-link>
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
    <aside align="center" class="left-button" :style="buttonBackGround" @click="toLeft()">
      <img src="../assets/img/left-button.png" alt="" >
    </aside>
    <aside class="right-button flipx " :style="buttonBackGround" @click="toRight()">
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
        todayStatistics: '今日统计',
        currentText: '',
        tagName: '',
        retote: false,
        reminders: false,
        hoverd:false,
        dayBack:'',
        weekBack:'',
        monthsBack:'',
        bannerInterval: null,
//      bgimg: {
//        backgroundImage: 'url(' + require('../assets/img/background-img.jpg') + ')',
////        backgroundSize: '100% 100%',
//        height: '100%'
//      },
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
        bannerBackGround: [
          { backgroundImage: 'url(' + require('../assets/img/user.jpg') + ')',
            backgroundSize: '100% 100%',
            name: 'user'},
          { backgroundImage: 'url(' + require('../assets/img/middle.jpg') + ')',
            backgroundSize: '100% 100%',
            name: 'production'
          },
          { backgroundImage: 'url(' + require('../assets/img/resource.jpg') + ')',
            backgroundSize: '100% 100%',
            name: ''}
        ],
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
  //    console.log(document.getElementById('nav').offsetHeight)
        let w =document.getElementById('left').clientWidth
        document.getElementById('left').style.height=w*82.6/62 + 'px'
        document.getElementById('right').style.height=w*82.6/62 + 'px'
        document.getElementById('middle').style.height=w*82.6/56 + 'px'
      //  this.bannerInterval= setInterval(this.toLeft,3000)
    },
    methods: {
      toLeft () {
        let left = this.bannerBackGround[0]
        this.bannerBackGround.splice(0,1);
        this.bannerBackGround.push(left)
      },
      toRight () {
        window.clearTimeout(this.bannerInterval)
        this.bannerInterval= setInterval(this.toLeft,3000)
        let right = this.bannerBackGround[2]
        this.bannerBackGround.length =2;
        this.bannerBackGround.unshift(right)
      },
//    一期栏目中暂时没有今日 本周 本月统计  提示信息
      warningMsg () {
        this.retote = true
//      this.tagName = event.currentTarget.dataset.tagname
        this.currentText = event.currentTarget.innerHTML
        event.currentTarget.innerHTML = '模块创建中...'
      },
      restMessage () {
        this.tagName = ''
        this.retote = false
        event.currentTarget.innerHTML  = this.currentText
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
      leaverOnWeek () {
        this.dayBack= ''
        this.weekBack= ''
        this.monthsBack= ''
      },
      reminder () {
        let _this = this
        _this.reminders = true
        setTimeout(function(){
          _this.reminders = false
        },4000)
      },
      clearClock (){
        window.clearTimeout(this.bannerInterval)
      },
      startClock () {
        this.bannerInterval= setInterval(this.toLeft,3000)
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



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
  .left,.right{
    /*background-color: aquamarine;*/
    width: 30%;
    height:88%;
    overflow: hidden;
  }
  .left{
    z-index:5;
    position: relative;
    right:-100px;
    transform: perspective(800px) rotateY(11deg) rotateZ(0);
    outline:1px solid transparent;
    margin-left:5%;

  }
  .right{
    z-index:5;
    position: relative;
    left:-100px;
    transform: perspective(800px) rotateY(-11deg);
  }

  .middle{
    z-index:110;
    width: 30%;
    height:92%;
    position: relative;
    border:2px solid #fe2;
    padding: 5px;
    /*background-color: aqua;*/
  }
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
