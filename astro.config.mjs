// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// Sitio estático con adapter: las páginas se prerenderizan,
// el endpoint de Actions (formulario de enquiry) corre server-side.
export default defineConfig({
  // TODO: reemplazar por el dominio propio cuando exista.
  // Al cambiarlo se actualizan solos canonicals, og:url, sitemap y schema.
  site: 'https://verseworks.vercel.app',
  output: 'static',
  adapter: vercel(),
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
