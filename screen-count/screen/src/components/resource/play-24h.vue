<template>
  <div >
    <transition name="slide-fade">
    </transition>
    <div id="visit-24"  :style="{width:'100%',height:'100%',backgroundColor:'rgha(121,121,121,.3)'}"></div>
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
            left:'92%',
            right:'2%',
            top:'3%',
            textStyle: {
              color: '#fff'
            },
            data:['新闻综合','都市资讯','娱乐频道','经济频道']
          },
          grid: {
            right: '8%',
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
            data : ['12:00-19:00 \n 09/12','19:00-21:00\n 09/12','21:00-23:00 \n 09-12','23:00-01:00 \n 09-12',
              '01:00/03:00 \n 09-12','03:00-05:00 \n 09-12', '05:00-07:00 \n 09-12','07:00-09:00 \n 09-12',
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
              "name": "总数",
              "type": "line",
              "stack": "专题1",
              symbolSize:10,
              symbol:'circle',
              "itemStyle": {
                "normal": {
                  "color": "rgba(14,43,71,0)",
                  "barBorderRadius": 0,
                  "label": {
                    "show": true,
                    "position": "top",
                    formatter: function(p) {
                      return p.value > 0 ? (p.value) : '';
                    }
                  }
                }
              },
              "data": [36, 36,36,36,36,36,36,36,36,36,36,36]
            },
            {
              name:'新闻综合',
              type:'bar',
              barWidth :25,
              stack: '专题',
              itemStyle:{
                normal:{color:'#00274a'}
              },
              data:[362, 482, 291, 384, 109, 110, 520,620, 732, 201, 1090, 1130]
            },
            {

            name:'都市资讯',
              type:'bar',
              barWidth :25,
              stack: '专题',
              itemStyle:{
                normal:{color:'#003992'}
              },
              data:[460, 572, 761, 764, 390, 830, 210,620, 732, 701, 734, 1130]

            },
            {
              name:'娱乐频道',
              type:'bar',
              barWidth :25,
              stack: '专题',
              itemStyle:{
                normal:{color:'#3976c6'}
              },
              data:[520, 732, 101, 834, 290, 830, 920,620, 732, 701, 734, 1090]
            },
            {
              name:'经济频道',
              type:'bar',
              barWidth :25,
              stack: '专题',
              itemStyle:{
                normal:{color:'#9bc3e6'}
              },
              data:[920, 732, 701, 734, 1090, 1130, 1120,620, 732, 701, 734, 1090]
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
      let clientH = window.innerHeight
      document.getElementById('visit-24').style.height = clientH * 0.25 + 'px'
      this.drawImg()
    },
    methods: {
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
