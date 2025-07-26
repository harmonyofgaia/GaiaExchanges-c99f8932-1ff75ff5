#!/bin/bash

# Deployment Doctor - Advanced diagnostic tool for deployment issues
# This script performs comprehensive checks and provides specific solutions

set -e

echo "🏥 GaiaExchanges Deployment Doctor - Diagnosing Issues..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

ISSUES_FOUND=0
WARNINGS_FOUND=0

print_header() {
    echo -e "\n${BLUE}═══════════════════════════════════════${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════${NC}"
}

print_issue() {
    echo -e "${RED}❌ ISSUE:${NC} $1"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
}

print_warning() {
    echo -e "${YELLOW}⚠️  WARNING:${NC} $1"
    WARNINGS_FOUND=$((WARNINGS_FOUND + 1))
}

print_success() {
    echo -e "${GREEN}✅ GOOD:${NC} $1"
}

print_solution() {
    echo -e "${PURPLE}💡 SOLUTION:${NC} $1"
}

print_header "ENVIRONMENT ANALYSIS"

# Check Node.js version
NODE_VERSION=$(node --version)
echo "Node.js version: $NODE_VERSION"
if [[ $NODE_VERSION =~ v1[8-9]\..*|v[2-9][0-9]\..* ]]; then
    print_success "Node.js version is compatible ($NODE_VERSION)"
else
    print_issue "Node.js version may be too old ($NODE_VERSION)"
    print_solution "Update to Node.js 18+ using: nvm install 18 && nvm use 18"
fi

# Check npm version
NPM_VERSION=$(npm --version)
echo "npm version: $NPM_VERSION"
if command -v npm &> /dev/null; then
    print_success "npm is available ($NPM_VERSION)"
else
    print_issue "npm is not available"
    print_solution "Install npm or update Node.js"
fi

print_header "CONFIGURATION FILES ANALYSIS"

# Check package.json
if [ -f "package.json" ]; then
    print_success "package.json exists"
    
    # Check for required scripts
    REQUIRED_SCRIPTS=("build" "dev" "deploy")
    for script in "${REQUIRED_SCRIPTS[@]}"; do
        if grep -q "\"$script\":" package.json; then
            print_success "Script '$script' is defined"
        else
            print_warning "Script '$script' is missing"
            print_solution "Add '$script' script to package.json"
        fi
    done
else
    print_issue "package.json is missing"
    print_solution "Initialize project with: npm init"
fi

# Check environment files
if [ -f ".env" ]; then
    print_success ".env file exists"
    
    # Check for placeholder values
    if grep -q "placeholder\|your-project-id\|your-supabase-anonymous-key" .env; then
        print_warning "Environment file contains placeholder values"
        print_solution "Update .env with actual values or use platform environment variables"
        
        # Show specific placeholders
        echo "Found these placeholders:"
        grep -n "placeholder\|your-project-id\|your-supabase-anonymous-key" .env || true
    else
        print_success "Environment file has actual values"
    fi
else
    print_warning ".env file is missing"
    if [ -f ".env.example" ]; then
        print_solution "Copy .env.example to .env and update values"
    else
        print_solution "Create .env file with required environment variables"
    fi
fi

# Check deployment configuration files
DEPLOYMENT_CONFIGS=("vercel.json" "netlify.toml")
for config in "${DEPLOYMENT_CONFIGS[@]}"; do
    if [ -f "$config" ]; then
        print_success "$config exists"
    else
        print_warning "$config is missing"
        print_solution "Create $config for optimal deployment configuration"
    fi
done

print_header "DEPENDENCY ANALYSIS"

# Check if node_modules exists
if [ -d "node_modules" ]; then
    print_success "node_modules directory exists"
    
    # Check package-lock.json
    if [ -f "package-lock.json" ]; then
        print_success "package-lock.json exists (dependency versions locked)"
    else
        print_warning "package-lock.json is missing"
        print_solution "Run 'npm install' to generate package-lock.json"
    fi
else
    print_issue "node_modules directory is missing"
    print_solution "Run: npm install --legacy-peer-deps"
fi

# Check for known problematic dependencies
if [ -f "package.json" ]; then
    if grep -q "peer dep" package.json; then
        print_warning "Potential peer dependency conflicts detected"
        print_solution "Use: npm install --legacy-peer-deps"
    fi
fi

print_header "BUILD SYSTEM ANALYSIS"

# Test build system
echo "Testing build process..."
if npm run build > /tmp/build-test.log 2>&1; then
    print_success "Build process works"
    BUILD_SIZE=$(du -sh dist/ | cut -f1)
    echo "Build size: $BUILD_SIZE"
    
    # Check build output
    if [ -f "dist/index.html" ]; then
        print_success "Build produces index.html"
    else
        print_issue "Build doesn't produce index.html"
        print_solution "Check Vite configuration and build process"
    fi
    
    if [ -d "dist/assets" ]; then
        print_success "Build produces assets directory"
    else
        print_warning "No assets directory in build output"
    fi
else
    print_issue "Build process fails"
    print_solution "Check build errors in /tmp/build-test.log"
    echo "Recent build errors:"
    tail -10 /tmp/build-test.log || true
fi

print_header "DEPLOYMENT PLATFORM READINESS"

# Check CLI tools
DEPLOYMENT_TOOLS=("vercel" "netlify")
for tool in "${DEPLOYMENT_TOOLS[@]}"; do
    if command -v $tool &> /dev/null; then
        print_success "$tool CLI is available"
        
        # Check if logged in
        if $tool --version > /dev/null 2>&1; then
            print_success "$tool CLI is working"
        else
            print_warning "$tool CLI may not be logged in"
            print_solution "Run: $tool login"
        fi
    else
        print_warning "$tool CLI is not installed"
        print_solution "Install with: npm install -g $tool-cli"
        print_solution "Or use npx: npx $tool"
    fi
done

# Check git status
if command -v git &> /dev/null; then
    if git status > /dev/null 2>&1; then
        print_success "Git repository is initialized"
        
        # Check for uncommitted changes
        if [ -z "$(git status --porcelain)" ]; then
            print_success "No uncommitted changes"
        else
            print_warning "There are uncommitted changes"
            print_solution "Commit changes before deployment: git add . && git commit -m 'Update'"
        fi
    else
        print_warning "Not a git repository"
        print_solution "Initialize git: git init"
    fi
else
    print_warning "Git is not available"
    print_solution "Install Git for version control"
fi

print_header "SECURITY ANALYSIS"

# Check for security vulnerabilities
echo "Checking for security vulnerabilities..."
if npm audit --audit-level=high > /tmp/security-audit.log 2>&1; then
    print_success "No high-severity security vulnerabilities"
else
    print_warning "Security vulnerabilities found"
    print_solution "Run: npm audit fix"
    echo "Vulnerability summary:"
    npm audit --audit-level=moderate | head -20 || true
fi

# Check for sensitive files
SENSITIVE_FILES=(".env" "*.key" "*.pem" "config.json")
for pattern in "${SENSITIVE_FILES[@]}"; do
    if ls $pattern > /dev/null 2>&1; then
        if grep -q "$pattern" .gitignore 2>/dev/null; then
            print_success "Sensitive file '$pattern' is in .gitignore"
        else
            print_warning "Sensitive file '$pattern' may not be ignored by git"
            print_solution "Add '$pattern' to .gitignore"
        fi
    fi
done

print_header "PERFORMANCE ANALYSIS"

# Check build performance
if [ -d "dist" ]; then
    BUILD_SIZE_BYTES=$(du -sb dist/ | cut -f1)
    BUILD_SIZE_MB=$((BUILD_SIZE_BYTES / 1024 / 1024))
    
    if [ $BUILD_SIZE_MB -lt 50 ]; then
        print_success "Build size is reasonable ($BUILD_SIZE_MB MB)"
    elif [ $BUILD_SIZE_MB -lt 100 ]; then
        print_warning "Build size is large ($BUILD_SIZE_MB MB)"
        print_solution "Consider code splitting and bundle optimization"
    else
        print_issue "Build size is very large ($BUILD_SIZE_MB MB)"
        print_solution "Optimize bundle size, remove unused dependencies"
    fi
    
    # Check for large assets
    find dist/ -size +1M -type f 2>/dev/null | while read file; do
        SIZE=$(du -sh "$file" | cut -f1)
        print_warning "Large asset found: $file ($SIZE)"
        print_solution "Optimize or compress large assets"
    done
fi

print_header "DEPLOYMENT RECOMMENDATIONS"

# Provide platform-specific recommendations
echo "🎯 Platform-specific recommendations:"

echo ""
echo "📋 For Vercel:"
echo "   1. Ensure vercel.json is configured"
echo "   2. Set environment variables in Vercel dashboard"
echo "   3. Use: npm run deploy:vercel"

echo ""
echo "📋 For Netlify:"
echo "   1. Ensure netlify.toml is configured"
echo "   2. Set environment variables in Netlify dashboard"
echo "   3. Use: npm run deploy:netlify"

echo ""
echo "📋 For GitHub Pages:"
echo "   1. Enable GitHub Actions in repository settings"
echo "   2. Set secrets in repository settings"
echo "   3. Push to main branch for automatic deployment"

print_header "DIAGNOSTIC SUMMARY"

echo -e "\n📊 Diagnostic Results:"
echo -e "${RED}Issues found: $ISSUES_FOUND${NC}"
echo -e "${YELLOW}Warnings found: $WARNINGS_FOUND${NC}"

if [ $ISSUES_FOUND -eq 0 ] && [ $WARNINGS_FOUND -eq 0 ]; then
    echo -e "\n${GREEN}🎉 All checks passed! Your deployment setup looks great!${NC}"
    echo -e "${GREEN}You're ready to deploy to production.${NC}"
    exit 0
elif [ $ISSUES_FOUND -eq 0 ]; then
    echo -e "\n${YELLOW}⚠️  Minor warnings found, but deployment should work.${NC}"
    echo -e "${YELLOW}Address warnings for optimal deployment experience.${NC}"
    exit 0
else
    echo -e "\n${RED}❌ Critical issues found that may prevent successful deployment.${NC}"
    echo -e "${RED}Please address the issues above before deploying.${NC}"
    exit 1
fi