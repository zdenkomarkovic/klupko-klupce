import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

// Tipovi za Sanity
export interface Product {
  _id: string
  _type: 'product'
  title: string
  slug: {
    current: string
  }
  description: string
  category: {
    _ref: string
    _type: 'reference'
  }
  images: Array<{
    _key: string
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }>
  price?: number
  inStock: boolean
  featured: boolean
  seo: {
    title?: string
    description?: string
    keywords?: string[]
  }
  createdAt: string
  updatedAt: string
}

export interface Category {
  _id: string
  _type: 'category'
  title: string
  slug: {
    current: string
  }
  description: string
  image?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  seo: {
    title?: string
    description?: string
    keywords?: string[]
  }
}

export interface Page {
  _id: string
  _type: 'page'
  title: string
  slug: {
    current: string
  }
  content: any[] // Portable Text
  seo: {
    title?: string
    description?: string
    keywords?: string[]
  }
}

// Queries
export const queries = {
  // Proizvodi
  allProducts: `*[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    category->{title, slug},
    images[0...3],
    price,
    inStock,
    featured
  }`,
  
  featuredProducts: `*[_type == "product" && featured == true] | order(_createdAt desc) [0...6] {
    _id,
    title,
    slug,
    description,
    category->{title, slug},
    images[0...2],
    price,
    inStock
  }`,
  
  productBySlug: `*[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    category->{title, slug},
    images,
    price,
    inStock,
    featured,
    seo
  }`,
  
  productsByCategory: `*[_type == "product" && category->slug.current == $categorySlug] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    category->{title, slug},
    images[0...2],
    price,
    inStock,
    featured
  }`,
  
  // Kategorije
  allCategories: `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    image
  }`,
  
  categoryBySlug: `*[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    image,
    seo
  }`
}

// Helper funkcije
export async function getProducts() {
  return await client.fetch(queries.allProducts)
}

export async function getFeaturedProducts() {
  return await client.fetch(queries.featuredProducts)
}

export async function getProductBySlug(slug: string) {
  return await client.fetch(queries.productBySlug, { slug })
}

export async function getProductsByCategory(categorySlug: string) {
  return await client.fetch(queries.productsByCategory, { categorySlug })
}

export async function getCategories() {
  return await client.fetch(queries.allCategories)
}

export async function getCategoryBySlug(slug: string) {
  return await client.fetch(queries.categoryBySlug, { slug })
}
