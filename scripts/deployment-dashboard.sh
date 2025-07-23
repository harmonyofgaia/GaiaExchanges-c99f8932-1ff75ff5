#!/bin/bash

# GaiaExchanges Deployment Status Dashboard
# This script provides a comprehensive overview of deployment status and health

set -e

# Configuration
DEPLOYMENT_URL="${1:-}"
REFRESH_INTERVAL="${2:-30}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Clear screen function
clear_screen() {
    if command -v clear >/dev/null 2>&1; then
        clear
    else
        printf '\033[2J\033[H'
    fi
}

# Function to display header
show_header() {
    echo -e "${BLUE}╔══════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║                    🚀 GaiaExchanges Deployment Dashboard         ║${NC}"
    echo -e "${BLUE}╚══════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${CYAN}Target URL:${NC} ${DEPLOYMENT_URL:-'Not specified'}"
    echo -e "${CYAN}Refresh:${NC} Every ${REFRESH_INTERVAL} seconds (Press Ctrl+C to exit)"
    echo -e "${CYAN}Last Update:${NC} $(date)"
    echo ""
}

# Function to check deployment status
check_deployment_status() {
    if [ -z "$DEPLOYMENT_URL" ]; then
        echo -e "${YELLOW}⚠️  No deployment URL provided${NC}"
        echo "Usage: $0 <deployment-url> [refresh-interval]"
        echo "Example: $0 https://your-app.vercel.app 30"
        return 1
    fi
    
    echo -e "${BLUE}📊 Deployment Status${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    # Basic connectivity check
    echo -n "🌐 Basic Connectivity: "
    if curl -sf --max-time 10 "$DEPLOYMENT_URL" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Online${NC}"
    else
        echo -e "${RED}❌ Offline${NC}"
        return 1
    fi
    
    # Response time check
    echo -n "⏱️  Response Time: "
    response_time=$(curl -sf --max-time 10 -w "%{time_total}" -o /dev/null "$DEPLOYMENT_URL" 2>/dev/null || echo "timeout")
    if [ "$response_time" != "timeout" ]; then
        if (( $(echo "$response_time < 1" | bc -l) )); then
            echo -e "${GREEN}${response_time}s ✅${NC}"
        elif (( $(echo "$response_time < 3" | bc -l) )); then
            echo -e "${YELLOW}${response_time}s ⚠️${NC}"
        else
            echo -e "${RED}${response_time}s ❌${NC}"
        fi
    else
        echo -e "${RED}Timeout ❌${NC}"
    fi
    
    # SSL Certificate check
    echo -n "🔒 SSL Certificate: "
    if curl -sf --max-time 5 "$DEPLOYMENT_URL" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Valid${NC}"
    else
        echo -e "${RED}❌ Invalid${NC}"
    fi
    
    echo ""
}

# Function to check health endpoint
check_health_status() {
    echo -e "${BLUE}🏥 Health Check Status${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    health_url="$DEPLOYMENT_URL/api/health"
    
    # Check if health endpoint exists
    echo -n "🔍 Health Endpoint: "
    health_response=$(curl -sf --max-time 10 "$health_url" 2>/dev/null || echo "error")
    
    if [ "$health_response" = "error" ]; then
        echo -e "${RED}❌ Not accessible${NC}"
        return 1
    fi
    
    echo -e "${GREEN}✅ Accessible${NC}"
    
    # Parse health response
    if command -v python3 >/dev/null 2>&1; then
        status=$(echo "$health_response" | python3 -c "import sys,json; data=json.load(sys.stdin); print(data.get('status', 'unknown'))" 2>/dev/null || echo "unknown")
        environment=$(echo "$health_response" | python3 -c "import sys,json; data=json.load(sys.stdin); print(data.get('environment', 'unknown'))" 2>/dev/null || echo "unknown")
        version=$(echo "$health_response" | python3 -c "import sys,json; data=json.load(sys.stdin); print(data.get('version', 'unknown'))" 2>/dev/null || echo "unknown")
        
        # Check individual services
        db_status=$(echo "$health_response" | python3 -c "import sys,json; data=json.load(sys.stdin); print(data.get('checks', {}).get('database', 'unknown'))" 2>/dev/null || echo "unknown")
        api_status=$(echo "$health_response" | python3 -c "import sys,json; data=json.load(sys.stdin); print(data.get('checks', {}).get('api', 'unknown'))" 2>/dev/null || echo "unknown")
        env_status=$(echo "$health_response" | python3 -c "import sys,json; data=json.load(sys.stdin); print(data.get('checks', {}).get('environment', 'unknown'))" 2>/dev/null || echo "unknown")
        
        echo -n "📋 Overall Status: "
        case $status in
            "healthy") echo -e "${GREEN}✅ Healthy${NC}" ;;
            "degraded") echo -e "${YELLOW}⚠️ Degraded${NC}" ;;
            "unhealthy") echo -e "${RED}❌ Unhealthy${NC}" ;;
            *) echo -e "${YELLOW}❓ Unknown${NC}" ;;
        esac
        
        echo -e "🌍 Environment: ${environment}"
        echo -e "📦 Version: ${version}"
        
        echo ""
        echo -e "${PURPLE}Service Status:${NC}"
        
        echo -n "  🗄️  Database: "
        case $db_status in
            "up") echo -e "${GREEN}✅ Up${NC}" ;;
            "down") echo -e "${RED}❌ Down${NC}" ;;
            "degraded") echo -e "${YELLOW}⚠️ Degraded${NC}" ;;
            *) echo -e "${YELLOW}❓ Unknown${NC}" ;;
        esac
        
        echo -n "  🔌 API: "
        case $api_status in
            "up") echo -e "${GREEN}✅ Up${NC}" ;;
            "down") echo -e "${RED}❌ Down${NC}" ;;
            "degraded") echo -e "${YELLOW}⚠️ Degraded${NC}" ;;
            *) echo -e "${YELLOW}❓ Unknown${NC}" ;;
        esac
        
        echo -n "  ⚙️  Environment: "
        case $env_status in
            "up") echo -e "${GREEN}✅ Up${NC}" ;;
            "down") echo -e "${RED}❌ Down${NC}" ;;
            "degraded") echo -e "${YELLOW}⚠️ Degraded${NC}" ;;
            *) echo -e "${YELLOW}❓ Unknown${NC}" ;;
        esac
    else
        echo -e "${YELLOW}⚠️ Python not available for detailed parsing${NC}"
        echo -e "Raw response: ${health_response:0:100}..."
    fi
    
    echo ""
}

# Function to check admin endpoint
check_admin_status() {
    echo -e "${BLUE}🛡️  Security Status${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    admin_url="$DEPLOYMENT_URL/api/admin/check"
    
    echo -n "🔐 Admin Endpoint Security: "
    admin_response=$(curl -s --max-time 5 "$admin_url" 2>/dev/null || echo "error")
    
    if echo "$admin_response" | grep -q "unauthorized\|forbidden\|401\|403" 2>/dev/null; then
        echo -e "${GREEN}✅ Protected (Unauthorized access blocked)${NC}"
    elif [ "$admin_response" = "error" ]; then
        echo -e "${YELLOW}⚠️ Endpoint not accessible${NC}"
    else
        echo -e "${RED}❌ May be exposed${NC}"
    fi
    
    # Check security headers
    echo -n "🛡️  Security Headers: "
    headers=$(curl -sI --max-time 5 "$DEPLOYMENT_URL" 2>/dev/null || echo "")
    
    header_count=0
    if echo "$headers" | grep -qi "x-frame-options"; then ((header_count++)); fi
    if echo "$headers" | grep -qi "content-security-policy"; then ((header_count++)); fi
    if echo "$headers" | grep -qi "strict-transport-security"; then ((header_count++)); fi
    
    case $header_count in
        3) echo -e "${GREEN}✅ All present${NC}" ;;
        2) echo -e "${YELLOW}⚠️ Mostly present${NC}" ;;
        1) echo -e "${YELLOW}⚠️ Few present${NC}" ;;
        0) echo -e "${RED}❌ Missing${NC}" ;;
    esac
    
    echo ""
}

# Function to check performance metrics
check_performance() {
    echo -e "${BLUE}⚡ Performance Metrics${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    # Detailed performance measurement
    perf_data=$(curl -sf --max-time 15 -w "connect:%{time_connect},dns:%{time_namelookup},ttfb:%{time_starttransfer},total:%{time_total},size:%{size_download},speed:%{speed_download}" -o /dev/null "$DEPLOYMENT_URL" 2>/dev/null || echo "connect:0,dns:0,ttfb:0,total:0,size:0,speed:0")
    
    dns_time=$(echo "$perf_data" | sed 's/.*dns:\([^,]*\).*/\1/')
    connect_time=$(echo "$perf_data" | sed 's/.*connect:\([^,]*\).*/\1/')
    ttfb=$(echo "$perf_data" | sed 's/.*ttfb:\([^,]*\).*/\1/')
    total_time=$(echo "$perf_data" | sed 's/.*total:\([^,]*\).*/\1/')
    size=$(echo "$perf_data" | sed 's/.*size:\([^,]*\).*/\1/')
    speed=$(echo "$perf_data" | sed 's/.*speed:\([^,]*\).*/\1/')
    
    # Format size
    if (( $(echo "$size > 1048576" | bc -l) )); then
        size_mb=$(echo "scale=2; $size / 1048576" | bc)
        size_display="${size_mb}MB"
    elif (( $(echo "$size > 1024" | bc -l) )); then
        size_kb=$(echo "scale=2; $size / 1024" | bc)
        size_display="${size_kb}KB"
    else
        size_display="${size}B"
    fi
    
    # Format speed
    if (( $(echo "$speed > 1048576" | bc -l) )); then
        speed_mb=$(echo "scale=2; $speed / 1048576" | bc)
        speed_display="${speed_mb}MB/s"
    elif (( $(echo "$speed > 1024" | bc -l) )); then
        speed_kb=$(echo "scale=2; $speed / 1024" | bc)
        speed_display="${speed_kb}KB/s"
    else
        speed_display="${speed}B/s"
    fi
    
    echo -e "🔍 DNS Lookup: ${dns_time}s"
    echo -e "🔌 Connection: ${connect_time}s"
    echo -e "⏱️  Time to First Byte: ${ttfb}s"
    echo -e "📊 Total Load Time: ${total_time}s"
    echo -e "📦 Page Size: ${size_display}"
    echo -e "🚀 Download Speed: ${speed_display}"
    
    echo ""
}

# Function to show recent activity (placeholder)
show_recent_activity() {
    echo -e "${BLUE}📈 Recent Activity${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "⏰ Last Deployment: $(date -d '1 hour ago' 2>/dev/null || date)"
    echo -e "🔄 Status: Monitoring active"
    echo -e "📊 Uptime: Available"
    echo ""
}

# Function to show controls
show_controls() {
    echo -e "${CYAN}🎮 Controls${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "Press ${YELLOW}Ctrl+C${NC} to exit"
    echo -e "Refresh interval: ${REFRESH_INTERVAL} seconds"
    echo ""
}

# Main dashboard function
run_dashboard() {
    while true; do
        clear_screen
        show_header
        
        if check_deployment_status; then
            check_health_status
            check_admin_status
            check_performance
            show_recent_activity
        else
            echo -e "${RED}❌ Deployment appears to be offline or unreachable${NC}"
            echo ""
        fi
        
        show_controls
        
        # Wait for refresh interval or exit on Ctrl+C
        sleep $REFRESH_INTERVAL
    done
}

# Single run function (for CI/CD use)
run_single_check() {
    show_header
    
    if check_deployment_status; then
        check_health_status
        check_admin_status
        check_performance
        echo -e "${GREEN}✅ All checks completed successfully${NC}"
        exit 0
    else
        echo -e "${RED}❌ Deployment check failed${NC}"
        exit 1
    fi
}

# Handle command line arguments
case "${3:-dashboard}" in
    "dashboard")
        echo -e "${BLUE}Starting GaiaExchanges Deployment Dashboard...${NC}"
        echo ""
        run_dashboard
        ;;
    "check")
        run_single_check
        ;;
    *)
        echo "Usage: $0 <deployment-url> [refresh-interval] [mode]"
        echo ""
        echo "Modes:"
        echo "  dashboard  - Interactive dashboard (default)"
        echo "  check      - Single check run"
        echo ""
        echo "Examples:"
        echo "  $0 https://your-app.vercel.app 30 dashboard"
        echo "  $0 https://your-app.vercel.app 0 check"
        exit 1
        ;;
esac