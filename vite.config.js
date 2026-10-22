import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Relative base + inlined JS/CSS so dist/index.html also works when opened straight from disk
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
});
