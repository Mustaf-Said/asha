export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api", "/_next"],
      },
    ],
    sitemap: "http://localhost:3000/sitemap.xml",
    // ⬆️ ändra till riktig domän sen
  };
}
