import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedGuidance from "@/components/FeaturedGuidance";
import CommunityPreview from "@/components/CommunityPreview";
import AuthoritySection from "@/components/AuthoritySection";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <CategoryGrid />
      <FeaturedGuidance />
      <CommunityPreview />
      <AuthoritySection />
    </div>
  );
}
