"use client";

import Link from "next/link";
import { useTranslations } from "@/lib/translations";

export default function AuthoritySection({ lang }: { lang?: string }) {
  const { t } = useTranslations(lang);

  return (
    <section className="bg-linear-to-r from-teal-600 to-teal-700 py-16 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-semibold">
          {t('authorityTitle')}
        </h2>
        <p className="mt-4 text-teal-50">
          {t('authorityDesc')}
        </p>
        <Link href={`/about${lang && lang !== 'en' ? `?lang=${lang}` : ''}`} className="inline-block mt-6 bg-white text-teal-600 px-6 py-3 rounded-lg font-medium hover:bg-teal-50 transition">
          {t('learnMore')}
        </Link>
      </div>
    </section>
  );
}
