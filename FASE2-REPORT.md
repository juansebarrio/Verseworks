# FASE 2 — SEO + GEO · Reporte de ejecución

Rama: `phase-2-seo-geo` (creada desde `main` @ `0a079c4`). Producción intacta:
esta fase queda **preparada pero no activada** (ver sección Activación).

## Resumen

- **Workstream A (SEO técnico)**: `site` configurado, `@astrojs/sitemap`
  integrado (única dependencia nueva), `robots.txt`, head de `Base.astro`
  refactorizado como capa SEO (canonical absoluto normalizado, template de
  título, OG completo, twitter:card, slot para Search Console), metadata única
  por página con las 11 search phrases oficiales, auditorías de headings, alt
  y fuentes.
- **Workstream B (GEO)**: `Schema.astro` con JSON-LD por página (@graph con
  `@id` cruzados), capa Q&A visible en `/enquire` (DRAFT, pendiente de
  aprobación de la clienta) espejada en `FAQPage`, `llms.txt`, crawlers de IA
  permitidos en robots, key file de IndexNow.
- **Workstream C (verificación cruzada)**: 4 agentes independientes validaron
  JSON-LD (7/7 páginas), unicidad y rangos de metadata, la regla R1 con
  evidencia de diff, y los artefactos de build. Un único hallazgo (newline en
  el key file de IndexNow), corregido.

## A3 — Titles y descriptions por página

| Página | Title (largo) | Description (largo) | Phrases integradas |
|---|---|---|---|
| `/` | Verseworks — This is a poem. Live poetry experiences (52) | A multilingual poetry studio creating live poetry experiences, performances, installations and poetry commissions for festivals, hotels and brands. (147) | live poetry experiences |
| `/experiences` | Live Poetry Experiences & Live Poets for Events — Verseworks (60) | Poems made live for one person or an entire room: performances, readings, poetic hosting and live poets for events, festivals and cultural programmes. (150) | live poetry experiences · live poets for events |
| `/programmes` | Poetry Workshops & Participatory Public Art — Verseworks (56) | Poetry workshops, collective poems and community projects — participatory public art that invites people to write, speak, listen and create together. (149) | poetry workshops · participatory public art |
| `/commissions` | Bespoke Poetry Commissions & Installations — Verseworks (55) | Bespoke poetry commissions: poetry in public space, original texts, installations, publications and editions developed for places, audiences and ideas. (151) | bespoke poetry commissions |
| `/hotels-and-brands` | Hotel Guest Experiences & Brand Activations — Verseworks (56) | Live, multilingual poetry for hospitality and brands: hotel guest experiences, brand activations, performances and installations shaped around the host. (152) | hotel guest experiences · brand activations |
| `/about` | About the Studio & Its Multilingual Poets — Verseworks (54) | Founded by poet Wided Rihana Khadraoui, Verseworks brings together multilingual poets, performers and artists to create meaningful encounters through words. (156) | multilingual poets |
| `/enquire` | Poetry for Events & Cultural Event Programming — Verseworks (59) | Tell us about your event, place or idea — poetry for events, cultural event programming and poetry activations created to belong where they happen. (147) | poetry for events · cultural event programming · poetry activation |

Las 11 phrases oficiales quedaron cubiertas al menos una vez, ninguna forzada.

## B1 — Schemas emitidos por página

Todas las páginas: `Organization` (@id `/#organization`; name, url, logo,
descripción oficial, founder→Person, knowsLanguage `[en, ar, fr, es]`,
areaServed Worldwide) + `Person` (@id `/#founder`; Wided Rihana Khadraoui,
jobTitle Founder, descripción del copy de About, worksFor→Organization).
Páginas internas: `BreadcrumbList` (Home → página).

| Página | Schema específico |
|---|---|
| `/` | `WebSite` (publisher→Organization) |
| `/experiences` | `Service` — serviceType "Live poetry experiences", description del copy |
| `/programmes` | `Service` — serviceType "Poetry workshops and participatory programmes" |
| `/commissions` | `Service` — serviceType "Bespoke poetry commissions" |
| `/hotels-and-brands` | `Service` — serviceType "Hospitality and brand experiences" |
| `/about` | `AboutPage` (about→Organization) |
| `/enquire` | `ContactPage` + `FAQPage` (espejo exacto de la sección visible; mismo array de datos alimenta ambas) |

Cumplimiento R4: sin precios, direcciones, teléfonos, fechas de fundación ni
clientes en ningún schema.

## B2 — Las 6 Q&A (DRAFT — pendiente de aprobación de la clienta)

Sección "Questions, answered" en `/enquire`, antes de Direct contact.
Respuestas derivadas exclusivamente del copy aprobado (`content/copy-final.md`):

1. **What is Verseworks?** — Verseworks is a multilingual poetry studio
   creating participatory experiences, performances, installations and
   commissions for festivals, cultural institutions, public spaces,
   hospitality and brands. We work with poets, writers, performers, artists
   and designers to bring language into public and shared spaces.
2. **What is a live poetry experience?** — A live poem can begin with a
   thought, memory, object, feeling, question or prompt. The response may be
   written, spoken, performed, projected or created digitally — for one person
   or with an entire room. Every exchange is different because every
   participant is different.
3. **What kinds of events does Verseworks work with?** — Verseworks can
   appear almost anywhere: a museum, festival, hotel, dinner, public square,
   launch, performance or city wall. Experiences are created for festivals and
   cultural institutions, hotels and hospitality, brands and creative
   agencies, and public spaces and communities.
4. **Which languages are available?** — Verseworks works with multilingual
   poets and collaborators to create experiences that reflect the language and
   cultural context of each audience. One event may unfold in one language or
   many.
5. **Where does Verseworks operate?** — Verseworks is available for projects
   internationally. Each experience is developed for the people and place it
   belongs to.
6. **How does commissioning work?** — You do not need to arrive with a
   finished concept. Tell us about the place, people and occasion — Verseworks
   can shape the concept, select the artists and support the experience from
   beginning to end.

## Verificación cruzada (Workstream C)

Cuatro agentes independientes de la implementación:

- **C1 (JSON-LD)** ✅ — 7/7 páginas: parseo estricto, campos requeridos por
  tipo, `@id` sin colisiones y consistentes entre páginas, referencias
  resueltas dentro del @graph, y FAQPage textualmente idéntico (6/6) a la
  sección visible.
- **C2 (metadata)** ✅ — titles 52–60, descriptions 147–156, todos únicos;
  un canonical absoluto por página con barra final consistente; sitemap con
  exactamente las 7 URLs que coinciden 1:1 con los canonicals; og:url =
  canonical y og:image absoluta en las 7.
- **C3 (regla R1)** ✅ — el diff contra main solo contiene adiciones de
  metadata, `Schema.astro` nuevo y la sección FAQ; cero strings de copy
  visible modificados; `main` sin commits nuevos (hash `0a079c4`).
- **C4 (artefactos)** ✅ tras fix — build limpio; robots.txt, sitemap-index,
  sitemap-0, llms.txt válidos; único hallazgo: newline final en el key file de
  IndexNow, corregido en `d0061f8`. Única dependencia nueva: `@astrojs/sitemap`.

## Auditorías A4–A6 (sin cambios necesarios)

- **Headings**: exactamente un `h1` por página; secciones en `h2`,
  subsecciones en `h3`. No hizo falta corregir ningún tag.
- **Alt text**: 100% de las `<Image>` ya tenían alt descriptivo real.
- **Fuentes e imágenes**: fontsource emite `font-display: swap`; todas las
  imágenes salen de astro:assets con `width`/`height` intrínsecos.

## Decisiones conservadoras (R5)

1. **Design tokens del brief vs. repo**: el brief describe "Literata 620,
   Fragment Mono, tinta #161616 sobre #FAFAF9, acento #1D4ED8", pero el design
   system real del código es Literata 340 / Courier Prime / #1b1712 sobre
   #faf7f1, sin color de acento. Se usó el sistema real del repo; la FAQ no
   introduce ningún token nuevo.
2. **Title de la home**: se conservó la frase de marca "This is a poem."
   integrando "live poetry experiences" para llegar al rango 50–60, en vez de
   reemplazarla por un título keyword-first.
3. **Canonicals con barra final** normalizada (coinciden con el sitemap
   incluso en `/enquire`, que es SSR y depende del request).
4. **`customPages` eliminado del sitemap**: la integración ya descubre
   `/enquire` con el adapter de Vercel; dejarlo duplicaba la URL.
5. **`logo` de Organization** apunta a `/favicon.svg` (la marca existente);
   no se generó un logo raster nuevo para no inventar assets.
6. **Título SEO de `/enquire`** prioriza las search phrases ("Poetry for
   Events & Cultural Event Programming") sobre la palabra "Enquire", que ya
   está en nav, breadcrumb y schema.
7. **FAQ sin JS**: `<details>/<summary>` nativos, marcador +/− en mono vía
   CSS; sin script nuevo.

## Hallazgos fuera de alcance (G4 — NO tocados en esta rama)

1. **PR #6 abierto y sin mergear** (rama `claude/hero-animation-spacing-5wd5ph`):
   itálicas reales de Literata + eje óptico, contenido visible sin JS, página
   404 y mejoras a11y (Escape, skip-link). Al activar fase 2 conviene mergear
   PR #6 primero o después y resolver el conflicto trivial en el head de
   `Base.astro` (ambas ramas lo tocan).
2. **`RESEND_API_KEY` sin configurar en Vercel**: el formulario muestra
   "Received." pero la consulta solo queda en logs. Riesgo de negocio ya
   reportado; se resuelve cargando la key (Settings → Environment Variables).
3. ~~**Email placeholder** en footer y Enquire.~~ Resuelto: ahora es
   `wided.khadraoui@gmail.com` (editable desde el panel, Site details).
4. **Dominio propio pendiente**: al existir, actualizar `site` en
   `astro.config.mjs` (canonicals, og, sitemap y schema se regeneran solos),
   el `Sitemap:` de `robots.txt` y las URLs de `llms.txt`.

## Checklist de pasos manuales (post-activación; apuntan a URLs de producción)

- [ ] **Google Search Console**: dar de alta la propiedad, obtener el token,
  descomentar y completar el meta `google-site-verification` en `Base.astro`,
  y enviar `https://verseworks.vercel.app/sitemap-index.xml`.
- [ ] **Bing Webmaster Tools** (alimenta a Copilot, DuckDuckGo y otros
  asistentes): importar el sitio desde Search Console o verificar manualmente,
  y enviar el mismo sitemap.
- [ ] **IndexNow** (opcional): la key ya está servida en
  `https://verseworks.vercel.app/0dffcecc1a1c3371e8e914e50d4352b8.txt`.
  Ping de ejemplo tras publicar:
  `https://api.indexnow.org/indexnow?url=https://verseworks.vercel.app/&key=0dffcecc1a1c3371e8e914e50d4352b8`
- [ ] **Aprobación de la clienta de las 6 Q&A** (sección B2 arriba) antes o
  después del merge; el bloque está marcado DRAFT en el código.
- [ ] **Dominio propio**: ver Hallazgos fuera de alcance, punto 4.

## Commits de la rama (atómicos por workstream)

1. `8bab992` — A1: site URL, @astrojs/sitemap y robots.txt base
2. `93a78cc` — A2+A3+A7: capa SEO del head y metadata única por página
3. `b76e1e8` — B1+B2: JSON-LD por página y capa Q&A visible en /enquire
4. `2ebee2b` — B3+B4+B5: llms.txt, crawlers de IA en robots e IndexNow key
5. `d0061f8` — C: fix del hallazgo C4 (newline en key file)
6. El commit que agrega este reporte cierra la rama (ver `git log -1`).

## Activación (cuando lo decida el dueño del repo)

- **Rama**: `phase-2-seo-geo`
- **Último commit**: el de este reporte — verificar con
  `git log -1 phase-2-seo-geo` (último commit de código: `d0061f8`).
- **Preview de Vercel** (no toca producción):
  `https://verseworks-git-phase-2-seo-geo-juansebarrios-projects.vercel.app`
- **Comandos de activación**:
  ```
  git checkout main
  git pull origin main
  git merge phase-2-seo-geo
  git push origin main
  ```
- **Recordatorio**: los pasos manuales (Search Console, Bing, IndexNow) se
  corren **recién después del merge**, porque verifican y envían URLs de
  producción.
