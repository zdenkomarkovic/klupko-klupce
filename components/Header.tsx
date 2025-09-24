"use client";

import Image from "next/image";
import Logo from "../public/android-chrome-192x192.png";
import Link from "next/link";
import {  PhoneIcon } from "lucide-react";



import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import DynamicNav from "./DynamicNav";


export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const HandleScroll = () => {
      if (window.scrollY > 0) setScrolled(true);
      else setScrolled(false);
    };

    document.addEventListener("scroll", HandleScroll);

    return () => {
      document.removeEventListener("scroll", HandleScroll);
    };
  }, []);

  return (
    <header
      className={`flex justify-center ${
        scrolled
          ? " backdrop-blur supports-[backdrop-filter]:bg-black/40 shadow-md"
          : "bg-transparent"
      }  fixed top-0 left-0 right-0 z-[10] transition-colors`}
    >
      <nav className="flex items-center justify-between px-8 py-4 max-w-[80rem] w-full text-white font-bold">
        <Link href="/" className="">
          <Image
            src={Logo}
            alt="Klupko Klupče - Handmade proizvodi od vune"
            width={50}
            height={50}
            className="rounded-full"
          />
        </Link>
        <DynamicNav />
        <Link href="tel:+381637861086">
          <motion.button
            whileHover={{
              color: "hsl(var(--foreground))",
              backgroundColor: "hsl(var(--primary))",
            }}
            className=" items-center justify-center rounded-full gap-2  border-2 text-sm md:text-lg py-1 px-2 md:py-2 md:px-4 transition-colors flex"
          >
            <PhoneIcon />
            <p className="">063 786 1086</p>
          </motion.button>
        </Link>
      </nav>
    </header>
  );
}
