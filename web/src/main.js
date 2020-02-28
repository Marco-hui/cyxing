import Vue from 'vue'
import App from './App.vue'

import router from "./router/"
import store from "./vuex/store"

// 引入element-ui
import ElementUI from 'element-ui';
import '../node_modules/element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

