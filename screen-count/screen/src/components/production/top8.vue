<template>
  <div  class="left-top8">

    <div style="border-bottom: 1px solid #333;margin-bottom:1rem">
      <span>标题</span>
      <span class="float-right">访问量</span>
    </div>
    <span v-for="(item,index) in tops ">

      <div>
        <p class="top8-title">{{index+1}}.
          <a  target="_blank" :href="item.content_url">{{item.title}} </a></p>
        <span class="float-right top8-num">
          <img style="width: 1.4rem;height:.85rem;margin-right:.4rem;" src="../../assets/img/see.png" alt="">
           <i-count-up  :end="item.count*1" :duration="2.5"  ></i-count-up>
          </span>
      </div>
    <!--柱状图.   //:class="filter?'gray-filter':null" -->
      <div style="background-color:rgba(128 , 200 , 212,0.2);height:12px;border-radius: 1rem;margin:-.2rem 0 .9rem">
        <div :style="{width:item.count/max/0.01+'%'}" class="color-line"></div>
      </div>
     </span>

  </div>
</template>
<script>
  import ICountUp from 'vue-countup-v2'
  import top8 from './../../json/top8.json'
export default{
  components: {
    ICountUp
  },
  data() {
    return {
        tops:[],
        max:1,
        filter:false
    }
  },
  mounted() {
    this.getTopEight()
    setInterval(this.getTopEight,1000*60*60*12)

  },
  methods:{
    getTopEight() {
      let self = this
//      http://mobile.gstv.com.cn/screen/access_week.php?appid=7&appkey=hpew3AItkdTQnffvB8oRIlmdEiz1i8eq&count=8
      this.$http.get(this.httpApi+'/getTops').then(function(res){
        self.tops=[]
//        res.data.length=0
        if(res.data.length==0){ //无数据状态默认显示内容
          self.filter=true
          top8.forEach(function(item,index){
            self.tops.push({title:item.title,count:item.count})
            console.log(index)
          })
          self.tops = []
          top8.forEach(function(item){
            self.tops.push({title:item.title,count:item.count,content_url:item.content_url})
          })
//          取最大值

        }else{
          self.filter= false

          self.top = []
          top8.forEach(function(item){
            self.tops.push({title:item.title,count:item.count,content_url:item.content_url})
          })

        }
      }).catch(function(err){
        self.filter=true

        top8.forEach(function(item,index){
          self.tops.push({title:item.title,count:item.count,content_url:item.content_url})
          console.log(index)
        })

      })

    }
  }
}
</script>
<style scoped>
  .left-top8{
    padding:0 2rem;
    height:100%;
    overflow: hidden;
  }

  .left-top8 div{
    display: block;
    height:5.5%;
    position: relative;
    overflow: hidden;
  }
  .left-top8>div:nth-child(even){
  }
  .left-top8 div.color-line{
    background: -webkit-linear-gradient( to right, #5c9dfc, #48c8ef, #5d9afd) ; /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(to right, #5c9dfc, #48c8ef, #5d9afd); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(to right, #5c9dfc, #48c8ef, #5d9afd); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #5c9dfc, #48c8ef, #5d9afd); /* 标准的语法（必须放在最后） */
    position: absolute;
    height:100%;
    border-radius: 10px;

  }
.float-right{
  float:right;
}
  .top8-title{
    width: 80%;
    display: inline-block;
    overflow: hidden;
  }
  .top8-title>a{
    color: #fff;
  }

  .top8-num{
    width: 20%;
    overflow: hidden;
    text-align: right;
  }
</style>

