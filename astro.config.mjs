// @ts-check
import { defineConfig } from 'astro/config';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
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
  // TODO: reemplazar por el dominio propio cuando exista.
  // Al cambiarlo se actualizan solos canonicals, og:url, sitemap y schema.
  site: 'https://verseworks.vercel.app',
  output: 'static',
  adapter: vercel({
    // /enquire se renderiza server-side y su layout lee content/site.yaml
    // con el reader de Keystatic: el archivo tiene que viajar a la función.
    includeFiles: ['./content/site.yaml'],
  }),
  integrations: [
    react(),
    markdoc(),
    sitemap({
      // /work está NOT LINKED (pendiente de contenido y aprobación de la
      // clienta): fuera del sitemap hasta que se linkee desde la nav.
      filter: (page) => !page.includes('/work'),
    }),
    ...(keystaticEnabled ? [keystatic()] : []),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
