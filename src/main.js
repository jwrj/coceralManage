import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './less/main.less'
import './less/basics.less'
import '../public/js/global.js'
import iviewArea from 'iview-area';
Vue.use(iviewArea);
Vue.use(iView);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//全局方法
global.getLocalTime = (nS) => {//时间戳转字符到日期
	return new Date(parseInt(nS) * 1000).toLocaleString().replace(/\//g, "-").replace(/[上午|下午]([\d\:]*)/g, "");
}

global.getTimeMinute = (nS) => {//时间戳转字符到分
	return new Date(parseInt(nS) * 1000).toLocaleString().replace(/\//g, "-").replace(/(\:\d*)$/, "");
}