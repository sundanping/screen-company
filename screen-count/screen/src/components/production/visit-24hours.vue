<template>
  <div >
    <!--本周发稿访问量统计-->
    <transition name="slide-fade">
      <div v-if="grayScale" class="no-net">没有请求到数据</div>
    </transition>
    <div id="visit-24" :class="[grayScale ? 'grayscale':null]" :style="{width:'100%',height:'100%',backgroundColor:'rgha(121,121,121,.3)'}"></div>
  </div>
</template>
<script>
  export default {
    data () {
     return {
       option:{
         tooltip : {
           trigger: 'axis',
           axisPointer : {            // 坐标轴指示器，坐标轴触发有效
             type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
           }
         },
         legend: {
           orient: 'vertical',
           left:'94%',
           right:'2%',
           bottom:'2%',
           textStyle: {
             color: '#fff'
           },
           data:['发稿量','通过量']
         },
         grid: {
           right: '6%',
           bottom: '0%',
           top:'6%',
           left:'4%',
           containLabel: true
         },

         xAxis : [{
           boundaryGap: true,
           splitLine: {//网格线
             lineStyle: {// 网格线color
               color: ['rgba(113,164,242,0.3)']
             },
             width: '1',
             type: 'solid',
             show: true
           },
           axisLine: {
             lineStyle: {    //边线和字段颜色
               color: ['#fff'],
               width: '2',
               type: 'solid'
             }

           },
           saveAsImage:true,
           axisTick: {
             show: true,
             alignWithLabel: true
           },
           data : ['03:00-05:00 \n 09-12', '05:00-07:00 \n 09-12','07:00-09:00 \n 09-12',
             '09:00-11:00 \n 09-12', '11:00-13:00 \n 09-12', '13:00-15:00 \n 09-12','15:00-17:00 \n 09-12']
         }
         ],
         yAxis : [
           {
             color:"#fff",
             type : 'value',
             axisLine: {
               lineStyle: {
                 color: ['#fff'],
                 width: '2',
                 type: 'solid'
               }
             },
             splitLine: {
               lineStyle: {
                 color: ['rgba(113,164,242,0.3)'],//网格线
                 width: '1',
                 type: 'solid',
                 show: true
               },}

           }
         ],
         series : [


           {
             name:'发稿量',
             type:'bar',
             barWidth :25,
             stack: '发稿量',
             itemStyle:{
             normal:{color:'#003992'}
             },
             data:[62, 82, 91, 84, 109, 110, 120]
           },
           {
             name:'通过量',
             type:'bar',
             barWidth :25,
             stack: '通过量',
             itemStyle:{
               normal:{color:'#3874c2'}
             },
             data:[60, 72, 71, 74, 190, 130, 110]

           }

         ]
       },
       grayScale:true,
        times:[],
        tuji:[],
        live : [],
        special :[],
        news :[],
        total:[]
     }
    },
    mounted() {
//      let clientW = window.innerWidth
      let clientH = window.innerHeight

      document.getElementById('visit-24').style.height = clientH * 0.25 + 'px'
      this.sendAjax ()
      setInterval(this.sendAjax,1000*60*10)
    },
    methods: {

      sendAjax () {
      let  _this = this
        this.times =[]
        this.tuji = []
        this.live = []
        this.special = []
        this.news = []
//        http://mobile.gstv.com.cn/screen/access_24.php?appid=7&appkey=hpew3AItkdTQnffvB8oRIlmdEiz1i8eq&count=7
        this.$http.get(this.httpApi+'/getHours').then(function(res){
          let arr = [{"count":430,"statued":418,"date":"02.06"},{"count":329,"statued":308,"date":"02.07"},{"count":369,"statued":298,"date":"02.08"},{"count":416,"statued":379,"date":"02.09"},{"count":290,"statued":279,"date":"02.10"},{"count":318,"statued":260,"date":"02.11"},{"count":376,"statued":335,"date":"02.12"}]
          if(arr.length >0){
//          if(res.data.length>0){
            _this.grayScale = false  //没有数据 滤镜灰色
            arr.forEach(function(item){

              _this.times.push(item.date)  //时间
              _this.live.push(item.count)
              _this.tuji.push(item.statued)
            })
            console.log(_this.times)
            _this.option.xAxis[0].data.splice(0,12,..._this.times)
            _this.option.series[0].data.splice(0,12,..._this.live)
            _this.option.series[1].data.splice(0,12,..._this.tuji)

          }else{
            _this.grayScale = true
          }
          _this.drawImg()

        }).catch(function (err) {
          console.log('没有网络')
          _this.grayScale= true
          _this.drawImg()
        })
      },
      drawImg() {
        let myChart = this.$echarts.init(document.getElementById('visit-24'))
        window.addEventListener("resize",function(){
          myChart.resize()
        })

        myChart.setOption(this.option)
      }
    }
  }
</script>
<style scoped>
  div{
    color:#fff;
  }
#visit-24{
  width: 100%;
}
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }

  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
