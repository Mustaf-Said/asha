# Fix for "Start Discussion" Feature - Terminal Errors

## Problem

When trying to publish a new discussion, the API was failing because it didn't have write access to Sanity CMS.

## Solution Applied

### 1. **Created `/app/api/discussions/route.ts`** - POST endpoint

- Accepts discussion data from the form
- Creates a new discussion document in Sanity
- Returns the slug for redirecting to the new discussion
- Includes detailed error handling

### 2. **Updated `/app/community/new/page.tsx`** - Form page

- Full form for creating new discussions
- Validates all required fields before submission
- Shows community guidelines
- Handles loading and error states

### 3. **Updated API Route with Write-Enabled Client**

- Created separate `writeClient` with write permissions
- Configured with `useCdn: false` for fresh data
- Uses `SANITY_API_WRITE_TOKEN` from environment

### 4. **Updated `.env.local`**

- Added `SANITY_API_WRITE_TOKEN=YOUR_WRITE_TOKEN_HERE`
- Added instructions for getting the token

## What You Need to Do

### Step 1: Get Your Write Token

1. Go to https://manage.sanity.io/
2. Select your project (ID: 4fnznls9)
3. Click **Settings** → **API** → **Tokens**
4. Click **"Add API token"**
5. Name it "Production Write Token"
6. Select **Editor** role (or higher)
7. Click **Create**
8. Copy the token

### Step 2: Update `.env.local`

Replace this line in `.env.local`:

```
SANITY_API_WRITE_TOKEN=YOUR_WRITE_TOKEN_HERE
```

With your actual token:

```
SANITY_API_WRITE_TOKEN=sk_production_xxxxxxxxxxxxxxxxxxxxx
```

### Step 3: Restart Dev Server

```bash
npm run dev
```

## Testing

1. Go to http://localhost:3000/community
2. Click **"Start Discussion"** button
3. Fill out the form:
   - Your Name (required)
   - Discussion Title (required)
   - Summary (required)
   - Full Discussion (optional)
   - Category (optional)
4. Click **"Publish Discussion"**
5. You should be redirected to the new discussion

## Features

✅ Form validation on client side
✅ Required fields: Title, Author, Description
✅ Optional fields: Content, Category
✅ Error messages displayed in form
✅ Loading state while publishing
✅ Auto-redirect to new discussion on success
✅ Community guidelines displayed

## Error Messages

If you see these errors:

| Error                            | Solution                                 |
| -------------------------------- | ---------------------------------------- |
| "API write token not configured" | Add SANITY_API_WRITE_TOKEN to .env.local |
| "Discussion title is required"   | Fill in the Discussion Title field       |
| "Author name is required"        | Fill in the Your Name field              |
| "Description is required"        | Fill in the Summary field                |

## File Changes Made

- ✅ `/app/community/new/page.tsx` - NEW: Discussion creation form
- ✅ `/app/api/discussions/route.ts` - NEW: API endpoint for creating discussions
- ✅ `/app/community/page.tsx` - UPDATED: "Start Discussion" button now links to form
- ✅ `.env.local` - UPDATED: Added SANITY_API_WRITE_TOKEN configuration
