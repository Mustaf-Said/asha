# Vercel Deployment Guide

## Prerequisites

Before deploying to Vercel, ensure you have:

1. A [Vercel account](https://vercel.com/signup)
2. A [Sanity project](https://www.sanity.io/manage) set up
3. Your Sanity project credentials ready

## Step-by-Step Deployment

### 1. Prepare Your Sanity Credentials

Get these values from your Sanity dashboard at https://www.sanity.io/manage:

- **Project ID**: Found in project settings
- **Dataset**: Usually `production`
- **API Token**: Create in API → Tokens → Add API token
  - Token name: `Vercel Production`
  - Permissions: **Editor** (required for creating discussions and replies)

### 2. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Import your Git repository
3. Configure project:
   - Framework Preset: **Next.js**
   - Build Command: `npm install && npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

#### Option B: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

### 3. Configure Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add these variables for **Production**, **Preview**, and **Development**:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=your-editor-token
```

**Important:**

- Make sure to add variables to all environments (Production, Preview, Development)
- Click "Add" after entering each variable
- The `SANITY_API_WRITE_TOKEN` must have **Editor** permissions

### 4. Redeploy

After adding environment variables:

1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **Redeploy** (use existing Build Cache is fine)

Your deployment should now succeed!

## Common Issues

### Error: "Configuration must contain `projectId`"

**Cause:** Environment variables not configured in Vercel

**Solution:**

1. Check that all three environment variables are set in Vercel
2. Ensure they're set for the correct environment (Production/Preview/Development)
3. Redeploy after adding variables

### Build succeeds but pages are empty

**Cause:** Missing or incorrect Sanity credentials

**Solution:**

1. Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` matches your Sanity project
2. Check that `NEXT_PUBLIC_SANITY_DATASET` is correct (usually "production")
3. Ensure Sanity project has published content

### Cannot create discussions/replies

**Cause:** Missing or invalid write token

**Solution:**

1. Generate a new API token with **Editor** permissions in Sanity
2. Update `SANITY_API_WRITE_TOKEN` in Vercel
3. Redeploy

## Vercel Configuration

The project includes a `vercel.json` file with build optimizations:

```json
{
  "buildCommand": "npm install && npm run build",
  "env": {
    "NODE_OPTIONS": "--max-old-space-size=4096",
    "NEXT_PUBLIC_SANITY_PROJECT_ID": "@sanity_project_id",
    "NEXT_PUBLIC_SANITY_DATASET": "@sanity_dataset",
    "SANITY_API_WRITE_TOKEN": "@sanity_write_token"
  }
}
```

The `@` prefix indicates these are references to environment variables you set in Vercel dashboard.

## Post-Deployment Checklist

- [ ] Site loads without errors
- [ ] Guidance articles display correctly
- [ ] Shop products are visible
- [ ] Community discussions appear
- [ ] Can create new discussions
- [ ] Can post replies
- [ ] Images load properly
- [ ] Category filtering works

## Support

If you encounter issues:

1. Check Vercel deployment logs for specific errors
2. Verify all environment variables are set correctly
3. Ensure Sanity project is published and accessible
4. Check [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying)
5. Review [Vercel documentation](https://vercel.com/docs)
