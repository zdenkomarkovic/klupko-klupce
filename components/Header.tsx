"use client";

import Image from "next/image";
import Logo from "../public/android-chrome-192x192.png";
import Link from "next/link";
import { ChevronDownIcon, MenuIcon, PhoneIcon } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card";


interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

const MobileMenu = ({ categories }: { categories: Category[] }) => (
  <Sheet>
    <SheetTrigger className="lg:hidden">
      <MenuIcon className="text-primary cursor-pointer" />
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle></SheetTitle>
        <SheetContent>
          <ul className="space-y-2">
            <li>
              <SheetTrigger asChild>
                <Link 
                  href="/" 
                  className="block py-3 text-lg hover:text-primary transition-colors"
                >
                  Početna
                </Link>
              </SheetTrigger>
            </li>
            
            <li>
              <Accordion type="single" collapsible>
                <AccordionItem className="border-none" value="item-1">
                  <AccordionTrigger className="text-lg py-3 hover:no-underline">
                    Proizvodi
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1 pl-4">
                      {categories.map((category) => (
                        <li key={category._id}>
                          <SheetTrigger asChild>
                            <Link
                              href={`/proizvodi/${category.slug.current}`}
                              className="block py-2 text-muted-foreground hover:text-primary transition-colors"
                            >
                              {category.title}
                            </Link>
                          </SheetTrigger>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </li>

            <li>
              <SheetTrigger asChild>
                <Link 
                  href="/#kontakt" 
                  className="block py-3 text-lg text-primary transition-colors"
                >
                  Kontakt
                </Link>
              </SheetTrigger>
            </li>
          </ul>
        </SheetContent>
      </SheetHeader>
    </SheetContent>
  </Sheet>
);

const DesktopNav = ({ categories }: { categories: Category[] }) => (
  <ul className="hidden gap-8 lg:flex text-xl">
    <Link href="/">
      <motion.li
        className="transition-colors underline-animation"
        whileHover={{ color: "hsl(var(--primary))", scale: 1.1 }}
      >
        Početna
      </motion.li>
    </Link>

    <HoverCard openDelay={0} closeDelay={50}>
      <HoverCardTrigger>
        <motion.div
          whileHover={{ color: "hsl(var(--primary))", scale: 1.1 }}
          className="flex gap-1 transition-colors"
        >
          Proizvodi
          <ChevronDownIcon className="w-[18px]" />
        </motion.div>
      </HoverCardTrigger>
      <HoverCardContent className="p-0">
        {categories.map((category) => (
          <motion.li
            key={category._id}
            whileHover={{
              backgroundColor: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
            }}
          >
            <Link className="px-2 py-2 block" href={`/proizvodi/${category.slug.current}`}>
              {category.title}
            </Link>
          </motion.li>
        ))}
      </HoverCardContent>
    </HoverCard>

    <Link href="#kontakt">
      <motion.li
        className="transition-colors underline-animation"
        whileHover={{ color: "hsl(var(--primary))", scale: 1.1 }}
      >
        Kontakt
      </motion.li>
    </Link>
  </ul>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <header
      className={`flex justify-center ${
        scrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md"
          : "bg-transparent"
      }  fixed top-0 left-0 right-0 z-[10] transition-colors`}
    >
      <nav className="flex items-center justify-between px-8 py-4 max-w-[80rem] w-full text-primary font-bold">
        <Link href="/" className="">
          <Image
            src={Logo}
            alt="dm rustic 24"
            width={50}
            height={50}
            className="rounded-full"
          />
        </Link>
        <DesktopNav categories={categories} />
        <Link href="tel:+381637861086">
          <motion.button
            whileHover={{
              color: "hsl(var(--foreground))",
              backgroundColor: "hsl(var(--primary))",
            }}
            className=" items-center justify-center rounded-full text-primary border-primary border-2 text-sm md:text-lg py-1 px-2 md:py-2 md:px-4 transition-colors flex"
          >
            <PhoneIcon />
            <p className="">063 786 1086</p>
          </motion.button>
        </Link>
        <MobileMenu categories={categories} />
      </nav>
    </header>
  );
}
