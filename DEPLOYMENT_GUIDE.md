# Deployment Guide

- Default deployment platform: Netlify provides simple configuration with automatic HTTPS and CDN
- Triggers: Automatic deployment on push to `main` branch
- Configuration: Uses `netlify.toml` for build settings and SPA routing

## Fallback Chain

If the primary deployment fails, you can deploy to:

1. Netlify (Primary) → Deploy first
2. GitHub Pages (Fallback) → If Netlify fails or is unavailable

## Key Features

- ✅ No double deployments: Only one platform deploys via CI
- ✅ No PR deployments: Deployments only trigger on main branch pushes
- ✅ Admin notifications: Use GitHub Actions logs and Netlify dashboard
- ✅ Failure handling: Clear CI logs and Netlify deploy history
- ✅ Build optimization: Single build used across platforms

### Manual Deployment (Development/Testing)

```bash
# Run the deployment script
npm run deploy

# Or deploy to specific platforms
npm run deploy:netlify     # Deploy to Netlify (default)
npm run deploy:github-pages # Prepare for GitHub Pages
```

### Netlify Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod --dir=dist

# Or use the configured script
npm run deploy:netlify
```

**Netlify Configuration:**

- Build Command: `npm run build`
- Publish Directory: `dist`
- SPA Routing: configured in `netlify.toml` (/* → /index.html)
- Environment Variables: Set in Netlify dashboard

### GitHub Pages

```bash
# Prepare for GitHub Pages
npm run deploy:github-pages

# Then push the dist/ folder to gh-pages branch
# Or use GitHub Actions workflow
```

### Environment Variables

Copy `.env.example` to `.env` and update with your values:

```bash
cp .env.example .env
```

**Required Variables:**

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

**Optional Variables:**

- `VITE_WS_TOKEN`: WebSocket token for development
- `VITE_API_BASE_URL`: Custom API base URL
- `VITE_ENABLE_ANALYTICS`: Enable/disable analytics
- `VITE_ENABLE_DEBUG`: Enable/disable debug mode

### GitHub Actions Deployment (Recommended)

The repository includes a GitHub Actions workflow (`.github/workflows/ci-deploy.yml`) that deploys to Netlify on pushes to `main`:

How It Works:

1. Build Stage: Creates optimized production build once and uploads as an artifact
2. Deployment: Downloads the build artifact and deploys to Netlify using the CLI

Secrets required:
- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`