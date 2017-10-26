<template>
  <div class="lists">

    <div id="mission" :style="{width: '100%', height: '100%'}"></div>
  </div>

</template>
<script>
  let clue = require('../../json/clue.json')
  export default {
    name: 'totalApp',
    data () {
      return {
        nav: [{name: '互联网'}, {name: '微信'}],
        lists: clue.data,
        msg:[ '待核', '已完成', '已归档']
      }
    },
    created () {
    },
    mounted () {
      let clientW = document.body.clientWidth
      let clientH = document.body.clientHeight
      document.getElementById('mission').style.width=clientW*0.47/2.2+ 'px'
      document.getElementById('mission').style.height=clientH*0.3+ 'px'
      this.drawLine()
    },
    computed: {
    },
    methods:{

      drawLine () {
        let myChart = this.$echarts.init(document.getElementById('mission'))
        // 绘制图表
        myChart.setOption({
          color: [ '#77173e', '#C14964', '#dB9DBB'],
          textStyle: {
            color: '#fff'
          },
          legend: {
            orient: 'vertical', // 图例列表的布局朝向。
            x: 'right',
            y: 'bottom',
            textStyle: {
              color: '#fff'
            },
            data: this.msg
          },
          series: [
            {
//              name: '任务统计',
              type: 'pie',
              radius: ['50%', '70%','40%'], // 圆环
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
              data: [
                {value: 274, name: '待核'},
                {value: 235, name: '已完成'},
                {value: 400, name: '已归档'}
              ]
            }
          ]
        })
      }
    },
    watch: {
    }
  }
</script>
<style  scoped>
  .lists{
    width: 100%;
    height: 100%;
    flex-basis: 100%;
    position: relative;
    padding: 5px;
    overflow: hidden;}
  .contents{
    height: 100% ;
    width: 100%;
  }
  .contents>#myChart1{
    min-width: 200px;
    color:red;
  }

</style>
