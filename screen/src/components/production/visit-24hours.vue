<template>
  <div >
    <div id="visit-24" :style="{width:'100%',height:'100%',backgroundColor:'rgha(121,121,121,.3)'}"></div>
  </div>
</template>
<script>
  export default {
    data () {
     return {

     }
    },
    mounted() {
      let clientW = window.innerwidth
      let clientH = window.innerHeight
      document.getElementById('visit-24').style.width = clientW * 0.6 + 'px'
      document.getElementById('visit-24').style.height = clientH * 0.25 + 'px'
      this.drawImg()
    },
    methods: {
      drawImg() {
        let myChart = this.$echarts.init(document.getElementById('visit-24'))
        window.addEventListener("resize",function(){
          myChart.resize()
        })
//        let option={
//                tooltip : {
//                  trigger: 'axis',
//                  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
//                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//                  }
//                },
//                legend: {
//                  orient: 'vertical',
//                  right:'0.5%',
//                  bottom:'10%',
//                  shadowColor:'fff',
//                  textStyle:{
//                    color:'#fff'
//                  },
//                  data:['专题','图集','视频','文稿']
//                },
//                grid: {
//                  left: '3%',
//                  right: '7%',
//                  bottom: '1%',
//                  top:'6%',
//                  containLabel: true
//                },
//                xAxis : [
//                  {
//                    type : 'category',
//                    splitLine: {//网格线
//                      lineStyle: {// 网格线color
//                        color: ['rgba(113,164,242,0.3)']
//                      },
//                      width: '1',
//                      type: 'solid',
//                      show: true
//                    },
//                    axisLine:{
//                      lineStyle:{
//                        color:['#fff'],//y轴字体颜色
//                        width:1
//                      }
//                    },
//                    data : ['12:00-19:00 09/12','19:00-21:00 09/12','21:00-23:00 09-12','23:00-01:00 09-12','17:00/19:00 09-12','17:00-19:00 09-12',
//                      '17:00-19:00 09-12','17:00-19:00 09-12','17:00-19:00 09-12','17:00-19:00 09-12','17:00-19:00 09-12','17:00-19:00 09-12']
//                  }
//                ],
//                yAxis : [
//                  {
//                    type: 'value',
////                    name: '数量',
//                    axisLine: {
//                      lineStyle: {
//                        color: ['#fff'],
//                        width: '2',
//                        type: 'solid'
//                      }
//                    },
//                    axisTick: {
//                      show: false,
//                      alignWithLabel: true
//                    },
//                    splitLine: {
//                      lineStyle: {
//                        color: ['rgba(113,164,242,0.3)'],//网格线
//                        width: '1',
//                        type: 'solid',
//                        show: true
//                      }
//                    },
//                    axisPointer: {
//                      show: true
//                    }
//                  }
//                ],
//                series : [
//
//                  {
//                    name:'专题',
//                    type:'bar',
//                    barWidth : 22,
//                    stack: '发表量',
//                    itemStyle:{
//                      normal:{color:'#002748'}
//                    },
//                    data:[920, 732, 701, 734, 1090, 1130, 1120,620, 732, 701, 734, 1090]
//                  },
//                  {
//                    name:'图集',
//                    type:'bar',
//                    stack: '发表量',
//                    itemStyle:{
//                      normal:{color:'#003b92'}
//                    },
//                    data:[120, 132, 101, 134, 290, 230, 220,620, 732, 701, 734, 1090]
//                  },
//                  {
//                    name:'视频',
//                    type:'bar',
//                    stack: '发表量',
//                    itemStyle:{
//                      normal:{color:'#3976c6'}
//                    },
//                    data:[60, 72, 71, 74, 190, 130, 110,620, 732, 701, 734, 1130]
//                  },
//                  {
//                    name:'文稿',
//                    type:'bar',
//                    stack: '发表量',
//                    itemStyle:{
//                      normal:{color:'#9bc3e6'}
//                    },
//                    data:[62, 82, 91, 84, 109, 110, 120,620, 732, 701, 1090, 1130]
//                  }
//                ]
//          }
        let option = {
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            orient: 'vertical',
            left:'93%',
            right:'2%',
            bottom:'2%',
            textStyle: {
              color: '#fff'
            },
            data:['专题','图集','视频','文稿']
          },
          grid: {
            right: '8%',
            bottom: '-1%',
            top:'6%',
            left:'2%',
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
            data : ['12:00-19:00 09/12','19:00-21:00 09/12','21:00-23:00 09-12','23:00-01:00 09-12',
              '17:00/19:00 09-12','17:00-19:00 09-12', '17:00-19:00 09-12','17:00-19:00 09-12',
              '17:00-19:00 09-12', '17:00-19:00 09-12', '17:00-19:00 09-12','17:00-19:00 09-12']
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
              name:'专题',
              type:'bar',
              barWidth :25,
              stack: '专题',
              itemStyle:{
                      normal:{color:'#00274a'}
                    },
              data:[62, 82, 91, 84, 109, 110, 120,620, 732, 701, 1090, 1130]
            },
            {
              name:'图集',
              type:'bar',
              stack: '专题',
              itemStyle:{
                normal:{color:'#003992'}
              },
              data:[60, 72, 71, 74, 190, 130, 110,620, 732, 701, 734, 1130]

            },
            {
              name:'视频',
              type:'bar',
              stack: '专题',
              itemStyle:{
                normal:{color:'#3976c6'}
              },
              data:[120, 132, 101, 134, 290, 230, 220,620, 732, 701, 734, 1090]
            },
            {
              name:'文稿',
              type:'bar',
              stack: '专题',
              itemStyle:{
                normal:{color:'#9bc3e6'}
              },
              data:[920, 732, 701, 734, 1090, 1130, 1120,620, 732, 701, 734, 1090]
            }
          ]
        };

        myChart.setOption(option)
      }
    }
  }
</script>
<style scoped>
  div{
    color:#fff;
  }
</style>
