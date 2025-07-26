# GaiaExchanges Deployment Guide

## 🚀 Quick Deployment

The GaiaExchanges application is ready for immediate deployment. Choose your preferred platform:

### Automated Deployment Script

```bash
# Run the deployment script
npm run deploy

# Or deploy to specific platforms
npm run deploy:vercel     # Deploy to Vercel
npm run deploy:netlify    # Deploy to Netlify
npm run deploy:github-pages # Prepare for GitHub Pages
```

### Manual Platform Setup

#### 1. Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod

# Or use the configured script
npm run deploy:vercel
```

**Vercel Configuration:**
- Build Command: `npm run build:vercel`
- Output Directory: `dist`
- Environment Variables: Set in Vercel dashboard

#### 2. Netlify Deployment

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
- Environment Variables: Set in Netlify dashboard

#### 3. GitHub Pages

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

### GitHub Actions Deployment

The repository includes a comprehensive GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

1. **Builds and tests** the application
2. **Deploys to Vercel** (if configured)
3. **Deploys to Netlify** (if configured)
4. **Runs health checks** post-deployment

**Required Secrets:**
```
# For Vercel deployment
VERCEL_TOKEN=your-vercel-token
VERCEL_PROJECT_ID=your-project-id
VERCEL_ORG_ID=your-org-id

# For Netlify deployment
NETLIFY_AUTH_TOKEN=your-netlify-token
NETLIFY_SITE_ID=your-site-id

# Environment variables
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-key
```

### Build Verification

Before deployment, verify your build:

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run linting
npm run lint

# Build for production
npm run build

# Preview locally
npm run preview
```

### Deployment Checklist

- [ ] Environment variables configured
- [ ] Build completes successfully (`npm run build`)
- [ ] No critical linting errors
- [ ] `.env` file created from `.env.example`
- [ ] Platform-specific tokens/keys configured
- [ ] Domain/SSL configuration (if applicable)

### Platform-Specific Notes

#### Vercel
- Automatically detects the framework
- Zero-configuration deployment
- Automatic HTTPS and CDN
- Environment variables via dashboard

#### Netlify
- Supports form handling and edge functions
- Automatic HTTPS and CDN
- Build plugins available
- Environment variables via dashboard

#### GitHub Pages
- Free for public repositories
- Custom domains supported
- HTTPS included
- Static site only (no server-side functionality)

### Post-Deployment

1. **Verify Core Features:**
   - Application loads correctly
   - Navigation works
   - GAiA token integration functional
   - DeploymentCenter accessible

2. **Check System Health:**
   - Visit `/deployment-center` for system status
   - Verify Einstein Copilot functionality
   - Run consistency checks

3. **Monitor Performance:**
   - Check build performance
   - Monitor loading times
   - Verify mobile responsiveness

### Troubleshooting

**Build Failures:**
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install --legacy-peer-deps
npm run build
```

**Environment Issues:**
- Verify `.env` file exists and has correct values
- Check environment variable names (must start with `VITE_`)
- Ensure no trailing spaces in environment values

**Deployment Errors:**
- Check platform-specific logs
- Verify build command and output directory
- Ensure all secrets/tokens are configured

### Support

For deployment assistance:
1. Check the DeploymentCenter page for system status
2. Review build logs for specific errors
3. Verify environment configuration
4. Consult platform-specific documentation

---

**Status: ✅ DEPLOYMENT READY**

The application is fully configured and ready for immediate deployment to any supported platform.