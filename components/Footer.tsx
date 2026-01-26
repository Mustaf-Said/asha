"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from '@/lib/translations';

export default function Footer({ lang: langProp }: { lang?: string } = {}) {
  const searchParams = useSearchParams();
  const lang = langProp || searchParams?.get('lang') || 'en';
  const { t } = useTranslations(lang);
  const langParam = lang && lang !== 'en' ? `?lang=${lang}` : '';
  const langParamCategory = lang && lang !== 'en' ? `&lang=${lang}` : '';

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-6xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-4">

        {/* Brand / Mission */}
        <div>
          <h3 className="text-white font-semibold text-lg">
            {t('footerBrandTitle')}
          </h3>
          <p className="mt-4 text-sm text-slate-400 leading-relaxed">
            {t('footerBrandDesc')}
          </p>
        </div>

        {/* Guidance */}
        <div>
          <h4 className="text-white font-medium mb-4">
            {t('footerGuidance')}
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/guidance?category=nursing-students${langParamCategory}`} className="hover:text-white">{t('nursingStudents')}</Link></li>
            <li><Link href={`/guidance?category=career-development${langParamCategory}`} className="hover:text-white">{t('careerDevelopment')}</Link></li>
            <li><Link href={`/guidance?category=leadership${langParamCategory}`} className="hover:text-white">{t('leadership')}</Link></li>
            <li><Link href={`/guidance?category=wellbeing${langParamCategory}`} className="hover:text-white">{t('wellbeing')}</Link></li>
            <li><Link href={`/guidance?category=international-nursing${langParamCategory}`} className="hover:text-white">{t('internationalNursing')}</Link></li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h4 className="text-white font-medium mb-4">
            {t('footerCommunity')}
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/community${langParam}`} className="hover:text-white">{t('footerJoinCommunity')}</Link></li>
            <li><Link href={`/community/rules${langParam}`} className="hover:text-white">{t('footerCommunityGuidelines')}</Link></li>
            <li><Link href={`/about${langParam}`} className="hover:text-white">{t('footerAboutFounder')}</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-medium mb-4">
            {t('footerLegal')}
          </h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">{t('footerDisclaimer')}</a></li>
            <li><a href="#" className="hover:text-white">{t('footerPrivacy')}</a></li>
            <li><a href="#" className="hover:text-white">{t('footerTerms')}</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} {t('footerCopyright')}
          </p>
          <p className="mt-2 md:mt-0">
            {t('footerEducational')}
          </p>
        </div>
      </div>
    </footer>
  );
}
