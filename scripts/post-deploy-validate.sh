#!/bin/bash

# Post-Deployment Validator
# This script validates a successful deployment by checking the deployed site

set -e

echo "🔍 Post-Deployment Validation..."

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

DEPLOYMENT_URL=${1:-""}
SUCCESS_COUNT=0
TOTAL_TESTS=0

validate_test() {
    local description="$1"
    local command="$2"
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    echo -n "Testing $description... "
    if eval "$command" > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC}"
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
        return 0
    else
        echo -e "${RED}✗${NC}"
        return 1
    fi
}

if [ -z "$DEPLOYMENT_URL" ]; then
    echo -e "${YELLOW}No deployment URL provided. Checking local build...${NC}"
    
    # Validate local build
    validate_test "Build directory exists" "test -d dist"
    validate_test "Index.html exists" "test -f dist/index.html"
    validate_test "Assets directory exists" "test -d dist/assets"
    validate_test "Index.html is not empty" "test -s dist/index.html"
    
    # Check for essential files
    validate_test "CSS files exist" "find dist/assets -name '*.css' | head -1"
    validate_test "JS files exist" "find dist/assets -name '*.js' | head -1"
    
    echo -e "\n${BLUE}Local build validation complete.${NC}"
    echo -e "To validate deployed site, run: $0 <deployment-url>"
    
else
    echo -e "${BLUE}Validating deployment at: $DEPLOYMENT_URL${NC}"
    
    # Check if URL is accessible
    validate_test "Site is accessible" "curl -s --head '$DEPLOYMENT_URL' | head -1 | grep -q '200 OK'"
    validate_test "Returns HTML content" "curl -s '$DEPLOYMENT_URL' | grep -q '<html'"
    validate_test "Contains app title" "curl -s '$DEPLOYMENT_URL' | grep -q 'GaiaExchanges'"
    validate_test "CSS is loading" "curl -s '$DEPLOYMENT_URL' | grep -q 'stylesheet'"
    validate_test "JavaScript is loading" "curl -s '$DEPLOYMENT_URL' | grep -q 'script'"
    
    # Check specific routes
    validate_test "Home route works" "curl -s '$DEPLOYMENT_URL/' | grep -q '<html'"
    validate_test "Assets are accessible" "curl -s --head '$DEPLOYMENT_URL/assets/' | head -1 | grep -q '200\\|301\\|302'"
    
    echo -e "\n${BLUE}Remote deployment validation complete.${NC}"
fi

echo -e "\n📊 Validation Results:"
echo -e "Tests passed: ${GREEN}$SUCCESS_COUNT${NC}/$TOTAL_TESTS"

if [ $SUCCESS_COUNT -eq $TOTAL_TESTS ]; then
    echo -e "${GREEN}🎉 All validation tests passed!${NC}"
    echo -e "${GREEN}Your deployment is working correctly.${NC}"
    exit 0
elif [ $SUCCESS_COUNT -ge $((TOTAL_TESTS * 80 / 100)) ]; then
    echo -e "${YELLOW}⚠ Most tests passed, but some issues detected.${NC}"
    echo -e "${YELLOW}Your deployment should work, but check for any errors.${NC}"
    exit 0
else
    echo -e "${RED}❌ Multiple validation tests failed.${NC}"
    echo -e "${RED}Please check your deployment and fix the issues.${NC}"
    exit 1
fi