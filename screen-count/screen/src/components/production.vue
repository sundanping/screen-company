
<template>
  <article class="article">
    <header style="padding-bottom: .5%" id="header">
      <span>{{userStatistics}}</span>
      <h1 class="title-name-user-statistics">智慧甘肃内容统计</h1>

      <span class="btn-border-radius header-last-span" @click="$router.go(-1)">{{goBack}}</span>
    </header>
    <section id="product">
      <section class="left">
        <!--top-->
        <div class="left-top">
          <div>
            <fieldset>
              <legend>累计发稿量</legend>
              <press-number :press-count="press"></press-number>
            </fieldset>
          </div>
          <div>
            <fieldset >
              <legend>累计访问量</legend>
              <visit-number :visit-count ="visit"></visit-number>
            </fieldset>
          </div>
        </div>
        <!--middle-->
        <div class="visit" >
          <fieldset>
            <legend>近七日日均发稿</legend>
            <press-sevenday :press-sevendays="sevendays"></press-sevenday>
          </fieldset>
        </div>
        <!--bottom-->
        <div style="margin-right:.9%;position: relative;top:-9px;top: .15%;">
          <fieldset>
            <legend>本周发稿访问量统计</legend>
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

              <honor-roll :honor-list="honorRoll"></honor-roll>
            </div>
          </fieldset>
        </div>
        <!--bottom-->
        <div style="margin-left:0; ">
          <from>
            <fieldset>
              <legend>本周TOP8 </legend>
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
  import pressNumber from './production/press-number'
  import pressSevenday from './production/press-sevenday'
  import visitOneday from './production/visit-24hours'
  import visitNumber from './production/visit-number'
  import topEight from './production/top8'
  import honorRoll from './production/honor-roll'

  export default {
    name: 'production',
    components: {
      honorRoll,
      pressNumber,
      pressSevenday,
      visitOneday,
      visitNumber,
      topEight
    },
    data() {
      return {
        userStatistics: '内容统计',
        goBack: '返回',
        press:[],
        visit:[],
        ask:{"name":"\u7518\u8083\u9152\u6cc9"},
        sevendays:[],
        honorRoll:[]
      }
    },
    mounted () {
//      let windowHeight = document.body.clientHeight
//      let headerHeight = document.getElementById('header').clientHeight
//      let that = this
//      this.$http.all([
//        //  累计发稿量   本周人员发稿排行榜   近七日发稿排行榜   本周发稿访问量统计
//        this.$http.get('http://mobile.gstv.com.cn/screen/workload_toal.php?appid=7&appkey=hpew3AItkdTQnffvB8oRIlmdEiz1i8eq'),
//        this.$http.get('http://mobile.gstv.com.cn/screen/workload_toal_person.php?appid=7&appkey=hpew3AItkdTQnffvB8oRIlmdEiz1i8eq'),
//        this.$http.get('http://mobile.gstv.com.cn/screen/workload_toal_week.php?appid=7&appkey=hpew3AItkdTQnffvB8oRIlmdEiz1i8eq'),
//        this.$http.get('http://mobile.gstv.com.cn/screen/workload_toal_week.php?appid=7&appkey=hpew3AItkdTQnffvB8oRIlmdEiz1i8eq'),
//        this.$http.get('http://mobile.gstv.com.cn/screen/access_week.php?appid=7&appkey=hpew3AItkdTQnffvB8oRIlmdEiz1i8eq')
//
//    ])
//      //  累计发稿量   本周人员发稿排行榜   近七日发稿排行榜   本周发稿访问量统计
//        .then(this.$http.spread(function (press, personPress, press7,pressRankingList) {
//        let honorRoll =  [{"total":2383,"app_count":[{"count":1141,"statued":1114,"app_uniquedid":"news","name":"\u6587\u7a3f","color":"#f79646"},{"count":4,"statued":1,"app_uniquedid":"special","name":"\u4e13\u9898","color":"#4bacc6"},{"count":1237,"statued":1053,"app_uniquedid":"livmedia","name":"\u89c6\u9891","color":"#8064a2"},{"app_uniquedid":"vote","name":"\u6295\u7968","color":"#9bbb59","count":0,"statued":0},{"count":1,"statued":1,"app_uniquedid":"tuji","name":"\u56fe\u96c6","color":"#c0504d"}]}]
//
//        })).catch(function (err) {
//        console.log(err)
//        let honorRoll =  [{"total":2383,"app_count":[{"count":1141,"statued":1114,"app_uniquedid":"news","name":"\u6587\u7a3f","color":"#f79646"},{"count":4,"statued":1,"app_uniquedid":"special","name":"\u4e13\u9898","color":"#4bacc6"},{"count":1237,"statued":1053,"app_uniquedid":"livmedia","name":"\u89c6\u9891","color":"#8064a2"},{"app_uniquedid":"vote","name":"\u6295\u7968","color":"#9bbb59","count":0,"statued":0},{"count":1,"statued":1,"app_uniquedid":"tuji","name":"\u56fe\u96c6","color":"#c0504d"}]}]
//
//      })



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
    border-bottom:1px dashed #006ce1;
    width: 100%;
    overflow: hidden;
  }
  header span{
    font-size: 2.2rem;
    overflow: hidden;
  }
  .header-last-span{
    right:30px;
    position:absolute;
    top:2%;
    background-color: rgba(233,233,233,.2);
    padding: 0 5px;
    border-radius: 4px;
  }
  /*图标栏*/
  #product{
    height:96%;
    display:flex;
    overflow:hidden;
  }
  .title-name-user-statistics{
    position: absolute;
    top:1.5%;
    width: 100%;
    height: 3%;
    text-align: center;
    font-size: 30px;
  }
  .left{
    flex:2;
    height:100%;
  }
  .left>div{
    height: 31.43%;
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
  .no-net{
    position: absolute;
    z-index: 9999;
    top:50%;
    left:50%;
    width: 120px;
    height: 80px;
    margin-left: -60px;
    margin-top: -40px;
    text-align: center;
    line-height: 80px;
    border-radius: 5px;
    background-color: rgba(233,233,233,.4);
  }
   .gray-filter,.grayscale {
     -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
     filter: grayscale(100%);
   }

  .visit{
    margin-right:.9%;position: relative;top: .15%;
  }

</style>
