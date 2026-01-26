export type ArticleWithTranslations = {
  title?: string;
  excerpt?: string;
  content?: any;
  title_so?: string;
  title_ar?: string;
  excerpt_so?: string;
  excerpt_ar?: string;
  soContent?: any;
  arContent?: any;
};

export type LangCode = 'en' | 'so' | 'ar';

export function normalizeLang(input?: string | null): LangCode {
  const normalized = (input || 'en').toLowerCase();
  return normalized === 'so' || normalized === 'ar' ? normalized : 'en';
}

export function resolveArticleLocalization<T extends ArticleWithTranslations>(
  article: T,
  lang?: string | null
): T & { localizedTitle?: string; localizedExcerpt?: string; localizedContent?: any; lang: LangCode } {
  const resolvedLang = normalizeLang(lang);

  const title =
    resolvedLang === 'so'
      ? article.title_so || article.title
      : resolvedLang === 'ar'
        ? article.title_ar || article.title
        : article.title;

  const excerpt =
    resolvedLang === 'so'
      ? article.excerpt_so || article.excerpt
      : resolvedLang === 'ar'
        ? article.excerpt_ar || article.excerpt
        : article.excerpt;

  const content =
    resolvedLang === 'so'
      ? article.soContent || article.content
      : resolvedLang === 'ar'
        ? article.arContent || article.content
        : article.content;

  return {
    ...article,
    localizedTitle: title,
    localizedExcerpt: excerpt,
    localizedContent: content,
    lang: resolvedLang,
  };
}
