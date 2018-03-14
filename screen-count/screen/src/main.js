// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store.js'
import router from './router'
import echarts from 'echarts'
import axios from 'axios'
import jsonp from 'jsonp'
import { DatePicker } from 'element-ui'
//import ElementUI from 'element-ui'
Vue.use(DatePicker)
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.jsonp = jsonp
//ajax 请求的URL
Vue.prototype.httpApi = 'http://big-screen.com'
import { getId } from './js/getId'
Vue.prototype.getId=getId

import { dateFormate } from './js/dateFormate'
Vue.prototype.dateFormate=dateFormate
//Vue.use(ElementUI)
//import Carousel3d from 'vue-carousel-3d';//首页3d-banner图
//Vue.use(Carousel3d);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
