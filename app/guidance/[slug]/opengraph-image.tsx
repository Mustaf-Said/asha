import { ImageResponse } from "next/og";
import { sanityClient } from "@/lib/sanity.client";
import { articleBySlugQuery } from "@/lib/queries";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ UNWRAP params
  const { slug } = await params;

  const article = await sanityClient.fetch(articleBySlugQuery, {
    slug,
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0f172a",
          color: "white",
          padding: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: 28, color: "#5eead4" }}>
          {article?.category?.title}
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            marginTop: 20,
            maxWidth: "1000px",
          }}
        >
          {article?.title}
        </div>

        {article?.excerpt && (
          <div
            style={{
              fontSize: 28,
              marginTop: 30,
              opacity: 0.85,
              maxWidth: "900px",
            }}
          >
            {article.excerpt}
          </div>
        )}
      </div>
    ),
    size
  );
}
