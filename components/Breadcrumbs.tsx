import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({
  items,
}: {
  items: BreadcrumbItem[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-slate-900 transition"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-900 font-medium">
                {item.label}
              </span>
            )}

            {index < items.length - 1 && (
              <span className="text-slate-400">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
