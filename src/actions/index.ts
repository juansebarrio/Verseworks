import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';

const TO = import.meta.env.ENQUIRY_TO_EMAIL ?? 'wided.khadraoui@gmail.com';
const FROM = import.meta.env.ENQUIRY_FROM_EMAIL ?? 'Verseworks <onboarding@resend.dev>';

export const server = {
  enquire: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string().min(1, 'Please tell us your name.'),
      organisation: z.string().optional(),
      email: z.string().email('Please use a valid email address.'),
      planning: z.string().min(1, 'Tell us a little about what you are planning.'),
      location: z.string().optional(),
      date: z.string().optional(),
      audience: z.string().optional(),
      languages: z.string().optional(),
      budget: z.string().optional(),
      notes: z.string().optional(),
      source: z.string().optional(),
      // Honeypot: campo invisible para humanos; si llega lleno, es un bot.
      website: z.string().max(0).optional(),
    }),
    handler: async (input) => {
      if (input.website) return { ok: true };

      const lines = [
        `Name: ${input.name}`,
        `Organisation: ${input.organisation || '—'}`,
        `Email: ${input.email}`,
        ``,
        `What are they planning?`,
        input.planning,
        ``,
        `Where: ${input.location || '—'}`,
        `When: ${input.date || '—'}`,
        `Audience size: ${input.audience || '—'}`,
        `Languages: ${input.languages || '—'}`,
        `Budget: ${input.budget || '—'}`,
        `Heard about us via: ${input.source || '—'}`,
        ``,
        `Anything else:`,
        input.notes || '—',
      ].join('\n');

      const key = import.meta.env.RESEND_API_KEY;
      if (!key) {
        // Sin API key (dev / preview): registrar y responder ok igual.
        console.log('[enquiry — RESEND_API_KEY missing]\n' + lines);
        return { ok: true };
      }

      const resend = new Resend(key);
      const { error } = await resend.emails.send({
        from: FROM,
        to: [TO],
        replyTo: input.email,
        subject: `Enquiry — ${input.name}${input.organisation ? ` (${input.organisation})` : ''}`,
        text: lines,
      });

      if (error) {
        console.error('[enquiry] Resend error', error);
        throw new Error('Something went wrong sending your enquiry. Try email instead.');
      }
      return { ok: true };
    },
  }),
};
