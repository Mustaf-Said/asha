import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";

type GuidanceCardProps = {
  title: string;
  excerpt: string;
  category: string;
  slug: string;
  mainImage?: any;
};

export default function GuidanceCard({
  title,
  excerpt,
  category,
  slug,
  mainImage,
}: GuidanceCardProps) {
  return (
    <Link
      href={`/guidance/${slug}`}
      className="block bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition"
    >
      {mainImage && (
        <div className="relative h-40 w-full bg-slate-100">
          <Image
            src={urlFor(mainImage).width(400).url()}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-6">
        <span className="text-xs text-teal-600 font-medium">
          {category}
        </span>

        <h3 className="mt-2 text-lg font-medium text-slate-900">
          {title}
        </h3>

        <p className="mt-2 text-sm text-slate-600">
          {excerpt}
        </p>

        <span className="mt-4 inline-block text-teal-600 text-sm font-medium">
          Read more →
        </span>
      </div>
    </Link>
  );
}
