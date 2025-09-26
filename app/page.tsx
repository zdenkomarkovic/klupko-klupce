"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Users, Award, Phone } from "lucide-react";
import FeaturedProducts from "@/components/FeaturedProducts";
import Testimonials from "@/components/Testimonials";
import { getCategories } from "@/lib/sanity";
import { useEffect, useState } from "react";
import Hero3Images from "@/components/Hero3Images";

export default function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div className="min-h-screen">
      <Hero3Images />
      {/* O nama sekcija */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center md:px-6">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-8 text-primary"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Naša Priča
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-4 md:gap-16">
              <motion.div
                className="prose prose-lg max-w-none text-muted-foreground"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <p className="text-lg leading-relaxed mb-6">
                  Brend <strong>Klupko Klupče</strong> je nastao sredinom 2025.
                  godine iz čiste ljubavi prema pletenju. Sve je počelo kao
                  hobi, a danas se razvio u posvećenost kreiranju kvalitetnih
                  handmade proizvoda od vune.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  Trenutno se nalazimo u fazi inkubacije poslovanja i
                  ispitivanja tržišta za potrebom proizvoda od vune. Naša misija
                  je da pružimo jedinstvene, ručno rađene proizvode koji
                  kombinuju tradicionalne tehnike pletenja sa modernim dizajnom
                  i funkcionalnošću.
                </p>

                <p className="text-lg leading-relaxed mb-8">
                  Svaki proizvod se plete isključivo ručno od vunice{" "}
                  <strong>Alize Pyffi</strong> i{" "}
                  <strong>Alize Pyffi Fine</strong>, koja je antialergijska i
                  sigurna za sve generacije - od beba do najstarijih. Ova vunica
                  je poznata po svojoj mekoći, izdržljivosti i hipoalergijskim
                  svojstvima.
                </p>
              </motion.div>
              <motion.div
                className="prose prose-lg max-w-none text-muted-foreground"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/android-chrome-512x512.png"
                  alt="handmade"
                  width={800}
                  height={800}
                  className=" rounded-full "
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Proizvodi sekcija */}
      <section
        className="py-20 bg-gradient-to-br from-gray-200 via-white to-gray-200"
        id="kategorije"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Naši Proizvodi
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specijalizovani smo za kreiranje različitih vrsta handmade
              proizvoda od vune, svaki pažljivo dizajniran i ručno pleten sa
              pažnjom prema detaljima.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map(
              (
                category: {
                  _id: string;
                  title: string;
                  slug: { current: string };
                  description: string;
                  image?: { asset: { _ref: string } };
                },
                index: number
              ) => (
                <motion.div
                  key={category._id}
                  className="bg-background rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/proizvodi/${category.slug.current}`}>
                    <div className="relative h-56">
                      {category.image && category.image.asset ? (
                        <Image
                          src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${category.image.asset._ref.replace("image-", "").replace("-jpg", ".jpg").replace("-png", ".png").replace("-webp", ".webp")}`}
                          alt={category.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground">
                            Slika nije dostupna
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-2xl font-semibold mb-2 text-primary">
                        {category.title}
                      </h3>
                      <p className="text-muted-foreground text-center">
                        {category.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Zašto mi sekcija */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Zašto Klupko Klupče?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Naša prednost leži u kombinaciji tradicionalnih tehnika,
              kvalitetnih materijala i personalizovanog pristupa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Ručno Pletenje",
                description:
                  "Svaki proizvod je ručno pleten sa pažnjom prema detaljima i kvalitetu.",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Kvalitetni Materijali",
                description:
                  "Koristimo samo antialergijsku vunicu Alize Pyffi i Alize Pyffi Fine.",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Personalizovani Pristup",
                description:
                  "Mogućnost izbora boje, mustre, namene i pakovanja u dogovoru sa nama.",
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Jedinstveni Dizajn",
                description:
                  "Svaki proizvod je jedinstven i kreiran sa ljubavlju prema zanatu.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-gradient-to-br from-gray-200 to-white text-center p-6 border border-2 border-primary rounded-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-primary mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Istaknuti proizvodi */}
      <FeaturedProducts />

      {/* CTA sekcija */}
      <section className="py-10 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Želite da pitate?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white">
              Klupko Klupče je tu za vas. Izbor je na vama - sve ostalo je naše.
              Kontaktirajte nas i zajedno ćemo kreirati savršen proizvod za vas.
            </p>

            <Link
              href="tel:+381637861086"
              className=" w-fit mx-auto border-2 border-background text-background px-8 py-4 rounded-lg text-lg font-semibold hover:bg-background hover:text-foreground transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              063 786 1086
            </Link>
          </motion.div>
        </div>
      </section>
      {/* Testimonials */}
      <Testimonials />
    </div>
  );
}
