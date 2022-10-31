import { svelte } from '@sveltejs/vite-plugin-svelte';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), dts()],
  build: {
    lib: {
      entry: './src/main.ts',
      name: 'svelte-virtualized-infinite-scroll',
    },
  },
});
