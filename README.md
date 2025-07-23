# GaiaExchanges

GaiaExchanges is a cutting-edge decentralized exchange platform that brings together multiple blockchain ecosystems in one intuitive interface. Built with modern web technologies and featuring robust CI/CD automation.

## 🚀 Quick Start

### Development Setup
```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables
Create a `.env.local` file:
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run verify-secrets` - Verify deployment secrets
- `npm run verify-deployment <url>` - Verify deployment health

## 🚀 Deployment & CI/CD

GaiaExchanges features a comprehensive CI/CD pipeline with automated deployment, health checks, and notifications.

### Automated Deployment
- **Trigger**: Push to `main` branch or manual workflow dispatch
- **Platform**: Vercel (production)
- **Health Checks**: Comprehensive post-deployment verification
- **Notifications**: Slack, Discord, and email alerts

### Required Secrets
For deployment setup, see [`SECRETS_SETUP.md`](./SECRETS_SETUP.md) for detailed configuration instructions:

**Core Secrets (Required):**
- `VITE_SUPABASE_URL` - Supabase project URL  
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `VERCEL_TOKEN` - Vercel deployment token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PROJECT_ID` - Vercel project ID

**Notification Secrets (Optional):**
- `SLACK_WEBHOOK_URL` - Slack notifications
- `DISCORD_WEBHOOK_URL` - Discord alerts
- `EMAIL_USERNAME` / `EMAIL_PASSWORD` - Email notifications

### Deployment Verification
The deployment pipeline includes:
- ✅ Secrets verification
- ✅ Build and linting checks  
- ✅ Automated deployment to Vercel
- ✅ Comprehensive health checks
- ✅ Performance monitoring
- ✅ Security validation
- ✅ Multi-channel notifications

### Health Monitoring
- **Health Endpoint**: `/api/health`
- **Admin Endpoint**: `/api/admin/check`
- **Monitoring**: Database, API, environment checks
- **Performance**: Response time and memory usage tracking

## 📚 Documentation

- [`DEPLOYMENT_AUTOMATION.md`](./DEPLOYMENT_AUTOMATION.md) - Complete deployment guide
- [`SECRETS_SETUP.md`](./SECRETS_SETUP.md) - Secrets configuration guide
- [`scripts/verify-secrets.sh`](./scripts/verify-secrets.sh) - Secrets verification tool
- [`scripts/verify-deployment.sh`](./scripts/verify-deployment.sh) - Deployment verification tool

## 🛡️ Security Features

- Admin-only endpoints with middleware protection
- Two-factor authentication support
- Comprehensive security headers
- Automated vulnerability scanning
- Secret rotation procedures

## 🔍 Troubleshooting

### Common Issues
1. **Deployment Failures**: Check secrets configuration
2. **Health Check Issues**: Verify Supabase connectivity  
3. **Build Errors**: Run `npm run lint` for code issues
4. **Performance Issues**: Monitor health endpoint metrics

### Quick Diagnostics
```bash
# Verify all deployment secrets
npm run verify-secrets

# Test local build
npm run build

# Verify deployment (after deployment)
npm run verify-deployment https://your-app.vercel.app
```

## 🚀 Features

- **Multi-Chain Support**: Trade across different blockchain networks
- **Real-Time Trading**: Live charts and trading data
- **NFT Marketplace**: Integrated NFT trading platform
- **Advanced Tools**: Landscape builders, streaming platforms
- **Mobile Support**: Responsive design for all devices
- **Robust CI/CD**: Automated deployment with comprehensive monitoring

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Vite
- **UI Components**: Radix UI + Tailwind CSS  
- **Backend**: Supabase + Vercel Edge Functions
- **Deployment**: Vercel with GitHub Actions
- **Monitoring**: Health checks + performance metrics

## 💻 Technologies Used

This project is built with:
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase
- Vercel

## 🌐 Deployment Options

### Option 1: Lovable Platform
Simply open [Lovable](https://lovable.dev/projects/8dfae018-363f-4770-8e5c-27c14bec8426) and click on Share → Publish.

### Option 2: GitHub Actions (Recommended)
Automated deployment via GitHub Actions to Vercel with comprehensive monitoring.

### Option 3: Manual Deployment
Follow the instructions in [`DEPLOYMENT_AUTOMATION.md`](./DEPLOYMENT_AUTOMATION.md).

## 📞 Support

- **Issues**: Create a GitHub issue for bugs or feature requests
- **Documentation**: Check the docs folder for detailed guides
- **Deployment Help**: See DEPLOYMENT_AUTOMATION.md
- **Security**: Contact the team for security concerns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and verify deployment
5. Submit a pull request

---

**Build Status**: ✅ All build errors resolved and automated deployment configured

Built with ❤️ by the GaiaExchanges team
