# ⚙️ Development Setup Guide

## Quick Start (5 minutes)

### 1. Install & Run

```bash
# Install dependencies
npm install

# Create .env.local with Sanity credentials
cat > .env.local << EOF
NEXT_PUBLIC_SANITY_PROJECT_ID=4fnznls9
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
EOF

# Start development server
npm run dev

# In another terminal, start Sanity Studio
npx sanity dev
```

### 2. Create Initial Content

Go to http://localhost:3333 and create:

- **At least 1 Category** (e.g., "Nursing Students")
- **At least 1 Article** with that category
- **At least 1 Discussion** in that category
- **At least 1 Product**

### 3. Preview in Browser

- Website: http://localhost:3000
- Admin: http://localhost:3333

## Environment Variables

Create `.env.local` in project root:

```env
# Required
NEXT_PUBLIC_SANITY_PROJECT_ID=4fnznls9
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Optional - For draft preview
SANITY_API_READ_TOKEN=
SANITY_PREVIEW_SECRET=

# Auto-translation (Azure Translator)
AZURE_TRANSLATOR_KEY=your-azure-key
# Optional
AZURE_TRANSLATOR_REGION=westeurope
AZURE_TRANSLATOR_ENDPOINT=https://api.cognitive.microsofttranslator.com
# Sanity write token (needed to save translations)
SANITY_API_WRITE_TOKEN=your-sanity-write-token

# Local dev fallback (no external API)
DEV_TRANSLATION_FAKE=true
```

## Development Workflow

### Running the App

```bash
# Development (hot reload)
npm run dev
# → http://localhost:3000

# Build for production
npm run build

# Start production build
npm start

# Linting
npm run lint
```

### Using Sanity Studio

```bash
# Start Sanity dev server
npx sanity dev
# → http://localhost:3333

# Deploy to Sanity hosting
npx sanity deploy
```

## Database Schema

The Sanity schemas are defined in `sanity/schemas/`:

### Creating New Document Types

1. Create `sanity/schemas/mytype.ts`
2. Import in `sanity/schemas/index.ts`
3. Add to `schemaTypes` array
4. Restart Sanity Studio

Example:

```typescript
import { defineType, defineField } from "sanity";

export default defineType({
  name: "mytype",
  title: "My Type",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
```

## Writing Queries (GROQ)

Add queries to `lib/queries.ts`:

```typescript
import { groq } from "next-sanity";

export const myQuery = groq`
  *[_type == "article"][0...10] {
    title,
    "slug": slug.current,
    category->{ title }
  }
`;
```

Use in pages:

```typescript
const data = await sanityClient.fetch(myQuery);
```

## Creating Pages

### New Page Route

Create `app/mypath/page.tsx`:

```typescript
import { sanityClient } from "@/lib/sanity.client";
import { myQuery } from "@/lib/queries";

export default async function MyPage() {
  const data = await sanityClient.fetch(myQuery);

  return (
    <div>
      {data.map(item => (
        <div key={item._id}>{item.title}</div>
      ))}
    </div>
  );
}
```

### Dynamic Routes

Create `app/articles/[slug]/page.tsx`:

```typescript
type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await sanityClient.fetch(articleBySlugQuery, { slug });

  return <div>{article.title}</div>;
}
```

## Components

### Creating Components

`components/MyComponent.tsx`:

```typescript
export default function MyComponent() {
  return <div>Component</div>;
}
```

### Client vs Server Components

```typescript
// Server Component (default)
export default function MyComponent() {
  // Can access databases, secrets
}

// Client Component
("use client");
import { useState } from "react";
export default function MyComponent() {
  // Can use hooks, interactivity
}
```

## Styling

### Tailwind CSS

Uses Tailwind v4 with custom color palette:

```tsx
// Responsive
<div className="md:grid-cols-2 lg:grid-cols-3">

// Colors
<div className="bg-teal-600 text-slate-900">

// States
<button className="hover:bg-teal-700 transition">
```

### CSS Modules

Create `components/MyComponent.module.css`:

```css
.container {
  @apply max-w-4xl mx-auto px-6;
}
```

Use in component:

```tsx
import styles from "./MyComponent.module.css";
export default function MyComponent() {
  return <div className={styles.container}>...</div>;
}
```

## Image Optimization

All images should use Next.js `Image` component:

```tsx
import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";

export default function MyComponent({ image }) {
  return (
    <Image
      src={urlFor(image).url()}
      alt="Description"
      width={400}
      height={300}
    />
  );
}
```

## SEO

### Page Metadata

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title | Asha",
  description: "Page description...",
};

export default function Page() {
  // Page content
}
```

### Open Graph Images

For dynamic OG images, see `app/guidance/[slug]/opengraph-image.tsx`

## Testing

```bash
# Run tests
npm test

# Watch mode
npm test -- --watch
```

## Debugging

### Console Logs

```typescript
console.log("Debug info:", data);
```

### VS Code Debugging

Add to `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "args": ["dev"],
      "skipFiles": ["<node_internals>/**"],
      "console": "integratedTerminal"
    }
  ]
}
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
git add .
git commit -m "feat: Add new feature"

# Push
git push origin feature/new-feature
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -i :3000  # macOS/Linux
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process  # Windows

npm run dev
```

### Sanity Studio Issues

```bash
# Clear cache
rm -rf node_modules/.sanity

# Reinstall
npm install

# Restart
npx sanity dev
```

### Build Failures

```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

## Auto-Translation Webhook

To auto-translate articles from English to Somali and Arabic:

- Create a Sanity webhook in your project settings pointing to:
  - `POST /api/articles/translate`
  - Trigger on document type: `article`
  - Events: `create` and `update`
  - Deliver minimal payload including `_id`

The server will:

- Fetch the article's English `content`
- Translate to `so` and `ar` if `soContent`/`arContent` are missing
- Save translated blocks into the same document
- Set `translationMeta.autoTranslatedAt`

Editors can adjust translated fields in Sanity Studio.

## Production Checklist

- [ ] All environment variables set
- [ ] SEO metadata complete
- [ ] Images optimized
- [ ] No console errors
- [ ] Mobile responsive tested
- [ ] Links working
- [ ] Forms tested
- [ ] Performance audit passed

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Portable Text](https://portabletext.org/)

## Support

For help with:

- **Next.js**: Check nextjs.org/docs
- **Sanity**: Check sanity.io/docs
- **Tailwind**: Check tailwindcss.com
- **Project specific**: Check PLATFORM_GUIDE.md
