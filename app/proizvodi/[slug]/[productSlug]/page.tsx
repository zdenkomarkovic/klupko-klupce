"use client";

import {
  getProductBySlug,
  getCategoryBySlug,
  Product,
  Category,
} from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import { useEffect, useState, use } from "react";
import { ArrowLeft, Share2, Phone, Mail } from "lucide-react";
import ImageLightbox from "@/components/ImageLightbox";
import { toast } from "sonner";
import Head from "next/head";

interface PageProps {
  params: Promise<{
    slug: string;
    productSlug: string;
  }>;
}

export default function ProductPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Funkcija za podelu proizvoda
  const handleShare = async () => {
    console.log("handleShare clicked");
    const url = window.location.href;
    const title = product?.title || "Proizvod";
    const text = product?.description || "Pogledajte ovaj proizvod";

    if (navigator.share) {
      // Native sharing na mobilnim uređajima
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        toast.success("Proizvod je podeljen!");
      } catch {
        // Korisnik je otkazao podelu
        console.log("Sharing cancelled");
      }
    } else {
      // Za desktop - uvek prikaži modal
      console.log("Setting showShareModal to true");
      setShowShareModal(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductBySlug(resolvedParams.productSlug);

        console.log("Product data:", productData);
        console.log("Product slug:", resolvedParams.productSlug);

        if (!productData) {
          notFound();
        }

        setProduct(productData);

        // Uzmi kategoriju iz proizvoda
        if (productData.category) {
          const categoryData = await getCategoryBySlug(resolvedParams.slug);
          setCategory(categoryData);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resolvedParams.productSlug, resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const images = product.images || [];
  const maxImages = Math.min(images.length, 5);

  return (
    <>
      <Head>
        <title>{product.seo?.title || product.title} | Klupko Klupče</title>
        <meta
          name="description"
          content={
            product.seo?.description ||
            product.description ||
            `Pogledajte ${product.title} - ručno pleteni proizvodi najvišeg kvaliteta`
          }
        />
        {product.seo?.keywords && (
          <meta name="keywords" content={product.seo.keywords.join(", ")} />
        )}
        <meta
          property="og:title"
          content={product.seo?.title || product.title}
        />
        <meta
          property="og:description"
          content={product.seo?.description || product.description}
        />
        <meta property="og:type" content="product" />
        <meta
          property="og:url"
          content={typeof window !== "undefined" ? window.location.href : ""}
        />
        {images[0] && (
          <meta
            property="og:image"
            content={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${images[0].asset._ref.replace("image-", "").replace("-jpg", ".jpg").replace("-png", ".png").replace("-webp", ".webp")}`}
          />
        )}
        <meta
          property="product:price:amount"
          content={product.price?.toString() || ""}
        />
        <meta property="product:price:currency" content="RSD" />
        <meta
          property="product:availability"
          content={product.inStock ? "in stock" : "out of stock"}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={product.seo?.title || product.title}
        />
        <meta
          name="twitter:description"
          content={product.seo?.description || product.description}
        />
        {images[0] && (
          <meta
            name="twitter:image"
            content={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${images[0].asset._ref.replace("image-", "").replace("-jpg", ".jpg").replace("-png", ".png").replace("-webp", ".webp")}`}
          />
        )}
      </Head>
      <div className="min-h-screen pt-20">
        {/* Breadcrumb */}
        <section className="py-4 bg-muted/30">
          <div className="container mx-auto px-4 ">
            <nav className="flex items-center space-x-2 text-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary"
              >
                Početna
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link
                href="/#kategorije"
                className="text-muted-foreground hover:text-primary"
              >
                Kategorije
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link
                href={`/proizvodi/${resolvedParams.slug}`}
                className="text-muted-foreground hover:text-primary"
              >
                {category?.title || "Kategorija"}
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-primary font-medium">{product.title}</span>
            </nav>
          </div>
        </section>

        {/* Glavni sadržaj proizvoda */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Galerija slika */}
              <div className="space-y-4">
                {/* Glavna slika */}
                <motion.div
                  className="relative aspect-square rounded-xl overflow-hidden bg-muted cursor-pointer group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => setIsLightboxOpen(true)}
                  whileHover={{ scale: 1.02 }}
                >
                  {images[selectedImageIndex] ? (
                    <Image
                      src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${images[selectedImageIndex].asset._ref.replace("image-", "").replace("-jpg", ".jpg").replace("-png", ".png").replace("-webp", ".webp")}`}
                      alt={images[selectedImageIndex].alt || product.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-muted-foreground text-lg">
                        Slika nije dostupna
                      </span>
                    </div>
                  )}

                  {/* Overlay za hover efekat */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                {/* Thumbnail galerija */}
                {maxImages > 1 && (
                  <div className="grid grid-cols-5 gap-2">
                    {images.slice(0, maxImages).map(
                      (
                        image: {
                          _key: string;
                          asset: { _ref: string };
                          alt?: string;
                        },
                        index: number
                      ) => (
                        <motion.button
                          key={image._key}
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                            selectedImageIndex === index
                              ? "border-primary ring-2 ring-primary/20"
                              : "border-transparent hover:border-primary/50"
                          }`}
                          onClick={() => setSelectedImageIndex(index)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Image
                            src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${image.asset._ref.replace("image-", "").replace("-jpg", ".jpg").replace("-png", ".png").replace("-webp", ".webp")}`}
                            alt={
                              image.alt ||
                              `${product.title} - slika ${index + 1}`
                            }
                            fill
                            className="object-cover"
                          />
                        </motion.button>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Informacije o proizvodu */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h1 className="text-4xl font-bold text-primary mb-4">
                    {product.title}
                  </h1>

                  {product.price && (
                    <div className="text-3xl font-bold text-primary mb-4">
                      {product.price} RSD
                    </div>
                  )}
                </motion.div>

                <motion.div
                  className="prose prose-lg max-w-none py-3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </motion.div>

                {/* Akcije */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="text-sm text-muted-foreground">
                    <p>
                      Za više informacija ili custom narudžbe, kontaktirajte nas
                      direktno.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="mailto:klupkoklupce@gmail.com"
                      className="flex-1 bg-primary text-primary-foreground px-6 py-4 rounded-lg text-xl font-semibold hover:bg-orange-500 transition-colors flex items-center justify-center gap-3"
                    >
                      <Mail className="w-5 h-5" />
                      Kontakt za porudžbinu
                    </Link>

                    <button
                      onClick={handleShare}
                      className="px-6 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-5 h-5" />
                      Podeli
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Povratak na kategoriju */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <Link
              href={`/proizvodi/${resolvedParams.slug}`}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Nazad na {category?.title || "kategoriju"}
            </Link>
          </div>
        </section>

        {/* Lightbox komponenta */}
        <ImageLightbox
          images={images}
          currentIndex={selectedImageIndex}
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          onIndexChange={setSelectedImageIndex}
          productTitle={product.title}
        />

        {/* Share Modal */}
        {showShareModal && (
          <div
            className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
            onClick={() => setShowShareModal(false)}
            style={{ display: "flex" }}
          >
            <div
              className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">Podeli proizvod</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Kopirajte link ispod da podelite proizvod:
              </p>
              <div className="bg-gray-100 p-3 rounded border mb-4">
                <input
                  type="text"
                  value={window.location.href}
                  readOnly
                  className="w-full bg-transparent text-sm outline-none cursor-pointer text-gray-800"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={async () => {
                    try {
                      if (navigator.clipboard) {
                        await navigator.clipboard.writeText(
                          window.location.href
                        );
                        toast.success("Link je kopiran!");
                        setShowShareModal(false);
                      } else {
                        toast.error(
                          "Kliknite na link i kopirajte ručno (Ctrl+C)"
                        );
                      }
                    } catch {
                      toast.error(
                        "Kliknite na link i kopirajte ručno (Ctrl+C)"
                      );
                    }
                  }}
                  className="flex-1 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
                >
                  Kopiraj link
                </button>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors"
                >
                  Zatvori
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
