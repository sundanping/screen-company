<template>
  <article class="lists" @click="sendMessageToChild()">

    <div id="myChart2" ></div>
  </article>
</template>
<script>
  import bus from './../../js/eventBus.js'
  export default {
    name: 'websiteSeven',
    data(){
      return {
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
            textStyle: {
              color: '#fff'
            },
            data:[ 'pv', 'uv', 'ip']
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '7%',
            right: '7%',
            bottom: '12%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              name: '日期',
              boundaryGap: false,
              axisLine: {
                lineStyle: {
                  color: ['#71a4f2'],
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
                  color: ['#71a4f2'],
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
              name:'pv',
              type:'line',
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
              name:'uv',
              type:'line',
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
              data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
              name:'ip',
              type:'line',
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
              data:[150, 232, 201, 154, 190, 330, 410]
            }
          ]
        }

      }
    },
    mounted() {
      this.sendAjax()
      let clientW = window.innerWidth
      let clientH = window.innerHeight
      document.getElementById('myChart2').style.width=clientW*0.47+ 'px'
      document.getElementById('myChart2').style.height=clientH*0.3+ 'px'
      this.drawLine()

    },
    methods: {
      sendAjax(){
        let that = this
        let time=[]
          let web_ip_lastdays=[]
          let web_pv_lastdays=[]
          let web_uv_lastdays=[]
      this.$http.get(this.httpApi+'/showweb')
      .then(function (res) {
        that.response = res
        console.log(that.response)
//        获取时间  IP  PV uv
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

        that.option.xAxis[0].data.splice(0,7, ...time)
        that.option.series[0].data.splice(0,7, ...web_pv_lastdays)
        that.option.series[1].data.splice(0,7, ...web_uv_lastdays)
        that.option.series[2].data.splice(0,7, ...web_ip_lastdays)
        that.sendMessageToChild()

      })
      .catch(function (err) {
        console.log(err)
      })
      },
//      组件间传数据
      sendMessageToChild() {
        let self = this
          bus.$emit('msg',self.response.data[0])
      },
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart2'))
        // 绘制图表、
        window.onresize = myChart.resize;//自适应
        myChart.setOption(this.option)
      }
    },
    watch:{
      option : {
        handler: function (n ,o) {
          console.log("change ")
          setTimeout(this.sendMessageToChild,3)
          this.drawLine()
        },
        deep: true
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
</style>

