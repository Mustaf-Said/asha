import { sanityClient } from "@/lib/sanity.client";
import { productBySlugQuery } from "@/lib/queries";
import { notFound } from "next/navigation";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params;

  const product = await sanityClient.fetch(productBySlugQuery, { slug });

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: `${product.name} | Asha Shop`,
    description: product.description,
  };
}

type Product = {
  name: string;
  slug: string;
  description: string;
  price: number;
  mainImage?: {
    asset: {
      _id: string;
    };
    alt?: string;
  };
  content: PortableTextBlock[];
  productType: string;
  downloadUrl?: string;
};

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const product = await sanityClient.fetch<Product>(productBySlugQuery, {
    slug,
  });

  if (!product) {
    notFound();
  }

  return (
    <article className="pt-6 pb-16">
      {/* Header */}
      <div className="bg-linear-to-br from-teal-50 to-slate-50 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-medium text-teal-600 uppercase tracking-wide">
            {product.productType}
          </p>
          <h1 className="mt-2 text-4xl md:text-5xl font-semibold text-slate-900">
            {product.name}
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            {product.description}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Image & Price */}
          <div className="md:col-span-1">
            <div className="sticky top-6">
              {product.mainImage && (
                <div className="relative w-full aspect-square bg-slate-100 rounded-xl overflow-hidden mb-6">
                  <Image
                    src={urlFor(product.mainImage).url()}
                    alt={product.mainImage.alt || product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Price & CTA */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="mb-6">
                  <p className="text-sm text-slate-600">Price</p>
                  <p className="text-4xl font-bold text-slate-900">
                    ${product.price}
                  </p>
                </div>

                {product.downloadUrl ? (
                  <a
                    href={product.downloadUrl}
                    className="block w-full bg-teal-600 text-white py-3 rounded-lg font-medium text-center hover:bg-teal-700 transition mb-3"
                  >
                    Download Now
                  </a>
                ) : (
                  <button className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition mb-3">
                    Purchase Now
                  </button>
                )}

                <button className="w-full border border-slate-300 py-3 rounded-lg font-medium text-slate-700 hover:bg-slate-100 transition">
                  Add to Cart
                </button>

                <div className="mt-6 pt-6 border-t border-slate-200 text-sm text-slate-600 space-y-2">
                  <p>✓ Digital download included</p>
                  <p>✓ Instant access after purchase</p>
                  <p>✓ Money-back guarantee</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-2">
            <div className="prose prose-slate max-w-none">
              <PortableText value={product.content} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
