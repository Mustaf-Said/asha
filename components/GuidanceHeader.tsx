type GuidanceHeaderProps = {
  title?: string;
  description?: string;
};

export default function GuidanceHeader({
  title = "Nursing Guidance & Resources",
  description = "Practical guidance for nurses and nursing students at every stage — from education and career growth to leadership, wellbeing, and international opportunities.",
}: GuidanceHeaderProps) {
  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-semibold text-slate-900">
          {title}
        </h1>
        <p className="mt-4 text-slate-600">
          {description}
        </p>
      </div>
    </section>
  );
}
