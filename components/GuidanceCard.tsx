type GuidanceCardProps = {
  title: string;
  excerpt: string;
  category: string;
};

export default function GuidanceCard({
  title,
  excerpt,
  category,
}: GuidanceCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition">
      <span className="text-xs text-teal-600 font-medium">
        {category}
      </span>

      <h3 className="mt-2 text-lg font-medium text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-600">
        {excerpt}
      </p>

      <button className="mt-4 text-teal-600 text-sm font-medium">
        Read more →
      </button>
    </div>
  );
}
