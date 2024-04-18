import path from 'path'; // Import path từ Node.js

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // Sử dụng path.resolve để xác định đường dẫn tuyệt đối
    }
  },
  server: {
    port: 3001,
    proxy: {
      "/admin": { // Đường dẫn cần được cấu hình proxy
          target: "http://localhost:3000/", // Địa chỉ của server backend
          changeOrigin: true, // Sử dụng origin của proxy cho request backend
      },
    }
  },
})
