import GuidanceHeader from "@/components/GuidanceHeader";
import CategoryFilter from "@/components/CategoryFilter";
import GuidanceCard from "@/components/GuidanceCard";

const articles = [
  {
    title: "From Student to Confident Nurse",
    excerpt: "Key steps to build confidence and competence during your early nursing career.",
    category: "Nursing Students",
  },
  {
    title: "Preventing Burnout in Nursing",
    excerpt: "Practical strategies to manage stress, workload, and emotional fatigue.",
    category: "Wellbeing",
  },
  {
    title: "Working Abroad as a Nurse",
    excerpt: "What to consider before starting your international nursing journey.",
    category: "International Nursing",
  },
];

export default function GuidancePage() {
  return (
    <>
      <GuidanceHeader />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">

          <CategoryFilter />

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <GuidanceCard
                key={article.title}
                title={article.title}
                excerpt={article.excerpt}
                category={article.category}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
