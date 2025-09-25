"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getFeaturedProducts, Product } from "@/lib/sanity";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9; // 3x3 grid

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const featuredProducts = await getFeaturedProducts();
        setProducts(featuredProducts);
        setTotalPages(Math.ceil(featuredProducts.length / itemsPerPage));
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Funkcija za promenu stranice
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Izračunavanje trenutnih proizvoda za paginaciju
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  if (loading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Učitavanje istaknutih proizvoda...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-tr from-gray-200 via-white to-gray-200">
      <div className="container mx-auto px-4">
        {/* Naslov sekcije */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
           Najtraženiji proizvodi 
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Naši najbolji i najpopularniji proizvodi, ručno pleteni sa pažnjom prema detaljima.
          </p>
        </motion.div>

        {/* Grid proizvoda */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProducts.map((product, index) => (
            <Link key={product._id} href={`/proizvodi/${product.category.slug.current}/${product.slug.current}`}>
              <motion.div
                className="bg-background rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Slika proizvoda */}
                <div className="relative h-64">
                  {product.images && product.images[0] && product.images[0].asset ? (
                    <Image
                      src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${product.images[0].asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground text-lg">Slika nije dostupna</span>
                    </div>
                  )}
                  
                  {/* Badge za istaknuti proizvod */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold">
                      Istaknuto
                    </span>
                  </div>
                </div>

                {/* Sadržaj kartice */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-sm text-muted-foreground">
                      {product.category.title}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-primary line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-2 line-clamp-3">
                    {product.description && product.description.length > 120 
                      ? `${product.description.substring(0, 80)}...` 
                      : product.description}
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

        {/* Paginacija */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-2">
              {/* Prethodna stranica */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Prethodna
              </button>

              {/* Brojevi stranica */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-primary text-white'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Sledeća stranica */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Sledeća
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

