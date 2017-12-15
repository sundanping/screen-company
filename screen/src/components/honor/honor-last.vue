<template>
  <section style="" >
    <h1 :style="background" class="honor-top-title">LAST3</h1>
    <div class="honor-top-name">
      <span class="float-left">账户名称</span>
      <span class="float-right">发稿量</span>
    </div>

    <span v-for='(v,index) in response'>
        <div name='press-name' class="press-name">
          <span class="float-left">{{index+1}} {{v.name}}</span>
          <span class="float-right">{{v.pressNum}}</span>
        </div>
      <!--柱状图 BEGIN-->
       <div class="" style="position:relative;margin: auto 2rem;border-radius:12px;display:block;">
         <div  style="height:100%">
           <div class="width-press">
            <div :style='{width:v.pressNum/maxWidth/0.01+"%"}' name='press-line' class="press-line"></div>
           </div>
         </div>
       </div>
      <!--柱状图END-->
    </span>

  </section>
</template>
<script>
  export default {
    data() {
      return {
        background:{
          backgroundImage: 'url(' + require('../../assets/img/last-3.png') + ')'
        },
        response :[
          {name:'邓琼',pressNum:'10'},
          {name:'徐老师',pressNum:'20'},
          {name:'陈倩倩',pressNum:'30'}
        ],
        maxWidth:50
      }
    },
    mounted() {
//      居中
      setTimeout(this.setLineHeight,1)
//          设置宽度
      let [width1,width2,width3] =this.response
      this.maxWidth= Math.max(width1.pressNum,width2.pressNum,width3.pressNum)
    },
    methods:{
      setLineHeight() {
        let lineHeight= document.getElementsByName('press-name')
        for(let item of lineHeight){
          item.style.lineHeight=lineHeight[0].clientHeight +'px'
        //  console.log( lineHeight[0].clientHeight +'px')
        }
      }
    }
  }
</script>
<style scoped>
  section {
    height:100%;
  }
  .honor-top-title{
    text-align:center;
    background-position: 42% -1px;
    background-repeat:no-repeat ;
    background-size: 1.2rem 1.2rem;
  }
  .honor-top-title,.honor-top-name,div{
    height:12.5%;
    margin:auto 0;
  }
  .honor-top-name{
    border-bottom:1px solid #333;
  }
  .width-press{
    background-color: #192a39;
    height:33.3%;
    position:relative;
    top:33.3%;
    overflower:hidden;
    display: block;
    border-radius:1rem;
    -moz-border-radius:1rem; /* 老的 Firefox */
    -webkit-border-radius: 1rem;
  }
  .width-press:after{
    clear:both;
    content:'';
    overflower:hidden;
  }
  .press-name{
  }
  .press-line{
    border-radius:1rem;
    -moz-border-radius:1rem; /* 老的 Firefox */
    -webkit-border-radius: 1rem;
    position:absolute;
    top:0;
    height:100%;
    background: -webkit-linear-gradient( to right, #5c9dfc, #48c8ef, #5d9afd) ; /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(to right, #5c9dfc, #48c8ef, #5d9afd); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(to right, #5c9dfc, #48c8ef, #5d9afd); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #5c9dfc, #48c8ef, #5d9afd); /* 标准的语法（必须放在最后） */
    z-index:1222;
  }
</style>
