export default function AboutSection() {
  return (
    <section id="o-autoru" className="container mx-auto scroll-mt-20 px-6 py-20">
      <article className="mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
        <h2 className="mb-6 text-center text-3xl font-semibold text-primary md:text-5xl">
          O autoru
        </h2>
        <blockquote className="mb-10 text-center text-xl italic text-primary md:text-2xl">
          „Neki ljudi svet posmatraju, a neki ga zapisuju da ne bi izbledeo.“
        </blockquote>
        <div className="space-y-6">
          <p>
            Ja sam Slavijano. Radoznali posmatrač života, sakupljač prolaznih
            trenutaka i čuvar reči koje odbijaju da budu prećutane. Za mene,
            pisanje nije samo hobi – to je način na koji dišem, proces kroz koji
            vidim svet oko sebe i tišinu unutar sebe.
          </p>
          <p>
            Ovaj sajt je moj lični arhiv za sve ono što nastaje na marginama
            dana. Ovde te čekaju moji stihovi u kojima tražim ritam srca, priče
            inspirisane sudbinama stvarnih i izmaštanih ljudi, i ogoljene misli
            o prolaznosti, ljubavi i traganju za smislom.
          </p>
          <p>
            Hvala ti što si tu. Zakorači među redove i ako u nekom stihu
            prepoznaš deo sopstvene duše, znaću da ove reči nisu putovale uzalud.
          </p>
        </div>
        <p className="mt-10 text-center text-base">
          <a
            href="mailto:slavijano19@gmail.com"
            className="underline underline-offset-4 hover:opacity-60"
          >
            slavijano19@gmail.com
          </a>
        </p>
      </article>
    </section>
  );
}
