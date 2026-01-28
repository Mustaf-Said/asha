import Link from "next/link";

export default function FeaturedGuidanceSection({
  title,
  articles,
}: any) {
  if (!articles?.length) return null;

  return (
    <section className="py-16 max-w-6xl mx-auto px-4">
      {title && (
        <h2 className="text-3xl font-bold mb-8">{title}</h2>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {articles.map((article: any) => (
          <Link
            key={article._id}
            href={`/guidance/${article.slug}`}
            className="p-6 border rounded-lg hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg">
              {article.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
