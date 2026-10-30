import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const sections = [
  { title: 'Poezija', value: 'poezija' },
  { title: 'Proza', value: 'proza' },
  { title: 'Misli', value: 'misli' },
]

export default defineConfig({
  name: 'slavijano',
  title: 'Slavijano CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Sadržaj')
          .items([
            ...sections.map((s) =>
              S.listItem()
                .title(s.title)
                .child(
                  S.documentList()
                    .title(s.title)
                    .filter('_type == "post" && section == $section')
                    .params({ section: s.value })
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                )
            ),
            S.divider(),
            S.listItem()
              .title('Svi tekstovi')
              .child(S.documentTypeList('post').title('Svi tekstovi')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
