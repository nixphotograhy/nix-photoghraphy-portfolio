import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'The title of the website (e.g., "Nix Photography").',
    }),
    defineField({
      name: 'description',
      title: 'SEO Description',
      type: 'text',
      description: 'The global meta description for SEO purposes.',
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      description: 'The branding asset for the header.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'socialLinks',
      title: 'Global Social URLs',
      type: 'object',
      fields: [
        { name: 'instagram', type: 'url', title: 'Instagram Profile URL' },
        { name: 'twitter', type: 'url', title: 'Twitter Profile URL' },
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'email', type: 'string', title: 'Public Email Address' },
        { name: 'phone', type: 'string', title: 'Public Phone Number' },
        { name: 'commissionStatus', type: 'string', title: 'Global Commission Status', description: 'e.g., "Currently available for global projects"' },
      ],
    }),
  ],
})
