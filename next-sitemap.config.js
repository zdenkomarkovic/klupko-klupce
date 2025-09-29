/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://klupkoklupce.rs",
  generateRobotsTxt: true,
  outDir: "./public",
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,

  // Ovde dodajemo dinamičke rute
  additionalPaths: async (config) => {
    let paths = [];

    try {
      // --- KATEGORIJE ---
      const catRes = await fetch("https://klupkoklupce.rs/api/categories");
      if (catRes.ok) {
        const categories = await catRes.json();

        paths = paths.concat(
          categories.map((cat) => ({
            loc: `/proizvodi/${cat.slug}`, // umesto [slug]
            changefreq: "daily",
            priority: 0.7,
          }))
        );
      }

      // --- PROIZVODI ---
      const prodRes = await fetch("https://klupkoklupce.rs/api/products");
      if (prodRes.ok) {
        const products = await prodRes.json();

        paths = paths.concat(
          products.map((prod) => ({
            loc: `/proizvodi/${prod.categorySlug}/${prod.slug}`, // umesto [slug]/[productSlug]
            changefreq: "daily",
            priority: 0.7,
          }))
        );
      }
    } catch (err) {
      console.error(
        "❌ Greška pri generisanju dinamičkih ruta za sitemap:",
        err
      );
    }

    return paths;
  },
};
