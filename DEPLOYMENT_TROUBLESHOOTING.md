# Deployment Troubleshooting Guide

## Common Deployment Issues and Solutions

### 1. Environment Variable Issues

**Problem**: Build fails or app doesn't work after deployment due to placeholder values.

**Solution**:
```bash
# Check your .env file for placeholder values
grep -n "placeholder\|your-project-id" .env

# Update .env with actual values
VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anonymous-key
```

**For Production Deployment**:
- **Vercel**: Set environment variables in project dashboard
- **Netlify**: Set environment variables in site settings
- **GitHub Pages**: Use GitHub Secrets in workflow

### 2. CLI Tools Not Found

**Problem**: `vercel: command not found` or `netlify: command not found`

**Solutions**:

**Option 1 - Install globally**:
```bash
npm install -g vercel
npm install -g netlify-cli
```

**Option 2 - Use npx (recommended)**:
```bash
npx vercel --prod
npx netlify-cli deploy --prod --dir=dist
```

**Option 3 - Deploy script handles this automatically**:
```bash
./scripts/deploy.sh vercel  # Will try npx if CLI not found
```

### 3. Build Failures

**Problem**: Build fails during deployment

**Diagnosis**:
```bash
# Run pre-deployment check
npm run pre-deploy

# Check specific build issues
npm run build 2>&1 | grep -i error
```

**Common Solutions**:
- **Linting errors**: Run `npm run lint:fix` or set `SKIP_LINT=true`
- **TypeScript errors**: Fix type issues or update tsconfig.json
- **Memory issues**: Increase Node.js memory: `NODE_OPTIONS=--max-old-space-size=4096 npm run build`

### 4. GitHub Actions Deployment Issues

**Problem**: GitHub Actions workflow fails

**Check these**:
1. **Secrets are set**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VERCEL_TOKEN` (for Vercel)
   - `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` (for Netlify)

2. **Branch configuration**: Workflow only runs on `main` branch

3. **Permissions**: Check if repository has correct permissions for Actions

### 5. Static File Hosting Issues

**Problem**: App loads but shows blank page or 404 on refresh

**Solutions**:
1. **Configure SPA routing**:
   - **Netlify**: Already configured in `netlify.toml`
   - **Vercel**: Already configured in `vercel.json`
   - **Apache**: Add `.htaccess` file
   - **Nginx**: Configure try_files directive

2. **GitHub Pages specific**:
   ```bash
   # Use hash router for GitHub Pages
   # Or configure custom domain with proper routing
   ```

### 6. Performance Issues

**Problem**: App loads slowly after deployment

**Solutions**:
1. **Check build size**:
   ```bash
   npm run build
   du -sh dist/
   ```

2. **Optimize bundle**:
   - Enable gzip compression
   - Use CDN for static assets
   - Implement code splitting (already configured)

### 7. CORS Issues

**Problem**: API calls fail after deployment

**Solutions**:
1. **Update Supabase settings**: Add your domain to allowed origins
2. **Check environment variables**: Ensure correct API URLs in production

## Deployment Verification

After successful deployment, verify:

### 1. Basic Functionality
```bash
# Test build locally first
npm run preview

# Check these URLs work:
# / (home page)
# /wallet (wallet page)
# /markets (markets page)
```

### 2. Environment Variables
- Check browser console for any environment variable errors
- Verify Supabase connection works
- Test API endpoints

### 3. Performance
- Run Lighthouse audit
- Check Core Web Vitals
- Test on mobile devices

## Platform-Specific Instructions

### Vercel Deployment
```bash
# Method 1: Using Vercel CLI
npx vercel --prod

# Method 2: Using our script
npm run deploy:vercel

# Method 3: GitHub integration (recommended)
# Connect repository to Vercel dashboard
```

### Netlify Deployment
```bash
# Method 1: Using Netlify CLI
npx netlify-cli deploy --prod --dir=dist

# Method 2: Using our script
npm run deploy:netlify

# Method 3: Drag and drop (simple)
# Build locally, drag dist/ folder to Netlify dashboard
```

### GitHub Pages
```bash
# Method 1: GitHub Actions (recommended)
# Push to main branch - automatic deployment

# Method 2: Manual
npm run deploy:github-pages
# Then push dist/ contents to gh-pages branch
```

### Static Hosting (Any Provider)
```bash
# Build and create deployment package
npm run deploy:static

# Upload dist/ folder contents to your web host
```

## Getting Help

### Debug Steps
1. **Check logs**: Look at build logs for specific errors
2. **Test locally**: Always test with `npm run preview` first
3. **Check environment**: Verify all environment variables are set correctly
4. **Run diagnostics**: Use `npm run pre-deploy` for comprehensive checks

### Contact Information
- **Documentation**: See `DEPLOYMENT_GUIDE.md` for detailed instructions
- **Status Page**: Check `/deployment-status` for real-time system health
- **Build Logs**: Check your platform's build logs for specific errors

## Quick Commands Reference

```bash
# Full deployment with checks
npm run deploy:auto

# Platform-specific deployments
npm run deploy:vercel
npm run deploy:netlify
npm run deploy:github-pages
npm run deploy:static

# Diagnostics
npm run pre-deploy
npm run build
npm run preview

# Fix common issues
npm run lint:fix
npm install --legacy-peer-deps
SKIP_LINT=true npm run build
```

## Emergency Rollback

If deployment breaks production:

1. **Vercel**: Use dashboard to rollback to previous deployment
2. **Netlify**: Use dashboard to rollback to previous deploy
3. **GitHub Pages**: Revert commit and push
4. **Manual**: Upload previous working build

## Success Indicators

✅ **Deployment Successful When**:
- Build completes without errors
- All health checks pass (21/25 minimum)
- App loads correctly at deployed URL
- No console errors in browser
- API functionality works
- Routing works (no 404 on refresh)

Remember: Always test locally with `npm run preview` before deploying to production!