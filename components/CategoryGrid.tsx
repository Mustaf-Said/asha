const categories = [
  { title: "Nursing Students", description: "Study support & early career guidance" },
  { title: "Career Development", description: "Grow, specialize, advance" },
  { title: "Leadership", description: "From bedside to management" },
  { title: "Wellbeing", description: "Stress, balance & burnout prevention" },
  { title: "International Nursing", description: "Work abroad & global careers" },
];

export default function CategoryGrid() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-slate-900 mb-10">
          Explore Guidance Areas
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="rounded-xl border border-slate-200 p-6 hover:shadow-md transition bg-white"
            >
              <h3 className="text-lg font-medium text-slate-900">
                {cat.title}
              </h3>
              <p className="mt-2 text-slate-600 text-sm">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
