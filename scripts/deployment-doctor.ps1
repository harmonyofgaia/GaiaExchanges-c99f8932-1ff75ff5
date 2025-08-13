# GaiaExchanges Deployment Doctor - PowerShell Version
# This script performs comprehensive checks and provides specific solutions

$ErrorActionPreference = 'Stop'

Write-Host "🩺 GaiaExchanges Deployment Doctor - Diagnosing Issues..." -ForegroundColor Cyan

$ISSUES_FOUND = 0
$WARNINGS_FOUND = 0

function Print-Header($msg) {
    Write-Host "\n==================== $msg ====================" -ForegroundColor Blue
}
function Print-Success($msg) {
    Write-Host "✅ GOOD: $msg" -ForegroundColor Green
}
function Print-Warning($msg) {
    Write-Host "⚠️  WARNING: $msg" -ForegroundColor Yellow
    $global:WARNINGS_FOUND++
}
function Print-Issue($msg) {
    Write-Host "❌ ISSUE: $msg" -ForegroundColor Red
    $global:ISSUES_FOUND++
}
function Print-Solution($msg) {
    Write-Host "💡 SOLUTION: $msg" -ForegroundColor Magenta
}

Print-Header "ENVIRONMENT ANALYSIS"

# Node.js version
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Node.js version: $nodeVersion"
    if ($nodeVersion -match "v1[8-9]|v[2-9][0-9]") {
        Print-Success "Node.js version is compatible ($nodeVersion)"
    } else {
        Print-Issue "Node.js version may be too old ($nodeVersion)"
        Print-Solution "Update to Node.js 18+ using nvm or installer."
    }
} else {
    Print-Issue "Node.js is not installed."
    Print-Solution "Install Node.js from https://nodejs.org/"
}

# npm version
$npmVersion = npm --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Print-Success "npm is available ($npmVersion)"
} else {
    Print-Issue "npm is not available"
    Print-Solution "Install npm or update Node.js"
}

Print-Header "CONFIGURATION FILES ANALYSIS"

# package.json
if (Test-Path "package.json") {
    Print-Success "package.json exists"
    $packageJson = Get-Content package.json -Raw | ConvertFrom-Json
    $requiredScripts = @("build", "dev", "deploy")
    foreach ($script in $requiredScripts) {
        if ($packageJson.scripts.$script) {
            Print-Success "Script '$script' is defined"
        } else {
            Print-Warning "Script '$script' is missing"
            Print-Solution "Add '$script' script to package.json"
        }
    }
} else {
    Print-Issue "package.json is missing"
    Print-Solution "Initialize project with: npm init"
}

# .env file
if (Test-Path ".env") {
    Print-Success ".env file exists"
    $envContent = Get-Content .env
    if ($envContent -match "placeholder|your-project-id|your-supabase-anonymous-key") {
        Print-Warning "Environment file contains placeholder values"
        Print-Solution "Update .env with actual values or use platform environment variables"
        Write-Host "Found these placeholders:"
        $envContent | Select-String "placeholder|your-project-id|your-supabase-anonymous-key"
    } else {
        Print-Success "Environment file has actual values"
    }
} else {
    Print-Warning ".env file is missing"
    if (Test-Path ".env.example") {
        Print-Solution "Copy .env.example to .env and update values"
    } else {
        Print-Solution "Create .env file with required environment variables"
    }
}

# Deployment configs
$deploymentConfigs = @("vercel.json", "netlify.toml")
foreach ($config in $deploymentConfigs) {
    if (Test-Path $config) {
        Print-Success "$config exists"
    } else {
        Print-Warning "$config is missing"
        Print-Solution "Create $config for optimal deployment configuration"
    }
}

Print-Header "DEPENDENCY ANALYSIS"

if (Test-Path "node_modules") {
    Print-Success "node_modules directory exists"
    if (Test-Path "package-lock.json") {
        Print-Success "package-lock.json exists (dependency versions locked)"
    } else {
        Print-Warning "package-lock.json is missing"
        Print-Solution "Run 'npm install' to generate package-lock.json"
    }
} else {
    Print-Issue "node_modules directory is missing"
    Print-Solution "Run: npm install --legacy-peer-deps"
}

Print-Header "BUILD SYSTEM ANALYSIS"

Write-Host "Testing build process..."
try {
    npm run build | Out-Null
    Print-Success "Build process works"
    if (Test-Path "dist/index.html") {
        Print-Success "Build produces index.html"
    } else {
        Print-Issue "Build doesn't produce index.html"
        Print-Solution "Check Vite configuration and build process"
    }
    if (Test-Path "dist/assets") {
        Print-Success "Build produces assets directory"
    } else {
        Print-Warning "No assets directory in build output"
    }
} catch {
    Print-Issue "Build process fails"
    Print-Solution "Check build errors above."
}

Print-Header "DEPLOYMENT PLATFORM READINESS"

$deploymentTools = @("vercel", "netlify")
foreach ($tool in $deploymentTools) {
    $toolPath = (Get-Command $tool -ErrorAction SilentlyContinue)
    if ($toolPath) {
        Print-Success "$tool CLI is available"
    } else {
        Print-Warning "$tool CLI is not installed"
        Print-Solution "Install with: npm install -g $tool-cli or use npx $tool"
    }
}

# Git status
$gitPath = (Get-Command git -ErrorAction SilentlyContinue)
if ($gitPath) {
    $gitStatus = git status --porcelain
    if ($gitStatus) {
        Print-Warning "There are uncommitted changes"
        Print-Solution "Commit changes before deployment: git add . && git commit -m 'Update'"
    } else {
        Print-Success "No uncommitted changes"
    }
} else {
    Print-Warning "Git is not available"
    Print-Solution "Install Git for version control"
}

Print-Header "SECURITY ANALYSIS"

Write-Host "Checking for security vulnerabilities..."
try {
    npm audit --audit-level=high | Out-Null
    Print-Success "No high-severity security vulnerabilities"
} catch {
    Print-Warning "Security vulnerabilities found"
    Print-Solution "Run: npm audit fix"
}

Print-Header "PERFORMANCE ANALYSIS"

if (Test-Path "dist") {
    $buildSize = (Get-ChildItem -Recurse -File dist | Measure-Object -Property Length -Sum).Sum / 1MB
    if ($buildSize -lt 50) {
        Print-Success "Build size is reasonable ($([math]::Round($buildSize,2)) MB)"
    } elseif ($buildSize -lt 100) {
        Print-Warning "Build size is large ($([math]::Round($buildSize,2)) MB)"
        Print-Solution "Consider code splitting and bundle optimization"
    } else {
        Print-Issue "Build size is very large ($([math]::Round($buildSize,2)) MB)"
        Print-Solution "Optimize bundle size, remove unused dependencies"
    }
}

Print-Header "DEPLOYMENT RECOMMENDATIONS"
Write-Host "\n📚 For Vercel:"
Write-Host "   1. Ensure vercel.json is configured"
Write-Host "   2. Set environment variables in Vercel dashboard"
Write-Host "   3. Use: npm run deploy:vercel"
Write-Host "\n📚 For Netlify:"
Write-Host "   1. Ensure netlify.toml is configured"
Write-Host "   2. Set environment variables in Netlify dashboard"
Write-Host "   3. Use: npm run deploy:netlify"
Write-Host "\n📚 For GitHub Pages:"
Write-Host "   1. Enable GitHub Actions in repository settings"
Write-Host "   2. Set secrets in repository settings"
Write-Host "   3. Push to main branch for automatic deployment"

Print-Header "DIAGNOSTIC SUMMARY"
Write-Host "\n📊 Diagnostic Results:"
Write-Host "Issues found: $ISSUES_FOUND"
Write-Host "Warnings found: $WARNINGS_FOUND"
if ($ISSUES_FOUND -eq 0 -and $WARNINGS_FOUND -eq 0) {
    Write-Host "\n🎉 All checks passed! Your deployment setup looks great!" -ForegroundColor Green
    Write-Host "You're ready to deploy to production." -ForegroundColor Green
} elseif ($ISSUES_FOUND -eq 0) {
    Write-Host "\n⚠️  Minor warnings found, but deployment should work." -ForegroundColor Yellow
    Write-Host "Address warnings for optimal deployment experience." -ForegroundColor Yellow
} else {
    Write-Host "\n❌ Issues found. Please address the above issues before deploying." -ForegroundColor Red
}
