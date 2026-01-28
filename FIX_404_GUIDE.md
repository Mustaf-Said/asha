# 🔧 Fix Your 404 Error - Quick Steps

## The Problem

You're getting a 404 error when visiting `/Resources` because:

1. The URL is case-sensitive and should be `/resources` (lowercase)
2. OR you haven't created the page in Sanity CMS yet

## ✅ Solution: Create the Page in Sanity

### Step 1: Start Sanity Studio

```bash
npx sanity dev
```

Visit: http://localhost:3333

### Step 2: Create Resources Page

1. **Click "Pages" → "All Pages"** in the left sidebar
2. **Click the "+" button** to create a new page
3. **Fill in these fields:**
   - **Title**: `Resources`
   - **Slug**: Click "Generate" button → it will create `resources`

4. **Add a Hero Section** (click "+ Add item under Page Sections"):
   - **Headline**: "Nursing Resources & Tools"
   - **Subheadline**: "Essential resources for nursing professionals"
   - **Primary Button**:
     - Label: "Get Started"
     - Link: "/community"

5. **Add a Resource List Section** (optional but recommended):
   - **Title**: "Featured Resources"
   - **Description**: "Helpful tools and guides"
   - **Resources**: Click "+ Add item":
     - Title: "NTI Interview with Nicole Kupchik"
     - Description: "Learn about NTI certification"
     - Link: "https://example.com"
     - Type: "video"

6. **Click "Publish"** button (bottom right corner)

### Step 3: View Your Page

Visit: **http://localhost:3000/resources** (note: lowercase 'r')

## 🎯 That's It!

Your page should now work. If you still see 404:

1. **Restart your Next.js dev server:**

   ```bash
   # Stop the server (Ctrl+C)
   # Then start again:
   npm run dev
   ```

2. **Check the slug in Sanity Studio** matches exactly: `resources` (all lowercase)

3. **Clear your browser cache** and refresh

## 📝 Quick Reference

| What           | Where                 | Value                   |
| -------------- | --------------------- | ----------------------- |
| Sanity Studio  | http://localhost:3333 | Edit content here       |
| Frontend       | http://localhost:3000 | View pages here         |
| Page URL       | /resources            | Must match slug exactly |
| Slug in Sanity | resources             | Lowercase, no spaces    |

## 🚀 What You Can Do Now

1. **Edit content** in Sanity Studio
2. **Click "Publish"** to save changes
3. **Refresh your browser** at localhost:3000/resources
4. **See changes instantly!**

## 💡 Pro Tips

- **Always use lowercase** for slugs: `resources`, not `Resources`
- **Generate slug from title** using the "Generate" button
- **Publish after every change** to see it on the frontend
- **Use Preview tab** in Sanity to see before publishing

## 🎨 Add More Sections

You can add these section types to your Resources page:

✅ **Hero Section** - Page banner with CTA  
✅ **Resource List Section** - Links to tools/documents  
✅ **Text Content Section** - Rich text articles  
✅ **Image & Text Section** - Visual content  
✅ **Featured Guidance Section** - Show articles  
✅ **Call to Action Section** - Conversion section

Just click "+ Add item" under Page Sections and choose the type!

---

**Need more help?** Check `SANITY_PAGE_GUIDE.md` for detailed instructions.
