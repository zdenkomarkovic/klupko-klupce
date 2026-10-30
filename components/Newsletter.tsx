"use client";

import { useState } from "react";
import { toast } from "sonner";
import { sendMail } from "@/lib/send-mail";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await sendMail({
        email,
        subject: "Nova prijava na newsletter",
        text: `Nova prijava na newsletter: ${email}`,
      });
      if (res?.messageId) {
        toast.success("Hvala! Dobrodošli u Slavijano svet.");
        setEmail("");
      } else {
        toast.error("Prijava nije uspela. Pokušajte ponovo.");
      }
    } catch {
      toast.error("Prijava nije uspela. Pokušajte ponovo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="mb-3 text-2xl font-semibold md:text-3xl">
        Budi deo Slavijano sveta
      </h2>
      <p className="mb-6 text-base opacity-80">
        Ostavi svoj e-mail i primi nove tekstove i pesme direktno u svoje
        sanduče.
      </p>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 sm:flex-row sm:justify-center"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Unesi e-mail"
          aria-label="E-mail adresa"
          className="w-full flex-1 border border-primary/30 bg-white/70 px-4 py-3 text-base text-foreground outline-none focus:border-primary sm:max-w-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary px-6 py-3 text-base text-primary-foreground transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {loading ? "Slanje…" : "Pridruži se"}
        </button>
      </form>
    </div>
  );
}
