import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './interceptors/axios'
import '@storefront-ui/vue/styles.scss'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';

Vue.config.productionTip = false

const vm = new Vue({
  router,
  store,
  render: h => h(App)
})

export { vm }
vm.$mount('#app')