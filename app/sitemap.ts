import { sanityClient } from "@/lib/sanity.client";
import { groq } from "next-sanity";

const SITE_URL = "http://localhost:3000";
// ⬆️ ändra till din riktiga domän senare

interface Article {
  slug: string;
  _updatedAt: string;
}

export default async function sitemap() {
  // Hämta alla publicerade artiklar
  const articles = await sanityClient.fetch(groq`
    *[_type == "article"]{
      "slug": slug.current,
      _updatedAt
    }
  `);

  const articleUrls = articles.map((article: Article) => ({
    url: `${SITE_URL}/guidance/${article.slug}`,
    lastModified: article._updatedAt,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/guidance`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/community`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/shop`,
      lastModified: new Date(),
    },
    ...articleUrls,
  ];
}
