export default function HeroSection({
  headline,
  subheadline,
  primaryCta,
}: any) {
  return (
    <section className="py-24 text-center bg-linear-to-b from-teal-50 to-white">
      <h1 className="text-5xl font-bold mb-4">{headline}</h1>

      {subheadline && (
        <p className="text-xl text-slate-600 mb-8">{subheadline}</p>
      )}

      {primaryCta?.label && primaryCta?.href && (
        <a
          href={primaryCta.href}
          className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          {primaryCta.label}
        </a>
      )}
    </section>
  );
}
