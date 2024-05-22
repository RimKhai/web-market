import { createApp } from 'vue'
import './index.scss'
import App from './App.vue'

import { router } from './router.js'

import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App).use(pinia).use(router).mount('#app')
