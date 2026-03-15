import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  server: {
    port: 5173,
    open: false,
    cors: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        index: './index.html',
        // 其他页面可按需添加
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 全局 SCSS 变量和 mixins
        additionalData: `@import "./css/variables.scss";`
      }
    }
  }
})