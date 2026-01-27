"use client";

import { motion } from "framer-motion";
import { useSearchParams } from 'next/navigation';
import { useTranslations } from '@/lib/translations';

export default function InternationalNursing() {
  const searchParams = useSearchParams();
  const lang = searchParams?.get('lang') || 'en';
  const { t } = useTranslations();
  const isRTL = lang === 'ar';

  const parseItems = (itemString: string): string[] => {
    return itemString.split('|').map(item => item.trim());
  };

  const sections = [
    {
      title: t('intlNursingIntroTitle'),
      items: parseItems(t('intlNursingIntroItems')),
    },
    {
      title: t('intlNursingBenefitsTitle'),
      items: parseItems(t('intlNursingBenefitsItems')),
    },
    {
      title: t('intlNursingRequirementsTitle'),
      items: parseItems(t('intlNursingRequirementsItems')),
    },
    {
      title: t('intlNursingLicensingTitle'),
      items: parseItems(t('intlNursingLicensingItems')),
    },
    {
      title: t('intlNursingDestinationsTitle'),
      items: parseItems(t('intlNursingDestinationsItems')),
    },
    {
      title: t('intlNursingChallengesTitle'),
      items: parseItems(t('intlNursingChallengesItems')),
    },
    {
      title: t('intlNursingPreparationTitle'),
      items: parseItems(t('intlNursingPreparationItems')),
    },
    {
      title: t('intlNursingAdviceTitle'),
      items: parseItems(t('intlNursingAdviceItems')),
    },
  ];

  // For now, content remains in English
  // You can add translations later if needed
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-12 px-4 ${isRTL ? 'text-right' : 'text-left'}`}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-4">{t('intlNursingPageTitle')}</h1>
        <p className="text-lg text-slate-600 mb-12">{t('intlNursingPageDesc')}</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto space-y-8"
      >
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-teal-500"
          >
            <h2 className="text-2xl font-semibold text-teal-900 mb-4">{section.title}</h2>
            <ul className="space-y-2">
              {section.items.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 text-slate-700"
                >
                  <span className="text-teal-500 font-bold mt-1">•</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}

        <motion.div variants={itemVariants} className="bg-blue-100 rounded-lg p-6 mt-12">
          <h3 className="text-xl font-semibold text-blue-900 mb-3">{t('intlNursingNextTitle')}</h3>
          <ul className="space-y-2 text-blue-800">
            {parseItems(t('intlNursingNextItems')).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}
