"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "@/lib/translations";

const categories = [
  {
    titleKey: "nursingStudents" as const,
    descKey: "nursingStudentsDesc" as const,
    slug: "nursing-students",
    image: "/images/categories/students.png",
  },
  {
    titleKey: "careerDevelopment" as const,
    descKey: "careerDevelopmentDesc" as const,
    slug: "career-development",
    image: "/images/categories/career.png",
  },
  {
    titleKey: "leadership" as const,
    descKey: "leadershipDesc" as const,
    slug: "leadership",
    image: "/images/categories/leadership.png",
  },
  {
    titleKey: "wellbeing" as const,
    descKey: "wellbeingDesc" as const,
    slug: "wellbeing",
    image: "/images/categories/wellbeing.png",
  },
  {
    titleKey: "internationalNursing" as const,
    descKey: "internationalNursingDesc" as const,
    slug: "international-nursing",
    image: "/images/categories/international.png",
  },
];

export default function CategoryGrid() {
  const { t } = useTranslations();
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-teal-900 mb-10">
          {t('categoriesTitle')}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/guidance?category=${cat.slug}`}
              className="group rounded-xl border border-teal-200 p-6 bg-white hover:shadow-md transition block"
            >
              {/* Image */}
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-teal-100">
                <Image
                  src={cat.image}
                  alt={t(cat.titleKey)}
                  fill
                  loading="eager"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>


              {/* Text */}
              <h3 className="text-lg font-medium text-teal-900">
                {t(cat.titleKey)}
              </h3>
              <p className="mt-2 text-teal-600 text-sm">
                {t(cat.descKey)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
