import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const page = await sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0]`,
    { slug }
  );

  if (!page) notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">{page.title}</h1>
      <div className="prose max-w-none">
        <PortableText value={page.content} />
      </div>
    </main>
  );
}
