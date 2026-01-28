import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedGuidanceSection from "@/components/sections/FeaturedGuidanceSection";
import TextContentSection from "@/components/sections/TextContentSection";
import ResourceListSection from "@/components/sections/ResourceListSection";
import ImageTextSection from "@/components/sections/ImageTextSection";
import CtaSection from "@/components/sections/CtaSection";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const page = await sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
    title,
    sections[]{
      ...,
      _type == "featuredGuidanceSection" => {
        ...,
        articles[]->{
          _id,
          title,
          "slug": slug.current
        }
      }
    }
  }`,
    { slug }
  );


  if (!page) notFound();

  return (
    <main>
      {page.sections?.map((section: any) => {
        switch (section._type) {
          case "heroSection":
            return (
              <HeroSection
                key={section._key}
                {...section}
              />
            );

          case "featuredGuidanceSection":
            return (
              <FeaturedGuidanceSection
                key={section._key}
                {...section}
              />
            );

          case "textContentSection":
            return (
              <TextContentSection
                key={section._key}
                {...section}
              />
            );

          case "resourceListSection":
            return (
              <ResourceListSection
                key={section._key}
                {...section}
              />
            );

          case "imageTextSection":
            return (
              <ImageTextSection
                key={section._key}
                {...section}
              />
            );

          case "ctaSection":
            return (
              <CtaSection
                key={section._key}
                {...section}
              />
            );

          default:
            return null;
        }
      })}
    </main>
  );

}
