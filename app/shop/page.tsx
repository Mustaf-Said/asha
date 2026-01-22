import { sanityClient } from "@/lib/sanity.client";
import { productsQuery } from "@/lib/queries";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";

export const metadata: Metadata = {
  title: "Shop | Professional Nursing Resources",
  description: "Digital products for nurses including guides, templates, checklists, and courses to support your professional development.",
};

type Product = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  productType: string;
  mainImage?: {
    asset: {
      _id: string;
    };
    alt?: string;
  };
};

export default async function ShopPage() {
  const products = await sanityClient.fetch<Product[]>(productsQuery);

  const getProductTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      guide: "📚",
      template: "📋",
      checklist: "✅",
      course: "🎓",
      bundle: "📦",
    };
    return icons[type] || "🛍️";
  };

  const groupByType = (products: Product[]) => {
    return products.reduce(
      (acc, product) => {
        if (!acc[product.productType]) {
          acc[product.productType] = [];
        }
        acc[product.productType].push(product);
        return acc;
      },
      {} as Record<string, Product[]>
    );
  };

  const groupedProducts = groupByType(products);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-50 to-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900">
            Professional Resources for Nurses
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Guides, templates, checklists, and courses designed to support your
            nursing career and professional development.
          </p>
        </div>
      </section>

      {/* Products */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">
              New resources coming soon. Check back soon!
            </p>
          </div>
        ) : (
          <div>
            {Object.entries(groupedProducts).map(([type, typeProducts]) => (
              <div key={type} className="mb-16">
                <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                  <span>{getProductTypeIcon(type)}</span>
                  {type.charAt(0).toUpperCase() + type.slice(1)}s
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {typeProducts.map((product) => (
                    <Link
                      key={product._id}
                      href={`/shop/${product.slug}`}
                      className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition"
                    >
                      {/* Image */}
                      {product.mainImage && (
                        <div className="relative w-full h-40 bg-slate-100 overflow-hidden">
                          <Image
                            src={urlFor(product.mainImage).url()}
                            alt={product.mainImage.alt || product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-5">
                        <p className="text-xs font-medium text-teal-600 uppercase tracking-wide">
                          {product.productType}
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-slate-900 line-clamp-2 group-hover:text-teal-600 transition">
                          {product.name}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Price */}
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-2xl font-bold text-slate-900">
                            ${product.price}
                          </span>
                          <span className="text-sm text-teal-600 font-medium group-hover:translate-x-1 transition">
                            View →
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
