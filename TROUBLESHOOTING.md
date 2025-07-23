# CI/CD Troubleshooting Guide for GaiaExchanges

This guide helps diagnose and resolve common CI/CD deployment issues for GaiaExchanges.

## Quick Diagnosis

### 1. Check Deployment Status
```bash
# Verify secrets configuration
npm run verify-secrets

# Test local build
npm run build

# Check application health (after deployment)
npm run verify-deployment https://your-app.vercel.app
```

### 2. Common Error Patterns

#### Secrets Verification Failures
**Error**: `❌ VITE_SUPABASE_URL - Supabase project URL (REQUIRED)`

**Solutions**:
1. Go to GitHub repository → Settings → Secrets and variables → Actions
2. Add missing secret with correct value
3. Verify secret naming (must match exactly)
4. Check secret value format (no extra spaces/characters)

#### Build Failures
**Error**: `Error: Command failed with exit code 1`

**Solutions**:
1. Check for TypeScript errors: `npm run lint`
2. Fix critical linting issues
3. Verify all imports are correct
4. Check for missing dependencies

#### Deployment Failures
**Error**: `Error: Invalid token`

**Solutions**:
1. Regenerate Vercel token
2. Update `VERCEL_TOKEN` secret
3. Verify token has correct permissions
4. Check organization/project IDs are correct

#### Health Check Failures
**Error**: `Health check failed with response code: 000`

**Solutions**:
1. Wait longer for deployment to propagate
2. Check Supabase service status
3. Verify Supabase credentials
4. Check CORS configuration

## Detailed Troubleshooting

### GitHub Actions Workflow Issues

#### Workflow Not Triggering
**Symptoms**: No workflow runs on push to main

**Diagnosis**:
```bash
git log --oneline -5  # Check recent commits
git branch -r         # Verify main branch exists
```

**Solutions**:
1. Ensure workflow file is in `.github/workflows/`
2. Check workflow syntax with GitHub Actions validator
3. Verify push is to `main` branch (case-sensitive)
4. Check repository permissions

#### Workflow Stuck/Hanging
**Symptoms**: Workflow runs but never completes

**Common Causes**:
- Waiting for manual approval (if branch protection enabled)
- Network timeouts during dependency installation
- Infinite loops in health checks

**Solutions**:
1. Cancel and restart workflow
2. Check GitHub Actions logs for specific step failures
3. Increase timeout values in workflow
4. Review branch protection rules

### Secrets Configuration Issues

#### Secret Not Found
**Error**: `Error: Cannot find secret VERCEL_TOKEN`

**Diagnosis Steps**:
1. Go to repository Settings → Secrets and variables → Actions
2. Verify secret name matches exactly (case-sensitive)
3. Check if secret is in organization vs repository level

#### Invalid Secret Format
**Error**: `Error: Invalid webhook URL format`

**Common Issues**:
- Slack webhook: Must start with `https://hooks.slack.com/services/`
- Discord webhook: Must start with `https://discord.com/api/webhooks/`
- Email: Must be valid email format
- Supabase URL: Must end with `.supabase.co`

### Vercel Deployment Issues

#### Authentication Failures
**Error**: `Error: Forbidden`

**Solutions**:
1. Regenerate Vercel token with full access
2. Verify organization membership
3. Check project access permissions
4. Ensure project exists and is accessible

#### Deployment Timeouts
**Error**: `Error: Deployment timeout`

**Solutions**:
1. Check Vercel status page
2. Reduce bundle size if too large
3. Optimize dependencies
4. Increase deployment timeout in workflow

#### Build Failures on Vercel
**Error**: `Command "npm run build" exited with 1`

**Solutions**:
1. Test build locally: `npm run build`
2. Check Node.js version compatibility
3. Verify all environment variables are set
4. Review Vercel build logs for specific errors

### Health Check Issues

#### Health Endpoint Not Responding
**Error**: `curl: (7) Failed to connect`

**Diagnosis**:
```bash
# Test connectivity
curl -I https://your-app.vercel.app

# Check health endpoint specifically
curl -f https://your-app.vercel.app/api/health
```

**Solutions**:
1. Verify deployment completed successfully
2. Check Vercel function logs
3. Ensure API routes are properly configured
4. Wait for DNS propagation (can take up to 10 minutes)

#### Health Check Returns Error Status
**Error**: `Health check failed with response code: 503`

**Diagnosis**:
```bash
# Get detailed health status
curl -s https://your-app.vercel.app/api/health | python3 -m json.tool
```

**Solutions**:
1. Check Supabase connection status
2. Verify environment variables are set
3. Review health check logs in Vercel
4. Check for rate limiting issues

### Notification Issues

#### Slack Notifications Not Working
**Symptoms**: No Slack messages despite workflow failures

**Solutions**:
1. Test webhook URL manually:
   ```bash
   curl -X POST -H 'Content-type: application/json' \
     --data '{"text":"Test message"}' \
     YOUR_SLACK_WEBHOOK_URL
   ```
2. Check Slack app permissions
3. Verify webhook is not expired
4. Ensure workflow has notification secrets

#### Email Notifications Failing
**Error**: `Error: Authentication failed`

**Solutions**:
1. Use app-specific password for Gmail
2. Enable 2FA and generate app password
3. Check SMTP settings
4. Verify email username/password format

### Performance Issues

#### Slow Deployments
**Symptoms**: Deployments take >10 minutes

**Solutions**:
1. Enable dependency caching in workflow
2. Optimize package.json dependencies
3. Use `npm ci` instead of `npm install`
4. Remove unused dependencies

#### Large Bundle Sizes
**Warning**: `Some chunks are larger than 500 kB`

**Solutions**:
1. Use dynamic imports for code splitting
2. Configure manual chunks in Vite config
3. Remove unused dependencies
4. Optimize images and assets

## Emergency Procedures

### Rollback Deployment
If deployment is broken and needs immediate rollback:

**Vercel Dashboard**:
1. Go to Vercel project dashboard
2. Find previous successful deployment
3. Click "Promote to Production"

**CLI Method**:
```bash
vercel --prod --force  # Deploy from local
```

### Disable Automatic Deployments
If you need to pause automated deployments:

1. Go to repository Settings → Branches
2. Add branch protection rule for `main`
3. Require manual approval for deployments

**OR**

Comment out the trigger in `.github/workflows/deploy.yml`:
```yaml
# on:
#   push:
#     branches: [ main ]
```

### Emergency Contact Procedures
1. Check GitHub Actions status page
2. Check Vercel status page
3. Check Supabase status page
4. Contact team via configured notification channels

## Monitoring and Alerting

### Set Up External Monitoring
```bash
# Add uptime monitoring
curl -X POST "https://api.pingdom.com/api/3.1/checks" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d "type=http&name=GaiaExchanges&host=your-app.vercel.app"
```

### Regular Health Checks
Add to cron or monitoring service:
```bash
# Daily health check
0 9 * * * curl -f https://your-app.vercel.app/api/health || echo "Health check failed" | mail -s "GaiaExchanges Health Alert" admin@yourdomain.com
```

## Prevention

### Pre-deployment Checklist
- [ ] Run `npm run verify-secrets`
- [ ] Test `npm run build` locally
- [ ] Run `npm run lint` and fix critical issues
- [ ] Test health endpoint locally if possible
- [ ] Verify all new environment variables are documented

### Regular Maintenance
- [ ] Update dependencies monthly
- [ ] Rotate secrets quarterly
- [ ] Review deployment logs weekly
- [ ] Test rollback procedures quarterly
- [ ] Update documentation as needed

## Getting Help

### Log Locations
- **GitHub Actions**: Repository → Actions → Workflow run
- **Vercel Deployment**: Vercel dashboard → Project → Deployments → Logs
- **Vercel Functions**: Vercel dashboard → Project → Functions → View Details
- **Application Logs**: Browser console for frontend issues

### Useful Commands
```bash
# Debug build locally
NODE_ENV=production npm run build

# Test with production environment variables
VITE_SUPABASE_URL=prod_url npm run build

# Check network connectivity
curl -I https://your-app.vercel.app
curl -I https://your-supabase-url.supabase.co

# Verify JSON response format
curl -s https://your-app.vercel.app/api/health | python3 -m json.tool
```

### Documentation References
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Deployment Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Project-specific documentation](./DEPLOYMENT_AUTOMATION.md)

---

**Remember**: When in doubt, check the GitHub Actions logs first - they usually contain the most specific error information.