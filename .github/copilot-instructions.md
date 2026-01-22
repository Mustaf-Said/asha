# GitHub Copilot Instructions for Asha Project

## Overview

Asha is a professional nursing platform built with Next.js 15+ and Sanity CMS. It provides structured **Guidance** (articles), **Community** (discussion forum), and **Shop** (products) sections. The architecture uses server-side data fetching with Sanity queries, static component composition, and minimal client interactivity.

## Architecture Essentials

### Data Flow

- **Read Path**: Sanity (CMS) → `lib/queries.ts` (GROQ queries) → `sanityClient` (read-only, CDN-enabled) → page components → rendered HTML
- **Write Path**: Client forms → `app/api/**/route.ts` (POST endpoints) → `writeClient` (token-authenticated) → Sanity documents
- **Key Pattern**: Pages are async server components; only forms/interactions marked with `'use client'` are client components

### Sanity Integration

- **Client Setup** (`lib/sanity.client.ts`): Two clients exist—`sanityClient` (public, CDN-cached) for reads, `writeClient` (in API routes) for writes
- **Queries** (`lib/queries.ts`): GROQ queries organized by domain (articles, discussions, categories). Always use `slug.current` for URL slugs
- **Schemas** (`sanity/schemas/`): Define document types (article, discussion, category, product). References use `to: [{ type: "category" }]`
- **Image Handling**: Use `urlFor()` from `lib/sanity.image.ts` to generate optimized image URLs from Sanity image objects

### Content Sections

| Section       | Page                                                                   | Query Pattern                               | Write Point                                                   |
| ------------- | ---------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------- |
| **Guidance**  | `/guidance` list, `/guidance/[slug]` detail                            | `articlesQuery`, `articleBySlugQuery`       | Read-only (CMS only)                                          |
| **Community** | `/community` list, `/community/[slug]` detail, `/community/new` create | `discussionsQuery`, `discussionBySlugQuery` | `POST /api/discussions` (create), `POST /api/replies` (reply) |
| **Shop**      | `/shop` list, `/shop/[slug]` detail                                    | `productsQuery`, `productBySlugQuery`       | Read-only (CMS only)                                          |

## Critical Conventions

### Next.js App Router

- **Params Promise**: `params` is a Promise in `page.tsx` (Next.js 15+). Always `await` it: `const { slug } = await params;`
- **SearchParams Promise**: `searchParams` is also a Promise. Await before accessing: `const { category } = await searchParams || {};`
- **Dynamic Routes**: Use `[slug]` for dynamic segments; Sanity slugs are always `slug.current`
- **Metadata**: Use `generateMetadata()` for SEO tags; fetch data server-side to avoid double-fetching

### Component Structure

- **Server Components** (default): Components that fetch Sanity data (`FeaturedGuidance.tsx`, `GuidanceCard.tsx`)
- **Client Components** (`'use client'`): Only `ReplyForm.tsx` and interactive forms; manage state with `useState`
- **Data Passing**: Components receive fully-resolved data from parent pages; no prop drilling for queries

### Styling & Dependencies

- **Tailwind CSS 4** with typography plugin: All components use utility classes (no CSS modules)
- **Key Libraries**: `@portabletext/react` (render article rich text), `@sanity/image-url` (image optimization), `@sanity/client` (queries)
- **Image Component**: Use Next.js `Image` from `next/image` for all images to enable optimization

### API Route Pattern

1. Accept `POST` request with JSON body
2. Validate inputs (return 400 if missing required fields)
3. Use `writeClient` (not `sanityClient`) with `useCdn: false` and auth token
4. Generate slugs from titles: `title.toLowerCase().replace(/[^a-z0-9]+/g, '-')`
5. Create/update documents via `writeClient.create()` or `writeClient.patch()`
6. Return `NextResponse.json()` with result or error status code

## Developer Workflows

### Setup

```bash
npm install
# Edit .env.local with Sanity credentials (see .env.local.example)
npm run dev  # http://localhost:3000
```

### Common Tasks

- **Add Article**: Create in Sanity CMS → fetched automatically via `articlesQuery`
- **Add Feature**: Create page in `app/[feature]/page.tsx` → add component → import Sanity queries
- **Add Form**: Create client component with `'use client'` → `POST` to `app/api/**/route.ts` → use `writeClient`
- **Debug Queries**: Test GROQ in Sanity Studio directly; add `console.log(result)` after `sanityClient.fetch()`

## Project-Specific Patterns

### Slug Generation & Resolution

- Sanity slugs are defined as `slug: { type: "slug", options: { source: "title" } }`
- Access in queries: `"slug": slug.current`
- In pages: receive `slug` as URL param, pass to query as `{ slug }`
- Never hardcode slugs; always generate from titles in API routes

### Category Filtering

- Articles/discussions can be filtered by category
- `CategoryFilter.tsx` accepts `category?` searchParam
- Query pattern: `*[_type == "article" && category->slug.current == $categorySlug]`
- Pass category slug via `?category=category-name` URL parameter

### Error Handling

- 404: Use `notFound()` from `next/navigation` if Sanity query returns null
- API errors: Return specific `NextResponse.json({ message: "..." }, { status: 4xx })`
- Missing env vars: Sanity client will throw during build if `NEXT_PUBLIC_SANITY_PROJECT_ID` missing

## Key Files Reference

- **Router**: `app/layout.tsx` (global layout), `app/page.tsx` (homepage)
- **Queries**: `lib/queries.ts` (all GROQ queries by domain)
- **API**: `app/api/discussions/route.ts` (create discussions), `app/api/replies/route.ts` (add replies)
- **Schemas**: `sanity/schemas/article.ts`, `sanity/schemas/discussion.ts`, `sanity/schemas/category.ts`
- **Config**: `next.config.ts` (image remotePatterns), `tailwind.config.ts` (content paths)
