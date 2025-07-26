#!/bin/bash

# GaiaExchanges Deployment Script
# This script handles deployment to various platforms

set -e

echo "🚀 Starting GaiaExchanges Deployment Process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env file exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Using .env.example as template."
    if [ -f .env.example ]; then
        cp .env.example .env
        print_status "Created .env from .env.example. Please update with your actual values."
    else
        print_error ".env.example not found. Please create environment configuration."
        exit 1
    fi
fi

# Install dependencies
print_status "Installing dependencies..."
if npm install --legacy-peer-deps; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Run linting (continue on error)
print_status "Running linting..."
npm run lint || print_warning "Linting completed with warnings (continuing)"

# Build the application
print_status "Building application for production..."
if npm run build; then
    print_success "Build completed successfully"
    
    # Show build statistics
    print_status "Build statistics:"
    ls -lah dist/
    
    # Check build size
    BUILD_SIZE=$(du -sh dist/ | cut -f1)
    print_status "Total build size: $BUILD_SIZE"
else
    print_error "Build failed"
    exit 1
fi

# Deployment platform selection
PLATFORM=${1:-"manual"}

case $PLATFORM in
    "vercel")
        print_status "Deploying to Vercel..."
        if command -v vercel &> /dev/null; then
            vercel --prod
            print_success "Deployed to Vercel successfully"
        else
            print_error "Vercel CLI not found. Install with: npm install -g vercel"
            exit 1
        fi
        ;;
    "netlify")
        print_status "Deploying to Netlify..."
        if command -v netlify &> /dev/null; then
            netlify deploy --prod --dir=dist
            print_success "Deployed to Netlify successfully"
        else
            print_error "Netlify CLI not found. Install with: npm install -g netlify-cli"
            exit 1
        fi
        ;;
    "github-pages")
        print_status "Preparing for GitHub Pages deployment..."
        # Add CNAME file if needed
        if [ ! -z "$CUSTOM_DOMAIN" ]; then
            echo "$CUSTOM_DOMAIN" > dist/CNAME
            print_status "Added CNAME file for domain: $CUSTOM_DOMAIN"
        fi
        print_status "Build ready for GitHub Pages. Deploy using GitHub Actions or manually."
        ;;
    "manual")
        print_success "Build completed successfully!"
        print_status "Manual deployment options:"
        echo "  1. Vercel: ./scripts/deploy.sh vercel"
        echo "  2. Netlify: ./scripts/deploy.sh netlify"
        echo "  3. GitHub Pages: ./scripts/deploy.sh github-pages"
        echo "  4. Custom server: Upload dist/ folder contents"
        ;;
    *)
        print_error "Unknown deployment platform: $PLATFORM"
        print_status "Available platforms: vercel, netlify, github-pages, manual"
        exit 1
        ;;
esac

# Post-deployment checks
print_status "Running post-deployment checks..."

# Check if index.html exists
if [ -f "dist/index.html" ]; then
    print_success "✓ index.html found"
else
    print_error "✗ index.html missing"
fi

# Check if assets exist
if [ -d "dist/assets" ] && [ "$(ls -A dist/assets)" ]; then
    print_success "✓ Assets directory populated"
else
    print_warning "⚠ Assets directory empty or missing"
fi

# Check file sizes
HTML_SIZE=$(stat -f%z dist/index.html 2>/dev/null || stat -c%s dist/index.html 2>/dev/null || echo "0")
if [ "$HTML_SIZE" -gt 0 ]; then
    print_success "✓ HTML file is not empty (${HTML_SIZE} bytes)"
else
    print_error "✗ HTML file is empty"
fi

print_success "🎉 Deployment process completed!"
print_status "Next steps:"
echo "  1. Verify your environment variables are correctly set"
echo "  2. Test the deployed application"
echo "  3. Monitor for any runtime errors"
echo "  4. Check the DeploymentCenter page for system health"

if [ "$PLATFORM" = "manual" ]; then
    print_status "💡 Tip: Use 'npm run preview' to test the build locally"
fi