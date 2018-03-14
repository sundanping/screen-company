<template>
  <article  :class="installFilter?'gray-filter':null">
    <!--提交后的弹框-->
    <transition name="slide-fade">
        <div v-show="!toggle && alertType "  class="sweet-alert alert-transfrom">
            <p> &nbsp;&nbsp;&nbsp;&nbsp;根据您预设的时间和目标，完成难易程度为：</p>
            <h3 style="text-align: center;margin-top: 12px;font-size: 20px;">
              <span v-if="canFinish ==2"> 容易完成</span>
              <span v-if="canFinish ==1">可能完成</span>
              <span v-if="canFinish ==0">很难完成</span>
            </h3>
        </div>
    </transition>

    <section v-show="toggle" class="text-align-center">
      <div  class="block prediction-div">
        <span class="demonstration"> 目标截止时间：</span>
        <el-date-picker
          style="background:none;"
          v-model="value1"
          align="right"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          :picker-options="pickerOptions1"
        >
        </el-date-picker>
        <!--<span v-if="warnSelectDate" class="red">请选择日期</span>-->
      </div>

      <!--预告目标-->
    </section>
       <section v-show="toggle" class="text-align-center">
      <div class="prediction prediction-div">
        <div style=" display: inline-block; margin-bottom:4px;"> <span>&nbsp;&nbsp;&nbsp;&nbsp; 阶段目标：</span>
          <input  class="prediction-result" v-model="goal" type="text" @focus="watchDate" @blur="watchSelf($event)">
          <!--<span class="red">{{warnGoal}}</span>-->
        </div>

      </div>
    </section>
      <section v-show="toggle" class="text-align-center">
      <div class="prediction prediction-div">
        <!--<el-button class="a">提交评估</el-button>-->
        <span class="demonstration" style="opacity: 0"> &nbsp;&nbsp;&nbsp;&nbsp;截止时间：</span>
        <input style="border: 0;" class="prediction-result prediction-linear"
          @click="sendInstall()"     value="提交评估" type="button">
      </div>
        <p class="color-red"> {{warnGoal}}</p>
    </section>

    <transition name="slide-fade">
      <section v-show="!toggle" class="result-install-goal" style="height: 85%;">

        <div class="hover-red" style="position: relative" @mouseover="showTotalColor()" @mouseleave="hideTotalColor()">
          <div class="img-install">
            <img v-if="totalColorStyle==1" style="width: 50%;height: 50%;margin-top:25%;"  src="./../../assets/img/total-red.png" alt="">
            <img v-if="totalColorStyle==0" style="width: 50%;height: 50%;margin-top:25%;"  src="./../../assets/img/mubiao.png" alt="">
          </div>
          <div style="height:60%;width:60%;"></div>
            <h3 >{{goal}}</h3>
          <br>
            <h3 >完成目标</h3>
        </div>
        <div @mouseover="showGoalColor()" @mouseleave="hideGoalColor()"  class="hover-yellow"  style="position: relative">
          <div class="img-install">
            <img v-if="GoalColorStyle==1" style="width: 50%;height: 50%;margin-top:25%;"  src="./../../assets/img/finish-time-1.png" alt="">
            <img v-if="GoalColorStyle==0" style="width: 50%;height: 50%;margin-top:25%;"  src="./../../assets/img/finish-time.png" alt="">
          </div>
          <div style="height:60%;width:60%;"></div>
          <h3 class="hover-red">{{finishTime}}天</h3>
          <br>
          <h3 class="hover-red">完成时间</h3>
        </div>
        <div class="hover-blue" style="position: relative" @mouseover="showTimeColor()" @mouseleave="hideTimeColor()">
          <div class="img-install">
            <img v-if="timeColorStyle==1" style="width: 50%;height: 50%;margin-top:25%;"  src="./../../assets/img/total-1.png" alt="">

            <img v-if="timeColorStyle==0" style="width: 50%;height: 50%;margin-top:25%;"  src="./../../assets/img/total.png" alt="">
          </div>
          <div style="height:60%;width:60%;"></div>
          <h3 >{{installTarget.data[0].app_install_accumulate}}</h3>
          <br>
          <h3 >当前累计</h3>

        </div>
        <div class="hover-green" style="position: relative" @mouseover="showTodayColor()" @mouseleave="hideTodayColor()">
          <div class="img-install">
            <img v-if="todayColorStyle==1" style="width: 50%;height: 50%;margin-top:25%;"  src="./../../assets/img/today-1.png" alt="">
            <img v-if="todayColorStyle==0" style="width: 50%;height: 50%;margin-top:25%;"  src="./../../assets/img/today.png" alt="">
          </div>
          <div style="height:60%;width:60%;"></div>
          <h3 >{{Math.ceil(goal/finishTime).toFixed(2)}}</h3>
          <br>
          <h3  >今日目标</h3>
        </div>
      </section>

    </transition>


    <div v-show="!toggle" class="rest-install" @click="change()">重 置</div>
  </article>
</template>
<script>
  import dateFormate from './../../js/dateFormate.js'
  export default {
    name: 'installTarget',
    props:['install-target'],

    data() {
      return {
        toggle:true,
        finishTime:0,
        installFilter:false,
        goal:'',
        totalColorStyle:0,
        GoalColorStyle:0,
        timeColorStyle:0,
        todayColorStyle:0,
        alertType:false,
        warnGoal:'',
        canFinish:2,
        warnSelectDate:false,
//        result: '提交评估查看评估结果',
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '明天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() +3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          },
            {
              text: '一周后',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() +3600 * 1000 * 24*7);
                picker.$emit('pick', date);
              }
            },
            {
              text: '30天后',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() +3600 * 1000 * 24*30);
                picker.$emit('pick', date);
              }
            }
          ]
        },
        value1: ''
      };
    },
    mounted(){
      if(window.navigator.onLine){
        this.installFilter = false
      }else{
        this.installFilter = true
      }
    },
    methods:{

      change(){
        this.toggle = ! this.toggle
        if(this.toggle == true){
          this.restGoal()
        }
      },
      restGoal(){
       this.goal = ''
       this.value1 = ''
      },
      watchDate(){
        if(this.value1==''){
          this.warnSelectDate = true
        }else{
          this.warnSelectDate = false
        }
      },
      watchSelf(e){
        let reg =/^[0-9]*$/
        if(this.value1==''){
          this.warnGoal='请选择日期'
          return

        }else if( this.value1!='' && Math.ceil((this.value1.valueOf() - new Date())/1000/60/60/24)<0){
          this.warnGoal='请从即日起开始选择'

        }
        else if(this.value1 !=''&& this.goal==''){
            this.warnGoal='请输入目标'
        }else if(this.goal!='' && !reg.test(this.goal) ){
           this.warnGoal='请输入有效的数字'
//           console.log(Object.prototype.toString.call(this.goal))
        }else if(reg.test(this.goal) ){
            this.warnGoal=''
        }
      },
      sendInstall(){
        this.watchSelf()
        let that = this
        if(that.value1 ==''){
          that.warnSelectDate = true
        }else{
          that.warnSelectDate = false
        }

         this.$http.get(this.httpApi+'/install',
           {params:
             {
               goal:that.goal,
               date:this.dateFormate(this.value1)
             }
           })
           .then(function (res) {
             that.installFilter = false
             that.canFinish = res.data
             that.alertType = true
             setTimeout(that.closeAlert,5000)
             that.finishTime = Math.ceil((that.value1.valueOf() - new Date())/1000/60/60/24)
             if(that.finishTime*1 === 0){
               that.finishTime =1
             }

             that.change()
           })
           .catch(function (err) {

             console.log(err)

           })
      },
//      目标
      showGoalColor(e){
        this.GoalColorStyle = 1
      },
      hideGoalColor(e){
        this.GoalColorStyle = 0
      },
//      累计
      showTotalColor(e){
        this.totalColorStyle = 1
      },
      hideTotalColor(e){
        this.totalColorStyle = 0
      },
//      时间
      showTimeColor(e){
        this.timeColorStyle = 1
      },
      hideTimeColor(e){
        this.timeColorStyle = 0
      },
//      当前
      showTodayColor(e){
        this.todayColorStyle = 1
      },
      hideTodayColor(e){
        this.todayColorStyle = 0
      },
      closeAlert(){
        this.alertType = false
      }
    },
    watch:{
      goal:function(n) {
        let reg =/^[0-9]*$/
        if(reg.test(n) ){
          this.warnGoal=''
        }else{
          this.warnGoal='请输入有效的数字'
        }
      }
    }
  }
</script>
<style scoped>


  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .4s ease;
  }
  .slide-fade-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
  div.prediction {
    /*margin-top: 20px;*/
  }
.demonstration{
  font-weight: 600;
}
  .prediction-result {
    width: 217px;
    height: 36px;
    color: #fff;

    border-radius: 4px;
    border: 1px solid #fff;
    display: inline-block;
    background-color: rgba(232,232,232,0);
  }
  .prediction-result:active{
    transform:scale(1.01);
    -webkit-transform:scale(1.01);
  }
  article {
    height: 100%;
    padding: 4% 14%;
  }

  section {
    height: 30%;
  }
  /*section:last-child{*/
    /*position: relative;*/
    /*left:80px;*/
  /*}*/
  .prediction span{
    font-weight: bold;

  }
  .can-finish{
    margin-left: 50px;
  }
  .can-finish img{
    position: absolute;
    width: 55px;
    height: 50px;
    top:-4px;
    left:46px;
  }
  .not-finish img{
    width: 61px;
    height: 50px;
  }
  .prediction-linear{
    font-weight: bold;
    background: -webkit-linear-gradient( to right, #5c9dfc, #48c8ef, #5d9afd) ; /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(to right, #5c9dfc, #48c8ef, #5d9afd); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(to right, #5c9dfc, #48c8ef, #5d9afd); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #5c9dfc, #48c8ef, #5d9afd); /* 标准的语法（必须放在最后） */
  }

  .gray-filter {
    -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
    filter: grayscale(100%);
  }
  .result-install-goal{
    overflow: hidden;

  }
  .img-install{
    height:90px;
    width:90px;
    background-color: rgba(52,55,67,0.74);
    border-radius: 50%;
    margin: 0 auto;
    position: absolute;
    margin-top: 20px;
    left: 0;
    right:0;
  }
  .result-install-goal>div{
    display:inline-block ;
    text-align: center;
    box-sizing: border-box;
    width: 25%;
    float:left;
    height: 100%;
    overflow: hidden;
  }
  .result-install-goal：after{
         　content:"";
  　　　　　　height:0;
  　　　　　　line-height:0;

  　　　　　　display:block;

  　　　　　　visibility:hidden;

  　　　　　　clear:both;
  }
  .rest-install{
    display: inline-block;
    margin-bottom: 0px;
    width: 4.2rem;
    position: absolute;
    bottom: 8px;
    right: 8px;
    text-align: center;
    border-radius: 3px;
    background: linear-gradient(to right, #2774ea, #419cd7);;
  }
.evaluation-results>div{
  display: inline-block;
}
  .circle-install-target{
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: 1px solid #fff;
    box-sizing: border-box;
    position: relative;

  }
  .circle-install-target-child{
    width: .5rem;
    height: .5rem;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    top:0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
  }
  .color-red{
    color: red;
  }
  .sweet-alert{
    position: absolute;
    z-index: 666;
    left: 50%;
    top: 50%;
    right: 0;
    bottom: 0;
    margin: auto;
    padding-top: 20px;
    margin-top: -60px;
    margin-left: -100px;
    width: 200px;
    height: 120px!important;
    border-radius: 5px;
    background-color: rgba(1,2,3,.7);
  }
  .sweet-alert>p{
    padding-left: 20px;
  }

  .alert-transfrom{
    animation: myfirst 4s;
    -moz-animation: myfirst 4s; /* Firefox */
    -webkit-animation: myfirst 4s; /* Safari 和 Chrome */
    -o-animation: myfirst 4s; /* Opera */
  }
  @keyframes myfirst {
    0%   {width: 200px;height: 20px;font-size: 0}
    85%  {width: 200px;height: 120px;display: inline-block;font-size: 12px}
    100% {}
  }
</style>
<style>
  /*日期选择器样式修改 BEGIN*/
  .text-align-center{
    text-align:center ;
  }
  .text-align-center:first-child{
    margin-top: 2%;
  }
  input,button,select,textarea{outline:none;}

  .el-button + .el-button span, .el-date-table td div span {
    color: #5a5e66;
  }

  .prev-month div span, .next-month div span {
    color: #b4bccc !important;
  }
input[type='text']{
  text-indent: 12px;
}
.hover-yellow:hover{
  color: #e8c123
}
  .hover-red:hover{
    color: #a02a2e
  }
  .hover-blue:hover{
    color: #0c689a
  }
  .hover-green:hover{
    color: #4c9d57
  }
  .hover-red:hover,.hover-yellow:hover,.hover-blue:hover,.hover-green:hover{
    transform: scale(1.1);
  }
  /*日期选择器样式修改 END*/
</style>
