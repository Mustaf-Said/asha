import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity.image";

export default function ImageTextSection({
  title,
  content,
  image,
  imagePosition,
}: any) {
  const isImageLeft = imagePosition === "left";

  return (
    <section className="py-16 max-w-7xl mx-auto px-4">
      <div
        className={`flex flex-col ${isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
          } gap-12 items-center`}
      >
        {/* Image */}
        {image && (
          <div className="flex-1">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={urlFor(image).width(800).url()}
                alt={title || "Section image"}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Text Content */}
        <div className="flex-1">
          {title && (
            <h2 className="text-3xl font-bold mb-6">{title}</h2>
          )}

          {content && (
            <div className="prose prose-lg max-w-none">
              <PortableText value={content} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
