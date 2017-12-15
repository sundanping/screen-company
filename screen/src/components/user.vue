
<template>
  <article class="article">
    <header>
      <span>{{userStatistics}}</span>
      <span @click="$router.go(-1)">{{goBack}}</span>
    </header>
    <section >
      <fieldset id="app-count">
        <legend >APP累计</legend>
        <div><total-app :app-total="response" v-if="flag"></total-app></div>

      </fieldset>
      <fieldset id="web" style="">
        <legend >网站累计</legend>
        <div style="width: 100%">
          <website :app-total="response" v-if="flag"></website>
        </div>

      </fieldset>
    </section>
    <section>
      <fieldset class="app-seven">
        <legend >APP近七日日均</legend>
        <div style="width:100%"><app-seven :message="response" v-if="flag"></app-seven> </div>

      </fieldset>
      <fieldset>
        <legend >网站近七日日均</legend>
        <div >
          <website-seven></website-seven>
        </div>

      </fieldset>
    </section>
    <section>
      <fieldset class="install">
        <legend >安装量目标预估</legend>
        <install-target></install-target>
      </fieldset>
      <fieldset>
        <legend >PV目标预估</legend>
        <pv-target></pv-target>
      </fieldset>
    </section>
  </article>
</template>
<script>
  import totalApp from './user/total-app'
  import installTarget from './user/install-target'
  import pvTarget from './user/pv-target'
  import website from './user/website'
  import appSeven from './user/app-sevenday'
  import websiteSeven from './user/website-sevenday'

  export default {
    name: 'user',
    components: {
      totalApp,
      installTarget,
      pvTarget,
      website,
      appSeven,
      websiteSeven
    },
    data() {
      return {
        userStatistics: '用户统计',
        goBack: '返回',
        response:'',
        flag:false
      }
    },
    mounted () {
      this.getInformation()
      let windowHeight = window.innerHeight
      let fieldset = document.getElementsByTagName('fieldset')
      for(let key of fieldset){
//        fieldset 宽度设置
        key.style.height=windowHeight*0.3 + 'px'
      }
    },
    methods : {
      getInformation () {
        let that = this
        that.flag= false
        this.$http.get(this.httpApi+'/showapp')
          .then(function (res) {
            that.response = res
            that.flag=true
//            console.log(that.response)
          })
          .catch(function (err) {
            console.log(err)
          })

      },
    }
  }
</script>
<style scoped>

  .article{
    overflow: hidden;
    padding:0 1%;
  }
  section{
    width: 100%;
    overflow: hidden;

  }
  #web{
    -webkit-border-radius: 6px ;
    -moz-border-radius: 6px;
    border-radius: 6px;
    -khtml-border-radius: 6px;
    -webkit-border-radius: 6px!important;
    border-radius: 6px!important;
  }
  #web>div{
    display:inline-block;
    width:45%;
    height:99%;
    overflow:hidden;
  }
  header{
    border-bottom:1px dotted #006ce1;
    width: 100%;
    height: 6%;
    margin-bottom:1%;
    margin-top:1%;
    overflow: hidden;
  }
  header span{
    font-size: 22px;
    overflow: hidden;
  }
  header span:last-child{
    float: right;
    position:relative;
    bottom:2px;
    background-color: #bfbfbf;
    padding: 0 5px;
  }
  #app-count >div{
    display:inline-block;
    width:100%;
    height:99%;
    overflow:hidden;
  }
  fieldset>div{
    display:inline-block;
    width:100%;
    height:99%;
    overflow:hidden;
  }
  fieldset{
    /*清除浮动*/
    border-color: #006ce1;
    position: relative;
    box-sizing: border-box;
    width: 49%;
    height: 30%;
    display: inline-block;
    overflow: hidden;
  }

  section fieldset:nth-child(even){
    left: 1%;
  }
  legend{
    margin-left: 25px;
    padding:0 30px;
  }
  .install{

  }

</style>
