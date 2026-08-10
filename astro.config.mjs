// @ts-check
import { defineConfig } from 'astro/config';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';

// Sitio estático con adapter: las páginas se prerenderizan,
// el endpoint de Actions (formulario de enquiry) corre server-side.

// Keystatic (panel de edición en /keystatic): montado siempre en dev,
// pero en build SOLO si KEYSTATIC_ENABLED=true — la variable se setea en
// Vercel recién al activar Keystatic Cloud. Así el admin nunca queda
// expuesto a medias en producción.
const isDev = process.argv.includes('dev');
const keystaticEnabled = isDev || process.env.KEYSTATIC_ENABLED === 'true';

export default defineConfig({
  site: 'https://verseworks.example.com', // TODO: dominio real
  output: 'static',
  adapter: vercel({
    // /enquire se renderiza server-side y su layout lee content/site.yaml
    // con el reader de Keystatic: el archivo tiene que viajar a la función.
    includeFiles: ['./content/site.yaml'],
  }),
  integrations: [react(), markdoc(), ...(keystaticEnabled ? [keystatic()] : [])],
  vite: {
    plugins: [tailwindcss()],
  },
});
