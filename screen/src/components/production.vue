<template>
  <article>
    <header id="header">
      <span>{{userStatistics}}</span>
      <span @click="$router.go(-1)">{{goBack}}</span>
    </header>
    <section id="father">
      <section class="left">
        <!--top-->
        <div class="left-top">
          <div>
            <fieldset>
              <legend>累计发稿量</legend>
            </fieldset>
          </div>
          <div>
            <fieldset>
            <legend>2</legend>
          </fieldset>
          </div>
        </div>
        <!--middle-->
        <div style="margin-right:.9%;">
          <fieldset>
            <legend>2</legend>
          </fieldset>
        </div>
        <!--bottom-->
        <div style="margin-right:.9%;">
          <fieldset>
          <legend>2</legend>
        </fieldset>
        </div>
      </section>

      <section class="production-right">
        <!--top-->
        <div style="margin-left:0; ">
          <fieldset>
            <legend>2w</legend>
          </fieldset>
        </div>
        <!--bottom-->
        <div style="margin-left:0; ">
          <fieldset>
            <legend>2</legend>
          </fieldset>
        </div>
      </section>
    </section>
  </article>
</template>
<script>
  import honorRoll from './production/honor-roll'
  import pressNumber from './production/press-number'



  export default {
    name: 'production',
    components: {
      honorRoll
    },
    data() {
      return {
        userStatistics: '用户统计',
        goBack: '返回'
      }
    },
    mounted () {
      let windowHeight = document.body.clientHeight
      console.log(windowHeight)
      let headerHeight = document.getElementById('header').clientHeight
//      document.getElementById('father').style.height=(windowHeight-headerHeight)+'px'//后台加载高度
//      let fieldset = document.getElementsByTagName('fieldset')
//        for(let key of fieldset){
//          console.log(key)
//            key.style.height=windowHeight*0.3 + 'px'
//        }
    }
  }
</script>
<style scoped>
  article{
    padding:2.5%;
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
  #father{
    height:100%;
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
    margin-left:1%;
  }
  .production-right{
    flex:1;
    height:100%;
    overflow: hidden;

  }
  .production-right>div{
    width:100%;
    height:49%;
    display:inline-block;
    margin-left:1px;
    overflow: hidden;

  }
  .production-right>div:first-child{
    margin-top: 2.5%;
  }
  /*图标栏*/
fieldset{
  /*清除浮动*/
    width: 100%;
    height: 100%;
     overflow: hidden;
    border-radius: 6px;
  }
  legend{
    margin-left: 25px;
  }
</style>
