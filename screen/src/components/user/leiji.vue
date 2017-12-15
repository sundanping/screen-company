<template>
  <div style="color:red">
    <div class="lists-right">
      <div class="count-install">
        <h1>
          累计安装量{{install[0]}}
        </h1>
        <div style="background-color: #666;z-index: 5">
          <div name="count" id="install" class="prediction-linear-user"></div>
        </div>
      </div>
      <div class="count-install">
        <h1>
          累计启动量{{install[1]}}
        </h1>
        <div style="background-color: #666">
          <div name="count" id="start-up" class="prediction-linear-user"></div>
        </div>
      </div>
      <div class="count-install">
        <h1>
          累计注册量{{install[2]}}
        </h1>
        <div style="background-color: #666">
          <div  name="count" id="regist" class="prediction-linear-user"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'leiji',
    data() {
      return {
        lists: clue.data,
        install: [232, 344, 453],
        ff: 298,//测试数据
        demoNum: [2323 , 5, 1],
//        pie 图数据
        option: {
          tooltip: {
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          color: ['#1f6aed', '#49abdc'],
          legend: {
            orient: 'vertical',
            x: 'right',
            y:'bottom',
            textStyle: {
              color: '#fff'
            },
            data:['Android','IOS']
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:22, name:'Android'},
                {value:22, name:'IOS'},
              ]
            }
          ]
        }
      }
    },
    created() {
    },
    mounted() {
      let appData = this.appTotal
//      console.log(appData)
//      console.log(appData.data)
      console.log(this.appTotal.data[0])
      this.option.series[0].data =[
        {value:appData.data[0].android_install_accumulate, name:'Android'},
        {value:appData.data[0].ios_install_accumulate, name:'IOS'}
      ]
//      this.install=[this.appTotal.data[0].app_pv_accumulate ,this.appTotal.data[0].app_install_accumulate,this.appTotal.data[0].member_register_accumulate ]
      console.log(this.install)
      setTimeout(this.getWidth, 2500)
      this.setHeight()
      let clientW = window.innerWidth
      let clientH = window.innerHeight
      this.getId('mission').style.width = clientW * 0.47 / 2 + 'px'
      this.getId('mission').style.height = clientH * 0.29 + 'px'
      this.drawLine()
    },
    computed: {},
    methods: {
      getId :v => document.getElementById(v),//获取ID
      getWidth() {
//        console.log(this.install)
//        this.install[1]= 604
//        this.$set(this.install, 0, this.ff)//监听到数组变化渲染到页面，
        this.install.splice(0, 3, ...this.demoNum)//监听到数组变化渲染到页面，或者页面头部渲染ff亦可
        this.setHeight()
      },
      setHeight() {
        let maxValue = Math.max(...this.install);
        if (maxValue > 0) {
          this.getId('install').style.width = (this.install[0] / maxValue) * 100 + '%'||30+'px'
          this.getId('start-up').style.width = this.install[1] / maxValue * 100 + '%'||30+'px'
          this.getId('regist').style.width = this.install[2] / maxValue * 100 + '%'||30+'px'
        } else {
          let countWidth = document.getElementsByName('count')
          for (let i of countWidth) {
            i.style.width = 2 + 'px'
          }
        }
      },
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('mission'))
        // 绘制图表
        myChart.setOption(this.option)
      }
    },
    watch: {
      install:{
        handle:function(){

        }
      }
//      appTotal(newVal,oldVal){
//        let newarr=[
//          {value:newVal.android_install_accumulate , name:'Android'},
//          {value:newVal.ios_install_accumulate , name:'IOS'},
//        ]
//        console.log(newVal.android_install_accumulate )
//        Vue.set(this.option.series[0].data,0, {value:newVal.android_install_accumulate , name:'Android'})
//        Vue.set(this.option.series[0].data,1, {value:newVal.ios_install_accumulate , name:'Android'})
//
////        this.option.series[0].data.splice(0, 2, ...newarr)
////        this.ff=newVal.android_install_accumulate
////       console.log(this.option.series[0].data)
//  },deep:true
    },
    update(){
    }

  }
</script>
<style type="scoped">

</style>
