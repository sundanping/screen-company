<template>
  <div style="width:100%" >
    <div  id="dist-space" :style="{width: '100%', height: '100%'}"></div>
  </div>
</template>
<script>
  export default {
    name: 'playTime',
    components: {
    },
    data() {
      return {
        option:{
          color: [ '#cd2c3b','#712935',],
          tooltip: {
//            formatter: "{a} <br/>{b}: {c} ({d}%)"
            formatter: "{a} <br/>{b}: {c} ({d}%)"

          },
          title:{
            text:'磁盘空间\n1000G',
            left:'center',
            top:'44%',
            textStyle:{
              color:'#fff',}
          },
          textStyle: {
            color: '#fff'
          },
          legend: {
            orient: 'vertical', // 图例列表的布局朝向。
            x: 'right',
            y: 'bottom',
            left:'73%',
            top:'72%',
            textStyle: {
              color: '#fff'
            },
            data: [
              {value: 400, name: '已用空间'},
              {value: 600, name: '可用空间'},
            ]
          },
          series: [
            {
              name: '磁盘空间',
              type: 'pie',
              radius: ['50%', '70%', '40%',], // 圆环
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
//                  formatter: ' {c} ({d}%)',
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
                {value: 400, name: '已用空间'},
                {value: 600, name: '可用空间'},

              ]
            },
          ]
        }
      }
    },
    mounted() {
      let that = this
//      设置高度，撑开页面，（无需设置宽度，否则缩放无效）
      let clientH = window.innerHeight
      document.getElementById('dist-space').style.height = clientH * 0.27 + 'px'
      this.drawLine()

    },
    methods: {

      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('dist-space'))
        myChart.setOption(this.option)
        window.addEventListener("resize",function(){
          myChart.resize()
        })
      }
    }
  }
</script>
<style scoped>
  .lists{
    height: 100%;
    width: 100%;
    /*overflow: hidden;*/
  }

</style>
