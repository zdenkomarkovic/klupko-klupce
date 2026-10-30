/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://slavijano.com",
  generateRobotsTxt: true,
  outDir: "./public",
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/studio", "/studio/*"],

  // Pojedinačni tekstovi iz Sanity-ja
  additionalPaths: async () => {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
    if (!projectId) return [];

    try {
      const query = encodeURIComponent(
        '*[_type == "post"]{ section, "slug": slug.current, publishedAt }'
      );
      const res = await fetch(
        `https://${projectId}.apicdn.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`
      );
      if (!res.ok) return [];
      const { result } = await res.json();
      return result.map((p) => ({
        loc: `/${p.section}/${p.slug}`,
        lastmod: p.publishedAt,
        changefreq: "monthly",
        priority: 0.7,
      }));
    } catch (err) {
      console.error("Greška pri generisanju ruta za sitemap:", err);
      return [];
    }
  },
};
