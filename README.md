This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
'

## Project Struktur

```bash

app/
├─ page.tsx # Homepage
├─ about/
│ └─ page.tsx
├─ guidance/
│ ├─ page.tsx # list
│ └─ [slug]/page.tsx # article
├─ community/
│ └─ page.tsx
├─ shop/
│ └─ page.tsx
├─ legal/
│ └─ [slug]/page.tsx
components/
lib/
├─ sanity.client.ts
├─ queries.ts
styles/

```

## Sanity Struktur

```bash

sanity/
└─ schemas/
├─ article.ts
├─ category.ts
├─ page.ts
├─ home.ts
└─ index.ts

```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Required Environment Variables

Before deploying, you **must** configure these environment variables in your Vercel project settings:

1. Go to your Vercel project → Settings → Environment Variables
2. Add the following variables:

| Variable                        | Description                              | Example      |
| ------------------------------- | ---------------------------------------- | ------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID                   | `4fnznls9`   |
| `NEXT_PUBLIC_SANITY_DATASET`    | Sanity dataset name                      | `production` |
| `SANITY_API_WRITE_TOKEN`        | Sanity API token with Editor permissions | `sk...`      |

**How to get these values:**

- Get `NEXT_PUBLIC_SANITY_PROJECT_ID` from your [Sanity dashboard](https://www.sanity.io/manage)
- `NEXT_PUBLIC_SANITY_DATASET` is usually `production`
- Generate `SANITY_API_WRITE_TOKEN` in Sanity dashboard → API → Tokens → Add API token (select Editor permissions)

See [.env.local.example](.env.local.example) for a complete list of environment variables.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
