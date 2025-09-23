import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Kategorija',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naziv kategorije',
      type: 'string',
      validation: (Rule) => Rule.required().max(100)
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Opis kategorije',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(500)
    }),
    defineField({
      name: 'image',
      title: 'Slika kategorije',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt tekst',
          type: 'string',
          description: 'Važno za SEO i pristupačnost'
        }
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO podaci',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'SEO naslov',
          type: 'string',
          description: 'Ako se ne unese, koristi se naziv kategorije'
        },
        {
          name: 'description',
          title: 'SEO opis',
          type: 'text',
          rows: 3,
          description: 'Ako se ne unese, koristi se opis kategorije'
        },
        {
          name: 'keywords',
          title: 'Ključne reči',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags'
          }
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    }
  }
})
