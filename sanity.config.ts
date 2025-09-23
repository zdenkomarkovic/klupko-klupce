import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'klupko-klupce',
  title: 'Klupko Klupče CMS',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  
  // Ograničenja za upload slika
  studio: {
    options: {
      asset: {
        maxSize: 0.5 * 1024 * 1024, // 500KB
        accept: 'image/jpeg,image/png,image/webp'
      }
    }
  },
  
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Sadržaj')
          .items([
            S.listItem()
              .title('Kategorije')
              .child(
                S.documentTypeList('category')
                  .title('Kategorije proizvoda')
              ),
            S.listItem()
              .title('Proizvodi')
              .child(
                S.documentTypeList('product')
                  .title('Proizvodi')
                  .filter('_type == "product"')
              ),
          ])
    }),
    visionTool()
  ],
  
  schema: {
    types: schemaTypes,
  },
})
