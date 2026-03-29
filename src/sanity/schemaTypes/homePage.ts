import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Hero Heading',
      type: 'string',
      description: 'The large serif heading for the home page hero section.',
    }),
    defineField({
      name: 'subtitle',
      title: 'Hero Subtitle',
      type: 'string',
      description: 'The minimalist uppercase subtitle (e.g., "DOCUTORIAL PHOTOGRAPHER").',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true, // Crucial for cinematic cropping
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'editorialText',
      title: 'Editorial Introduction',
      type: 'text',
      description: 'Short, impactful blurb that introduces the Nix philosophy.',
    }),
    defineField({
      name: 'philosophySection',
      title: 'Philosophy Spread',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Philosophy Heading', type: 'string' },
        { name: 'body', title: 'Philosophy Body', type: 'text' },
      ],
    }),
    defineField({
      name: 'staircaseImages',
      title: 'Staircase Gallery (Staggered)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
        },
      ],
      description: 'A staggered editorial showcase of images that step down the page.',
    }),
    defineField({
      name: 'filmStripImages',
      title: 'Film Strip Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
        },
      ],
      description: 'A horizontally scrolling collection of large, cinematic frames.',
    }),
  ],
})
