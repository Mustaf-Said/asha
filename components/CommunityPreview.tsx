export default function CommunityPreview() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Join a Professional Nursing Community
          </h2>
          <p className="mt-4 text-slate-600">
            Ask questions, share experiences, and learn from nurses worldwide in
            a respectful, professional space.
          </p>
          <button className="mt-6 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition">
            Join Community
          </button>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <p className="text-sm text-slate-500">
            Recent discussions will appear here…
          </p>
        </div>
      </div>
    </section>
  );
}
