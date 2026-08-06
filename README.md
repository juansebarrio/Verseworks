# Verseworks — sitio

Astro 5 + Tailwind 4 en Vercel. Dirección tipográfica: **Literata** (display y lectura,
variable con ópticas) + **Hanken Grotesk** (sans) + **Courier Prime** (mono/typewriter),
con **Amiri** como companion árabe. Monocromo papel/tinta, sin acento de color.

## Correr

```bash
npm install
npm run dev      # localhost:4321
npm run build    # valida y genera .vercel/output
```

## Estructura

- `src/layouts/Base.astro` — head/SEO, nav (4 ítems según brief), footer, reveal-on-scroll
- `src/pages/index.astro` — **home completa** con el copy real del brief
- `src/pages/enquire.astro` — formulario completo (server-rendered, única página dinámica)
- `src/actions/index.ts` — action del form: Resend + honeypot; sin API key loguea y responde ok
- `src/pages/{experiences,about,hotels-and-brands}.astro` — stubs con hero real; falta volcar el resto del copy (marcado con TODO)
- `src/styles/global.css` — design tokens (@theme) y utilidades de la casa

## Decisiones de diseño

- El elemento firma es la **marginalia**: versos mono en el margen de cada sección
  que se reúnen como estrofa antes del CTA final ("words move from the edge of the
  page into a collective line", del brief). Los versos son placeholder poético,
  editables en `margins` dentro de `index.astro`.
- Motion del brief implementado: hero palabra por palabra, cursor titilante,
  rotador de idiomas (EN/FR/ES/AR con RTL), reveal on scroll. Todo respeta
  `prefers-reduced-motion`.
- La página *For hotels and brands* queda fuera de la nav (brief pide nav de 4);
  se linkea desde la Home y sirve como URL directa de outreach.

## Pendientes

1. `RESEND_API_KEY` + dominio verificado en Resend; emails reales en `.env` y en el footer (buscar `TODO`)
2. `site` real en `astro.config.mjs` + dominio en Vercel
3. Volcar copy completo de Experiences / About / Hotels (está redactado en el brief)
4. Imagen OG (`public/og.png`, 1200×630) — hoy referenciada pero no existe
5. Cloudflare Turnstile en el form (hoy: honeypot solo)
6. Vercel Web Analytics (activar en el dashboard; cookieless, sin banner)
7. Fotografía/escaneos cuando existan; mientras, el sitio se sostiene en tipografía
