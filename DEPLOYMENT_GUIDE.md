# GaiaExchanges Deployment Guide

## 🚀 Simplified Deployment Workflow

The GaiaExchanges application uses a **reliable, single-platform deployment strategy** with automatic fallbacks to ensure consistent deployments without conflicts or double deployments.

### Automated Deployment Strategy

#### Primary Platform: Vercel
- **Default deployment platform**: Vercel provides zero-configuration deployment with automatic HTTPS and CDN
- **Triggers**: Automatic deployment on push to `main` branch
- **Configuration**: Uses `vercel.json` for build settings

#### Fallback Chain
If the primary deployment fails, the system automatically attempts fallbacks in this order:

1. **Vercel** (Primary) → Deploy first, fastest and most reliable
2. **Netlify** (First Fallback) → If Vercel fails, try Netlify
3. **GitHub Pages** (Final Fallback) → If both Vercel and Netlify fail

#### Key Features
- ✅ **No double deployments**: Only one platform deploys successfully
- ✅ **No PR deployments**: Deployments only trigger on main branch pushes
- ✅ **Admin notifications**: Automatic alerts when fallbacks are used
- ✅ **Failure handling**: Comprehensive error reporting and recovery
- ✅ **Build optimization**: Single build used across all platforms

### Manual Deployment (Development/Testing)

For development and testing purposes, you can still deploy manually to specific platforms:

```bash
# Run the deployment script
npm run deploy

# Or deploy to specific platforms
npm run deploy:vercel     # Deploy to Vercel
npm run deploy:netlify    # Deploy to Netlify
npm run deploy:github-pages # Prepare for GitHub Pages
```

### Manual Platform Setup (Legacy/Development Use)

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

### GitHub Actions Deployment (Recommended)

The repository includes a **simplified and reliable GitHub Actions workflow** (`.github/workflows/deploy.yml`) that implements the fallback deployment strategy:

#### How It Works:

1. **Build Stage**: Creates optimized production build once
2. **Primary Deployment**: Attempts Vercel deployment (fastest, zero-config)
3. **Fallback Chain**: If primary fails, tries Netlify, then GitHub Pages
4. **Admin Notifications**: Sends alerts when fallbacks are used
5. **Deployment Summary**: Provides comprehensive deployment status

#### Workflow Triggers:
- ✅ **Push to main branch**: Automatic deployment
- ✅ **Manual trigger**: Via GitHub Actions UI
- ❌ **Pull Requests**: No deployments (prevents test/preview deployments)

#### Required Secrets:
```bash
# Primary Platform (Vercel)
VERCEL_TOKEN=your-vercel-token
VERCEL_PROJECT_ID=your-project-id  
VERCEL_ORG_ID=your-org-id

# Fallback Platform (Netlify)
NETLIFY_AUTH_TOKEN=your-netlify-token
NETLIFY_SITE_ID=your-site-id

# Environment Variables
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-key
```

#### Deployment Flow:
```
Push to main → Build → Vercel (Primary)
                 ↓ (if fails)
              Netlify (Fallback 1)
                 ↓ (if fails)  
           GitHub Pages (Fallback 2)
                 ↓
         Admin Notification (if fallback used)
```

#### Benefits:
- **Reliability**: Multiple deployment options ensure high availability
- **Speed**: Vercel provides fastest deployments when available
- **Monitoring**: Automatic notifications when issues occur
- **Simplicity**: Single workflow handles all deployment scenarios
- **No Conflicts**: Only one platform deploys successfully per push

### Deployment Monitoring & Notifications

#### Admin Notification System
When fallback deployments occur, administrators receive detailed notifications including:

- **Platform Status**: Which platforms succeeded/failed
- **Deployment URLs**: Links to successful deployments  
- **Error Context**: Information about why primary deployment failed
- **Action Items**: Specific steps to investigate and resolve issues

#### Deployment Summary
Every deployment generates a comprehensive summary with:
- Build status and statistics
- Platform-by-platform results
- Deployment URLs and accessibility
- Next steps and recommendations

#### Troubleshooting Fallbacks
If you receive fallback notifications:

1. **Check Vercel Status**: Verify platform health and token validity
2. **Review Logs**: Examine GitHub Actions logs for specific errors
3. **Validate Secrets**: Ensure all required secrets are properly configured
4. **Test Locally**: Confirm build process works in development
5. **Monitor Trends**: Track if fallbacks are becoming frequent

### Build Verification (Development)

For manual development builds and testing:

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

### Platform Configuration

Each platform is automatically configured but can be customized:

#### Vercel (Primary Platform)
- **Auto-detection**: Framework detected automatically
- **Zero-configuration**: Works out of the box with `vercel.json`
- **Features**: Automatic HTTPS, CDN, edge functions
- **Config File**: `vercel.json`

#### Netlify (First Fallback)
- **Build Integration**: Uses `netlify.toml` configuration
- **Features**: Form handling, edge functions, build plugins
- **Headers**: Optimized caching and security headers
- **Config File**: `netlify.toml`

#### GitHub Pages (Final Fallback)
- **Static Hosting**: Perfect for emergency deployments
- **Features**: Free hosting, custom domains, HTTPS
- **Limitations**: Static sites only, no server-side functions
- **Config**: Automatic Jekyll bypass with `.nojekyll`

### Deployment Checklist

**Prerequisites:**
- [ ] Repository secrets configured (VERCEL_TOKEN, NETLIFY_AUTH_TOKEN, etc.)
- [ ] Environment variables set (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- [ ] Platform accounts linked and configured
- [ ] Build process tested locally

**For Production Deployment:**
- [ ] Push changes to `main` branch
- [ ] Monitor GitHub Actions workflow
- [ ] Verify successful deployment notification
- [ ] Check deployment URL accessibility
- [ ] Test core application functionality

**If Fallback Occurs:**
- [ ] Review admin notification details
- [ ] Check primary platform status and configuration
- [ ] Investigate logs for root cause
- [ ] Plan resolution for future deployments

### Post-Deployment Validation

After any deployment (primary or fallback):

1. **Automatic Checks**:
   - Application loads and renders correctly
   - Core navigation functionality works
   - GAiA token integration is functional
   - DeploymentCenter page is accessible

2. **Manual Verification**:
   - Test key user workflows
   - Verify all environment variables are working
   - Check responsive design on mobile devices
   - Validate SSL certificate and security headers

3. **Performance Monitoring**:
   - Monitor page load times
   - Check Core Web Vitals scores
   - Verify CDN and caching effectiveness
   - Test from different geographical locations

### Rollback Strategy

If a deployment fails or causes issues:

1. **Immediate**: Previous successful deployment remains active during new deployment attempts
2. **Automatic**: Failed deployments don't replace successful ones
3. **Manual**: Use platform-specific rollback mechanisms if needed
4. **Emergency**: GitHub Pages provides a reliable final fallback

### Support & Troubleshooting

**Common Issues:**

- **Build Failures**: Check Node.js version compatibility and dependency conflicts
- **Environment Variables**: Verify all VITE_ prefixed variables are properly set
- **Platform Tokens**: Ensure authentication tokens haven't expired
- **Domain Issues**: Check DNS settings and SSL configuration

**Getting Help:**

1. Check the deployment summary in GitHub Actions
2. Review platform-specific logs (Vercel, Netlify dashboards)
3. Verify environment configuration matches requirements
4. Test build process locally to isolate issues

---

**Status: ✅ SIMPLIFIED DEPLOYMENT READY**

The application now uses a **reliable, single-platform deployment strategy** with automatic fallbacks and comprehensive monitoring. No more double deployments or deployment conflicts!