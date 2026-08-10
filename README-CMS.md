# Verseworks — CMS (Keystatic)

Panel de edición para que la clienta cambie contenido sin tocar código ni
romper el diseño. Alcance v1: colección de **case studies** (`/work`) y dos
singletons de demostración (Homepage y Site details). El resto del contenido
sigue en código; el patrón para migrarlo está al final.

## Entrar al panel en desarrollo

```
npm run dev
# abrir http://localhost:4321/keystatic
```

El panel edita archivos locales (`content/`): los cambios se ven al instante
en el sitio de dev y se commitean como cualquier archivo.

Qué se puede editar hoy:

- **Homepage**: la línea de apoyo del hero, la descripción del estudio, la
  intro de "Poetry, happening here", las cinco líneas de la letanía y los dos
  párrafos de "A poem belongs here". Los CTAs, la nav, las listas de una
  palabra y todo lo estructural quedan en código, fuera del alcance del panel.
- **Site details**: el email de contacto y la línea de disponibilidad
  (footer y página Enquire). *El email real de la clienta se carga acá cuando
  exista.*
- **Case studies**: proyectos con título, categoría, venue/cliente, lugar,
  año, idiomas, resumen, foto de portada, galería y texto (solo párrafos,
  negrita, itálica y links — sin headings ni embeds, para blindar el layout).

## Crear un case study de prueba

1. `npm run dev` → `http://localhost:4321/keystatic` → **Case studies** →
   *Create*.
2. Completar título (la web address se sugiere sola), categoría, resumen y
   subir una portada; las fotos quedan en `src/assets/cases/` y el sitio las
   optimiza con astro:assets como al resto de las imágenes.
3. Tildar **Published** y guardar.
4. Ver el resultado en `http://localhost:4321/work` y su página de detalle.
   Con Published destildado el proyecto queda como borrador y no aparece.

Las rutas `/work` y `/work/[slug]` existen pero **no están linkeadas** desde
la nav ni el footer (comentario `NOT LINKED YET` en los archivos): se linkean
cuando la clienta cargue y apruebe los primeros proyectos reales.

## Activar Keystatic Cloud (edición sin GitHub para la clienta)

1. Crear cuenta en [keystatic.cloud](https://keystatic.cloud) y un proyecto
   nuevo apuntando a este repo (`juansebarrio/Verseworks`).
2. En `keystatic.config.ts`, comentar `storage: { kind: 'local' }` y
   descomentar el bloque `cloud`, pegando el id del proyecto
   (formato `equipo/proyecto`).
3. En Vercel → Settings → Environment Variables, setear
   `KEYSTATIC_ENABLED=true` (Production). Sin esa variable el build de
   producción **no monta** el admin (verificado: cero rutas `/keystatic` en
   el output).
4. Redeploy. El panel queda en `https://<dominio>/keystatic`.
5. Invitar a la clienta por email desde el dashboard de keystatic.cloud: ella
   loguea con ese email, sin cuenta de GitHub; cada guardado se convierte en
   commit al repo y dispara el deploy.

## Patrón para migrar más páginas al CMS

El mismo procedimiento usado con la Homepage, página por página:

1. **Singleton nuevo** en `keystatic.config.ts` con un campo por texto
   editable, labels/descriptions en inglés simple para la clienta.
2. **Archivo de contenido** en `content/pages/<página>.yaml` con los valores
   actuales EXACTOS del copy (copiar y pegar desde el `.astro`).
3. **Reemplazo de strings** en la página: `const data = await
   reader.singletons.<página>.read()` (import de `src/lib/keystatic`) y
   `{data.campo}` en lugar del texto hardcodeado. La estructura (clases,
   tags, orden) no se toca.
4. **Verificación de output idéntico** (obligatoria): buildear antes y
   después, extraer el texto del HTML con whitespace normalizado y comparar.
   Cualquier diferencia es un bug de la migración.

Nota: si la página migrada se renderiza server-side (hoy solo `/enquire`),
agregar su archivo de contenido a `includeFiles` del adapter en
`astro.config.mjs`.

## Notas de integración

- **robots.txt**: esta rama crea un `public/robots.txt` mínimo con
  `Disallow: /keystatic`. La rama `phase-2-seo-geo` también crea un
  robots.txt (SEO/GEO): **al mergear ambas hay que unificarlos** (mantener
  el Disallow de keystatic + el sitemap y los crawlers de IA de fase 2).
- Dependencias agregadas: `@keystatic/core`, `@keystatic/astro`,
  `@astrojs/react` (v4, compatible con Astro 5), `react`/`react-dom` 19 y
  `@astrojs/markdoc` (v0.15, compatible con Astro 5 — la v2 requiere
  Astro 7). React solo corre en el panel: las páginas públicas no shipean
  ningún JS nuevo (el body de los case studies se renderiza con un renderer
  propio en Astro, sin islands).
- `/enquire` es SSR y su layout lee `content/site.yaml` en runtime: el
  archivo viaja a la función serverless vía `includeFiles`. Verificar
  `/enquire` en el preview de Vercel tras el primer deploy de esta rama.

## Reporte de instalación

- **Rama**: `feature/cms-keystatic` (desde `main` @ `0a079c4`). Sin commits
  en main, sin merge, sin PR.
- **Verificaciones pasadas**: R1 texto de la home buildeada idéntico al
  baseline pre-migración (3901 chars, byte a byte, con el ciclo completo de
  case study de prueba creado → renderizado → borrado → estado vacío);
  R4 build de producción sin `KEYSTATIC_ENABLED` no contiene rutas
  `/keystatic` (config de rutas de Vercel verificada) y el panel responde
  200 en dev; build limpio; `git log origin/main..main` vacío.
- **Activación de esta rama** (cuando se decida):
  ```
  git checkout main
  git pull origin main
  git merge feature/cms-keystatic
  git push origin main
  ```
  Después: seguir "Activar Keystatic Cloud" arriba. Si `phase-2-seo-geo` se
  mergea primero, resolver el conflicto de `robots.txt` y el de
  `astro.config.mjs` (ambas ramas lo tocan) conservando ambas características.

### Hallazgos fuera de alcance (no tocados en esta rama)

1. PR #6 sigue abierto (itálicas reales, no-JS, 404, a11y) y la rama
   `phase-2-seo-geo` sigue sin activar — este branch no incluye ninguna de
   las dos.
2. `RESEND_API_KEY` sin configurar en Vercel: el formulario de enquiry
   muestra éxito pero solo loguea (riesgo ya reportado).
3. Dominio propio pendiente (`site` en astro.config sigue en placeholder).
