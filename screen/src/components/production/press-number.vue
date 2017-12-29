<template>
      <div class="lists">
        <div id="press-number" :style="{width: '100%', height: '100%'}"></div>
      </div>
    </template>
    <script>
      export default {
        name: 'pressNumber',
        data() {
          return {
            msg: ['待通过', '已通过', '未通过'],
            install: [232, 344, 453],
            shuju: [
              {value: 235, name: '待通过'},
              {value: 735, name: '已通过'},
              {value: 400, name: '未通过'}
            ]
          }
        },
        mounted() {
          let clientW = window.innerWidth
          let clientH = window.innerHeight
          document.getElementById('press-number').style.width = clientW * 0.3 + 'px'
          document.getElementById('press-number').style.height = clientH * 0.27 + 'px'
          this.drawLine()
        },
        methods: {
          drawLine() {
            let myChart = this.$echarts.init(document.getElementById('press-number'))
            myChart.setOption({
              color: ['#DB9FBA', '#C4496F', '#821B40'],
              textStyle: {
                color: '#fff'
              },
              legend: {
                orient: 'vertical', // 图例列表的布局朝向。
                x: 'right',
                y: 'bottom',
                top:'62%',
                textStyle: {
                  color: '#fff'
                },
                data: this.msg
              },
              series: [
                {
//              name: '任务统计',
                  type: 'pie',
                  radius: ['50%', '70%', '40%',], // 圆环
                  avoidLabelOverlap: false,
                  label: {
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                      }
                    },
                    normal: {
                      show: true,
                      formatter: ' {d}%',

                      textStyle: {
                        fontSize: '14',
                        fontWeight: 'bold'
                      }
                    },

                  },  // 折线
                  labelLine: {
                    normal: {
                      show: true
                    }
                  },  // 移入之后折线
                  data: this.shuju
                }
              ]
            })


          }
        }
      }
    </script>
    <style scoped>
      .lists{
        height: 100%;
        overflow: hidden;
        padding-right: 12px;
      }
      #honor-roll canvas {
        /*top: -8%;*/
      }
    </style>
