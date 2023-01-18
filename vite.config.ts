import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader';
import MyVirtualBlogDataPlugin from './tools/virtualDataModule.js';

var proxy = {
  target: {
    protocol: 'http:',
    //host: '192.168.8.247',
    host: '127.0.0.1',
    port: 8888,
    //pfx: fs.readFileSync('path/to/certificate.p12'),
    //passphrase: 'password',
  },
  changeOrigin: true,
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),svgLoader(),MyVirtualBlogDataPlugin('/home/rainboy/mycode/RainboyDefault/blogData')],
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
