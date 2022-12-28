import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
    build:{
        lib:{
            entry: 'src/app.js',
            name:'webApp',
            fileName: (format) => `vite-lib.${format}.js` // 打包后的文件名
        }
    }
})
