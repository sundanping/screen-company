<template>
  <div :class="visitFilter?'gray-filter':null" class="lists">
    <div  id="play-count" :style="{width: '100%', height: '100%'}"></div>
  </div>
</template>
<script>
  export default {
    name: 'playCount',
    components: {
    },
    data() {
      return {
        getContent:'',
        innerWidth:window.innerWidth,
        visitFilter:false,//显示滤镜
        option:{
          color: [ '#ffda5b', '#ffd95a','#ffc803','#ca9c00','#8c6b00',],
          tooltip: {
//            formatter: "{a} <br/>{b}: {c} ({d}%)"
            formatter: "{a} <br/>{b}: {c} ({d}%)"

          },
          title:{
            text:'累计播放次数\n2336次',
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
            left:'83%',
            top:'42%',
            textStyle: {
              color: '#fff'
            },
            data: [
              {value: 401, name: '新闻综合'},
              {value: 400, name: '都市资讯'},
              {value: 735, name: '娱乐频道'},
              {value: 735, name: '经济频道'},
              {value: 735, name: '生活频道'},

            ]
          },
          series: [
            {
              name: '累计访问量',
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
                {value: 400, name: '新闻综合'},
                {value: 400, name: '都市资讯'},
                {value: 400, name: '娱乐频道'},
                {value: 400, name: '经济频道'},
                {value: 735, name: '生活频道'}
              ]
            },
          ]
        }
      }
    },
    mounted() {
      let that = this

      console.log(innerWidth,'get window width')
      let clientH = window.innerHeight
      document.getElementById('play-count').style.height = clientH * 0.27 + 'px'
      this.drawLine()
    },
    methods: {
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('play-count'))
        window.addEventListener("resize",function(){
          myChart.resize()
        })
        myChart.setOption(this.option)

      }

    },
    watch:{
      innerWidth:function(newval){
        alert(newval)
      }
    }
  }
</script>
<style scoped>
  .lists{
    height: 100%;
    /*overflow: hidden;*/
    width: 100%;
  }
  #visit-number canvas {
    /*top: -8%;*/
  }
</style>
