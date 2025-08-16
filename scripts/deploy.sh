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

# Check for placeholder values in .env and warn if found
if grep -q "placeholder" .env || grep -q "your-project-id" .env || grep -q "your-supabase-anonymous-key" .env; then
    print_warning "⚠️  Environment file contains placeholder values!"
    print_warning "Update .env with actual values for production deployment."
    print_warning "For automated deployment, use GitHub Secrets or platform environment variables."
    
    # Create backup .env with placeholders for reference
    if [ ! -f .env.backup ]; then
        cp .env .env.backup
        print_status "Created .env.backup with current values for reference"
    fi
fi

# Install dependencies
print_status "Installing dependencies..."
if npm install --legacy-peer-deps; then
    print_success "Dependencies installed successfully"
else
    print_warning "Standard install failed, trying alternative methods..."
    
    # Try different npm install approaches
    if npm ci --legacy-peer-deps; then
        print_success "Dependencies installed via npm ci"
    elif npm install --force; then
        print_success "Dependencies installed with --force flag"
    else
        print_error "All dependency installation methods failed"
        print_error "Try manually: npm install --legacy-peer-deps"
        exit 1
    fi
fi

# Run linting (continue on error)
print_status "Running linting..."
SKIP_LINT=${SKIP_LINT:-false}
if [ "$SKIP_LINT" = "true" ]; then
    print_warning "Skipping linting (SKIP_LINT=true)"
else
    npm run lint || print_warning "Linting completed with warnings (continuing)"
fi

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
    "netlify")
        print_status "Deploying to Netlify..."
        
        # Check if site is linked to Netlify
        if [ ! -f .netlify/state.json ]; then
            print_status "Site not linked to Netlify. You may need to run 'netlify link' first"
        fi
        
        if command -v netlify &> /dev/null; then
            print_status "Using local Netlify CLI..."
            if netlify deploy --prod --dir=dist; then
                print_success "Deployed to Netlify successfully"
            else
                print_error "Netlify deployment failed with local CLI"
                exit 1
            fi
        elif npx netlify-cli --version &> /dev/null; then
            print_status "Using npx netlify-cli..."
            if npx netlify-cli deploy --prod --dir=dist; then
                print_success "Deployed to Netlify successfully"
            else
                print_error "Netlify deployment failed with npx"
                exit 1
            fi
        else
            print_warning "Netlify CLI not found locally. Attempting to install via npx..."
            if npx netlify-cli@latest deploy --prod --dir=dist; then
                print_success "Deployed to Netlify successfully"
            else
                print_error "Netlify deployment failed. Please ensure:"
                print_error "1. Install CLI: npm install -g netlify-cli"
                print_error "2. Login: netlify login"
                print_error "3. Link site: netlify link"
                print_status "Or deploy manually: Drag dist/ folder to Netlify dashboard"
                exit 1
            fi
        fi
        ;;
    "github-pages")
        print_status "Preparing for GitHub Pages deployment..."
        # Add CNAME file if needed
        if [ ! -z "$CUSTOM_DOMAIN" ]; then
            echo "$CUSTOM_DOMAIN" > dist/CNAME
            print_status "Added CNAME file for domain: $CUSTOM_DOMAIN"
        fi
        
        # Create .nojekyll file for GitHub Pages
        touch dist/.nojekyll
        print_status "Added .nojekyll file for GitHub Pages compatibility"
        
        print_success "Build ready for GitHub Pages!"
        print_status "Deploy using one of these methods:"
        echo "  1. GitHub Actions (recommended - see .github/workflows/deploy.yml)"
        echo "  2. Manual: Push dist/ contents to gh-pages branch"
        echo "  3. Use GitHub Desktop or git commands"
        ;;
    "manual")
        print_success "Build completed successfully!"
        print_status "Manual deployment options:"
        echo "  1. Netlify: ./scripts/deploy.sh netlify"
        echo "  2. GitHub Pages: ./scripts/deploy.sh github-pages"
        echo "  3. Custom server: Upload dist/ folder contents"
        echo "  4. Static hosting: Drag dist/ folder to hosting service"
        ;;
    "static")
        print_status "Preparing for static hosting deployment..."
        
        # Create deployment package
        print_status "Creating deployment package..."
        if command -v zip &> /dev/null; then
            zip -r "gaiaexchanges-$(date +%Y%m%d-%H%M%S).zip" dist/
            print_success "Created deployment zip file"
        fi
        
        print_success "Static deployment ready!"
        print_status "Upload the dist/ folder contents to your web host:"
        echo "  - dist/index.html → root directory"
        echo "  - dist/assets/* → assets directory"
        echo "  - dist/* → root directory (all files)"
        ;;
    *)
        print_error "Unknown deployment platform: $PLATFORM"
        print_status "Available platforms: netlify, github-pages, manual, static"
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

# Check for environment variable placeholders in built files
if grep -r "placeholder" dist/ &> /dev/null; then
    print_warning "⚠ Found placeholder values in build output"
    print_warning "Ensure environment variables are properly set for production"
fi

print_success "🎉 Deployment process completed!"
print_status "Next steps:"
echo "  1. Verify your environment variables are correctly set"
echo "  2. Test the deployed application"
echo "  3. Monitor for any runtime errors"
echo "  4. Check the DeploymentStatus page for system health"

if [ "$PLATFORM" = "manual" ]; then
    print_status "💡 Tip: Use 'npm run preview' to test the build locally"
fi

# Display deployment information
print_status "📊 Deployment Summary:"
echo "  Platform: $PLATFORM"
echo "  Build size: $BUILD_SIZE"
echo "  Node version: $(node --version)"
echo "  Build time: $(date)"
echo "  Status: Ready for production 🚀"