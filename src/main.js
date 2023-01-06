// import './style.scss'
// import { createApp } from 'vue'
// import App from './App.vue'

import './style.scss'
import data from 'virtual-blog-data:_'
import { createApp } from 'vue'
import __App__ from './App.vue'

// const app = createApp(App,{links:data})
// window.Root  = app.mount('#app')
 window.App  = createApp(__App__,{links:data}).mount('#app')

console.log( App.version())

import "./event_hook"
