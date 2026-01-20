import Link from "next/link";

type Category = {
  _id: string;
  title: string;
  slug: string;
};

type CategoryFilterProps = {
  categories: Category[];
  activeCategory?: string;
};

export default function CategoryFilter({
  categories,
  activeCategory,
}: CategoryFilterProps) {
  const baseBtn =
    "px-4 py-2 rounded-full border text-sm transition";
  const active =
    "bg-teal-600 text-white border-teal-600";
  const inactive =
    "border-slate-300 text-slate-700 hover:bg-slate-100";

  return (
    <div className="flex flex-wrap gap-3">
      {/* All */}
      <Link
        href="/guidance"
        className={`${baseBtn} ${!activeCategory ? active : inactive
          }`}
      >
        All
      </Link>

      {categories.map((cat) => (
        <Link
          key={cat._id}
          href={`/guidance?category=${cat.slug}`}
          className={`${baseBtn} ${activeCategory === cat.slug ? active : inactive
            }`}
        >
          {cat.title}
        </Link>
      ))}
    </div>
  );
}
