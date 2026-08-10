// Lector de contenido de Keystatic (build-time para páginas estáticas;
// en /enquire corre server-side, por eso content/site.yaml viaja a la
// función vía includeFiles en astro.config.mjs).
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

export const reader = createReader(process.cwd(), keystaticConfig);
