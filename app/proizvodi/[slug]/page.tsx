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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

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
        setTotalPages(Math.ceil(productsData.length / itemsPerPage));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resolvedParams.slug]);

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
    return <div className="min-h-screen pt-20 flex items-center justify-center">Loading...</div>;
  }

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen ">
      {/* Hero sekcija kategorije */}

     <section className=" relative h-[60dvh]   ">
                {category.image && category.image.asset && (
                  <Image
                    src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${category.image.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`}
                    alt={category.title}
                    fill
                    className="object-cover -z-10"
                  />
                )}
           <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-10" />
       
    
        <div className="container mx-auto px-4 h-full">
          <motion.div 
            className="text-center mb-16 flex flex-col items-center justify-center h-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-7xl font-bold mb-6 text-primary">
              {category?.title}
            </h1>
            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto">
              {category?.description}
            </p>
          </motion.div>

    
        </div>
      </section>

      {/* Proizvodi u kategoriji */}
      <section className="py-20 bg-gradient-to-br from-gray-200 via-white to-gray-200">
        <div className="container mx-auto px-4">
          
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentProducts.map((product: { _id: string; title: string; slug: { current: string }; description: string; images: Array<{ _key: string; asset: { _ref: string } }>; price?: number }, index: number) => (
                <Link key={product._id} href={`/proizvodi/${resolvedParams.slug}/${product.slug.current}`}>
                  <motion.div
                    className="bg-background rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointe h-full"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="relative h-64">
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
                  <div className="p-4">
                    <h3 className="text-xl md:text-2xl font-semibold mb-2 text-primary">
                      {product.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-2">
                      {product.description && product.description.length > 80 
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
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Prethodna
                    </button>

                    {/* Brojevi stranica */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg ${
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
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Sledeća
                    </button>
                  </div>
                </div>
              )}
            </>
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
