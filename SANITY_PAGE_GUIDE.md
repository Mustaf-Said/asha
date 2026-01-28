# Creating Pages in Sanity CMS

## Quick Start Guide

### 1. Access Sanity Studio

Run the Sanity Studio locally:

```bash
npx sanity dev
```

This opens Sanity Studio at `http://localhost:3333`

### 2. Create a New Page (e.g., Resources)

1. **In Sanity Studio:**
   - Click on "Pages" in the left sidebar
   - Click "All Pages"
   - Click the "+" button or "Create new Page"

2. **Fill in Page Details:**
   - **Title**: `Resources` (or any page name)
   - **Slug**: Click "Generate" to create slug from title → `resources`
3. **Add Sections:**
   Click "+ Add item" under "Page Sections" and choose from:
   - **Hero Section**: Large banner at top of page
     - Headline (required)
     - Subheadline
     - Primary Button (label + link)
   - **Text Content Section**: Rich text content
     - Section Title
     - Content (rich text editor)
     - Text Alignment (left/center/right)
   - **Resource List Section**: Display list of resources
     - Section Title
     - Description
     - Resources (add multiple):
       - Resource Title
       - Description
       - Link
       - Type (document/video/link/tool)
   - **Image & Text Section**: Image beside text
     - Section Title
     - Content (rich text)
     - Image (upload)
     - Image Position (left/right)
   - **Featured Guidance Section**: Show articles
     - Section Title
     - Select Articles from your content
   - **Call to Action Section**: Conversion section
     - Title
     - Subtitle
     - Primary Button
     - Secondary Button
     - Background Color (teal/white/gray)

4. **Publish the Page:**
   - Click "Publish" button in bottom right corner

### 3. Access Your Page

Visit your page at:

```
http://localhost:3000/resources
```

Or whatever slug you created (e.g., `/about`, `/contact`, `/services`)

## Example: Creating Resources Page

### Sample Configuration:

**Page Title:** Resources  
**Slug:** resources

**Sections:**

1. **Hero Section**
   - Headline: "Nursing Resources & Tools"
   - Subheadline: "Everything you need to succeed in your nursing career"
   - Primary Button: "Explore Resources" → /guidance

2. **Resource List Section**
   - Title: "Essential Resources"
   - Description: "Curated tools and links for nursing professionals"
   - Resources:
     - Title: "NTI Interview Guide"
       Type: Document
       Link: https://example.com/nti-guide
     - Title: "Clinical Skills Videos"
       Type: Video
       Link: https://example.com/videos

3. **Call to Action Section**
   - Title: "Ready to Get Started?"
   - Primary Button: "Join Community" → /community
   - Background: Teal

## Fixing 404 Errors

If you get a 404 error:

1. **Check the slug matches the URL:**
   - Sanity slug: `resources`
   - URL: `/resources` ✓

2. **Ensure page is published:**
   - Look for green "Published" indicator in Sanity

3. **Restart dev server:**

   ```bash
   npm run dev
   ```

4. **Check Sanity data:**
   - Verify the page exists in Sanity Studio
   - Check that sections are added and saved

## Admin Access

Your Sanity Studio is protected by:

- **Project ID**: 4fnznls9
- **Dataset**: production

### Adding Team Members:

1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to "Members" tab
4. Invite users with email
5. Set role: Editor (can edit content) or Admin (full access)

## Available Section Types

| Section Type      | Purpose                   | Best For                         |
| ----------------- | ------------------------- | -------------------------------- |
| Hero Section      | Page header with CTA      | Landing pages, home page         |
| Text Content      | Rich text articles        | About, policies, guides          |
| Resource List     | Organized links/resources | Resources, tools, downloads      |
| Image & Text      | Visual storytelling       | Features, services, testimonials |
| Featured Guidance | Showcase articles         | Home, topic pages                |
| Call to Action    | Conversion focused        | End of pages, signup prompts     |

## Pro Tips

1. **Mix sections** for dynamic layouts
2. **Use consistent slugs** (lowercase, hyphens)
3. **Preview before publishing** using the "Preview" tab
4. **Organize with categories** for better content management
5. **Add images** to Image & Text sections for visual appeal

## Troubleshooting

**404 Error?**

- Slug doesn't match URL
- Page not published
- Server needs restart

**Sections not showing?**

- Check section data is filled in
- Clear browser cache
- Check console for errors

**Images not loading?**

- Verify image uploaded in Sanity
- Check image domain in next.config.ts

## Next Steps

1. Create your Resources page in Sanity Studio
2. Add 2-3 sections with content
3. Publish the page
4. Visit http://localhost:3000/resources
5. Edit and republish as needed

The content updates immediately when you publish in Sanity!
