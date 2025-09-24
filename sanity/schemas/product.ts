import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Proizvod',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naziv proizvoda',
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
      title: 'Opis proizvoda',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.max(500)
    }),
    defineField({
      name: 'category',
      title: 'Kategorija',
      type: 'reference',
      to: { type: 'category' },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'images',
      title: 'Slike',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
            // Ograničenja za upload
            accept: 'image/jpeg,image/png,image/webp',
            storeOriginalFilename: false
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt tekst',
              type: 'string',
              description: 'Važno za SEO i pristupačnost'
            }
          ],
          validation: (Rule) => Rule.custom(async (image: any, context) => {
            if (!image || !image.asset) return true
            
            try {
              // Dohvata asset informacije
              const asset = await context.getClient({ apiVersion: '2023-01-01' })
                .fetch(`*[_id == "${image.asset._ref}"][0]`)
              
              if (asset && asset.size) {
                const maxSize = 0.5 * 1024 * 1024 // 500KB
                if (asset.size > maxSize) {
                  return `Slika je ${Math.round(asset.size / 1024)}KB, maksimalno dozvoljeno je 500KB`
                }
              }
            } catch (error) {
              // Ako ne možemo da dohvatimo veličinu, ne blokiramo upload
              return true
            }
            
            return true
          })
        }
      ],
      validation: (Rule) => Rule.required().min(1).max(5)
    }),
    defineField({
      name: 'price',
      title: 'Cena (RSD)',
      type: 'number',
      description: 'Ostavite prazno ako cena nije fiksna'
    }),
    defineField({
      name: 'inStock',
      title: 'Na stanju',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'featured',
      title: 'Istaknuti proizvod',
      type: 'boolean',
      initialValue: false,
      description: 'Prikaži na početnoj strani'
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
          description: 'Ako se ne unese, koristi se naziv proizvoda'
        },
        {
          name: 'description',
          title: 'SEO opis',
          type: 'text',
          rows: 3,
          description: 'Ako se ne unese, koristi se opis proizvoda'
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
      media: 'images.0',
      category: 'category.title'
    },
    prepare(selection) {
      const { title, media, category } = selection
      return {
        title,
        subtitle: category,
        media
      }
    }
  }
})
