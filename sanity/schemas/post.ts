import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Tekst',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'section',
      title: 'Oblast',
      type: 'string',
      options: {
        list: [
          { title: 'Poezija', value: 'poezija' },
          { title: 'Proza', value: 'proza' },
          { title: 'Misli', value: 'misli' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Datum objave',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Kratak opis',
      type: 'text',
      rows: 3,
      description: 'Prikazuje se na listi i u pretrazi (opciono)',
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'coverImage',
      title: 'Naslovna slika',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt tekst', type: 'string' }],
    }),
    defineField({
      name: 'body',
      title: 'Tekst',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normalno', value: 'normal' },
            { title: 'Naslov', value: 'h2' },
            { title: 'Podnaslov', value: 'h3' },
            { title: 'Citat', value: 'blockquote' },
          ],
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt tekst', type: 'string' }],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Najnovije prvo',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', section: 'section', media: 'coverImage' },
    prepare: ({ title, section, media }) => ({
      title,
      subtitle: section,
      media,
    }),
  },
})
