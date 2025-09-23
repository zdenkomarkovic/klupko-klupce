"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDownIcon, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

const mobTitleStyles = "text-lg py-2";

const MobileMenu = ({ categories }: { categories: Category[] }) => (
  <Sheet>
    <SheetTrigger className="lg:hidden">
      <MenuIcon className="text-primary cursor-pointer" />
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle></SheetTitle>
        <SheetContent>
          <ul>
            <Link href="/">
              <motion.li
                whileHover={{ color: "hsl(var(--primary))" }}
                className={mobTitleStyles}
              >
                <SheetTrigger>Početna</SheetTrigger>
              </motion.li>
            </Link>
            
            <Accordion type="single" collapsible>
              <AccordionItem className="border-none" value="item-1">
                <motion.div
                  whileHover={{ color: "hsl(var(--primary))" }}
                >
                  <AccordionTrigger
                    className={`${mobTitleStyles} hover:no-underline`}
                  >
                    Proizvodi
                  </AccordionTrigger>
                </motion.div>
                <AccordionContent>
                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      className="pl-6 block font-light py-2"
                      href={`/proizvodi/${category.slug.current}`}
                    >
                      <motion.li
                        whileHover={{ color: "hsl(var(--primary))" }}
                      >
                        {category.title}
                      </motion.li>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Link href="/kontakt">
              <motion.li
                whileHover={{ color: "hsl(var(--primary))" }}
                className={mobTitleStyles}
              >
                <SheetTrigger>Kontakt</SheetTrigger>
              </motion.li>
            </Link>
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

    <Link href="/kontakt">
      <motion.li
        className="transition-colors underline-animation"
        whileHover={{ color: "hsl(var(--primary))", scale: 1.1 }}
      >
        Kontakt
      </motion.li>
    </Link>
  </ul>
);

export default function DynamicNav() {
  const [categories, setCategories] = useState<Category[]>([]);

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
    <>
      <DesktopNav categories={categories} />
      <MobileMenu categories={categories} />
    </>
  );
}
