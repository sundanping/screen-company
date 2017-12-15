<template>
  <div class="left-top8">
    <div>
      <span>标题</span>
      <span class="float-right">访问量</span>
    </div>
    <span v-for="i in 8">

      <div>
        <span>{{i}}.南京厚建</span>
        <span class="float-right">321</span>
      </div>
    <!--柱状图-->
      <div style="background-color:#192a39;height:12px;border-radius: 1rem;margin:.5rem 0">
        <div :style="{width:(25+i)/33/0.01+'%'}" class="color-line"></div>
      </div>
     </span>

  </div>
</template>
<script>
export default{
  data() {
    return {

    }
  },
  mounted() {

  },
  methods:{

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
</style>
