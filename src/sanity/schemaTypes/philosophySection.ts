import { defineField, defineType } from 'sanity'

export const philosophySection = defineType({
  name: 'philosophySection',
  title: 'Philosophy Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Philosophy Title',
      type: 'string',
      description: 'The heading for the editorial philosophy section.',
      initialValue: 'The Docutorial Method',
    }),
    defineField({
      name: 'description',
      title: 'Philosophy Description',
      type: 'text',
      description: 'The core editorial narrative of Nix\'s process.',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'focusAreas',
      title: 'Expertise Focus Areas',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'A list of your photography specialities (e.g., "Wedding Narratives", "Street Noir").',
    }),
  ],
})
