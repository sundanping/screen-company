<template>
  <div class="lists">
    <div id="visit-number" :style="{width: '100%', height: '100%'}"></div>
  </div>
</template>
<script>
  export default {
    name: 'visitNumber',
    data() {
      return {
        msg: ['专题', '视频', '图集','文稿'],
        shuju: [
          {value: 735, name: '专题'},
          {value: 735, name: '视频'},
          {value: 400, name: '图集'},
          {value: 400, name: '文稿'}

        ]
      }
    },
    mounted() {
      let clientW = window.innerwidth
      let clientH = window.innerHeight
      document.getElementById('visit-number').style.width = clientW * 0.3 + 'px'
      document.getElementById('visit-number').style.height = clientH * 0.27 + 'px'
      this.drawLine()
    },
    methods: {
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('visit-number'))
        myChart.setOption({
          color: [ '#98BFE0', '#3976C5','#003992','#003160',],
          textStyle: {
            color: '#fff'
          },
          legend: {
            orient: 'vertical', // 图例列表的布局朝向。
            x: 'right',
            y: 'bottom',
            left:'80%',
            top:'52%',
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
  }
  #visit-number canvas {
    /*top: -8%;*/
  }
</style>
