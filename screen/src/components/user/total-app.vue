<template>
  <div class="lists">
    <!--饼状图 BEGIN-->
    <div style="">
      <div id="mission" ref="mission" :style="{width: '100%', height: '100%'}"></div>
    </div>
    <!--饼状图 END-->

  <!--累计安装量柱状图 BEGIN-->
    <div class="lists-right">
    <div class="count-install" :class="showNumber==0 ?'bgcolor':null" @mouseover="installNumber()">
      <h1>
        累计安装量{{install[0]}}
      </h1>
      <div class="bg-666">
        <div name="count" id="install" class="prediction-linear-user"></div>
      </div>
    </div>
    <div class="count-install" :class="showNumber==1 ?'bgcolor':null" @mouseover="startNumber()">
      <h1>
        累计启动量{{install[1]}}
      </h1>
      <div class="bg-666">
        <div name="count" id="start-up" class="prediction-linear-user"></div>
      </div>
    </div>
    <div class="count-install">
      <h1>
        累计注册量{{install[2]}}
      </h1>
      <div class="bg-666">
        <div  name="count" id="regist" class="prediction-linear-user"></div>
      </div>
    </div>
  </div>

    <!--累计安装量柱状图 END-->

  </div>

</template>
<script>
  export default {
    name: 'totalApp',
    props:['app-total'],
    data() {
      return {
        showNumber:0,
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
          calculable : true,
          series: [
            {
              name:'安装量',
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
      let mission=document.getElementById('mission')
      let appData = this.appTotal
      this.option.series[0].data =[
        {value:appData.data[0].android_install_accumulate, name:'Android'},
        {value:appData.data[0].ios_install_accumulate, name:'IOS'}
      ]

      setTimeout(this.getWidth, 500)
      this.setHeight()
      let clientW = window.innerWidth
      let clientH = window.innerHeight
      this.getId('mission').style.width = clientW * 0.47 / 2 + 'px'
      this.getId('mission').style.height = clientH * 0.29 + 'px'

      this.drawLine()
    },
    computed: {},
    methods: {
      getWidth() {
        this.install.splice(0, 3, this.appTotal.data[0].app_install_accumulate,this.appTotal.data[0].app_pv_accumulate,this.appTotal.data[0].member_register_accumulate)//监听到数组变化渲染到页面，或者页面头部渲染ff亦可
        this.setHeight()
      },
      setHeight() {
        let maxValue = Math.max(...this.install);
        if (maxValue > 0) {

              this.getId('install').style.width = (this.install[0] / maxValue) * 100 + '%'||30+'px'
              this.getId('start-up').style.width = this.install[1] / maxValue * 100 + '%'||30+'px'
              this.getId('regist').style.width = this.install[2] / maxValue * 100 + '%'||30+'px'
    //          console.log(this.getId('start-up').style.width = this.install[1] / maxValue )
        } else {
          for (let i of countWidth) {
            i.style.width = 2 + 'px'
          }
        }
      },
      installNumber() {
        this.showNumber=0
        this.option.series[0].data.splice(0,2, {value:this.appTotal.data[0].android_install_accumulate, name:'Android'},
          {value:this.appTotal.data[0].ios_install_accumulate, name:'IOS'})
        console.log(this.option)
        this.option.series[0].name='安装量'

        this.drawLine()
      },
      startNumber() {
        this.showNumber=1
        this.option.series[0].data.splice(0,2, {value:this.appTotal.data[0].android_pv_total, name:'Android'},
          {value:this.appTotal.data[0].ios_pv_total, name:'IOS'})
        this.option.series[0].name='启动量'
        console.log(this.option)
        this.drawLine()
      },
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('mission'))
        // 绘制图表
        window.addEventListener("resize",function(){
          myChart.resize()
        })
        myChart.setOption(this.option)
      }
    },
    watch: {
//      install:{
//        handle:function(){
//        }
//  }
//  },deep:true
    },
    update(){
    }
  }
</script>
<style scoped>
  .grayscale{
    -webkit-filter:grayscale(1);
    filter:grayscale(1);
  }

  .lists {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 5px;
  }
  #mission{
    padding-top: 20px;
  }


  .bg-666{
    background-color: rgba(233,233,233,.1);
    padding-right: 5%;
  }
  .lists > div {
    flex: 1;
  }

  /*.lists-right {*/
    /*background-color: #8c939d;*/
  /*}*/

  .count-install {
    /*flex-direction: column;*/
    height: 25%;
    padding:2% 3% 0 5%;
    margin :3% 25% 0 10%;
    overflow: hidden;
    border-radius: 5px;
  }
  .bgcolor{
    background-color: rgba(147, 148, 149, 0.2);
  }
  .count-install  div {
    border-radius: 6px;
    height: 12px;
    /*width: 80%!important;*/
    position: relative;
    top:5%;

  }
  .count-install> div> div{
    position:absolute;
  }
  h1 {
    font-size: 18px;
  }

  .prediction-linear-user {
    display: inline-block;
    z-index: 10;
    background: -webkit-linear-gradient(to right,  #5c9dfc, #48d6fd,#5c9dfc); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(to right, #5c9dfc, #48d6fd,#5c9dfc); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(to right,#5c9dfc, #48d6fd,#5c9dfc); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #5c9dfc, #48d6fd,#5c9dfc); /* 标准的语法（必须放在最后） */
  }
</style>
<style>
  #mission > div canvas {
  top: -14%!important;
  }
  #mission>div{
    overflow: inherit!important;
  }
</style>
