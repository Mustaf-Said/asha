const categories = [
  "All",
  "Nursing Students",
  "Career Development",
  "Leadership",
  "Wellbeing",
  "International Nursing",
];

export default function CategoryFilter() {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          className="px-4 py-2 rounded-full border border-slate-300 text-sm text-slate-700 hover:bg-slate-100 transition"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
