<template>
      <div :class="pressFilter?'gray-filter': null" class="lists">
        <div id="press-number" :style="{width: '100%', height: '100%'}"></div>
      </div>
    </template>
    <script>
      import bus from './../../js/eventBus.js'
      export default {
        name: 'pressNumber',
        data() {
          return {
            press:'',
            msg: ['专题', '视频', '图集','文稿'],
            pressFilter:false, //滤镜
            shuju: [
              {value: 735, name: '未通过'},
              {value: 735, name: '已通过'},
              {value: 400, name: '已打回'}
            ],
            option:{
              color: [ '#e39ebe','#ca4a72', '#8d0d4f',],
              tooltip: {
//            formatter: "{a} <br/>{b}: {c} ({d}%)"
                formatter: "{a} <br/>{b}: {c} ({d}%)"

              },
              title:{
                text:'累计发稿量',
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
                top:'60%',
                textStyle: {
                  color: '#fff'
                },
                data: [
                  {value: 735, name: '未通过'},
                  {value: 735, name: '已通过'},
                  {value: 400, name: '已打回'},

                ]
              },
              series: [
                {
                  name: '累计发稿量',
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
                    {value: 735, name: '未通过'},
                    {value: 735, name: '已通过'},
                    {value: 400, name: '已打回'}
                  ]
                },

              ]
            }
          }
        },
        mounted() {


          let clientW = window.innerWidth
          let clientH = window.innerHeight
          document.getElementById('press-number').style.width = clientW * 0.3 + 'px'
          document.getElementById('press-number').style.height = clientH * 0.27 + 'px'
          this.getPress()
          setInterval(this.getPress,1000*60*60*12+300)
        },
        methods: {
          getPress() {
            let _this = this
            bus.$on('getContent',function(response){
              _this.press = response
              if( _this.press.unpublish*1 ==999 &&  _this.press.publish*1 ==999 && _this.press.back*1 == 999){

                    _this.pressFilter = true
              }else{
                    _this.pressFilter = false
              }
              _this.option.series[0].data.splice(0,3,
                {value: _this.press.unpublish, name: '未通过'},
                {value: _this.press.publish, name: '已通过'},
                {value: _this.press.back, name: '已打回'}
              )
              _this.total( _this.pressFilter)
              _this.drawLine()
            })
          },
          drawLine() {
            let myChart = this.$echarts.init(document.getElementById('press-number'))
            myChart.setOption(this.option)
          },
          total (pressFilter){
              let number = 0
//              let that = this
            this.option.series[0].data.forEach(function(value,index){
              number += value.value*1
            })
            if(pressFilter===true){
              this.option.title.text ='暂无数据'
            }else{
              this.option.title.text ='累计发稿量'+ '\n'+ number
            }
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
