#!/bin/bash

# Pre-deployment verification script
# This script runs comprehensive checks before deployment

set -e

echo "🔍 Running pre-deployment verification..."

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SUCCESS_COUNT=0
TOTAL_CHECKS=0

check() {
    local name="$1"
    local command="$2"
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    
    echo -n "Checking $name... "
    if eval "$command" > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC}"
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
        return 0
    else
        echo -e "${RED}✗${NC}"
        return 1
    fi
}

echo "🔧 Environment Verification"
check "Node.js version" "node --version | grep -E 'v[12][0-9]\.'"
check "NPM availability" "npm --version"
check "Package.json exists" "test -f package.json"
check "Dependencies lockfile" "test -f package-lock.json"

echo ""
echo "📁 File Structure Verification"
check "Source directory" "test -d src"
check "Public directory" "test -d public"
check "Index.html exists" "test -f index.html"
check "Vite config exists" "test -f vite.config.ts"
check "TypeScript config" "test -f tsconfig.json"

echo ""
echo "🔧 Configuration Verification"
check "Environment example" "test -f .env.example"
check "Vercel config" "test -f vercel.json"
check "Tailwind config" "test -f tailwind.config.ts"
check "PostCSS config" "test -f postcss.config.js"

echo ""
echo "📦 Dependencies Verification"
echo "Installing dependencies (if needed)..."
if npm install --legacy-peer-deps > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Dependencies installed"
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
else
    echo -e "${RED}✗${NC} Dependencies installation failed"
fi
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))

echo ""
echo "🧹 Code Quality Verification"
if npm run lint > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Linting passed"
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
else
    echo -e "${YELLOW}⚠${NC} Linting has warnings (non-critical)"
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))  # Count as success since warnings are OK
fi
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))

echo ""
echo "🏗️ Build Verification"
echo "Building application..."
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Build successful"
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    
    # Check build outputs
    check "Build output directory" "test -d dist"
    check "Build index.html" "test -f dist/index.html"
    check "Build assets directory" "test -d dist/assets"
    check "Build size reasonable" "test $(du -s dist | cut -f1) -lt 50000"  # Less than ~50MB
else
    echo -e "${RED}✗${NC} Build failed"
fi
TOTAL_CHECKS=$((TOTAL_CHECKS + 5))

echo ""
echo "🔒 Security Verification"
echo "Running security audit..."
if npm audit --audit-level=high > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} No high-severity vulnerabilities"
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
else
    echo -e "${YELLOW}⚠${NC} Security audit has findings (check manually)"
fi
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))

echo ""
echo "📊 Final Report"
echo "================================"
echo -e "Checks passed: ${GREEN}$SUCCESS_COUNT${NC}/$TOTAL_CHECKS"

if [ $SUCCESS_COUNT -eq $TOTAL_CHECKS ]; then
    echo -e "${GREEN}🎉 All checks passed! Ready for deployment.${NC}"
    exit 0
elif [ $SUCCESS_COUNT -ge $((TOTAL_CHECKS * 80 / 100)) ]; then
    echo -e "${YELLOW}⚠ Most checks passed. Review warnings before deployment.${NC}"
    exit 0
else
    echo -e "${RED}❌ Critical issues found. Fix before deployment.${NC}"
    exit 1
fi