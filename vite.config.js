import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),svgLoader()],
    build:{
        lib:{
            entry: 'src/app.js',
            name:'webApp',
            fileName: (format) => `vite-lib.${format}.js` // 打包后的文件名
        }
    }
})
