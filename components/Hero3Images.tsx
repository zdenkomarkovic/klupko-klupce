"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";

import Hero1 from "../public/hero1.jpg";
import Hero2 from "../public/hero2.jpg";
import Hero3 from "../public/hero3.jpg";

import Image from "next/image";
import { ArrowRightIcon, PhoneIcon } from "lucide-react";

import Link from "next/link";

import { motion } from "framer-motion";

const Hero3Images = () => {
  return (
    <div className="relative flex min-h-[100dvh]">
      <Carousel
        className="absolute top-0 left-0 w-full h-[100dvh] z-[0]"
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            stopOnInteraction: false,
            stopOnFocusIn: false,
            delay: 5000,
          }),
          Fade(),
        ]}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-[1]" />
        <CarouselContent>
          <CarouselItem>
            <Image
              src={Hero1}
              alt="od vune"
              className="w-full h-[100dvh] object-cover"
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src={Hero2}
              alt="od vune"
              className="w-full h-[100dvh] object-cover"
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src={Hero3}
              alt="od vune"
              className="w-full h-[100dvh] object-cover"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <div className="relative flex flex-col items-start justify-end pb-20 text-center text-white px-4 container md:px-32 ">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Klupko Klupče
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl mb-8 font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Handmade Proizvodi od Vune
          </motion.p>
          
          <motion.p 
            className="text-lg md:text-xl mb-12 max-w-5xl text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Specijalizovani za ručno pletenje kvalitetnih proizvoda od antialergijske vunice Alize Pyffi. 
            Od ćebad za bebe do elegantnih torbi - sve ručno rađeno sa ljubavlju.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link 
              href="/#kategorije"
              className="bg-primary text-primary-foreground px-4 md:px-6 py-2 md:py-3 rounded-xl text-lg font-semibold hover:bg-orange-500 transition-colors"
            >
              Pogledaj Proizvode
            </Link>
            <Link 
              href="tel:+381637861086"
              className="border-2 border-white flex gap-2 items-center justify-center text-white px-4 md:px-6 py-2 md:py-3 rounded-xl text-lg font-semibold hover:bg-white hover:text-black transition-colors"
            >
              <PhoneIcon className="w-5 h-5" />
              Pozovite nas
              </Link>
          </motion.div>
        </div>
    </div>
  );
};

export default Hero3Images;
