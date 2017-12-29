<template>
  <article>
    <section>
      <div class="block prediction-div">
        <span class="demonstration"> 截止时间：</span>
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
        <span style="position: relative;margin-left:50px ;font-weight: bold;">预估结果:</span>
      </div>

      <!--预告目标-->
    </section>
    <section>
      <div class="prediction prediction-div">
        <div style=" display: inline-block; margin-bottom:4px;"> <span> 预估目标：</span>
          <input  class="prediction-result" v-model="goal" type="text" @focus="watchDate" @blur="watchSelf($event)">
          <!--<span class="red">{{warnGoal}}</span>-->
          <span style="position: relative" class="can-finish"><span>可以完成</span>
          <img v-if="canFinish==1" src="../../assets/img/can-t.png" alt="">
        </span>
          <span style="position: relative"  class="not-finish can-finish"><span>不能完成</span>
           <img  v-if="canFinish==0" src="../../assets/img/not-f.png" alt="">
        </span>
        </div>
        <!--<div style="display: inline-block ; margin-bottom:4px;"><span> 预估结果：</span>-->
          <!--<input style="color: red;" disabled="disabled" class="prediction-result" type="text" v-model="result">-->
        <!--</div>-->
      </div>
    </section>
    <section>
      <div class="prediction prediction-div">
        <!--<el-button class="a">提交评估</el-button>-->
        <span class="demonstration" style="opacity: 0"> 截止时间：</span>
        <input style="border: 0;" class="prediction-result prediction-linear"
          @click="sendInstall()"     value="提交评估" type="button">

      </div>
    </section>
  </article>
</template>
<script>
  import dateFormate from './../../js/dateFormate.js'
  export default {
    name: 'installTarget',
    data() {
      return {
        goal:'',
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
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: ''
      };
    },
    mounted(){
    },
    methods:{

      watchDate(){
        if(this.value1==''){
          this.warnSelectDate = true
        }else{
          this.warnSelectDate = false
        }
      },
      watchSelf(e){
        let reg =/^[0-9]*$/
        if(this.goal==''){
            this.warnGoal='请输入目标'
        }else if(this.goal!='' && !reg.test(this.goal) ){
           this.warnGoal='请输入有效的数字'
           console.log(Object.prototype.toString.call(this.goal))
        }else if(reg.test(this.goal) ){
            this.warnGoal=''
        }
      },
      sendInstall(){
        let that = this
        if(that.value1 ==''){
          console.log(3)
          that.warnSelectDate = true
        }else{
          console.log(4)

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
            console.log(res.data)
             that.canFinish = res.data
           })
           .catch(function (err) {
             console.log(err)
           })
      }
    }
  }
</script>
<style scoped>
  div.prediction {
    margin-top: 20px;
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
    padding: 5% 8%;
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
</style>
<style>
  /*日期选择器样式修改 BEGIN*/
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
  /*日期选择器样式修改 END*/
</style>
