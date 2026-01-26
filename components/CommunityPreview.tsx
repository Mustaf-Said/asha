"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "@/lib/translations";

export default function CommunityPreview({ lang }: { lang?: string }) {
  const { t } = useTranslations(lang);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-teal-900">
            {t('communityPreviewTitle')}
          </h2>
          <p className="mt-4 text-slate-600">
            {t('communityPreviewDesc')}
          </p>
          <Link href={`/community${lang && lang !== 'en' ? `?lang=${lang}` : ''}`} className="inline-block mt-6 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition">
            {t('joinCommunity')}
          </Link>
        </div>

        <div className="relative h-80 rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-linear-to-br from-teal-50 to-blue-50">
          <Image
            src="/images/community/image.png"
            fill
            alt="Nursing community"
            className="object-cover"
            priority
            loading="eager"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
