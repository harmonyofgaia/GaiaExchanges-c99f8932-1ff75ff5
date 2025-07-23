#!/bin/bash

# GaiaExchanges Deployment Verification Script
# This script performs comprehensive health checks after deployment

set -e

# Configuration
DEPLOYMENT_URL="$1"
TIMEOUT=30
MAX_RETRIES=5
RETRY_DELAY=10

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "🚀 GaiaExchanges Deployment Verification"
echo "========================================"
echo ""

if [ -z "$DEPLOYMENT_URL" ]; then
    echo -e "${RED}Error: Deployment URL is required${NC}"
    echo "Usage: $0 <deployment-url>"
    echo "Example: $0 https://your-app.vercel.app"
    exit 1
fi

# Remove trailing slash from URL
DEPLOYMENT_URL="${DEPLOYMENT_URL%/}"

echo -e "${BLUE}Target URL:${NC} $DEPLOYMENT_URL"
echo ""

# Test counters
TESTS_PASSED=0
TESTS_FAILED=0
TOTAL_TESTS=7

# Function to run a test with retries
run_test() {
    local test_name="$1"
    local test_command="$2"
    local max_retries="${3:-1}"
    local delay="${4:-0}"
    
    echo -e "${BLUE}Testing: $test_name${NC}"
    
    for attempt in $(seq 1 $max_retries); do
        if [ $attempt -gt 1 ]; then
            echo -e "  Retry attempt $attempt/$max_retries..."
            sleep $delay
        fi
        
        if eval "$test_command"; then
            echo -e "  ✅ ${GREEN}PASSED${NC}"
            ((TESTS_PASSED++))
            return 0
        fi
    done
    
    echo -e "  ❌ ${RED}FAILED${NC} (after $max_retries attempts)"
    ((TESTS_FAILED++))
    return 1
}

# Test 1: Basic connectivity
run_test "Basic Connectivity" \
    "curl -sf --max-time $TIMEOUT '$DEPLOYMENT_URL' > /dev/null" \
    3 5

# Test 2: Application loads successfully
run_test "Application Loading" \
    "curl -sf --max-time $TIMEOUT '$DEPLOYMENT_URL' | grep -q '<title>'" \
    3 5

# Test 3: Health check endpoint
run_test "Health Check Endpoint" \
    "curl -sf --max-time $TIMEOUT '$DEPLOYMENT_URL/api/health' > /dev/null" \
    3 5

# Test 4: Health check returns valid JSON
run_test "Health Check JSON Response" \
    "response=\$(curl -sf --max-time $TIMEOUT '$DEPLOYMENT_URL/api/health') && echo \"\$response\" | python3 -m json.tool > /dev/null" \
    3 5

# Test 5: Admin check endpoint (should require auth)
run_test "Admin Endpoint Security" \
    "response=\$(curl -s --max-time $TIMEOUT '$DEPLOYMENT_URL/api/admin/check') && (echo \"\$response\" | grep -q 'unauthorized\\|forbidden' || echo \"\$response\" | grep -q '401\\|403')" \
    2 3

# Test 6: Static assets loading
run_test "Static Assets Loading" \
    "curl -sf --max-time $TIMEOUT '$DEPLOYMENT_URL/assets/' > /dev/null || curl -sf --max-time $TIMEOUT '$DEPLOYMENT_URL/vite.svg' > /dev/null" \
    2 3

# Test 7: Performance check (response time)
run_test "Performance Check (<3s response)" \
    "response_time=\$(curl -sf --max-time $TIMEOUT -w '%{time_total}' -o /dev/null '$DEPLOYMENT_URL') && [ \"\$(echo \"\$response_time < 3\" | bc -l)\" = \"1\" ]" \
    2 3

echo ""
echo "========================================"
echo -e "${BLUE}Verification Summary:${NC}"
echo ""

SUCCESS_RATE=$(( (TESTS_PASSED * 100) / TOTAL_TESTS ))

echo -e "📊 Tests Passed: ${GREEN}$TESTS_PASSED${NC}/$TOTAL_TESTS"
echo -e "📊 Tests Failed: ${RED}$TESTS_FAILED${NC}/$TOTAL_TESTS"
echo -e "📊 Success Rate: ${GREEN}$SUCCESS_RATE%${NC}"
echo ""

# Detailed health check analysis
echo -e "${BLUE}Detailed Health Analysis:${NC}"
echo "-------------------------"

health_response=$(curl -sf --max-time $TIMEOUT "$DEPLOYMENT_URL/api/health" 2>/dev/null || echo "{}")

if [ "$health_response" != "{}" ]; then
    echo -e "🔍 Health endpoint response:"
    echo "$health_response" | python3 -m json.tool 2>/dev/null || echo "  Invalid JSON response"
    
    # Extract specific health metrics
    status=$(echo "$health_response" | python3 -c "import sys,json; data=json.load(sys.stdin); print(data.get('status', 'unknown'))" 2>/dev/null || echo "unknown")
    environment=$(echo "$health_response" | python3 -c "import sys,json; data=json.load(sys.stdin); print(data.get('environment', 'unknown'))" 2>/dev/null || echo "unknown")
    
    echo ""
    echo -e "📋 Application Status: ${GREEN}$status${NC}"
    echo -e "📋 Environment: ${GREEN}$environment${NC}"
else
    echo -e "⚠️  ${YELLOW}Health endpoint not accessible${NC}"
fi

echo ""

# Performance metrics
echo -e "${BLUE}Performance Metrics:${NC}"
echo "-------------------"

# Measure detailed performance
perf_data=$(curl -sf --max-time $TIMEOUT -w "connect:%{time_connect},ttfb:%{time_starttransfer},total:%{time_total},size:%{size_download}" -o /dev/null "$DEPLOYMENT_URL" 2>/dev/null || echo "connect:0,ttfb:0,total:0,size:0")

connect_time=$(echo "$perf_data" | sed 's/.*connect:\([^,]*\).*/\1/')
ttfb=$(echo "$perf_data" | sed 's/.*ttfb:\([^,]*\).*/\1/')
total_time=$(echo "$perf_data" | sed 's/.*total:\([^,]*\).*/\1/')
size=$(echo "$perf_data" | sed 's/.*size:\([^,]*\).*/\1/')

echo -e "⏱️  Connection Time: ${connect_time}s"
echo -e "⏱️  Time to First Byte: ${ttfb}s"
echo -e "⏱️  Total Load Time: ${total_time}s"
echo -e "📦 Page Size: ${size} bytes"

echo ""

# Security check
echo -e "${BLUE}Security Verification:${NC}"
echo "---------------------"

# Check for security headers
security_headers=$(curl -sI --max-time $TIMEOUT "$DEPLOYMENT_URL" 2>/dev/null || echo "")

if echo "$security_headers" | grep -qi "x-frame-options"; then
    echo -e "✅ X-Frame-Options header present"
else
    echo -e "⚠️  X-Frame-Options header missing"
fi

if echo "$security_headers" | grep -qi "content-security-policy"; then
    echo -e "✅ Content-Security-Policy header present"
else
    echo -e "⚠️  Content-Security-Policy header missing"
fi

if echo "$security_headers" | grep -qi "strict-transport-security"; then
    echo -e "✅ HTTPS/HSTS enforced"
else
    echo -e "⚠️  HSTS header missing"
fi

echo ""

# Final assessment
echo "========================================"
echo -e "${BLUE}Final Assessment:${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "🎉 ${GREEN}All tests passed! Deployment is successful.${NC}"
    echo -e "✅ Application is healthy and ready for production use"
    exit_code=0
elif [ $TESTS_FAILED -le 2 ]; then
    echo -e "⚠️  ${YELLOW}Minor issues detected but deployment is mostly functional${NC}"
    echo -e "🔧 Consider investigating failed tests for optimization"
    exit_code=1
else
    echo -e "🚨 ${RED}Multiple critical issues detected!${NC}"
    echo -e "❌ Deployment may not be functioning correctly"
    echo -e "🔄 Consider rolling back and investigating issues"
    exit_code=2
fi

echo ""
echo -e "${BLUE}Verification complete!${NC}"
echo ""
echo "🔗 Application URL: $DEPLOYMENT_URL"
echo "📊 Health Status: $DEPLOYMENT_URL/api/health"
echo "🛡️  Admin Panel: $DEPLOYMENT_URL/api/admin/check"

echo ""
echo "================================================"

exit $exit_code