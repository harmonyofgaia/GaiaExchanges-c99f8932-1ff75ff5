# Required Secrets Configuration for GaiaExchanges CI/CD

This document provides a comprehensive checklist of all required secrets for the GaiaExchanges deployment pipeline.

## Core Application Secrets

### Supabase Configuration
- `VITE_SUPABASE_URL` - Your Supabase project URL
  - **Example**: `https://your-project.supabase.co`
  - **How to get**: Supabase Dashboard → Settings → API → Project URL
  - **Required**: ✅ Yes (Critical for database connectivity)

- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous/public key
  - **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
  - **How to get**: Supabase Dashboard → Settings → API → anon/public key
  - **Required**: ✅ Yes (Critical for database operations)

## Deployment Secrets

### Vercel Configuration
- `VERCEL_TOKEN` - Vercel authentication token
  - **How to get**: Vercel Dashboard → Settings → Tokens → Create Token
  - **Required**: ✅ Yes (Critical for deployment)
  - **Scope**: Account-level access

- `VERCEL_ORG_ID` - Vercel organization/team ID
  - **How to get**: Vercel CLI: `vercel whoami` or Dashboard URL
  - **Required**: ✅ Yes (Critical for deployment)

- `VERCEL_PROJECT_ID` - Vercel project ID
  - **How to get**: Vercel Dashboard → Project Settings → General
  - **Required**: ✅ Yes (Critical for deployment)

## Notification Secrets

### Slack Integration
- `SLACK_WEBHOOK_URL` - Slack incoming webhook URL
  - **Example**: `https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX`
  - **How to get**: Slack → Apps → Incoming Webhooks → Add to Slack
  - **Required**: 🔧 Optional (for deployment notifications)

### Discord Integration
- `DISCORD_WEBHOOK_URL` - Discord webhook URL
  - **Example**: `https://discord.com/api/webhooks/000000000000000000/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
  - **How to get**: Discord → Server Settings → Integrations → Webhooks
  - **Required**: 🔧 Optional (for deployment notifications)

### Email Notifications
- `EMAIL_USERNAME` - SMTP email username
  - **Example**: `deployments@yourdomain.com`
  - **Recommended**: Gmail with app-specific password
  - **Required**: 🔧 Optional (for critical failure notifications)

- `EMAIL_PASSWORD` - SMTP email password
  - **Example**: App-specific password for Gmail
  - **How to get**: Gmail → Security → 2FA → App passwords
  - **Required**: 🔧 Optional (must match EMAIL_USERNAME)

- `NOTIFICATION_EMAIL` - Email address to receive notifications
  - **Example**: `admin@yourdomain.com`
  - **Required**: 🔧 Optional (where to send failure alerts)

## Admin Control Secrets

### Admin Access Configuration
- `ADMIN_EMAILS` - Comma-separated list of admin email addresses
  - **Example**: `admin@yourdomain.com,superadmin@yourdomain.com`
  - **Required**: 🔧 Optional (for admin access control)

- `ADMIN_USER_IDS` - Comma-separated list of admin user IDs
  - **Example**: `user-id-1,user-id-2,user-id-3`
  - **Required**: 🔧 Optional (for admin access control)

- `ADMIN_ROLES` - Comma-separated list of admin role names
  - **Example**: `admin,super_admin,maintainer`
  - **Default**: `admin,super_admin`
  - **Required**: 🔧 Optional (for admin access control)

- `REQUIRE_TWO_FACTOR` - Enable 2FA requirement for admin access
  - **Example**: `true` or `false`
  - **Default**: `false`
  - **Required**: 🔧 Optional (for enhanced security)

## Secrets Setup Instructions

### 1. GitHub Repository Secrets
1. Go to your GitHub repository
2. Navigate to: **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret from the list above

### 2. Verification Script
Run the verification script to check if all required secrets are configured:

```bash
# Run the secrets verification
npm run verify-secrets
```

### 3. Environment Variables for Local Development
Create a `.env.local` file for local development (never commit this file):

```bash
# Core Application (Required)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Admin Configuration (Optional)
ADMIN_EMAILS=admin@yourdomain.com
ADMIN_USER_IDS=user-id-1,user-id-2
ADMIN_ROLES=admin,super_admin
REQUIRE_TWO_FACTOR=false
```

## Security Best Practices

### Secret Rotation Schedule
- **Supabase Keys**: Rotate quarterly
- **Vercel Token**: Rotate every 6 months
- **Webhook URLs**: Regenerate if compromised
- **Admin Configuration**: Review monthly

### Access Control
- Limit repository access to necessary team members
- Use organization secrets for shared credentials
- Enable branch protection on main branch
- Require admin approval for secret changes

### Monitoring
- Monitor webhook delivery success rates
- Track failed authentication attempts
- Audit admin access logs regularly
- Set up alerts for unusual activity

## Troubleshooting

### Common Issues

#### Missing Required Secrets
**Error**: `Error: Cannot find secret VITE_SUPABASE_URL`
**Solution**: Add the missing secret in GitHub repository settings

#### Invalid Secret Format
**Error**: `Error: Invalid webhook URL format`
**Solution**: Verify the webhook URL is properly formatted and active

#### Deployment Authentication Failure
**Error**: `Error: Invalid token`
**Solution**: 
1. Regenerate the Vercel token
2. Update VERCEL_TOKEN secret
3. Ensure token has correct permissions

#### Health Check Failures
**Error**: `Health check failed with response code: 000`
**Solutions**:
1. Verify Supabase credentials are correct
2. Check Supabase service status
3. Ensure CORS settings allow health check requests

### Verification Commands

```bash
# Check if secrets are available in workflow
echo "Checking required secrets..."
[ -z "$VITE_SUPABASE_URL" ] && echo "❌ VITE_SUPABASE_URL missing" || echo "✅ VITE_SUPABASE_URL configured"
[ -z "$VITE_SUPABASE_ANON_KEY" ] && echo "❌ VITE_SUPABASE_ANON_KEY missing" || echo "✅ VITE_SUPABASE_ANON_KEY configured"
[ -z "$VERCEL_TOKEN" ] && echo "❌ VERCEL_TOKEN missing" || echo "✅ VERCEL_TOKEN configured"
[ -z "$VERCEL_ORG_ID" ] && echo "❌ VERCEL_ORG_ID missing" || echo "✅ VERCEL_ORG_ID configured"
[ -z "$VERCEL_PROJECT_ID" ] && echo "❌ VERCEL_PROJECT_ID missing" || echo "✅ VERCEL_PROJECT_ID configured"
```

## Support

If you encounter issues with secret configuration:
1. Check this documentation first
2. Verify the secret exists in GitHub repository settings
3. Ensure the secret value is correct and properly formatted
4. Check the GitHub Actions logs for specific error messages
5. Contact the development team if issues persist

---

**Last Updated**: $(date)
**Version**: 1.0