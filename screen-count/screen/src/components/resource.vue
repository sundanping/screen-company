
<template>
  <article class="article">
    <header>
      <span>{{userStatistics}}</span>
      <h1 class="title-name">智慧甘肃资源统计</h1>
      <span class="btn-border-radius" @click="$router.go(-1)">{{goBack}}</span>
    </header>

    <section class= "resource resource-first " >
      <fieldset >
        <legend style="position: relative;z-index:-1;">直播频道</legend>
        <live></live>
        <div>

          <!--<play-time></play-time>-->
        </div>
      </fieldset>
      <fieldset class=" resource  resource-margin-left">
        <legend >累计播放时长</legend>
        <div>

          <play-time></play-time>
        </div>
      </fieldset>
      <fieldset class="resource-margin-left">
        <legend style="position: relative;z-index:-1;">累计播放次数</legend>
        <div>
          <play-count></play-count>
          <!--<play-time></play-time>-->
        </div>
      </fieldset>
    </section>

    <section class=" resource resource-second">
      <fieldset class="flex-2">
        <legend >24频道播放次数</legend>
        <play-count-hour></play-count-hour>

      </fieldset>
      <fieldset class=" resource resource-margin-left">
        <legend >24H检测</legend>
        <test-hour></test-hour>
      </fieldset>
    </section>
    <section class=" resource  resource-third ">
      <fieldset class="flex-2">
        <legend >故障通知</legend>
        <warn-fault></warn-fault>
      </fieldset>
      <fieldset class="resource-margin-left">
        <legend >磁盘空间</legend>
        <dist-space></dist-space>
      </fieldset>
    </section>
  </article>
</template>
<script>


  import playTime from './resource/play-time'
  import playCount from './resource/play-count'
  import distSpace from './resource/dist-space'
  import warnFault from './resource/warn-fault'
  import playCountHour from './resource/play-24h'
  import testHour from './resource/test-24h'

  import live from './resource/live'
  export default {
    name: 'resource',
    components: {
      playTime,
      playCount,
      live,
      warnFault,
      testHour,
      playCountHour,
      distSpace
    },
    data() {
      return {
        userStatistics: '资源统计',
        goBack: '返回',
        response: '',
        appSeven: {},
        flag: false
      }
    },
    mounted() {
      this.getInformation()
      setInterval(this.getInformation, 1000 * 60 * 60 * 1)
      let windowHeight = window.innerHeight
    },
    methods: {
      getInformation(){

      }
    }
  }
</script>
<style scoped>

  .article{
    height: 100%;
    overflow: hidden;
    padding:0 1%;
  }
  section{
    width: 100%;
    overflow: hidden;

  }
  .btn-border-radius{
    position: absolute;
    display: inline-block;
    border-radius:4px!important;
  }

  header{
    border-bottom:1px dashed #006ce1;
    width: 100%;
    height: 6%;
    padding-bottom:.5%;
    margin-bottom: .5%;
    margin-top:1%;
    overflow: hidden;
  }

  header span{
    font-size: 2rem;
    overflow: hidden;
    position: absolute;
  }
  .title-name{
    width: 100%;
    text-align: center;
    font-size: 30px;
  }
  header span:last-child{
    /*font-size: 22px;*/
    right:30px;
    position:absolute;
    top:2%;

    background-color: rgba(233,233,233,.2);
    padding: 0 5px;
  }

  #app-count >div{
    display:inline-block;
    width:100%;
    height:99%;
    overflow:hidden;
  }

  .resource{
    height: 30%;
    overflow: hidden;

  }
  .resource-first>fieldset{
    box-sizing: border-box;
    width: 32.5%;
    display: inline-block;
    height: 100%;

  }
  .resource-first> .resource-margin-left{
    margin-left:.5%;
  }
  .resource-second>fieldset,.resource-third>fieldset{
    box-sizing: border-box;
    width: 65.6%;
    display: inline-block;
    height: 100%;
  }
  .resource-second,.resource-third{
    margin-top: .3%;
  }
  .resource-second>fieldset:last-child{
    box-sizing: border-box;
    width: 32.5%;
    display: inline-block;
    height: 100%;
    margin-left: .6%;
  }
  .resource-third>fieldset:last-child{
    box-sizing: border-box;
    width: 32.5%;
    display: inline-block;
    height: 100%;
    margin-left: .6%;
  }
  fieldset{
    border-color: #006ce1;
    overflow: hidden;
  }
 legend{
    margin-left: 25px;
    padding:0 30px;
  }


</style>
<style>
  .gray-filter{
     -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
    filter: grayscale(100%);
  }

</style>
