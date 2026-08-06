// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// Sitio estático con adapter: las páginas se prerenderizan,
// el endpoint de Actions (formulario de enquiry) corre server-side.
export default defineConfig({
  site: 'https://verseworks.example.com', // TODO: dominio real
  output: 'static',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});
