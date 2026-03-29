import { defineField, defineType } from 'sanity'

export const quoteSection = defineType({
  name: 'quoteSection',
  title: 'Quote Section',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Marquee Quote',
      type: 'text',
      description: 'The large, impactful quote for the homepage transition.',
    }),
    defineField({
      name: 'author',
      title: 'Quote Author',
      type: 'string',
      description: 'Optional attribution (e.g., Nix, or a famous quote).',
    }),
  ],
})
