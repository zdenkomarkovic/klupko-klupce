"use server";

const API = "https://api.mailjet.com";

const auth = () =>
  "Basic " +
  Buffer.from(
    `${process.env.MAILJET_API_KEY}:${process.env.MAILJET_SECRET_KEY}`
  ).toString("base64");

const call = (path: string, body: unknown) =>
  fetch(`${API}${path}`, {
    method: "POST",
    headers: { Authorization: auth(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

export async function subscribe(
  email: string
): Promise<{ ok: boolean; error?: string }> {
  email = email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return { ok: false, error: "Unesite ispravnu e-mail adresu." };
  }

  const { MAILJET_API_KEY, MAILJET_SECRET_KEY, MAILJET_LIST_ID } = process.env;
  const sender = process.env.SITE_MAIL_SENDER;
  // u .env se koristi i pogrešno napisan naziv iz starog koda
  const receiver =
    process.env.SITE_MAIL_RECEIVER || process.env.SITE_MAIL_RECIEVER;
  if (!MAILJET_API_KEY || !MAILJET_SECRET_KEY || !sender) {
    console.error("Mailjet nije podešen (MAILJET_* / SITE_MAIL_SENDER)");
    return { ok: false, error: "Prijava trenutno nije moguća." };
  }

  try {
    // 1) sačuvaj kontakt (i dodaj na listu, ako je MAILJET_LIST_ID postavljen)
    const contactRes = MAILJET_LIST_ID
      ? await call(`/v3/REST/contactslist/${MAILJET_LIST_ID}/managecontact`, {
          Email: email,
          Action: "addnoforce",
        })
      : await call("/v3/REST/contact", { Email: email });

    // 400/"already exists" za postojeći kontakt nije greška za korisnika
    if (!contactRes.ok && contactRes.status !== 400) {
      console.error("Mailjet contact", contactRes.status, await contactRes.text());
      return { ok: false, error: "Prijava nije uspela. Pokušajte ponovo." };
    }

    // 2) obaveštenje autoru
    if (receiver) {
      const mailRes = await call("/v3.1/send", {
        Messages: [
          {
            From: { Email: sender, Name: "Slavijano sajt" },
            To: [{ Email: receiver }],
            Subject: "Nova prijava na newsletter",
            TextPart: `Nova prijava na newsletter: ${email}`,
          },
        ],
      });
      if (!mailRes.ok) {
        console.error("Mailjet send", mailRes.status, await mailRes.text());
      }
    }
    return { ok: true };
  } catch (err) {
    console.error("Newsletter greška", err);
    return { ok: false, error: "Prijava nije uspela. Pokušajte ponovo." };
  }
}
