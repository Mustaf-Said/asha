import GuidanceHeader from "@/components/GuidanceHeader";
import CategoryFilter from "@/components/CategoryFilter";
import GuidanceCard from "@/components/GuidanceCard";

import { sanityClient } from "@/lib/sanity.client";
import {
  categoriesQuery,
  articlesByCategoryQuery,
} from "@/lib/queries";
import { normalizeLang, resolveArticleLocalization } from "@/lib/i18n";

/* -----------------------------
   TYPES (searchParams IS A PROMISE)
----------------------------- */
type GuidancePageProps = {
  searchParams?: Promise<{
    category?: string;
    lang?: string;
  }>;
};

interface Article {
  _id: string;
  title: string;
  excerpt: string;
  title_so?: string;
  title_ar?: string;
  excerpt_so?: string;
  excerpt_ar?: string;
  mainImage?: any;
  category: {
    title: string;
    slug: string;
  };
  slug: string;
}

export default async function GuidancePage({
  searchParams,
}: GuidancePageProps) {
  // ✅ UNWRAP searchParams
  const resolvedSearchParams = searchParams
    ? await searchParams
    : undefined;

  const activeCategory = resolvedSearchParams?.category;
  const lang = normalizeLang(resolvedSearchParams?.lang);

  const [articles, categories] = await Promise.all([
    sanityClient.fetch(articlesByCategoryQuery, {
      category: activeCategory ?? null, // 👈 IMPORTANT
    }),
    sanityClient.fetch(categoriesQuery),
  ]);

  return (
    <>
      <GuidanceHeader />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <CategoryFilter categories={categories} />


          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article: Article) => {
              const localized = resolveArticleLocalization(article, lang);
              return (
                <GuidanceCard
                  key={article._id}
                  title={localized.localizedTitle || article.title}
                  excerpt={localized.localizedExcerpt || article.excerpt}
                  category={article.category.title}
                  slug={article.slug}
                  mainImage={article.mainImage}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
