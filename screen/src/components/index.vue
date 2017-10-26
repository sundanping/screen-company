<template>
  <article class="index" >
    <nav :style="navBackground">导航栏</nav>
    <!--bannner 图片BEGIN-->
    <section class="banner">

      <router-link :to="{path:'/'+ bannerBackGround[0].name}"><div id="left" class="left" :style="bannerBackGround[0]"
       @mouseenter="clearClock()" @mouseleave="startClock()">
        <!--<div style="position: absolute">e</div>-->
      </div></router-link>
      <router-link :to="{path:'/'+ bannerBackGround[1].name}"><div id="middle" class="middle line-gradient"
           @mouseenter="clearClock()" @mouseleave="startClock()">
        <span class="border-left-top border-radius-product"></span>
        <span class="border-right-top border-radius-product "></span>
        <span class="border-left-bottom border-radius-product"></span>
        <span class="border-right-bottom border-radius-product"></span>

        <div class="inline-block" :style=[bannerBackGround[1]] ></div>
      </div></router-link>
      <router-link :to="{path:'/'+ bannerBackGround[2].name}">
        <div  id="right" class="right" :style="bannerBackGround[2]" @click='reminder()'
              @mouseenter="clearClock()" @mouseleave="startClock()">
        <span :class="reminders === true ?'reminder':null" style=" opacity: 0;position: absolute;top:350px;left:140px;border:1px solid #fff;padding:4px;">资源创建中...</span>
      </div></router-link>
    </section>
    <!--bannner 图片END-->
    <div class="count" style="color:#fff">
      <div><div class="count-day" @mouseenter="warningMsg()" @mouseleave="restMessage()" data-tagName="today"
                :class="(retote === true && tagName === 'today')?'retote':null">{{todayStatistics}}</div></div>
      <div class="week">
        <div :style="countBackground"  class="button-img"></div>
        <div class="count-week" @mouseenter="warningMsg()" @mouseleave="restMessage()" data-tagName="week"
             :class="(retote === true && tagName === 'week')?'retote':null" >本周统计</div>
        <div :style="countBackground" class="button-img"></div>
      </div>
      <div><div class="count-mouth" @mouseenter="warningMsg()" @mouseleave="restMessage()" data-tagName="mouth"
                :class="(retote === true && tagName === 'mouth')?'retote':null">本月统计</div></div>
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
      bannerInterval: null,
//      bgimg: {
//        backgroundImage: 'url(' + require('../assets/img/background-img.jpg') + ')',
////        backgroundSize: '100% 100%',
//        height: '100%'
//      },
      navBackground: {
        width: '180px',
        height: '36px',
        fontSize: '16px',
        backgroundRepeat: 'no-repeat',
        lineHeight: '30px',
        backgroundSize: '100% 100%',
        backgroundImage: 'url(' + require('../assets/img/nav-background.png') + ')',
    },
      middleBackGround: {
      borderImage: 'url(' + require('../assets/img/middle-border.png') + ')'
//        backgroundSize: '100% 100%'
      },
      bannerBackGround: [
        { backgroundImage: 'url(' + require('../assets/img/user.jpg') + ')',
          backgroundSize: '100% 100%',
          name: 'user'
        },
        { backgroundImage: 'url(' + require('../assets/img/middle.jpg') + ')',
          backgroundSize: '100% 100%',
          name: 'production'},
        { backgroundImage: 'url(' + require('../assets/img/resource.jpg') + ')',
          backgroundSize: '100% 100%',
          name: ''}
      ],buttonBackGround: {
          backgroundImage: 'url(' + require('../assets/img/oricle.png') + ')',
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
//    this.banner()
    let w =document.getElementById('left').clientWidth
    console.log(w)
    document.getElementById('left').style.height=w*82.6/62 + 'px'
    document.getElementById('right').style.height=w*82.6/62 + 'px'
    document.getElementById('middle').style.height=w*82.6/62 + 'px'
    this.bannerInterval= setInterval(this.toLeft,3000)

  },
  methods: {
//    banner () {
//      console.log(234343)
//    },
    toLeft () {
      let left = this.bannerBackGround[0]
      this.bannerBackGround =this.bannerBackGround.slice(1);
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
      this.tagName = event.currentTarget.dataset.tagname
       this.currentText = event.currentTarget.innerHTML
      event.currentTarget.innerHTML = '模块创建中...'
    },
    restMessage () {
      this.tagName = ''
      this.retote = false
      event.currentTarget.innerHTML  = this.currentText
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

.index{
  width:100%;
  height:100%;
}
nav{
  height:10%;
  color:#fff;
  text-align: center;
  position: relative;
  left:50% ;
  margin-left:-90px;
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
  display: flex;
  height:10%;
  margin-left:15%;
  margin-right:15%;
}
.count>div{
  flex:1;
  height:24px;
  line-height: 24px;
  text-align: center;
}
.count>div:first-child{
  flex:1;

}
.count>div:last-child{
  flex:1;

}
.count-day{

  width: 50%;
   float: right;
   position: relative;
 }
.week>div{
  display: inline-block;
}
.count-week{
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
  transform: perspective(800px) rotateY(18deg);
  margin-left:5%;

}
.right{
  z-index:5;
  position: relative;
  left:-100px;
  transform: perspective(800px) rotateY(-18deg);
}

.middle{
  z-index:10;
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
    width: 30px;
    height:59px;
  }
.left-button>img,.right-button>img{
  width: 50%;
  height:50%;
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
</style>

