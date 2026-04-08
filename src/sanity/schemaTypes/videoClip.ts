import { defineField, defineType } from 'sanity'

export const videoClip = defineType({
  name: 'videoClip',
  title: 'Cinematic Reel',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Clip Title',
      type: 'string',
      description: 'A short descriptive title for the narrative clip.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      description: 'High-quality .mp4 or .mov file (max 50MB recommended).',
      options: {
        accept: 'video/*',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
      description: 'Thumbnail shown before the video plays.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Wedding', value: 'wedding' },
          { title: 'Editorial', value: 'editorial' },
          { title: 'Behind the Scenes', value: 'bts' },
          { title: 'Modern', value: 'modern' },
        ],
      },
    }),
  ],
})
