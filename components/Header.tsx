"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../public/logo.jpg";
import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { href: "/", label: "Početna" },
  { href: "/poezija", label: "Poezija" },
  { href: "/proza", label: "Proza" },
  { href: "/misli", label: "Misli" },
  { href: "/#o-autoru", label: "O autoru" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  // svetla boja samo na početnoj (preko hero slike), na vrhu stranice
  const light = usePathname() === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-10 flex justify-center transition-colors ${
        scrolled ? "bg-background/95 backdrop-blur shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="flex w-full max-w-[80rem] items-center justify-between px-6 py-2 text-primary">
        <Link
          href="/"
          className="flex items-center gap-3 text-2xl font-semibold tracking-wide"
        >
          <Image
            src={logo}
            alt="Slavijano logo"
            width={48}
            height={48}
            className="rounded-full ring-[1.33px] ring-[#f3ead8] ring-offset-2 ring-offset-[#f3ead8]/40"
          />
          <span
            className={`transition-colors ${
              light ? "text-[#f3ead8]" : "text-primary"
            }`}
          >
            SLAVIJANO
          </span>
        </Link>

        <ul className="hidden gap-8 text-lg md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition-opacity hover:opacity-60">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Sheet>
          <SheetTrigger
            className={`transition-colors md:hidden ${
              light ? "text-[#f3ead8]" : "text-primary"
            }`}
            aria-label="Meni"
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent className="bg-background">
            <SheetHeader>
              <SheetTitle className="text-primary">SLAVIJANO</SheetTitle>
            </SheetHeader>
            <ul className="mt-6 space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <SheetTrigger asChild>
                    <Link href={l.href} className="block py-3 text-xl">
                      {l.label}
                    </Link>
                  </SheetTrigger>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
