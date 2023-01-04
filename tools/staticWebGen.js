import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader';
import MyVirtualBlogDataPlugin from './virtualDataModule.js';

// import Analyze from "./analy";
// import myCreateApp from '../src/app'

// let _data = Analyze()

// myCreateApp({links:_data});


import path from 'path'
import { fileURLToPath } from 'url'
import { build } from 'vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const cwd = process.cwd()

;(async () => {
  await build({

    root: path.resolve(__dirname, './'),
    base: '/',
    plugins: [vue(),svgLoader(),MyVirtualBlogDataPlugin()],
    
    build: {
        // lib:{
        //     entry: path.join(__dirname,'../src/main.js'),
        //     name:'webApp',
        //     fileName: (format) => `main.${format}.js` // 打包后的文件名
        // },
        outDir: path.join(cwd,'dist'),
      rollupOptions: {
          input : path.join(__dirname,"../src/main.js")
      },
    },
  })
})()
