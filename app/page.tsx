import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedGuidance from "@/components/FeaturedGuidance";
import CommunityPreview from "@/components/CommunityPreview";
import AuthoritySection from "@/components/AuthoritySection";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const lang = resolvedSearchParams?.lang || 'en';

  return (
    <>
      <Hero lang={lang} />
      <CategoryGrid lang={lang} />
      <FeaturedGuidance lang={lang} />
      <CommunityPreview lang={lang} />
      <AuthoritySection lang={lang} />
    </>
  );
}
