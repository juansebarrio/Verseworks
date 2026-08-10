// Keystatic — panel de edición de contenido para la clienta.
// En dev: npm run dev y entrar a http://localhost:4321/keystatic
//
// ACTIVACIÓN DE KEYSTATIC CLOUD (para que la clienta edite sin GitHub):
// 1. Crear cuenta y proyecto en https://keystatic.cloud
// 2. Descomentar el bloque storage 'cloud' de abajo (y comentar el 'local'),
//    pegando el id del proyecto ("equipo/proyecto") en cloud.project.
// 3. Setear KEYSTATIC_ENABLED=true en Vercel (Settings → Environment Variables).
// 4. Invitar a la clienta por email desde el dashboard de keystatic.cloud.
// Detalle completo en README-CMS.md.
import { config, collection, fields, singleton } from '@keystatic/core';

export default config({
  // Keystatic Cloud activo: la clienta edita desde /keystatic logueando con
  // su email (los guardados se convierten en commits al repo).
  // Para volver a modo local (solo dev): storage: { kind: 'local' } y
  // comentar el bloque cloud.
  storage: { kind: 'cloud' },
  cloud: { project: 'verseworks/verseworks' },

  ui: {
    brandName: 'Verseworks',
  },

  singletons: {
    home: singleton({
      label: 'Homepage',
      path: 'content/pages/home',
      format: { data: 'yaml' },
      schema: {
        supportLine: fields.text({
          label: 'Support line',
          description: 'This text appears right under the main title on the homepage.',
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Studio description',
          description: 'The short paragraph on the homepage that describes what Verseworks is.',
          multiline: true,
          validation: { isRequired: true },
        }),
        poetryHappeningIntro: fields.text({
          label: '“Poetry, happening here” introduction',
          description: 'The sentence that opens the “Poetry, happening here” section.',
          multiline: true,
          validation: { isRequired: true },
        }),
        poemMightLines: fields.array(
          fields.text({ label: 'Line' }),
          {
            label: '“A poem might begin…” lines',
            description: 'One line each; they reveal as the visitor scrolls.',
            itemLabel: (props) => props.value || 'Line',
          },
        ),
        aPoemBelongsHere: fields.object(
          {
            first: fields.text({
              label: 'First paragraph',
              multiline: true,
              validation: { isRequired: true },
            }),
            second: fields.text({
              label: 'Second paragraph',
              multiline: true,
              validation: { isRequired: true },
            }),
          },
          {
            label: '“A poem belongs here” paragraphs',
            description: 'The two paragraphs of the “A poem belongs here” section.',
          },
        ),
      },
    }),

    site: singleton({
      label: 'Site details',
      path: 'content/site',
      format: { data: 'yaml' },
      schema: {
        enquiryEmail: fields.text({
          label: 'Enquiry email',
          description:
            'The email address shown in the footer and on the Enquire page. Visitors can click it to write to you.',
          validation: { isRequired: true },
        }),
        availabilityLine: fields.text({
          label: 'Availability line',
          description:
            'The short line under the email, e.g. “Available for projects internationally.”',
          validation: { isRequired: true },
        }),
      },
    }),
  },

  collections: {
    caseStudies: collection({
      label: 'Case studies',
      path: 'content/case-studies/*',
      slugField: 'title',
      format: { data: 'yaml', contentField: 'body' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            description: 'The name of the project, e.g. “Poems for a Hotel Opening”.',
            validation: { isRequired: true },
          },
          slug: {
            label: 'Web address',
            description:
              'The last part of the page address, e.g. “hotel-opening”. Usually fine as suggested.',
          },
        }),
        category: fields.select({
          label: 'Category',
          description: 'Which kind of work this project belongs to.',
          options: [
            { label: 'Live experience', value: 'Live experience' },
            { label: 'Participatory programme', value: 'Participatory programme' },
            { label: 'Creative commission', value: 'Creative commission' },
            { label: 'Hotels & brands', value: 'Hotels & brands' },
          ],
          defaultValue: 'Live experience',
        }),
        venueOrClient: fields.text({
          label: 'Venue or client',
          description: 'Where it happened or who it was for, e.g. “Museum of the Future”.',
        }),
        location: fields.text({
          label: 'Location',
          description: 'City and country, e.g. “Dubai, UAE”.',
        }),
        year: fields.text({
          label: 'Year',
          description: 'e.g. “2026”.',
        }),
        languages: fields.array(fields.text({ label: 'Language' }), {
          label: 'Languages',
          description: 'The languages this project was created in, one per entry.',
          itemLabel: (props) => props.value || 'Language',
        }),
        summary: fields.text({
          label: 'Summary',
          description: 'One or two sentences shown in the project list.',
          multiline: true,
          validation: { isRequired: true },
        }),
        cover: fields.image({
          label: 'Cover image',
          description: 'The main photo of this project, shown in the list and at the top of its page.',
          directory: 'src/assets/cases',
          publicPath: '/src/assets/cases/',
          validation: { isRequired: true },
        }),
        gallery: fields.array(
          fields.image({
            label: 'Photo',
            directory: 'src/assets/cases',
            publicPath: '/src/assets/cases/',
          }),
          {
            label: 'Gallery',
            description: 'More photos of the project, shown after the text.',
            itemLabel: () => 'Photo',
          },
        ),
        body: fields.document({
          label: 'Project story',
          description: 'The main text of the project page. Keep it to a few paragraphs.',
          formatting: {
            inlineMarks: { bold: true, italic: true },
            softBreaks: true,
          },
          links: true,
          // Sin headings, imágenes embebidas ni layouts: el diseño de la
          // página lo define la plantilla, no el contenido.
        }),
        published: fields.checkbox({
          label: 'Published',
          description: 'Untick to keep this project as a draft.',
          defaultValue: false,
        }),
      },
    }),
  },
});
