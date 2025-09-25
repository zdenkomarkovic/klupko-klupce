"use client";
import { motion } from "framer-motion";
import { Mail, Phone, Facebook, Instagram, MapPin } from "lucide-react";
import Link from "next/link";
import { FaViber } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer id="kontakt"
      className="bg-primary py-12 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="container mx-auto px-4">
        {/* Glavni sadržaj footera */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* O nama */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Klupko Klupče</h3>
            <p className="text-sm leading-relaxed text-center">
              Ručno pleteni proizvodi najvišeg kvaliteta, kreirani sa ljubavlju i pažnjom prema detaljima.
            </p>
          </div>

          {/* Kontakt informacije */}
          <div className="mx-auto
          ">
            <h3 className="text-lg font-semibold text-white mb-4">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-" />
                <a 
                  href="tel:+381637861086"
                  className=" text-sm hover:text-muted-foreground transition-colors"
                >
                  063 786 1086
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaViber className="w-4 h-4" />
                <a 
                  href="viber://chat?number=+381637861086"
                  className=" text-sm hover:text-muted-foreground transition-colors"
                >
                  Viber: 063 786 1086
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <a 
                  href="mailto:klupkoklupce@gmail.com"
                  className=" text-sm hover:text-muted-foreground transition-colors"
                >
                  klupkoklupce@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className=" text-sm">Zrenjanin, Srbija</span>
              </div>
            </div>
          </div>

          {/* Društvene mreže */}
          <div className="mx-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Pratite nas</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Facebook className="w-4 h-4 " />
                <a 
                  href="https://www.facebook.com/share/1BHGdCDv2s/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" text-sm hover:text-muted-foreground transition-colors"
                >
                  Facebook
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Instagram className="w-4 h-4" />
                <a 
                  href="https://www.instagram.com/klupkoklupce?igsh=MTBmd3dkMm1jM2ZhNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" text-sm hover:text-muted-foreground transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Brzi linkovi */}
          <div className="mx-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Brzi linkovi</h3>
            <div className="space-y-2">
              <Link 
                href="/"
                className="block text-sm hover:text-muted-foreground transition-colors"
              >
                Početna
              </Link>
              <Link 
                href="/#kategorije"
                className="block text-sm hover:text-muted-foreground transition-colors"
              >
                Proizvodi
              </Link>
            </div>
          </div>
        </div>

        {/* Donji deo footera */}
        <div className="border-t border-primary/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-base  px-20">
            <p>&copy; {new Date().getFullYear()} Klupko Klupče. Sva prava zadržana.</p>
            <a 
              href="https://www.manikamwebsolutions.com/" 
              target="_blank"
              className=""
            >
              Izrada sajta: <span className="font-bold hover:text-muted-foreground transition-colors n">ManikamWebSolutions</span>
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
