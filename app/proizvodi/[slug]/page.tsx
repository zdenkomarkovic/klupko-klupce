"use client";

import { getCategoryBySlug, getProductsByCategory, Category } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import { useEffect, useState, use } from "react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function CategoryPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryData, productsData] = await Promise.all([
          getCategoryBySlug(resolvedParams.slug),
          getProductsByCategory(resolvedParams.slug)
        ]);
        
        console.log('Category data:', categoryData);
        console.log('Products data:', productsData);
        
        if (!categoryData) {
          notFound();
        }
        
        setCategory(categoryData);
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resolvedParams.slug]);

  if (loading) {
    return <div className="min-h-screen pt-20 flex items-center justify-center">Loading...</div>;
  }

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero sekcija kategorije */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              {category?.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {category?.description}
            </p>
          </motion.div>

          {category.image && (
            <motion.div 
              className="max-w-4xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
                <Image
                  src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${category.image.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`}
                  alt={category.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Proizvodi u kategoriji */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Proizvodi u kategoriji
            </h2>
            <p className="text-lg text-muted-foreground">
              {products.length} proizvoda dostupno
            </p>
          </motion.div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product: { _id: string; title: string; slug: { current: string }; description: string; images: Array<{ _key: string; asset: { _ref: string } }>; price?: number }, index: number) => (
                <Link key={product._id} href={`/proizvodi/${resolvedParams.slug}/${product.slug.current}`}>
                  <motion.div
                    className="bg-background rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="relative h-48">
                    {product.images && product.images[0] ? (
                      <Image
                                  src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${product.images[0].asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">Slika nije dostupna</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-primary">
                      {product.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {product.description}
                    </p>
                    {product.price && (
                      <p className="text-lg font-semibold text-primary">
                        {product.price} RSD
                      </p>
                    )}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg text-muted-foreground">
                Trenutno nema proizvoda u ovoj kategoriji.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
