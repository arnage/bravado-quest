import Vue from 'vue'
import VueAxios from 'vue-axios'
import { plainAxiosInstance } from '../backend/axios'
import App from '../app.vue'

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(document.createElement('hello'))

  Vue.use(VueAxios, {
    plain: plainAxiosInstance
  })

  new Vue(App).$mount('hello')
})
