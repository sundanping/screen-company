<template>
  <div :class="visitFilter?'gray-filter':null" class="lists">
    <div  id="visit-number" :style="{width: '100%', height: '100%'}"></div>
  </div>
</template>
<script>
  import bus from './../../js/eventBus.js'
  import ICountUp from 'vue-countup-v2'
  export default {
    name: 'visitNumber',
    components: {
      ICountUp
    },
    data() {
      return {
        getContent:'',
        visitFilter:false,//显示滤镜
        option:{
          color: [ '#98BFE0', '#3976C5','#003992','#003160',],
          tooltip: {
//            formatter: "{a} <br/>{b}: {c} ({d}%)"
            formatter: "{a} <br/>{b}: {c} ({d}%)"

          },
          title:{
            text:'累计访问量',
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
            left:'86%',
            top:'52%',
            textStyle: {
              color: '#fff'
            },
            data: [
              {value: 400, name: '文稿'},
              {value: 400, name: '图集'},
              {value: 735, name: '视频'},
              {value: 735, name: '专题'},
            ]
          },
          series: [
            {
              name: '累计访问量',
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
                {value: 400, name: '专题'},
                {value: 400, name: '视频'},
                {value: 400, name: '图集'},
                {value: 400, name: '文稿'}
              ]
            },
          ]
        }
      }
    },
    mounted() {
      let clientW = window.innerWidth
      let clientH = window.innerHeight
      document.getElementById('visit-number').style.width = clientW * 0.3 + 'px'
      document.getElementById('visit-number').style.height = clientH * 0.27 + 'px'
      setInterval(this.getContents,1000*60*60*12)
      this.getContents()

    },
    methods: {
      getContents() {
        let self = this

        this.$http.get(this.httpApi+'/getContents').then(
          function(res){
            let arr = [{"total":2383,"app_count":[{"count":1141,"statued":1114,"app_uniquedid":"news","name":"\u6587\u7a3f","color":"#f79646"},{"count":4,"statued":1,"app_uniquedid":"special","name":"\u4e13\u9898","color":"#4bacc6"},{"count":1237,"statued":1053,"app_uniquedid":"livmedia","name":"\u89c6\u9891","color":"#8064a2"},{"app_uniquedid":"vote","name":"\u6295\u7968","color":"#9bbb59","count":0,"statued":0},{"count":1,"statued":1,"app_uniquedid":"tuji","name":"\u56fe\u96c6","color":"#c0504d"}]}]
            self.getContent = res.data
            self.getContent = arr
            self.visitFilter = true
//            self.getContent = {}    //无数据状态调试
            if( self.getContent.length >0){
//            if( self.getContent.special != null && self.getContent.special !=undefined ){
                self.visitFilter = false
                self.option.series[0].data.splice(0,4,
                    {value:self.getContent[0].app_count[1].count, name: '专题'},
                    {value: self.getContent[0].app_count[2].count, name: '视频'},
                    {value: self.getContent[0].app_count[3].count, name: '图集'},
                    {value: self.getContent[0].app_count[0].count, name: '文稿'}
                )
//            获取总量
                  self.option.title.text =  '累计访问量'+ '\n'+ self.getContent[0].total
                  bus.$emit('getContent',{unpublish:999,publish:999,back:999})

            }else{
              self.option.title.text =  '暂无数据'
              bus.$emit('getContent',{unpublish:999,publish:999,back:999})//无数据状态下的假数据

            }

               self.drawLine()
          }).catch(function(error){
              bus.$emit('getContent',{unpublish:999,publish:999,back:999})//无数据状态下的假数据
              self.visitFilter = true
              self.drawLine()
              console.log(error)
        })

      },
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('visit-number'))
        myChart.setOption(this.option)
      }

    }
  }
</script>
<style scoped>
  .lists{
    height: 100%;
    overflow: hidden;
  }
  #visit-number canvas {
    /*top: -8%;*/
  }
</style>
