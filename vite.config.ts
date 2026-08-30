import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(() => ({
  base: process.env.VERCEL ? '/' : (process.env.GITHUB_ACTIONS ? '/LittleFlower/' : './'),
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 3000,
    host: true
  }
}));
