"use client";

import Link from "next/link";
import { useTranslations } from "@/lib/translations";

const featuredGuidance = [
  {
    titleKey: "careerPathsTitle" as const,
    descKey: "careerPathsDesc" as const,
    href: "/guidance/career-paths",
    image: "/images/featuredGuinense/guidance-career.png",
  },
  {
    titleKey: "internationalArticleTitle" as const,
    descKey: "internationalArticleDesc" as const,
    href: "/guidance/international-nursing",
    image: "/images/featuredGuinense/International-Nursing.png",
  },
  {
    titleKey: "wellbeingArticleTitle" as const,
    descKey: "wellbeingArticleDesc" as const,
    href: "/guidance/wellbeing",
    image: "/images/featuredGuinense/guidance-wellbeing.png",
  },
];

export default function FeaturedGuidance() {
  const { t } = useTranslations();

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-teal-900 mb-10">
          {t('featuredGuidanceTitle')}
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredGuidance.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              className="group relative h-[320px] rounded-2xl overflow-hidden border border-slate-200"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.image})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Content */}
              <div className="relative h-full p-6 flex flex-col justify-end">
                <h3 className="text-lg font-semibold text-white">
                  {t(item.titleKey)}
                </h3>
                <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                  {t(item.descKey)}
                </p>

                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-300">
                  Read more
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
