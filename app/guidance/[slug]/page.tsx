import Breadcrumbs from "@/components/Breadcrumbs";
import { sanityClient } from "@/lib/sanity.client";
import { articleBySlugQuery } from "@/lib/queries";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { relatedArticlesQuery } from "@/lib/queries";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import { normalizeLang, resolveArticleLocalization } from "@/lib/i18n";

import type { Metadata } from "next";

// Type for related articles
type RelatedArticle = {
  _id: string;
  slug: string;
  title: string;
  excerpt?: string;
  title_so?: string;
  title_ar?: string;
  excerpt_so?: string;
  excerpt_ar?: string;
};

/* -----------------------------
   TYPES (params IS A PROMISE)
----------------------------- */
type PageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    lang?: string;
  }>;
};

/* -----------------------------
   SEO METADATA
----------------------------- */
export async function generateMetadata(
  { params, searchParams }: { params: Promise<{ slug: string }>; searchParams?: Promise<{ lang?: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const lang = normalizeLang(resolvedSearchParams?.lang);

  const article = await sanityClient.fetch(articleBySlugQuery, {
    slug,
  });

  if (!article) {
    return {};
  }

  const localized = resolveArticleLocalization(article, lang);

  return {
    title: localized.localizedTitle || article.title,
    description: localized.localizedExcerpt || article.excerpt,
    openGraph: {
      title: localized.localizedTitle || article.title,
      description: localized.localizedExcerpt || article.excerpt,
      images: [`/guidance/${slug}/opengraph-image`],
    },
  };
}


/* -----------------------------
   PAGE
----------------------------- */
export default async function ArticlePage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const lang = normalizeLang(resolvedSearchParams?.lang);

  const article = await sanityClient.fetch(articleBySlugQuery, {
    slug,
  });

  if (!article) {
    notFound();
  }

  const relatedArticles = await sanityClient.fetch(
    relatedArticlesQuery,
    {
      categoryId: article.category._id,
      slug,
    }
  );

  const localized = resolveArticleLocalization(article, lang);


  return (
    <article className="pt-6 pb-16">
      <div className="max-w-6xl mx-auto px-6 mb-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Guidance", href: "/guidance" },
            {
              label: article.category.title,
              href: `/guidance?category=${article.category.slug}`,
            },
            { label: localized.localizedTitle || article.title },
          ]}
        />

      </div>

      <div className="max-w-3xl mx-auto px-6">
        <span className="inline-block text-xs font-medium text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
          {article.category.title}
        </span>

        <h1 className="mt-4 text-3xl md:text-4xl font-semibold text-teal-900 leading-tight">
          {localized.localizedTitle || article.title}
        </h1>

        {localized.localizedExcerpt && (
          <p className="mt-4 text-lg text-slate-600 max-w-2xl">
            {localized.localizedExcerpt}
          </p>
        )}

        {article.mainImage && (
          <div className="mt-10 rounded-xl overflow-hidden shadow-md">
            <Image
              src={urlFor(article.mainImage).width(800).url()}
              alt={localized.localizedTitle || article.title}
              width={800}
              height={400}
              priority
              className="w-full h-auto"
            />
          </div>
        )}

        <div className="prose prose-slate max-w-none mt-10">
          <PortableText value={localized.localizedContent || article.content} />
        </div>
      </div>
      {relatedArticles.length > 0 && (
        <section className="mt-16 border-t border-slate-200 pt-10">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">
            Related articles
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((item: RelatedArticle) => {
              const localizedRelated = resolveArticleLocalization(item, lang);
              return (
                <a
                  key={item._id}
                  href={`/guidance/${item.slug}`}
                  className="block border border-slate-200 rounded-xl p-5 hover:shadow-md transition"
                >
                  <h3 className="font-medium text-slate-900">
                    {localizedRelated.localizedTitle || item.title}
                  </h3>

                  {localizedRelated.localizedExcerpt && (
                    <p className="mt-2 text-sm text-slate-600">
                      {localizedRelated.localizedExcerpt}
                    </p>
                  )}

                  <span className="mt-4 inline-block text-sm text-teal-600 font-medium">
                    Read more →
                  </span>
                </a>
              );
            })}
          </div>
        </section>
      )}

    </article>
  );
}
