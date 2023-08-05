import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import ElementPlus from 'element-plus'
import routes from 'virtual:generated-pages'
import { addCollection } from '@iconify/vue'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/display.css'
import 'uno.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

async function loadIconsSvg() {
  addCollection(Object.freeze(await fetch('/carbon-icons.json').then(r => r.json())))
}
loadIconsSvg()
app.use(ElementPlus)
app.use(router)
app.mount('#app')
