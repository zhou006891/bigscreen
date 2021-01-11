import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './js/flexible'
import scroll from 'vue-seamless-scroll'
import echarts from 'echarts'
import axios from 'axios'


Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios


Vue.use(scroll)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
