
<template>
  <article class="article">
    <header id="header">
      <span>{{userStatistics}}</span>
      <span @click="$router.go(-1)">{{goBack}}</span>
    </header>
    <section id="product">
      <section class="left">
        <!--top-->
        <div class="left-top">
          <div>
            <fieldset>
              <legend>累计发稿量</legend>
              <press-number></press-number>
            </fieldset>
          </div>
          <div>
            <fieldset >
              <legend>累计访问量</legend>
              <visit-number></visit-number>
            </fieldset>
          </div>
        </div>
        <!--middle-->
        <div class="visit" style="margin-right:.9%;position: relative;top:-5px;">
          <fieldset>
            <legend>近七日日均发稿</legend>
            <press-sevenday></press-sevenday>
          </fieldset>
        </div>
        <!--bottom-->
        <div style="margin-right:.9%;position: relative;top:-9px;">
          <fieldset>
            <legend>24小时访问量</legend>
            <visit-oneday></visit-oneday>
          </fieldset>
        </div>
      </section>

      <section class="production-right">
        <!--top-->
        <div style="margin-left:0 ">
          <fieldset>
            <legend>本周光荣榜</legend>
            <div style="height: 100%">

              <honor-roll></honor-roll>
            </div>
          </fieldset>
        </div>
        <!--bottom-->
        <div style="margin-left:0; ">
          <from>
            <fieldset>
              <legend>本周TOP8</legend>
              <div class="top-8"  style="height:100%;">
                <top-eight></top-eight>
              </div>
            </fieldset>
          </from>
        </div>
      </section>
    </section>
  </article>
</template>
<script>
  //  import honorRoll from './production/honor-roll'
  import pressNumber from './production/press-number'
  import pressSevenday from './production/press-sevenday'
  import visitOneday from './production/visit-24hours'
  import visitNumber from './production/visit-number'
  import topEight from './production/top8'
  import honorRoll from './production/honor-roll'
//  import honorTop from './honor/honor-top'
//  import honorLast from './honor/honor-last'

  export default {
    name: 'production',
    components: {
      honorRoll,
      pressNumber,
      pressSevenday,
      visitOneday,
      visitNumber,
      topEight
//      honorTop,
//      honorLast
    },
    data() {
      return {
        userStatistics: '内容统计',
        goBack: '返回'
      }
    },
    mounted () {
      let windowHeight = document.body.clientHeight
      let headerHeight = document.getElementById('header').clientHeight
//      document.getElementById('father').style.height=(windowHeight-headerHeight)+'px'//后台加载高度
//      let fieldset = document.getElementsByTagName('fieldset')
//        for(let key of fieldset){
//          console.log(key)
//            key.style.height=windowHeight*0.3 + 'px'
//        }
    },
    methods:{

    }
  }
</script>
<style>
  .article{
    padding:1%;
    height: 100%;
  }

  header{
    border-bottom:1px dotted #006ce1;
    width: 100%;
    overflow: hidden;
  }
  header span{
    font-size: 20px;
    overflow: hidden;
  }
  header span:last-child{
    float: right;
    background-color: #bfbfbf;
    padding: 0 5px;
  }
  /*图标栏*/
  #product{
    height:97%;
    display:flex;
    overflow:hidden;
  }
  .left{
    flex:2;
    height:100%;
  }
  .left>div{
    height: 32%;
    margin-top:1.3%;
    overflow: hidden;
  }
  .left-top >div{
    width: 49%;
    display: inline-block;
    height:100%;
    overflow: hidden;

    /*border:1px solid #666;*/
  }
  .left-top >div:last-child{
    margin-left:.7%;
  }
  .production-right{
    flex:1;
    height:100%;
    overflow: hidden;
    margin-left:.4%;
  }
  .production-right>div{
    width:100%;
    height:48.75%;
    display:inline-block;
    overflow: hidden;
  }
  .production-right>div:first-child{
    margin-top: 2.5%;
  }
  /*图标栏*/
  fieldset{
    /*清除浮动*/
    border:1px solid #006ce1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    -webkit-border-radius: 26px!important;
    border-radius: 6px!important;
  }
  legend{
    margin-left: 25px;
    padding:0 30px;
  }
  .production-right div fieldset aside{
    height:46%;
  }
  .top-8 >div{

  }

</style>
