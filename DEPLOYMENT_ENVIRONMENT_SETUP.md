# Deployment Environment Setup Guide

This guide explains how to configure environment variables for different deployment platforms.

## Environment Variables Required

### Essential Variables
- `VITE_SUPABASE_URL`: Your Supabase project URL (e.g., https://abcdefgh.supabase.co)
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous/public key

### Optional Variables
- `VITE_API_BASE_URL`: API base URL (default: https://api.gaiaexchanges.com)
- `VITE_ENABLE_ANALYTICS`: Enable analytics (default: true)
- `VITE_ENABLE_DEBUG`: Enable debug mode (default: false)

## Platform-Specific Setup

### Vercel Deployment
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variables:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anonymous-key
   ```
4. Set environment to "Production" for each variable
5. Deploy: `npm run deploy:vercel`

### Netlify Deployment
1. Go to your Netlify site dashboard
2. Navigate to Site Settings → Environment Variables
3. Add the same variables as above
4. Deploy: `npm run deploy:netlify`

### GitHub Pages Deployment
1. Go to your repository Settings → Secrets and Variables → Actions
2. Add Repository Secrets:
   ```
   VITE_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY
   ```
3. The GitHub Action will automatically use these secrets

## Local Development
For local development, the project uses safe defaults that won't interfere with production:
- `VITE_SUPABASE_URL=https://localhost:54321` (local Supabase)
- `VITE_SUPABASE_ANON_KEY=local-development-key`

## Verification
After deployment, check that your environment variables are properly set by:
1. Opening browser developer tools
2. Checking that no placeholder values appear in the network requests
3. Verifying Supabase connections work properly

## Security Notes
- Never commit real Supabase keys to version control
- Use platform environment variables for production deployments
- The `.env` file is in `.gitignore` for security