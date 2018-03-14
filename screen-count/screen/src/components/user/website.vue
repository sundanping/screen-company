<template>
  <div :class="websiteFilter?'gray-filter':null" class="lists ">
    <div @mouseover="legend=true"  @mouseleave="legend=false" id="circle-wrap" :style="{width: '100%', height: '95%'}">
      <!--<div class="" id="website" :style="{width: '100%', height: '90%'}"></div>-->
      <div id="circle-middle" >
         <p  v-if="showPie==0" >PV访问量<br>{{install[0]}}</p>
        <p v-else-if="showPie==1"> UV访问量<br>{{install[1]}}</p>
        <p v-else-if="showPie==2"> IP访问量<br>{{install[2]}}</p>
      </div>
      <!--<transition name="fade" >-->
      <div class="right-warning" v-if="showPie==0 && legend">
         PV访问量:
        <i-count-up  :end="install[0]*1" :duration=".8" ></i-count-up>

      </div>

      <!--</transition>-->
      <div class="right-warning" v-else-if="showPie==1 && legend">
        UV访问量:  <i-count-up  :end="install[1]*1" :duration=".8" ></i-count-up>
      </div>
      <div class="right-warning" v-else-if="showPie==2 && legend">
        IP安装量:  <i-count-up  :end="install[2]*1" :duration=".8" ></i-count-up>
      </div>
    </div>
    <div class="lists-right-website">
      <div  class="count-install" :class="showPie*1 === 0? 'countBackground':null" @mouseover="showPie=0,length=1" @mouseleave="legend=false">
          <h1>

            累计PV：{{install[0]}}
            <!--累计PV:暂无数据-->
          </h1>
          <div class="bg-666-4">
            <div name="count" id="install2" class="prediction-linear-user"></div>
          </div>
      </div>
      <div class="count-install" :class="showPie*1 === 1? 'countBackground':null" @mouseover="showPie=1 " @mouseleave="legend=false">
        <h1>
          累计UV： {{install[1]}}
          <!--累计UV:暂无数据-->
        </h1>
        <div class="bg-666-4">
          <div name="count" id="start-up2" class="prediction-linear-user"></div>
        </div>
      </div>
      <div class="count-install" :class="showPie*1 === 2? 'countBackground':null" @mouseover="showPie=2 " @mouseleave="legend=false">
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

  import ICountUp from 'vue-countup-v2'
  import bus from './../../js/eventBus.js'
  export default {
    components: {
      ICountUp
    },
    name: 'website',
    data () {
      return {
        showPie:0,
        websiteFilter:false,//控制滤镜
        legend:false,
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
      let clientW = window.innerWidth
      let self = this
      this.$http.get(this.httpApi+'/showweb')
        .then(function (res) {
//          res.data.length = 0
         if(res.data.length>0){
           self.websiteFilter=false
           self.message=res.data[0]
           bus.$emit('msg',self.message.web_pv_accumulate)
         }else{
           self.websiteFilter=true
           self.message={web_ip_accumulate:0,web_pv_accumulate:0,web_uv_accumulate:0,style:false}
         }

        }).catch(function(err){
        self.websiteFilter=true
        self.message={web_ip_accumulate:0,web_pv_accumulate:0,web_uv_accumulate:0,style:false}

      })
//      bus.$on('msg',function(res){
//        self.message = res
//        console.log(res)
//        if(self.message.style==false){ //style==false 即没有获取到数据
//          self.websiteFilter = true
//        }else if(self.message.style==true){
//          self.websiteFilter = false
//
//        }
//      })

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
      }
//      drawLine () {
//        let myChart = this.$echarts.init(document.getElementById('website'))
//        // 绘制图表
//        window.resize=function(){
//          myChart.resize()
//        }
//        myChart.setOption(this.option)
//      }
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
  background-color: rgba(128 , 200 , 212,0.2);width:88%
}
  .right-warning{
    position: absolute;
    text-align: center;
    left:30%;
    font-size: 1rem;
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
    transition-duration:.1s;
    text-align: center;
    position: relative;
    top:-20px;
    font-weight: 600;
    border:2rem solid #1E69EB;border-radius: 50%;
    font-size: 1.3rem;
  }
  #circle-middle>p{
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 40%;
  }
  #circle-middle:hover{
    transform:scale(1.1);
    border:25px solid #1E69ea;
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
  .gray-filter {
    -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
    filter: grayscale(100%);
  }
</style>
<style>

  </style>


