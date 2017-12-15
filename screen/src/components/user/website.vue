<template>
  <div class="lists ">
    <div class="" id="website" :style="{width: '100%', height: '90%'}"></div>
    <!--<div :style="{width: '100%', height: '90%'}">-->
      <!--<leiji></leiji>-->
    <!--</div>-->
    <div class="lists-right-website">
      <div style="background-color: rgba(213,213,213,.3)" class="count-install">
          <h1>
            累计PV：{{install[0]}}
            <!--累计PV:暂无数据-->
          </h1>
          <div style="background-color: #666;z-index: 5;width:80%">
            <div name="count" id="install2" class="prediction-linear-user"></div>
          </div>
      </div>
      <div class="count-install">
        <h1>
          累计UV：{{install[1]}}
          <!--累计UV:暂无数据-->
        </h1>
        <div style="background-color: #666;width:80%">
          <div name="count" id="start-up2" class="prediction-linear-user"></div>
        </div>
      </div>
      <div class="count-install">
        <h1>
          累计IP：{{install[2]}}
          <!--累计IP:暂无数据-->
        </h1>
        <div style="background-color: #666;width:80%">
          <div  name="count" id="regist2" class="prediction-linear-user"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//  let clue = require('../../json/clue.json')
//  import leiji from './leiji'
  import bus from './../../js/eventBus.js'

  export default {
    name: 'website',
    components:{
    },
    data () {
      return {
        message:{a:12},
        option:{
//          color: [ '#47abdc', '#1F6AEE'],
          color: [ '#1F6AEE'],
          textStyle: {
            color: '#fff'
          },
          legend: {
            orient: 'vertical', // 图例列表的布局朝向。
            x: 'right',
            y: 'bottom',
            textStyle: {
              color: '#fff'
            },
            data: [ 'PC', '移动']
          },
          series: [
            {
//              name: '任务统计',
              type: 'pie',
              radius: ['50%', '70%', '40%'], // 圆环
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
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
                {value: 400, name: 'PC'},
                {value: 400, name: '移动'}
              ]
            }
          ]
        },
//        lists: clue.data,
        install: [232, 232, 232]
      }
    },
    created () {
    },
    mounted () {
      let clientW = window.innerWidth
      let clientH = window.innerHeight
      this.getId('website').style.width=clientW*0.46/2.2+ 'px'
      this.getId('website').style.height=clientH*0.26+ 'px'
      this.drawLine()
      let self = this
      bus.$on('msg',function(res){
        console.log(res)
        self.message = res
      })
      this.setHeight()
      setTimeout(this.getWidth,500)
    },
    computed: {
    },
    methods:{
      getWidth() {

        this.setHeight()
      },
      setHeight() {
        let that = this
        console.log(that.message)
//        this.message.web_uv_accumulate
        this.install.splice(0, 3, this.message.web_pv_accumulate , this.message.web_uv_accumulate ,this.message.web_ip_accumulate)
        console.log(this.install)
        let maxValue = Math.max(...this.install);
        if (maxValue > 0) {
          this.getId('install2').style.width = (this.install[0] / maxValue) * 100 + '%'||30+'px'
          this.getId('start-up2').style.width = this.install[1] / maxValue * 100 + '%'||30+'px'
          this.getId('regist2').style.width = this.install[2] / maxValue * 100 + '%'||30+'px'
        } else {
          let countWidth = document.getElementsByName('count')
          for (let i of countWidth) {
            i.style.width = 2 + 'px'
          }
        }
      },
      drawLine () {
        let myChart = this.$echarts.init(document.getElementById('website'))
        // 绘制图表
        window.resize=function(){
          myChart.resize()
        }
        myChart.setOption(this.option)
      }
    },
    watch: {
      message:{
            handler: function (newValue,oldValue) {
              this.getWidth()
              console.log(3243242342343243)
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
    padding: 5px;
    display: flex;
    overflow: hidden;}
  .contents{
    height: 100% ;
    width: 100%;
  }
   .grayscale{
    -webkit-filter:grayscale(1);
  }

  .lists div{
    flex:1;
    width: 100%;
    overflow: hidden;
  }
  .lists {
    width: 100%;
    height: 100%;
    flex-basis: 100%;
    position: relative;
    padding: 5px;
    overflow: hidden;
  }

  .lists > div {
    width: 50%;
    float: left;
    overflow: hidden;
  }

  .contents {
    height: 100%;
    width: 100%;
  }

  .contents > #website {
    /*min-width: 200px;*/
    color: red;
  }

  .lists-right-website {;
    padding: 3% 20px;
  }
  .count-install {
    flex-direction: column;
    height: 20%;
    margin-left: 15%;
    margin-top: 5%;
    overflow: hidden;
  }

  .count-install  div {
    border-radius: 6px;
    height: 12px;
    position: relative;

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
    background: -webkit-linear-gradient(to right, #5c9dfc, #5d9afd); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(to right, #5c9dfc, #5d9afd); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(to right, #5c9dfc, #5d9afd); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #5c9dfc, #5d9afd); /* 标准的语法（必须放在最后） */
  }

</style>
<style>
  #website > div canvas
  {
    top: -14%!important;
  }
  </style>


