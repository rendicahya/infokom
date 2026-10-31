import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// base relatif agar bisa di-host di subpath GitHub Pages (https://<user>.github.io/infokom/)
export default defineConfig({
  base: './',
  plugins: [svelte()],
  // Isi seluruh dokumen .md ikut dibundel (±120 kB gzip), jadi batas peringatan dinaikkan.
  build: { chunkSizeWarningLimit: 1500 },
});
