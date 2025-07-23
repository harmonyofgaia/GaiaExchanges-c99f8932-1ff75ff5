#!/bin/bash

# GaiaExchanges Secrets Verification Script
# This script checks if all required deployment secrets are configured

set -e

echo "🔍 GaiaExchanges Deployment Secrets Verification"
echo "================================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
REQUIRED_MISSING=0
OPTIONAL_MISSING=0
TOTAL_REQUIRED=5
TOTAL_OPTIONAL=8

# Function to check required secret
check_required_secret() {
    local secret_name=$1
    local description=$2
    
    if [ -z "${!secret_name}" ]; then
        echo -e "❌ ${RED}$secret_name${NC} - $description (REQUIRED)"
        ((REQUIRED_MISSING++))
        return 1
    else
        echo -e "✅ ${GREEN}$secret_name${NC} - $description"
        return 0
    fi
}

# Function to check optional secret
check_optional_secret() {
    local secret_name=$1
    local description=$2
    
    if [ -z "${!secret_name}" ]; then
        echo -e "🔧 ${YELLOW}$secret_name${NC} - $description (Optional)"
        ((OPTIONAL_MISSING++))
        return 1
    else
        echo -e "✅ ${GREEN}$secret_name${NC} - $description"
        return 0
    fi
}

echo -e "${BLUE}Checking Core Application Secrets:${NC}"
echo "-----------------------------------"
check_required_secret "VITE_SUPABASE_URL" "Supabase project URL"
check_required_secret "VITE_SUPABASE_ANON_KEY" "Supabase anonymous key"
echo ""

echo -e "${BLUE}Checking Deployment Secrets:${NC}"
echo "----------------------------"
check_required_secret "VERCEL_TOKEN" "Vercel authentication token"
check_required_secret "VERCEL_ORG_ID" "Vercel organization ID"
check_required_secret "VERCEL_PROJECT_ID" "Vercel project ID"
echo ""

echo -e "${BLUE}Checking Notification Secrets:${NC}"
echo "------------------------------"
check_optional_secret "SLACK_WEBHOOK_URL" "Slack webhook for notifications"
check_optional_secret "DISCORD_WEBHOOK_URL" "Discord webhook for alerts"
check_optional_secret "EMAIL_USERNAME" "SMTP email username"
check_optional_secret "EMAIL_PASSWORD" "SMTP email password"
check_optional_secret "NOTIFICATION_EMAIL" "Email for failure notifications"
echo ""

echo -e "${BLUE}Checking Admin Control Secrets:${NC}"
echo "------------------------------"
check_optional_secret "ADMIN_EMAILS" "Admin email addresses"
check_optional_secret "ADMIN_USER_IDS" "Admin user IDs"
check_optional_secret "ADMIN_ROLES" "Admin role names"
echo ""

# Summary
echo "================================================"
echo -e "${BLUE}Verification Summary:${NC}"
echo ""

REQUIRED_CONFIGURED=$((TOTAL_REQUIRED - REQUIRED_MISSING))
OPTIONAL_CONFIGURED=$((TOTAL_OPTIONAL - OPTIONAL_MISSING))

echo -e "📊 Required Secrets: ${GREEN}$REQUIRED_CONFIGURED${NC}/$TOTAL_REQUIRED configured"
echo -e "📊 Optional Secrets: ${GREEN}$OPTIONAL_CONFIGURED${NC}/$TOTAL_OPTIONAL configured"
echo ""

if [ $REQUIRED_MISSING -eq 0 ]; then
    echo -e "🎉 ${GREEN}All required secrets are configured!${NC}"
    echo -e "✅ Deployment should work correctly"
else
    echo -e "🚨 ${RED}$REQUIRED_MISSING required secret(s) missing!${NC}"
    echo -e "❌ Deployment will fail without these secrets"
fi

if [ $OPTIONAL_MISSING -gt 0 ]; then
    echo -e "ℹ️  ${YELLOW}$OPTIONAL_MISSING optional secret(s) missing${NC}"
    echo -e "🔧 Some features (notifications, admin controls) may not work"
fi

echo ""
echo "================================================"
echo ""

# Additional validation for configured secrets
if [ -n "$VITE_SUPABASE_URL" ]; then
    echo -e "${BLUE}Validating Supabase Configuration:${NC}"
    echo "-----------------------------------"
    
    # Check URL format
    if [[ $VITE_SUPABASE_URL =~ ^https://.*\.supabase\.co$ ]]; then
        echo -e "✅ Supabase URL format is valid"
    else
        echo -e "⚠️  ${YELLOW}Supabase URL format might be incorrect${NC}"
        echo -e "   Expected format: https://your-project.supabase.co"
    fi
    
    # Check key format (JWT structure)
    if [ -n "$VITE_SUPABASE_ANON_KEY" ]; then
        if [[ $VITE_SUPABASE_ANON_KEY =~ ^eyJ.*\..*\..*$ ]]; then
            echo -e "✅ Supabase key format appears valid (JWT structure)"
        else
            echo -e "⚠️  ${YELLOW}Supabase key format might be incorrect${NC}"
            echo -e "   Expected format: JWT token starting with 'eyJ'"
        fi
    fi
    echo ""
fi

# Webhook validation
if [ -n "$SLACK_WEBHOOK_URL" ]; then
    echo -e "${BLUE}Validating Slack Webhook:${NC}"
    echo "------------------------"
    if [[ $SLACK_WEBHOOK_URL =~ ^https://hooks\.slack\.com/services/.* ]]; then
        echo -e "✅ Slack webhook URL format is valid"
    else
        echo -e "⚠️  ${YELLOW}Slack webhook URL format might be incorrect${NC}"
        echo -e "   Expected format: https://hooks.slack.com/services/..."
    fi
    echo ""
fi

if [ -n "$DISCORD_WEBHOOK_URL" ]; then
    echo -e "${BLUE}Validating Discord Webhook:${NC}"
    echo "--------------------------"
    if [[ $DISCORD_WEBHOOK_URL =~ ^https://discord\.com/api/webhooks/.* ]]; then
        echo -e "✅ Discord webhook URL format is valid"
    else
        echo -e "⚠️  ${YELLOW}Discord webhook URL format might be incorrect${NC}"
        echo -e "   Expected format: https://discord.com/api/webhooks/..."
    fi
    echo ""
fi

# Email validation
if [ -n "$EMAIL_USERNAME" ] && [ -n "$EMAIL_PASSWORD" ]; then
    echo -e "${BLUE}Validating Email Configuration:${NC}"
    echo "------------------------------"
    if [[ $EMAIL_USERNAME =~ ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ ]]; then
        echo -e "✅ Email username format is valid"
    else
        echo -e "⚠️  ${YELLOW}Email username format might be incorrect${NC}"
    fi
    
    if [ -n "$NOTIFICATION_EMAIL" ]; then
        if [[ $NOTIFICATION_EMAIL =~ ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ ]]; then
            echo -e "✅ Notification email format is valid"
        else
            echo -e "⚠️  ${YELLOW}Notification email format might be incorrect${NC}"
        fi
    fi
    echo ""
fi

# Final recommendation
echo -e "${BLUE}Next Steps:${NC}"
echo "----------"

if [ $REQUIRED_MISSING -eq 0 ]; then
    echo -e "1. ✅ All required secrets configured - ready for deployment"
    echo -e "2. 🚀 You can trigger deployment via:"
    echo -e "   • Push to main branch"
    echo -e "   • Manual GitHub Actions workflow dispatch"
    echo -e "3. 📋 Review SECRETS_SETUP.md for detailed configuration"
else
    echo -e "1. ❌ Configure missing required secrets in GitHub repository settings"
    echo -e "2. 📋 Follow SECRETS_SETUP.md for step-by-step instructions"
    echo -e "3. 🔄 Re-run this script after adding secrets"
fi

if [ $OPTIONAL_MISSING -gt 0 ]; then
    echo -e "4. 🔧 Consider configuring optional secrets for enhanced functionality:"
    if [ -z "$SLACK_WEBHOOK_URL" ] && [ -z "$DISCORD_WEBHOOK_URL" ] && [ -z "$EMAIL_USERNAME" ]; then
        echo -e "   • Add notification webhooks for deployment alerts"
    fi
    if [ -z "$ADMIN_EMAILS" ]; then
        echo -e "   • Configure admin access controls"
    fi
fi

echo ""
echo -e "📖 For detailed setup instructions, see: ${BLUE}SECRETS_SETUP.md${NC}"
echo -e "🔧 For troubleshooting help, see: ${BLUE}DEPLOYMENT_AUTOMATION.md${NC}"

# Exit with appropriate code
if [ $REQUIRED_MISSING -eq 0 ]; then
    exit 0
else
    exit 1
fi