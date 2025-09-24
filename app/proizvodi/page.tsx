"use client";

import { getCategories } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ProizvodiPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="min-h-screen pt-20 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              Naši Proizvodi
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Istražite našu kolekciju handmade proizvoda od vune, organizovanih po kategorijama. 
              Svaki proizvod je ručno pleten sa pažnjom prema detaljima i kvalitetu.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category: { _id: string; title: string; slug: { current: string }; description: string; image?: { asset: { _ref: string } } }, index: number) => (
              <motion.div
                key={category._id}
                className="bg-background rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/proizvodi/${category.slug.current}`}>
                  <div className="relative h-64">
                    {category.image && category.image.asset ? (
                      <Image
                                src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${category.image.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`}
                        alt={category.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground text-lg">Slika nije dostupna</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">
                      {category.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
