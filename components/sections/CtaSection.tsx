import Link from "next/link";

export default function CtaSection({
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  backgroundColor,
}: any) {
  const bgColorMap: Record<string, string> = {
    teal: "bg-gradient-to-r from-teal-600 to-cyan-600 text-white",
    white: "bg-white text-slate-900",
    gray: "bg-slate-100 text-slate-900",
  };

  const bgColorClass = bgColorMap[backgroundColor] || "bg-gradient-to-r from-teal-600 to-cyan-600 text-white";
  const isDark = backgroundColor === "teal";

  return (
    <section className={`py-20 px-4 ${bgColorClass}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>

        {subtitle && (
          <p
            className={`text-lg mb-8 ${isDark ? "text-white/90" : "text-slate-600"
              }`}
          >
            {subtitle}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {primaryButton?.label && primaryButton?.href && (
            <Link
              href={primaryButton.href}
              className={`px-8 py-3 rounded-lg font-semibold text-lg transition ${isDark
                ? "bg-white text-teal-600 hover:bg-gray-100"
                : "bg-teal-600 text-white hover:bg-teal-700"
                }`}
            >
              {primaryButton.label}
            </Link>
          )}

          {secondaryButton?.label && secondaryButton?.href && (
            <Link
              href={secondaryButton.href}
              className={`px-8 py-3 rounded-lg font-semibold text-lg border-2 transition ${isDark
                ? "border-white text-white hover:bg-white hover:text-teal-600"
                : "border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
                }`}
            >
              {secondaryButton.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
