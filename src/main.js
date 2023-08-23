import Vue from 'vue';
import VueRouter from 'vue-router'
import { createPinia, PiniaVuePlugin } from 'pinia'
import App from './App.vue';
import { routes } from './routes'
import './index.css'

Vue.use(VueRouter)

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router,
  pinia,
  render: (h) => h(App),
}).$mount('#app');
