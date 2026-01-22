# 🏥 Asha - Professional Nursing Platform

A modern, structured platform designed for nurses at all levels - students and professionals - providing guidance, community support, and digital products.

## 🎯 Core Features

### 1. **Structured Guidance** 📚

- **Professional Articles**: Career advice, leadership, wellbeing
- **Category Organization**: Nursing Students, Career Development, Leadership, Wellbeing, International Nursing
- **SEO Optimized**: Built-in SEO titles and descriptions
- **Rich Content**: Full-featured article editor with Portable Text

### 2. **Community Forum** 👥

- **Professional Discussions**: Peer support in a structured environment
- **Category-based**: Discussions organized by topic
- **Engagement Tracking**: Reply counts and pinned discussions
- **Author Recognition**: Contributors credited with timestamps

### 3. **Digital Shop** 🛍️

- **Product Types**: Guides, Templates, Checklists, Courses, Bundles
- **Instant Downloads**: Digital products for professional resources
- **Flexible Pricing**: Individual or bundled offerings
- **Product Management**: Easy inventory and availability control

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.3
- **CMS**: Sanity 3.99.0
- **Styling**: Tailwind CSS 4
- **Content**: Portable Text (rich text editor)
- **Database**: Sanity Cloud

## 📁 Project Structure

```
app/
├── page.tsx                 # Homepage
├── guidance/
│   ├── page.tsx            # Guidance list
│   └── [slug]/
│       ├── page.tsx        # Article detail page
│       └── opengraph-image.tsx  # Social card generation
├── community/
│   ├── page.tsx            # Community forum list
│   └── [slug]/page.tsx     # Discussion detail page
└── shop/
    ├── page.tsx            # Products listing
    └── [slug]/page.tsx     # Product detail page

components/
├── Header.tsx              # Navigation
├── Footer.tsx              # Footer
├── Hero.tsx                # Hero section
├── CategoryGrid.tsx        # Category showcase
├── FeaturedGuidance.tsx    # Featured articles
├── GuidanceCard.tsx        # Article card
├── CategoryFilter.tsx      # Filter component
├── CommunityPreview.tsx    # Community teaser
└── AuthoritySection.tsx    # Authority/credibility section

lib/
├── sanity.client.ts        # Sanity client config
├── sanity.image.ts         # Image optimization
├── queries.ts              # GROQ queries
├── seo.ts                  # SEO utilities
└── auth.ts                 # Authentication (optional)

sanity/
└── schemas/
    ├── article.ts          # Article document schema
    ├── category.ts         # Category schema
    ├── discussion.ts       # Community discussion schema
    ├── product.ts          # Digital product schema
    ├── home.ts             # Homepage content
    └── page.ts             # Generic page schema
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Sanity account (free at sanity.io)

### Installation

1. **Clone or extract the project**

```bash
cd asha
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**
   Create `.env.local` based on `.env.local.example`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=4fnznls9
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

4. **Run development server**

```bash
npm run dev
```

Visit `http://localhost:3000`

5. **Start Sanity Studio** (in a new terminal)

```bash
npx sanity dev
```

Studio runs at `http://localhost:3333`

## 📝 Sanity Schemas

### Article

- Title, Slug, Excerpt
- Main Image (with hotspot)
- Category (reference)
- Rich Content
- Published Date
- SEO Title & Description

### Discussion

- Title, Slug
- Category (reference)
- Description, Content
- Author, Created Date
- Reply Count
- Pin Status

### Product

- Name, Slug
- Description, Price
- Main Image
- Product Type (Guide, Template, etc.)
- Download URL
- Availability Status

## 🔍 Key Queries (GROQ)

```
articlesQuery           # All articles
articleBySlugQuery      # Single article with category
articlesByCategoryQuery # Articles filtered by category
relatedArticlesQuery    # Related articles

discussionsQuery        # All discussions (pinned first)
discussionBySlugQuery   # Single discussion
discussionsByCategoryQuery # Discussions by category

productsQuery          # All available products
productBySlugQuery     # Single product
productsByTypeQuery    # Products by type
```

## 🎨 Styling

- **Framework**: Tailwind CSS v4
- **Typography**: Geist font family
- **Color Scheme**:
  - Primary: Teal (trust, healthcare)
  - Secondary: Slate (professional)
- **Responsive**: Mobile-first design

## 📱 Pages Overview

### Public Pages

- `/` - Homepage
- `/guidance` - All guidance articles
- `/guidance/[slug]` - Article detail
- `/community` - Discussions forum
- `/community/[slug]` - Discussion detail
- `/shop` - Product listing
- `/shop/[slug]` - Product detail

### Features

- ✅ Server-side rendering (SSR)
- ✅ Static generation where possible
- ✅ Image optimization
- ✅ SEO metadata
- ✅ Breadcrumb navigation
- ✅ Responsive design

## 🔄 Draft Preview Setup (For Editors)

To enable draft preview for Sanity editors:

1. Generate a Sanity API token with preview access
2. Add to `.env.local`:

```
SANITY_API_READ_TOKEN=your_token_here
SANITY_PREVIEW_SECRET=your_secret_here
```

3. Editors can preview drafts before publishing

## 🚢 Deployment

### Build

```bash
npm run build
npm start
```

### Deployment Options

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Self-hosted Node server**

### Environment Variables

Set in your hosting platform:

```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
SANITY_API_READ_TOKEN (optional)
SANITY_PREVIEW_SECRET (optional)
```

## 📊 Content Strategy

### Categories to Create in Sanity

1. **Nursing Students** - Entry-level guidance
2. **Career Development** - Advancement, specialization
3. **Leadership** - Management, mentoring
4. **Wellbeing** - Mental health, burnout prevention
5. **International Nursing** - Global perspectives

### Product Ideas

- Career transition guides
- Interview preparation templates
- Leadership frameworks
- Wellbeing checklists
- Specialty course bundles

## 🔐 Security Considerations

- Use read-only tokens for public queries
- Sensitive content through separate datasets if needed
- Rate limiting for community features (future)
- Content moderation (future)

## 📈 Future Enhancements

- [ ] User authentication & profiles
- [ ] Comment/reply system for discussions
- [ ] Shopping cart & payment integration
- [ ] Email notifications
- [ ] Advanced search & filtering
- [ ] Analytics dashboard
- [ ] Multi-language support

## 🤝 Contributing

[Add contribution guidelines here]

## 📄 License

[Add license information here]

## 📞 Support

For issues or questions:

- Check existing documentation
- Review Sanity docs at docs.sanity.io
- Visit Next.js docs at nextjs.org

---

**Built with ❤️ for the nursing community**
