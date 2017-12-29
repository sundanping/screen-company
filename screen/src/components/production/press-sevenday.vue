<template>
  <div id="div">
    <div id="press-seven" :style="{width:'100%',height:'100%',backgroundColor:'rgha(121,121,121,.3)'}"></div>
  </div>
</template>

<script>
  export default {
    name: 'pressSeven',
    data() {
      return {
       time:[]
       }
    },
    mounted() {
      let clientW = window.innerWidth
      let clientH = window.innerHeight
      document.getElementById('press-seven').style.width = clientW * 0.64 + 'px'
      document.getElementById('press-seven').style.height = clientH * 0.26 + 'px'
//      console.log(clientW,'clientW',window.innerHeight,99,document.getElementById('app').style.height, clientH, 999, document.body,document.body.scrollHeight, document.getElementById('press-seven').style.height)
      this.setTime()
      this.drawLine()
    },
    methods: {
      setTime() {
        var base =new Date()
        var data2 = []
        var oneDay = 1000*60*60*24
        for (var i = 0; i < 7; i++) {
          var now = new Date(base -= oneDay);
          var dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-')

          data2.push(dayStr);
        }
        this.time=[...data2]
      },
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('press-seven'))

        window.addEventListener("resize",function(){
          myChart.resize()
        })
       let option = {
          title: {
            text:'demo',
            textStyle:{
              color:'ddd'
            }
          },
          tooltip : {
//            mouseover 事件
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#eee',
                color:"#000"
              }
            }
          },
          toolbox: {
            feature: {
//              saveAsImage: {}
            }
          },
          grid: {
            top:'6%',
            left: '6%',
            right: '3%',
            bottom: '9%'
//            containLabel: true
          },
          xAxis : [{
            name: '日期',
            boundaryGap: false,
            splitLine: {//网格线
              lineStyle: {// 网格线color
                color: ['rgba(113,164,242,0.3)']
              },
              width: '1',
              type: 'solid',
              show: true
            },
            axisLine: {
              lineStyle: {
                color: ['rgb(113,164,242,1)'],
                type: 'solid',
                width:'2'
              }
            },
            saveAsImage:true,
            axisTick: {
              show: true,
              alignWithLabel: true
            },
              data : this.time,
            }
          ],
          yAxis :  [
            {
              type: 'value',
//              name: '数量',
              axisLine: {
                lineStyle: {
                  color: ['#fff'],
                  width: '2',
                  type: 'solid'
                }
              },
              axisTick: {
                show: false,
                alignWithLabel: true
              },
              splitLine: {
                lineStyle: {
                  color: ['rgba(113,164,242,0.3)'],//网格线
                  width: '1',
                  type: 'solid',
                  show: true
                }
              },
              axisPointer: {
                show: true
              }
            }
          ],
          series : [
            {
              name:'平均发稿量',
              type:'line',
              lineStyle:{
                color:'#333'
              },
              data:[431, 231, 1115, 543, 332, 673, 660],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
//              },
//              markLine: {
//                data: [
//                  {type: 'average', name: '平均值'}
//                ]
              }
            },
            {
              name:'发稿量',
              type:'line',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'left',
                  color:'red'
                }
              },
              areaStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#fb6703'
                  }, {
                    offset: 1,
                    color: '#223'
                  }])
                }
              },
              data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        }

        myChart.setOption(option)
      }
    }
  }
</script>
<style>
  .lists{
    height: 100%;
    overflow: hidden;
  }
  div{
    color:#eee;
  }
  #honor-roll canvas {
    /*top: -8%;*/
  }
</style>

