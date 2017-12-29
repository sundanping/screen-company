<template>
  <div class="lists ">

    <div id="circle-wrap" :style="{width: '100%', height: '95%'}">
      <!--<div class="" id="website" :style="{width: '100%', height: '90%'}"></div>-->
      <div id="circle-middle"  style="border:25px solid #1e6aed;border-radius: 50%;">
        <span style="line-height:0;" v-if="showPie==0">
          <span>pv访问量:</span>
          <span>{{install[0]}}</span>
        </span>
        <span v-else-if="showPie==1"> uv访问量:{{install[1]}}</span>
        <span v-else-if="showPie==2"> ip访问量:{{install[2]}}</span>
      </div>
      <!--<transition name="fade" >-->
      <div class="right-warning" v-if="showPie==0">
          pv访问量:{{install[0]}}
        </div>
      <!--</transition>-->
      <div class="right-warning" v-else-if="showPie==1">
        uv访问量:{{install[1]}}
      </div>
      <div class="right-warning" v-else-if="showPie==2">
        ip安装量:{{install[2]}}
      </div>
    </div>
    <div class="lists-right-website">
      <div  class="count-install" :class="showPie*1 === 0? 'countBackground':null" @mouseover="showPie=0">
          <h1>
            累计PV：{{install[0]}}
            <!--累计PV:暂无数据-->
          </h1>
          <div class="bg-666-4">
            <div name="count" id="install2" class="prediction-linear-user"></div>
          </div>
      </div>
      <div class="count-install" :class="showPie*1 === 1? 'countBackground':null" @mouseover="showPie=1">
        <h1>
          累计UV： {{install[1]}}
          <!--累计UV:暂无数据-->
        </h1>
        <div class="bg-666-4">
          <div name="count" id="start-up2" class="prediction-linear-user"></div>
        </div>
      </div>
      <div class="count-install" :class="showPie*1 === 2? 'countBackground':null" @mouseover="showPie=2">
        <h1>
          累计IP：{{install[2]}}
          <!--累计IP:暂无数据-->
        </h1>
        <div class="bg-666-4">
          <div  name="count" id="regist2" class="prediction-linear-user"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>


  import bus from './../../js/eventBus.js'
  export default {
    name: 'website',
    components:{
    },
    data () {
      return {
        showPie:0,
        message:{a:12},
        option: {
          tooltip: {
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          color: ['#1f6aed'],
//          legend: {
//            orient: 'vertical',
//            x: 'right',
//            y:'bottom',
//            textStyle: {
//              color: '#fff'
//            },
//            data:'Android'
//          },
          calculable : true,
          series: [
            {
              name:'网站累计',
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
                {value:22, name:'累计PV'},
              ]
            }
          ]
        },
        install: [232, 232, 232]
      }
    },
    created () {
    },
    computed: {
    },
    mounted () {
      let wh = Math.min(this.getId('circle-wrap').clientWidth,this.getId('circle-wrap').clientHeight)
      this.getId('circle-middle').style.width=wh*.68+'px'
      this.getId('circle-middle').style.height=wh*.68+'px'
      this.getId('circle-middle').style.lineHeight=wh*.68-50+'px'
      let clientW = window.innerWidth
//      let clientH = window.innerHeight
//      this.getId('website').style.width=clientW*0.46/2.2+ 'px'
//      this.getId('website').style.height=clientH*0.26+ 'px'
      let self = this

      bus.$on('msg',function(res){
//        console.log(res)
        self.message = res
      })
      this.setHeight()
      setTimeout(this.getWidth,500)
//      let clientW = window.innerWidth
//      let clientH = window.innerHeight
//      this.getId('website').style.width=clientW*0.46/2.2+ 'px'
//      this.getId('website').style.height=clientH*0.26+ 'px'
//      this.drawLine()
      let selfq = this
      bus.$on('msg',function(res){
//        console.log(res)
        selfq.message = res
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
//        console.log(that.message)
//        this.message.web_uv_accumulate
        this.install.splice(0, 3, this.message.web_pv_accumulate , this.message.web_uv_accumulate ,this.message.web_ip_accumulate)
//        console.log(this.install)
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
    overflow: hidden;
  }

.website{
  border:1px solid #333;

}
  .lists >div{
    flex:1;
    overflow: hidden;
  }
  .count-install {
    /*flex-direction: column;*/
    height: 25%;
    padding:2% 1% 0 5%;
    margin :3% 20% 0 10%;
    overflow: hidden;
    border-radius: 5px;
  }

.bg-666-4{
  background-color: rgba(233,233,233,.1);width:88%
}
  .right-warning{
    position: absolute;
    text-align: center;
    font-weight: 600;
    left:30%;
    margin-top:-12%;
    width: 20%;
    padding: 10px;
    border-radius: 3px;
    background-color: rgba(233,233,233,.1);
  }
  #circle-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #circle-middle{
    transition-duration: .4s;
    text-align: center;
    position: relative;
    top:-20px;

  }
  #circle-middle:hover{
    transform:scale(1.2);
    border:25px solid #1533e6;
  }
  .countBackground{
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
    background: -webkit-linear-gradient(to right, #5c9dfc, #48d6fd,#5c9dfc); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(to right, #5c9dfc, #48d6fd,#5c9dfc); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(to right,  #5c9dfc, #48d6fd,#5c9dfc); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right,  #5c9dfc, #48d6fd,#5c9dfc); /* 标准的语法（必须放在最后） */
  }

</style>
<style>
  .fade-enter-active,.fade-leave-active{
    transition: all 1s ease;
  }
  .fade-enter-active{
    opacity: 1;

  }
  .fade-leave-active{
    opacity: 0;

  }
  /* 需要注意的是.fade-enter必须在.fade-enter-active的后面定义才行 */
  .fade-enter,.fade-leave{
    opacity: 0;

  }
</style>
<style>

  </style>


