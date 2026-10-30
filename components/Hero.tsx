import Image from "next/image";
import Link from "next/link";
import hero from "../public/hero.jpg";

const links = [
  { href: "/poezija", label: "Poezija" },
  { href: "/proza", label: "Proza" },
  { href: "/misli", label: "Misli" },
  { href: "/#o-autoru", label: "O autoru" },
];

export default function Hero() {
  return (
    <section className="grid min-h-[100dvh] grid-cols-1 bg-background md:grid-cols-2">
      <div className="relative h-[55dvh] md:h-auto">
        <Image
          src={hero}
          alt="Pero koje piše"
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        {/* meko stapanje slike sa pozadinom, kao u primeru */}
        <div className="absolute inset-y-0 right-0 hidden w-1/4 bg-gradient-to-r from-transparent to-background md:block" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-b from-transparent to-background md:hidden" />
      </div>

      <div className="flex flex-col items-center justify-center gap-6 px-6 py-12 text-center text-primary">
        <h1 className="text-5xl font-semibold tracking-wide md:text-7xl">
          SLAVIJANO
        </h1>
        <p className="max-w-md text-xl opacity-80 md:text-2xl">
          Reči koje pišem samo su eho misli koje ne umeju da ćute.
        </p>
        <nav className="mt-6 flex w-full max-w-[16rem] flex-col gap-5 md:max-w-xs">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="bg-muted px-8 py-4 text-xl text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground md:text-2xl"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
