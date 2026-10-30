import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlFor = (source: any) => builder.image(source)

export type SectionSlug = 'poezija' | 'proza' | 'misli'

export const sections: Record<
  SectionSlug,
  { title: string; subtitle: string }
> = {
  poezija: {
    title: 'Poezija',
    subtitle: 'Tamo gde se emocije pretvaraju u reči, a reči u muziku duše.',
  },
  proza: {
    title: 'Proza',
    subtitle: 'Mali svetovi stvoreni od mastila, sećanja i mašte.',
  },
  misli: {
    title: 'Misli',
    subtitle: 'Dnevnik jednog uma.',
  },
}

export const isSection = (s: string): s is SectionSlug => s in sections

export interface PostSummary {
  _id: string
  title: string
  slug: string
  section: SectionSlug
  publishedAt: string
  excerpt?: string
  coverImage?: { asset: { _ref: string }; alt?: string }
}

export interface Post extends PostSummary {
  body: unknown[] // Portable Text
}

const summaryFields = `_id, title, "slug": slug.current, section, publishedAt, excerpt, coverImage`

export const getPostsBySection = (section: SectionSlug): Promise<PostSummary[]> =>
  client.fetch(
    `*[_type == "post" && section == $section] | order(publishedAt desc) {${summaryFields}}`,
    { section },
    { next: { revalidate: 60 } }
  )

export const getLatestPosts = (limit = 3): Promise<PostSummary[]> =>
  client.fetch(
    `*[_type == "post"] | order(publishedAt desc)[0...$limit] {${summaryFields}}`,
    { limit },
    { next: { revalidate: 60 } }
  )

export const getPost = (section: SectionSlug, slug: string): Promise<Post | null> =>
  client.fetch(
    `*[_type == "post" && section == $section && slug.current == $slug][0] {${summaryFields}, body}`,
    { section, slug },
    { next: { revalidate: 60 } }
  )

export const getAllPostPaths = (): Promise<{ section: SectionSlug; slug: string }[]> =>
  client.fetch(`*[_type == "post"]{ section, "slug": slug.current }`)
