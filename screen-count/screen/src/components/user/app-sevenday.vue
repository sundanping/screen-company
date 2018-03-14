<template>
  <article :class="appSeven?'gray-filter':null" class="lists">
  <div id="myChart1" :style="{width: '100%', height: '100%'}"></div>
  <!--<h1>{{message}}</h1>-->

  </article>
</template>
<script>
  export default {
    name: 'appSeven',
    props:['message'],
    data() {
      return {
        appSeven:false,
        option :{
        title: {
//            text: '堆叠区域图'
          },
        color: [ '#61F27E', '#F4C41B', '#FC6701'],
        tooltip : {
           trigger: 'axis',
           axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
        },
        legend: {
              show:true,
              orient:'horizontal',
              icon:'heart',
              borderColor:"#333",
              borderRadius:'1',
              radius: ['50%', '70%'],
              textStyle: {
              color: '#fff',
              paddingLeft:'20px',
              borderRadius:'1',
              fontSize:16
         },
        data:['安装量', '活跃用户', '启动次数']
        },
          toolbox: {
            feature: {
//              saveAsImage: {}
            }
          },
          grid: {
            left: '4%',
            right: '7%',
            bottom: '16%',
            containLabel: true
          },
          xAxis: [
            {
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
                  color: ['rgb(113,164,242,0.3)'],
                  width:'2',
                  type: 'solid'
                }
              },
              saveAsImage:true,
              axisTick: {
                show: true,
                alignWithLabel: true
              },
              data: ['08-23', '09-24', '09-25', '09-26', '09-27', '09-28', '09-29']
            }
          ],
          yAxis: [
        {
          type: 'value',
          name: '数量',
          axisLine: {
            lineStyle: {
              color: ['#ffffff'],
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
              name:'安装量',
              type:'line',
              smooth: true, //曲线
              showSymbol: false, //曲线
              symbol: 'circle', //曲线
              stack: '总量',//stack设置不一样时候就不会堆叠
//              areaStyle: {normal: {}},
              areaStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#61F27E'
                  }, {
                    offset: 1,
                    color: '#223'
                  }])
                }
              },
              data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
              name:'活跃用户',
              type:'line',
              smooth: true, //曲线
              showSymbol: false, //曲线
              symbol: 'circle', //曲线
              stack: '总量',
//              areaStyle: {normal: {}},
              areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#F4C41B'
                }, {
                  offset: 1,
                  color: '#223'
                }])
              }
            },
              data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
              name:'启动次数',
              type:'line',
              smooth: true, //曲线
              showSymbol: false, //曲线
              symbol: 'circle', //曲线
              stack: '总量',
              areaStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color:  '#FC6701'
                  }, {
                    offset: 1,
                    color: '#223'
                  }])
                }
              },
//              areaStyle: {normal: {}},
              data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
              name:'平均安装量',
              type:'line',
              stack: '总量1',//stack设置不一样时候就不会堆叠
              data:[122,122,122,122,122,122,122],
            },
            {
              name:'平均活跃用户',
              type:'line',
              stack: '总量2',//stack设置不一样时候就不会堆叠
              data:[115,115,115,115,115,115,115]
            },
            {
              name:'平均启动次数',
              type:'line',
              stack: '总量3',//stack设置不一样时候就不会堆叠
              data:[223,223,223,223,223,223,223]
            }
          ]
        },


      }
    },
    mounted() {

      let self = this
      window.addEventListener("resize",function(){
        self.setEcharts()
      })
//    注册 获取时间 APP 安装量  启动次数  活跃用户  BEGIN
//      document.getElementById('myChart1').style.width=100+'%'
     this.setEcharts()
      setInterval(this.setEcharts,1000*60*60*1)
    },
    methods: {
      setEcharts() {

        let time =[]
        let install =[]
        let pv =[]
        let uv =[]
        let app_average_pv=''
        let app_average_install=''
        let app_average_uv=''
//        console.log(Object.prototype.toString.apply( this.message.app_install_lastdays))
//        this.$nextTick(function(){
          this.appSeven = this.message.style
          this.message.app_install_lastdays.forEach(function(item){
            time.unshift(item.datetime)
            install.unshift(item.amount)
          })
          this.message.app_pv_lastdays.forEach(function(item){
            pv.unshift(item.amount)
          })
          this.message.app_uv_lastdays.forEach(function(item){
            uv.unshift(item.amount)
          })

          app_average_pv = this.message.app_average_pv
          app_average_install = this.message.app_average_install
          app_average_uv = this.message.app_average_uv

          this.option.xAxis[0].data.splice(0,7, ...time)
          this.option.series[0].data.splice(0,7, ...install)
          this.option.series[1].data.splice(0,7, ...uv)
          this.option.series[2].data.splice(0,7, ...pv)
          this.option.series[5].data.splice(0,7, app_average_pv,app_average_pv,app_average_pv,app_average_pv,app_average_pv,app_average_pv,app_average_pv)
          this.option.series[3].data.splice(0,7, app_average_install,app_average_install,app_average_install,app_average_install,app_average_install,app_average_install,app_average_install)
          this.option.series[4].data.splice(0,7, app_average_uv,app_average_uv,app_average_uv,app_average_uv,app_average_uv,app_average_uv,app_average_uv)
//    注册 获取时间 APP 安装量  启动次数  活跃用户  END
          let clientW = window.innerWidth
          let clientH = window.innerHeight
          document.getElementById('myChart1').style.width=clientW*0.47+ 'px'
        document.getElementById('myChart1').style.height=clientH*0.3+ 'px'
          this.drawLine()
//        })

      },
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart1'))
        // 绘制图表
        let app_average_pv = this.message.app_average_pv
        myChart.setOption(this.option)
        let self = this
        myChart.on('legendselectchanged', function (params) {
          if(params.selected.安装量== false && params.selected.活跃用户== true && params.selected.启动次数== true){
            myChart.setOption(
              {
                series:[
                  {
                    data:self.option.series[0].data,
                  },
                  {
                    data:self.option.series[1].data,
                  },
                  {
                    data:self.option.series[2].data,
                  },
                  {
                    data:[],
                  },
                  {
                    data:self.option.series[4].data,
                  },
                  {
                    data:self.option.series[5].data,
                  }
                ]
              })
          }else  if(params.selected.安装量== true && params.selected.活跃用户== false  && params.selected.启动次数== true){
            myChart.setOption(
              {
                series:[
                  {
                    data:self.option.series[0].data,
                  },
                  {
                    data:self.option.series[1].data,
                  },
                  {
                    data:self.option.series[2].data,
                  },
                  {
                    data:self.option.series[3].data,
                  },
                  {
                    data:[],
                  },
                  {
                    data:self.option.series[5].data,
                  }
                ]
              })
          }else  if(params.selected.安装量== true && params.selected.活跃用户== true   && params.selected.启动次数== false){
            myChart.setOption(
              {
                series:[
                  {
                    data:self.option.series[0].data,
                  },
                  {
                    data:self.option.series[1].data,
                  },
                  {
                    data:self.option.series[2].data,
                  },
                  {
                    data:self.option.series[3].data,
                  },
                  {
                    data:self.option.series[4].data,
                  },
                  {
                    data:[],
                  }
                ]
              })
          }else  if(params.selected.安装量== false && params.selected.活跃用户== false   && params.selected.启动次数== true){
            myChart.setOption(
              {
                series:[
                  {
                    data:self.option.series[0].data,
                  },
                  {
                    data:self.option.series[1].data,
                  },
                  {
                    data:self.option.series[2].data,
                  },
                  {
                    data:[],
                  },
                  {
                    data:[],
                  },
                  {
                    data:self.option.series[5].data,
                  }
                ]
              })
          }else  if(params.selected.安装量== false && params.selected.活跃用户== true   && params.selected.启动次数== false){
            myChart.setOption(
              {
                series:[
                  {
                    data:self.option.series[0].data,
                  },
                  {
                    data:self.option.series[1].data,
                  },
                  {
                    data:self.option.series[2].data,
                  },
                  {
                    data:[],
                  },
                  {
                    data:self.option.series[4].data,
                  },
                  {
                    data:[],
                  }
                ]
              })
          }else  if(params.selected.安装量== true && params.selected.活跃用户==false    && params.selected.启动次数== false){
            myChart.setOption(
              {
                series:[
                  {
                    data:self.option.series[0].data,
                  },
                  {
                    data:self.option.series[1].data,
                  },
                  {
                    data:self.option.series[2].data,
                  },
                  {
                    data:self.option.series[3].data,
                  },
                  {
                    data:[],
                  },
                  {
                    data:[],
                  }
                ]
              })
          }
          else  if(params.selected.安装量== false && params.selected.活跃用户==false    && params.selected.启动次数== false){
            myChart.setOption(
              {
                series:[
                  {
                    data:self.option.series[0].data,
                  },
                  {
                    data:self.option.series[1].data,
                  },
                  {
                    data:self.option.series[2].data,
                  },
                  {
                    data:[],
                  },
                  {
                    data:[],
                  },
                  {
                    data:[],
                  }
                ]
              })
          }

          else{
            myChart.setOption(
              {
                series:[
                  {
                    data:self.option.series[0].data,
                  },
                  {
                    data:self.option.series[1].data,
                  },
                  {
                    data:self.option.series[2].data,
                  },
                  {
                    data:self.option.series[3].data,
                  },
                  {
                    data:self.option.series[4].data,
                  },
                  {
                    data:self.option.series[5].data,
                  }
                ]
              })
          }
        });

//        window.onresize = myChart.resize//自适应

      },
      draw(v){
        console.log(345445353453452524245)
        let myChart = this.$echarts.init(document.getElementById('myChart1'))
        myChart.setOption(v);
        setTimeout( this.draw,3000)

      }
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
    overflow: hidden;
  }
  .lists>div{
    float: left;
    width: 100%;
    overflow: hidden;
    /*溢出处理*/
  }
#myChart1{
  width: 100%;
}
  /*.contents{*/
    /*height: 100% ;*/
    /*width: 100%;*/
  /*}*/
  /*.contents>#myChart1{*/
    /*min-width: 200px;*/
  /*}*/

</style>
