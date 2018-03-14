<template>
  <article :class="webSeven? 'gray-filter':null"   class="lists" @click="sendMessageToChild()">

    <div id="myChart2" ref="qw" :style="{width: '100%', height: '100%'}"></div>
  </article>
</template>
<script>
  import bus from './../../js/eventBus.js'
  export default {
    name: 'websiteSeven',
    data(){
      return {
        webSeven:false,//控制滤镜
        option :{
          title: {
            text: ''
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
            icon:'reck',
            textStyle: {
              color: '#fff',
              fontSize:18,
              borderRadius: [5, 5, 0, 0],
            },
            data:[ 'PV', 'UV', 'IP']
          },
          toolbox: {
            feature: {
//              saveAsImage: {}
            }
          },
          grid: {
            left: '1%',
            right: '5%',
            bottom: '20%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              name: '日期',
              boundaryGap: false,
              axisLine: {
                lineStyle: {
                  color: ['#ffffff'],
                  width: '2',
                  type: 'solid'
                }
              },
              splitLine: {//网格线
                lineStyle: {// 网格线color
                  color: ['rgba(113,164,242,0.3)']
                },
                width: '1',
                type: 'solid',
                show: true
              },
              axisTick: {
                show: false,
                alignWithLabel: true
              },
              data: ['09-23', '09-24', '09-25', '09-26', '09-27', '09-28', '09-29']
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '数量',
              axisLine: {
                lineStyle: {
                  color: ['#ffffff'],
                  width: '2', //边线宽度
                  type: 'solid'
                }
              },
              axisTick: {
                show: false,
                alignWithLabel: true
              },
              splitLine: {
                lineStyle: {
                  color: ['rgba(113,164,242,0.3)'],
                  width: '1',
//                  type: 'dashed'
                }
              },
              axisPointer: {
                show: true
              }
            }
          ],
          series : [
            {
              name:'PV',
              type:'line',
              smooth: true,
              showSymbol: false,
              symbol: 'circle',
              stack: '总量',
//              areaStyle: {normal: {}},
              areaStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#5ce578'
                  }, {
                    offset: 1,
                    color: '#223'
                  }])
                }
              },
              data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
              name:'UV',
              type:'line',
              smooth: true,
              showSymbol: false,
              symbol: 'circle',
              stack: '总量',
//              areaStyle: {normal: {}},
              areaStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#f7c719'
                  }, {
                    offset: 1,
                    color: '#223'
                  }])
                }
              },
              data:[290, 282, 191, 234, 290, 330, 310]
            },
            {
              name:'IP',
              type:'line',
              smooth: true, //曲线
              showSymbol: false, //曲线
              symbol: 'circle', //曲线
              stack: '总量',
//              areaStyle: {normal: {}}
              areaStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#ff6800'
                  }, {
                    offset: 1,
                    color: '#223'
                  }])
                }
              },
              data:[450, 432, 401, 454, 490, 430, 410]
            },
            {
              name:'平均PV',
              type:'line',
              data:[850,850,850,850,850,850,850],
            },
            {
              name:'平均UV',
              type:'line',
              data:[330,330,330,330,330,330,330]
            },
            {
              name:'平均IP',
              type:'line',
              data:[410,410,410,410,410,410,410,410]
            }
          ]
        }

      }
    },
    mounted() {
      this.sendAjax()
      let clientW = window.innerWidth
//       console.log(1) //这是个坑  删除console 宽度就不能自适应了
      let clientH = window.innerHeight

      document.getElementById('myChart2').style.height=clientH*0.3+ 'px'

    },
    methods: {
      sendAjax(){
          let that = this
          let time=[]
          let web_ip_lastdays=[]
          let web_pv_lastdays=[]
          let web_uv_lastdays=[]
          let web_average_pv= ''
          let web_average_uv= ''
          let web_average_ip= ''
        this.$http.get(this.httpApi+'/showweb')
        .then(function (res) {
            that.response = res
    //        获取时间  IP  PV uv
    //     that.response.data.length=0  //无数据测试
          if(that.response.data.length>0){
              that.webSeven =false
            JSON.parse(that.response.data[0].web_ip_lastdays).forEach(function(item){
              time.unshift(item.datetime)
              web_ip_lastdays.unshift(item.amount)
            })
            JSON.parse(that.response.data[0].web_pv_lastdays).forEach(function(item){
              web_pv_lastdays.unshift(item.amount)
            })
            JSON.parse(that.response.data[0].web_uv_lastdays).forEach(function(item){
              web_uv_lastdays.unshift(item.amount)
            })

            //   获取时间  IP  PV uv平均数
            web_average_pv=( JSON.parse(that.response.data[0].web_average_pv))
            web_average_uv=(JSON.parse(that.response.data[0].web_average_uv))
            web_average_ip=( JSON.parse(that.response.data[0].web_average_ip))
            let web_average_pvs = []
            let web_average_uvs = []
            let web_average_ips = []
            //        pv uv ip 平均值
            for (var i=0;i<7;i++){
              web_average_pvs.push(web_average_pv)
              web_average_uvs.push(web_average_uv)
              web_average_ips.push(web_average_ip)
            }
            //  把数据塞到option   渲染成echarts 图
            that.option.xAxis[0].data.splice(0,7, ...time)
            that.option.series[0].data.splice(0,7, ...web_pv_lastdays)
            that.option.series[1].data.splice(0,7, ...web_uv_lastdays)
            that.option.series[2].data.splice(0,7, ...web_ip_lastdays)
            that.option.series[3].data.splice(0,7, ...web_average_pvs)
            that.option.series[4].data.splice(0,7, ...web_average_uvs)
            that.option.series[5].data.splice(0,7, ...web_average_ips)
            that.sendMessageToChild(true)
          }else{
            that.webSeven = true
            that.drawLine()
            that.sendMessageToChild(false)
          }
        })
        .catch(function (err) {
          console.log(err)
          that.webSeven = true
          that.drawLine()
          that.sendMessageToChild(false)
        })
      },
//      组件间传数据
      sendMessageToChild(type) {
        let self = this
        if(type == true){
//          style 传入子组件控制滤镜
            self.response.data[0].style=true
            bus.$emit('msg',self.response.data[0])
          }else if(type == false){
          bus.$emit('msg',{web_ip_accumulate:999,web_pv_accumulate:999,web_uv_accumulate:999,style:false})
        }
      },
      drawLine() {
        let self = this
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart2'))
        // 绘制图表
        window.addEventListener("resize",function(){
          myChart.resize()
        })
        myChart.setOption(this.option)
        myChart.on('legendselectchanged', function (params) {
          if(params.selected.PV== false && params.selected.UV== true && params.selected.IP== true){
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
          }else  if(params.selected.PV== true && params.selected.UV== false  && params.selected.IP== true){
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
          }else  if(params.selected.PV== true && params.selected.UV== true   && params.selected.IP== false){
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
          }else  if(params.selected.PV== false && params.selected.UV== false   && params.selected.IP== true){
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
          }else  if(params.selected.PV== false && params.selected.UV== true   && params.selected.IP== false){
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
          }else  if(params.selected.PV== true && params.selected.UV==false    && params.selected.IP== false){
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
          else  if(params.selected.PV== false && params.selected.UV==false    && params.selected.IP== false){
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
        })
      }
    },
    watch:{
      option : {
        handler: function (n ,o) {
          setTimeout(this.sendMessageToChild,3)
          this.drawLine()
        },
        deep: true
      },
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
  #myChart2{
    width: 100%!important;

  }
  .gray-filter {
    -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
    filter: grayscale(100%);
  }
</style>

