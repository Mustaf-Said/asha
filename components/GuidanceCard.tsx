import Link from "next/link";

type GuidanceCardProps = {
  title: string;
  excerpt: string;
  category: string;
  slug: string;
};

export default function GuidanceCard({
  title,
  excerpt,
  category,
  slug,
}: GuidanceCardProps) {
  return (
    <Link
      href={`/guidance/${slug}`}
      className="block bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition"
    >
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
    </Link>
  );
}
