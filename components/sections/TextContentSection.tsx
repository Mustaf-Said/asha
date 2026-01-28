import { PortableText } from "@portabletext/react";

export default function TextContentSection({ title, content, alignment }: any) {
  const alignmentMap: Record<string, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const alignmentClass = alignmentMap[alignment] || "text-left";

  return (
    <section className="py-16 max-w-4xl mx-auto px-4">
      {title && (
        <h2 className={`text-3xl font-bold mb-8 ${alignmentClass}`}>
          {title}
        </h2>
      )}

      {content && (
        <div className={`prose prose-lg max-w-none ${alignmentClass}`}>
          <PortableText value={content} />
        </div>
      )}
    </section>
  );
}
