import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  ssr: { noExternal: ['react-slick'] },
  build: { rollupOptions: { output: { entryFileNames: chunk => chunk.name === 'entry-server' ? '[name].mjs' : 'assets/[name]-[hash].js' } } },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
});
