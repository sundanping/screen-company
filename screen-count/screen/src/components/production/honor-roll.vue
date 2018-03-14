<template>
  <div  class="left-top8">
    <div style="border-bottom: 1px solid #333;margin-bottom:1rem">
      <span>姓名</span>
      <span class="float-right">发稿量</span>
    </div>
    <span v-for="(item, index) in honor" :key="item.id">
      <div>
        <span class="roll-title ">{{index+1}}.{{item.create_user}}</span>
        <span class="float-right roll-num" > <img style="width: 1rem;height:1rem;margin-right:.4rem;" src="../../assets/img/read.png" alt="">
          <i-count-up  :end="item.count*1" :duration="1"  ></i-count-up>
         </span>
      </div>
      <!--柱状图.   :class="honorFilter? 'gray-filter':null"-->
      <div style="background-color:rgba(128 , 200 , 212,0.2);height:12px;border-radius: 1rem;margin:-.2rem 0 .9rem ">
        <div :style="{width:item.count*100/max+'%'}" class="color-line"></div>
      </div>
     </span>

  </div>
</template>
<script>
  import ICountUp from 'vue-countup-v2'
  import honorJson from './../../json/honor.json'
  export default {
    components: {
      ICountUp
    },
    props:['honor-list'],

    data() {
      return {
        honor:[],
        max:1,
        honorFilter:false
//        backGroundSee:"url(" + require("../../assets/see.png") + ")"
      }
    },
    mounted() {
      this.$nextTick(function(){
        console.log(this.honorList)

      })
      this.getHonorRoll()
      setInterval(this.getHonorRoll,1000*60*60*12+300)
    },
    methods:{
       getHonorRoll() {
         let _this = this
         let arr=[]
//         http://mobile.gstv.com.cn/screen/workload_toal_person.php?appid=7&appkey=hpew3AItkdTQnffvB8oRIlmdEiz1i8eq
         this.$http.get(this.httpApi+'/getCharts').then(function(response){

           if(response.data.length == 0){

             _this.honorFilter = true
//             渲染数据
             if(honorJson[0].person.length>8){
               honorJson[0].person.length = 8
             }
             honorJson[0].person.forEach(function(item){
               _this.honor.push({create_user:item.name,count:item.total})
             })
           }else{
             _this.honor = []
             _this.honorFilter = false
             if(honorJson[0].person.length>8){
               honorJson[0].person.length = 8
             }
             honorJson[0].person.forEach(function(item){
               _this.honor.push({create_user:item.name,count:item.total})
             })

           }

         }).catch(function(err){
           _this.honorFilter = true
           _this.honor=[
             {create_user:'张杰',count:83},
             {create_user:'崔永元',count:21},
             {create_user:'马化腾',count:13},
             {create_user:'张一山',count:12},
             {create_user:'刘涛',count:11},
             {create_user:'孟非',count:10},
             {create_user:'邓琼琼',count:9},
             {create_user:'陈倩倩',count:7}
           ]
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
    height:5.6%;
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
  .roll-num{
    width: 30%;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
  }
  .roll-title{
    width: 70%;
    display: inline-block;
    overflow: hidden;

  }
</style>
