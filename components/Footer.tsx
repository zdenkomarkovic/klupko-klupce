import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.jpg";
import { Facebook, Instagram, Youtube, Mail } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import Newsletter from "./Newsletter";

const socials = [
  {
    href: "https://www.facebook.com/share/19kDCwpnfS/",
    label: "Facebook",
    Icon: Facebook,
  },
  {
    href: "https://www.instagram.com/slavijano_song_lyrics?srtk=bTZ6bWM4emYybnBi",
    label: "Instagram",
    Icon: Instagram,
  },
  {
    href: "https://www.tiktok.com/@slavijano.song.lyrics?_r=1&_t=ZS-9ApAp2RztKC",
    label: "TikTok",
    Icon: FaTiktok,
  },
  {
    href: "https://youtube.com/@slavijano?si=ZmA-ko2vkQIE2rvK",
    label: "YouTube",
    Icon: Youtube,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#ebe6da] text-primary">
      <div className="container mx-auto px-6 py-16">
        <Newsletter />

        <div className="mt-12 flex flex-col items-center gap-6">
          <Image
            src={logo}
            alt="Slavijano logo"
            width={72}
            height={72}
            className="rounded-full"
          />
          <nav className="flex flex-wrap justify-center gap-6 text-base">
            <Link href="/poezija">Poezija</Link>
            <Link href="/proza">Proza</Link>
            <Link href="/misli">Misli</Link>
            <Link href="/#o-autoru">O autoru</Link>
          </nav>
          <div className="flex items-center gap-5">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="transition-opacity hover:opacity-60"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
            <a
              href="mailto:slavijano19@gmail.com"
              aria-label="E-mail"
              className="transition-opacity hover:opacity-60"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-primary/15 py-4 text-center text-xs opacity-70">
        © 2026 Slavijano. Sva prava zadržana.
        <span className="mx-2">·</span>
        Izrada sajta:{" "}
        <a
          href="https://www.manikamwebsolutions.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold hover:opacity-60"
        >
          ManikamWebSolutions
        </a>
      </div>
    </footer>
  );
}
