"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Category = {
  _id: string;
  title: string;
  slug: string;
};

export default function CategoryFilter({
  categories,
}: {
  categories: Category[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  return (
    <div className="flex flex-col items-start gap-2  max-w-xs">
      {/* ALL */}
      <Link
        href={pathname}
        className={`block w-full rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200
          ${!activeCategory
            ? "bg-teal-600 text-white shadow-sm"
            : "bg-white text-slate-700 border border-slate-200 hover:bg-teal-50 hover:text-teal-700"
          }
        `}
      >
        All
      </Link>

      {/* Categories */}
      {categories.map((cat) => {
        const isActive = activeCategory === cat.slug;

        return (
          <Link
            key={cat._id}
            href={`${pathname}?category=${cat.slug}`}
            className={`block w-full rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200
              ${isActive
                ? "bg-teal-50 text-teal-700 border border-teal-200 shadow-sm"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-teal-50 hover:text-teal-700"
              }
              hover:translate-x-1
            `}
          >
            {cat.title}
          </Link>
        );
      })}
    </div>
  );
}
