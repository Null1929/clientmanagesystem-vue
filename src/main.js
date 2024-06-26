import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$baseurl='http://127.0.0.1:9090'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
