export default function FeaturedGuidance() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-slate-900 mb-10">
          Featured Guidance
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition"
            >
              <h3 className="font-medium text-slate-900">
                From Student to Confident Nurse
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Practical steps to build confidence and competence in your early
                nursing career.
              </p>
              <button className="mt-4 text-teal-600 text-sm font-medium">
                Read more →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
