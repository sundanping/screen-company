<template>
  <div id="div">
    <div v-if="grayScale" :class="long?'long':null"  class="no-net "><span>{{noMessage}}</span></div>
    <div id="press-seven" :class="[grayScale ? 'grayscale':null]" :style="{width:'100%',height:'100%',backgroundColor:'rgha(121,121,121,.3)'}"></div>
  </div>
</template>

<script>
  export default {
    name: 'pressSeven',
    data() {
      return {
        noMessage:'没有请求到数据',
        long:false, //无网络下改变提示框的长和宽
       time:[],
       response:[],
        num:[22,33,44,55,44,23,22],
        temp:1,
        grayScale:false,
        average:[]
       }
    },
    mounted() {
      let clientW = window.innerWidth
      let clientH = window.innerHeight
//      document.getElementById('press-seven').style.width = 100+'%'
      document.getElementById('press-seven').style.height = clientH * 0.26 + 'px'

      this.getInfomation()
      this.setTime()
      setInterval(this.getInfomation,1000*60*60*12)

      window.resize=function(){
        this.drawLine()
      }
    },
    methods: {
      getInfomation (){
        let self = this
        let averageNumber = 0
        this.temp++
        this.$http.get(this.httpApi+'/getAverages')
          .then(function (res) {
            self.long = false
//            res.data.length=0
            if(res.data.length>0){
              self.time =[]
              self.num = []
              self.grayScale = false
              self.averageNumber = 0
              self.response=[...res.data]
              self.response.forEach(function(item,index){
              averageNumber += item.num*1
              self.time.push(item.time)
              self.num.push(item.num)
              })
              averageNumber=(averageNumber/7).toFixed(2)
              self.response.forEach(function(item,index){
                self.average.push(averageNumber)
                })
              }else{
              self.noMessage ='没有请求到数据'
              self.grayScale = true
            }
            self.drawLine()
          })
          .catch(function (err) {
            console.log(err)
            self.long = true
            self.noMessage = '加载失败，请检查您的网络设置~'
            self.grayScale = true
            self.drawLine()
          })
      },
      setTime() {
        var base =new Date()
        var data2 = []
        var oneDay = 1000*60*60*24
        for (var i = 0; i < 7; i++) {
          var now = new Date(base -= oneDay);
          var dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-')

          data2.unshift(dayStr);
        }
        this.time=[...data2]
      },
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('press-seven'))

//        window.addEventListener("resize",function(){
////          let clientW = window.innerWidth
//          console.log(333)
////          let clientH = window.innerHeight
////          document.getElementById('press-seven').style.width = clientW * 0.64 + 'px'
////          document.getElementById('press-seven').style.height = clientH * 0.26 + 'px'
//          myChart.resize()
//        })
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
                color:'#000'
              },
              symbol: 'circle',
              data:this.average,
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

