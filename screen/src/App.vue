<template>
  <div id="app" >
   <div class="canvaszz"> </div>
  <canvas id="canvas"></canvas>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
//       bgimg: {
//         backgroundImage: 'url(' + require('./assets/img/background-img.jpg') + ')',
 //        backgroundSize: '100% 100%',
//         height: '100%'
//       }
    }
  },
  mounted () {
//    获取屏幕高度
    let windowHeight = window.innerHeight
    document.getElementById('app').style.height=windowHeight + 'px'
//    window.onresize = function(){
//      window.location.reload()
//    }

    var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  w = canvas.width = window.innerWidth,
  h = canvas.height = window.innerHeight,

  hue = 217,
  stars = [],
  count = 0,
  maxStars = 500;//星星数量
var canvas2 = document.createElement('canvas'),
  ctx2 = canvas2.getContext('2d');
canvas2.width = 100;
canvas2.height = 100;
var half = canvas2.width / 2,
  gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
gradient2.addColorStop(0.025, '#CCC');
gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
gradient2.addColorStop(1, 'transparent');

ctx2.fillStyle = gradient2;
ctx2.beginPath();
ctx2.arc(half, half, half, 0, Math.PI * 2);
ctx2.fill();

// End cache

function random(min, max) {
  if (arguments.length < 2) {
    max = min;
    min = 0;
  }

  if (min > max) {
    var hold = max;
    max = min;
    min = hold;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maxOrbit(x, y) {
  var max = Math.max(x, y),
    diameter = Math.round(Math.sqrt(max * max + max * max));
  return diameter / 2;
  //星星移动范围，值越大范围越小，
}

var Star = function() {

  this.orbitRadius = random(maxOrbit(w, h));
  this.radius = random(60, this.orbitRadius) / 8;
  //星星大小
  this.orbitX = w / 2;
  this.orbitY = h / 2;
  this.timePassed = random(0, maxStars);
  this.speed = random(this.orbitRadius) / 420000;
  //星星移动速度
  this.alpha = random(2, 10) / 10;

  count++;
  stars[count] = this;
}

Star.prototype.draw = function() {
  var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
    y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
    twinkle = random(10);

  if (twinkle === 1 && this.alpha > 0) {
    this.alpha -= 0.05;
  } else if (twinkle === 2 && this.alpha < 1) {
    this.alpha += 0.05;
  }

  ctx.globalAlpha = this.alpha;
  ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
  this.timePassed += this.speed;
}

for (var i = 0; i < maxStars; i++) {
  new Star();
}

function animation() {
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 0.5; //尾巴
  ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
  ctx.fillRect(0, 0, w, h)

  ctx.globalCompositeOperation = 'lighter';
  for (var i = 1, l = stars.length; i < l; i++) {
    stars[i].draw();
  };

  window.requestAnimationFrame(animation);
}

animation();


  }
}
</script>

<style scoped>
#app{
   font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  /*min-width: 900px;*/
  /*min-height: 760px;*/
  position: relative;
}
#canvas{
  width: 100%;
  height: 100%;
  position: absolute;
  z-index:-1;
}
</style>
<style>
  html{
    font-size:10px;
  }
  *{
    margin:0;
    padding:0;
  }
  ul{
    list-style:none;
    margin:0;padding:0;
  }
  li{

  }
canvas,video{
  display: inline-block;
  vertical-align: baseline;
  overflow: hidden;
}
  div,p,h1,h2,span,img,button{
    margin:0;
    padding:0;
    color:#fff;
  }
  article,section,header,aside,div,span,p,fieldset{
    box-sizing: border-box;
  }
  html{
    min-width: 980px;
  }
  a{
    text-decoration: none;
  }
  fieldset {
    width: 100%;
    border: 1px solid  ;
    border-radius: 5px;
    /*渐变和 border-radius重用会冲突*/
    /*border-image: -webkit-linear-gradient(to right, #5c9dfc, #48c8ef, #41d6eb, #5d9afd) 30 30;*/
    /*border-image: -moz-linear-gradient(to right, #5c9dfc, #48c8ef, #41d6eb, #5d9afd) 30 30;*/
    /*border-image: linear-gradient(to right, #5c9dfc, #48c8ef, #41d6eb, #5d9afd) 30 30;*/
    /*border-image: linear-gradient(to right, #5c9dfc, #48c8ef, #41d6eb, #5d9afd) 30 30;*/
  }
  legend{
    font-size:18px;
  }
.float-left{
  float:left;
  text-indent:2rem;
}
  .float-right{
    float:right;
    padding-right:2rem;
  }
  .red{
    color:red
  }
</style>
<style>

</style>
