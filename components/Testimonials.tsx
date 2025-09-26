"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ana Petrović",
    location: "Beograd",
    rating: 5,
    comment:
      "Prekrasni proizvodi! Kvalitet je odličan, a rad je brz i profesionalan. Definitivno ću se ponovo obratiti za sledeće narudžbine.",
  },
  {
    id: 2,
    name: "Marko Jovanović",
    location: "Novi Sad",
    rating: 5,
    comment:
      "Ručno pleteni proizvodi su stvarno umetnost. Pažnja prema detaljima je izuzetna, a cene su veoma pristupačne. Preporučujem svima!",
  },
  {
    id: 3,
    name: "Jelena Nikolić",
    location: "Niš",
    rating: 5,
    comment:
      "Kupila sam nekoliko proizvoda za moju decu i svi su oduševljeni. Kvalitet je vrhunski, a dizajn je moderan i lep. Hvala!",
  },
  {
    id: 4,
    name: "Stefan Đorđević",
    location: "Kragujevac",
    rating: 5,
    comment:
      "Odličan rad! Proizvodi su tačno onakvi kakve sam želeo. Komunikacija je bila brza i jasna, a dostava je stigla na vreme.",
  },
  {
    id: 5,
    name: "Milica Stojanović",
    location: "Subotica",
    rating: 5,
    comment:
      "Prelepi proizvodi koji donose toplinu u naš dom. Kvalitet materijala je izuzetan, a ručni rad se vidi u svakom detalju.",
  },
  {
    id: 6,
    name: "Petar Milosavljević",
    location: "Čačak",
    rating: 5,
    comment:
      "Profesionalan pristup i odličan kvalitet. Proizvodi su još lepši uživo nego na slikama. Definitivno ću preporučiti prijateljima.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-200 via-white to-gray-200">
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
            Šta kažu naši kupci
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Naši zadovoljni kupci dele svoja iskustva i preporuke
          </p>
        </motion.div>

        {/* Grid testimonijala */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-background rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Quote ikona */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                <Quote className="w-4 h-4" />
              </div>

              {/* Ocena */}
              <div className="flex items-center mb-4">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              {/* Komentar */}
              <p className="text-muted-foreground leading-relaxed mb-6 italic">
                &quot;{testimonial.comment}&quot;
              </p>

              {/* Informacije o korisniku */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-semibold text-lg mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-primary">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistike */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">100+</div>
            <p className="text-muted-foreground">Zadovoljnih kupaca</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">4.9/5</div>
            <p className="text-muted-foreground">Prosečna ocena</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">300+</div>
            <p className="text-muted-foreground">Proizvoda proizvedeno</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
