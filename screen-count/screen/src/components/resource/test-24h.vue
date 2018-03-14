<template>
  <div id="div">
    <div id="press-seven"  :style="{width:'100%',height:'100%',backgroundColor:'rgha(121,121,121,.3)'}"></div>
  </div>
</template>

<script>
  export default {
    name: 'pressSeven',
    data() {
      return {
        time:['12:00-19:00 \n 01/23','19:00-21:00\n 01/23','21:00-23:00 \n 01/23','23:00-01:00 \n 01/23',
          '01:00/03:00 \n 01/23','03:00-05:00 \n 01/23', '05:00-07:00 \n 01/23','07:00-09:00 \n 01/23',
          '09:00-11:00 \n 01/23', '11:00-13:00 \n 01/23', '13:00-15:00 \n 01/23','15:00-17:00 \n 01/23'],
        num:[22,33,44,55,44,23,12,22,33,24,35,44],
      }
    },
    mounted() {
//      let clientW = window.innerWidth
      let clientH = window.innerHeight
      document.getElementById('press-seven').style.height = clientH * 0.26 + 'px'
      this.drawLine()
    },
    methods: {
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('press-seven'))
        let option = {
          title: {
            text:'demo',
            textStyle:{
              color:'ddd'
            }
          },
          tooltip : {
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
            bottom: '12%'
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
              name:'宽带测速',
              type:'line',
              smooth: true, //曲线
              showSymbol: false, //曲线
              symbol: 'circle', //曲线
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'left',
                  color:'#fff'
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
              data:this.num
            }
          ]
        }

        myChart.setOption(option)
        window.onresize = function () {
          myChart.resize()
        }
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

  #press-seven{
    width: 100%;
  }
  .long{
    width: 200px;
    height: 40px;
    line-height: 40px;
    margin-top: -20px;
  }


</style>

