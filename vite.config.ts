import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader';
import MyVirtualBlogDataPlugin from './tools/virtualDataModule.js';
import node_qs from 'node:querystring'

import {Analyze} from './tools/analy'

var search_data = Analyze('/home/rainboy/mycode/RainboyDefault/blogData')


var proxy = {
  target: {
    protocol: 'http:',
    //host: '192.168.8.247',
    host: '127.0.0.1',
    port: 8000,
    // rewrite: (path:string) => '/staticWebGen.cgi?' + node_qs.encode({md:path}) ,
    //pfx: fs.readFileSync('path/to/certificate.p12'),
    //passphrase: 'password',
  },
  changeOrigin: true,
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),svgLoader(),MyVirtualBlogDataPlugin(search_data)],
    // build:{
    //     lib:{
    //         entry: 'tools/markdown_cgi.ts',
    //         name:'webApp',
    //         fileName: (format) => `markdown-cgi.${format}.js` // 打包后的文件名
    //     }
    // },
  server: {
    proxy: {
      '^.*\.md': proxy
    }
  }
})
