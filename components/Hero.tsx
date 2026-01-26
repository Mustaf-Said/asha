"use client";

import Link from "next/link";
import { useTranslations } from "@/lib/translations";

export default function Hero() {
  const { t } = useTranslations();

  return (
    <section className="bg-linear-to-br from-slate-50 to-teal-50 py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold text-teal-900 leading-tight">
          {t('heroTitle')}
        </h1>

        <p className="mt-6 text-lg text-slate-600">
          {t('heroDescription')}
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link href="/guidance" className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition">
            {t('exploreGuidance')}
          </Link>
          <Link href="/community" className="border border-slate-300 px-6 py-3 rounded-lg text-slate-700 hover:bg-slate-100 transition">
            {t('joinCommunity')}
          </Link>
        </div>
      </div>
    </section>
  );
}
