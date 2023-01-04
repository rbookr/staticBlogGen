// import './style.scss'
// import { createApp } from 'vue'
// import App from './App.vue'

import _data from './data'
// import data from '../tools/data.json'
import myCreateApp from './app'
import data from 'virtual-blog-data:_'

//console.log(data)
myCreateApp({links:data});
