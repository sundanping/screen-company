
<template>
  <article class="article">
    <header>
      <span>{{userStatistics}}</span>
      <h1 class="title-name">智慧甘肃用户统计</h1>
      <span class="btn-border-radius" @click="$router.go(-1)">{{goBack}}</span>
    </header>
    <section >
      <fieldset id="app-count">
        <legend style="position: relative;z-index:-1;">APP累计</legend>
        <div>
          <total-app :app-total="response" v-if="flag"></total-app>
        </div>

      </fieldset>
      <fieldset id="web" style="">
        <legend >网站累计</legend>
        <div style="width: 100%">
          <website  v-if="flag"></website>
        </div>

      </fieldset>
    </section>
    <section>
      <fieldset class="app-seven">
        <legend >APP近七日日均</legend>
        <div style="width:100%"><app-seven :message="appSeven" v-if="flag"></app-seven> </div>

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
        <install-target :install-target="response"></install-target>
      </fieldset>
      <fieldset>
        <legend >PV目标预估</legend>
        <pv-target></pv-target>
      </fieldset>
    </section>
  </article>
</template>
<script>
  import accumulate_install from  './../json/accumulate_install.json'
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
        appSeven:{},
        flag:false
      }
    },
    mounted () {
      this.getInformation()
      setInterval( this.getInformation , 1000*60*60*1)
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
        this.$http.get('http://mobile.gstv.com.cn/screen/screen.php?appid=7&appkey=hpew3AItkdTQnffvB8oRIlmdEiz1i8eq')
          .then(function (res) {
          console.log(res,1111)
           if(res.data[0].length ==0){ //请求数据为空，显示默认数据
             console.log(3)
             that.response.style=  true
             that.response ={data:[{
               android_install_accumulate: "222",
               android_pv_ratio: "1",
               android_pv_total: "1412",
               app_average_pv:"11.43",
               app_install_accumulate: "350",
               app_pv_accumulate: "244",
               ios_install_accumulate: "88",
               ios_install_ratio: "0.42",
               ios_pv_ratio: "0",
               ios_pv_total: "829",
               member_register_accumulate: "116"
             }]}

             that.appSeven={
               style:true,
               app_average_uv:221,
               app_average_install:234,
               app_average_pv:255,
               app_install_lastdays: [{amount:0,"datetime":"2018-01-15"},{"amount":0,"datetime":"2018-01-13"},{"amount":0,"datetime":"2018-01-12"},{"amount":251,"datetime":"2018-01-11"},{"amount":220,"datetime":"2018-01-10"},{"amount":270,"datetime":"2018-01-09"},{"amount":190,"datetime":"2018-01-08"}],
               app_pv_lastdays: [{amount:0,"datetime":"2018-01-15"},{"amount":0,"datetime":"2018-01-13"},{"amount":0,"datetime":"2018-01-12"},{"amount":211,"datetime":"2018-01-11"},{"amount":230,"datetime":"2018-01-10"},{"amount":200,"datetime":"2018-01-09"},{"amount":290,"datetime":"2018-01-08"}],
               app_uv_lastdays: [{amount:0,"datetime":"2018-01-15"},{"amount":0,"datetime":"2018-01-13"},{"amount":0,"datetime":"2018-01-12"},{"amount":221,"datetime":"2018-01-11"},{"amount":200,"datetime":"2018-01-10"},{"amount":210,"datetime":"2018-01-09"},{"amount":250,"datetime":"2018-01-08"}]
           }
           }else if(res.data[0].length !=0){
             console.log(4)
             console.log(res.data[0].accumulate_install)
             // that.response= accumulate_install  //测试数据
            //app 累计
             let accumulate_install = res.data[0]
             that.response ={data:[{
               //安卓安装量
               android_install_accumulate: res.data[0].accumulate_install.android_install_accumulate,
               //安卓启动量
               android_pv_total: res.data[0].accumulate_install[0].accumulate_pv.android_pv_accumulate,
               app_install_accumulate: accumulate_install[0].accumulate_install.android_install_accumulate*1 + 1*accumulate_install[0].accumulate_install.ios_install_accumulate,
               app_pv_accumulate: 1*accumulate_install[0].accumulate_pv.ios_pv_accumulate + 1*accumulate_install[0].accumulate_pv.android_pv_accumulate,
               //IOS安装量
               ios_install_accumulate: accumulate_install[0].accumulate_install.ios_install_accumulate,
               //IOS启动量
               ios_pv_total: accumulate_install[0].accumulate_pv.ios_pv_accumulate,
                //注册用户数
               member_register_accumulate: accumulate_install[0].member_register_accumulate
             }]}

//             that.response = res                 //app累计传数据
             that.response.style= false          //显示滤镜
             //APP 七日日均传数据

             that.appSeven.app_pv_lastdays= []
             that.appSeven.app_install_lastdays=[]
             for( var item in accumulate_install[0].app_lastdays){
               //app启动次数7日均值
               that.appSeven.app_pv_lastdays.push({amount:accumulate_install[0].app_lastdays[item].app_pv,datetime:item})
               //app 安装次数7日均值
               that.appSeven.app_install_lastdays.push({amount:accumulate_install[0].app_lastdays[item].app_install,datetime:item})

             }
            //启动平均数  安装平均数
             that.appSeven.app_average_pv = accumulate_install[0].app_average_pv*1
             that.appSeven.app_average_install = accumulate_install[0].app_average_install*1

             that.appSeven.app_average_uv = JSON.parse(res.data[0].app_average_uv)
             that.appSeven.app_uv_lastdays = JSON.parse(res.data[0].app_uv_lastdays)

             //APP 七日日均传数据
             that.appSeven.style=false
             console.log( that.appSeven.app_uv_lastdays)
           }

            that.flag=true
          })
          .catch(function (err) {
            that.flag=true
            that.response = {data:[{
            android_install_accumulate: "0",
            android_pv_ratio: "1",
            android_pv_total: "0",
            app_average_pv:"11.43",
            app_install_accumulate: "0",
            app_pv_accumulate: "0",
            ios_install_accumulate: "0",
            ios_install_ratio: "0.42",
            ios_pv_ratio: "0",
            ios_pv_total: "0",
            member_register_accumulate: "0"
 }],
            style:true}
            that.appSeven={
              style:true,
              app_average_uv:221,
              app_average_install:234,
              app_average_pv:255,
              app_install_lastdays: [{amount:231,"datetime":"2018-01-14"},{"amount":230,"datetime":"2018-01-13"},{"amount":230,"datetime":"2018-01-12"},{"amount":251,"datetime":"2018-01-11"},{"amount":220,"datetime":"2018-01-10"},{"amount":270,"datetime":"2018-01-09"},{"amount":190,"datetime":"2018-01-08"}],
              app_pv_lastdays: [{amount:231,"datetime":"2018-01-14"},{"amount":220,"datetime":"2018-01-13"},{"amount":240,"datetime":"2018-01-12"},{"amount":211,"datetime":"2018-01-11"},{"amount":230,"datetime":"2018-01-10"},{"amount":200,"datetime":"2018-01-09"},{"amount":290,"datetime":"2018-01-08"}],
              app_uv_lastdays: [{amount:231,"datetime":"2018-01-14"},{"amount":220,"datetime":"2018-01-13"},{"amount":250,"datetime":"2018-01-12"},{"amount":221,"datetime":"2018-01-11"},{"amount":200,"datetime":"2018-01-10"},{"amount":210,"datetime":"2018-01-09"},{"amount":250,"datetime":"2018-01-08"}]
            }
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
  .btn-border-radius{
    position: absolute;
    display: inline-block;
    border-radius:4px!important;
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
<style>
  .gray-filter{
    -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
    filter: grayscale(100%);
  }

</style>
