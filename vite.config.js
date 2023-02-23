import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/cryto-project',

  server:{
    port: 8080,
  },

  plugins: [vue()]
})
