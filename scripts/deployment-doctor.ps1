# GaiaExchanges Deployment Doctor - PowerShell Version
# This script performs comprehensive checks and provides specific solutions

$ErrorActionPreference = 'Stop'

Write-Host "🩺 GaiaExchanges Deployment Doctor - Diagnosing Issues..." -ForegroundColor Cyan

$ISSUES_FOUND = 0
$WARNINGS_FOUND = 0

function Write-Header($msg) {
    Write-Host "\n==================== $msg ====================" -ForegroundColor Blue
}
function Write-Success($msg) {
    Write-Host "✅ GOOD: $msg" -ForegroundColor Green
}
function Write-WarningMsg($msg) {
    Write-Host "⚠️  WARNING: $msg" -ForegroundColor Yellow
    $global:WARNINGS_FOUND++
}
function Write-Issue($msg) {
    Write-Host "❌ ISSUE: $msg" -ForegroundColor Red
    $global:ISSUES_FOUND++
}
function Write-Solution($msg) {
    Write-Host "💡 SOLUTION: $msg" -ForegroundColor Magenta
}

Write-Header "ENVIRONMENT ANALYSIS"

# Node.js version
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Node.js version: $nodeVersion"
    if ($nodeVersion -match "v1[8-9]|v[2-9][0-9]") {
    Write-Success "Node.js version is compatible ($nodeVersion)"
    } else {
    Write-Issue "Node.js version may be too old ($nodeVersion)"
    Write-Solution "Update to Node.js 18+ using nvm or installer."
    }
} else {
    Write-Issue "Node.js is not installed."
    Write-Solution "Install Node.js from https://nodejs.org/"
}

# npm version
$npmVersion = npm --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Success "npm is available ($npmVersion)"
} else {
    Write-Issue "npm is not available"
    Write-Solution "Install npm or update Node.js"
}

Write-Header "CONFIGURATION FILES ANALYSIS"

# package.json
if (Test-Path "package.json") {
    Write-Success "package.json exists"
    $packageJson = Get-Content package.json -Raw | ConvertFrom-Json
    $requiredScripts = @("build", "dev", "deploy")
    foreach ($script in $requiredScripts) {
        if ($packageJson.scripts.$script) {
            Write-Success "Script '$script' is defined"
        } else {
            Write-WarningMsg "Script '$script' is missing"
            Write-Solution "Add '$script' script to package.json"
        }
    }
} else {
    Write-Issue "package.json is missing"
    Write-Solution "Initialize project with: npm init"
}

# .env file
if (Test-Path ".env") {
    Write-Success ".env file exists"
    $envContent = Get-Content .env
    if ($envContent -match "placeholder|your-project-id|your-supabase-anonymous-key") {
    Write-WarningMsg "Environment file contains placeholder values"
    Write-Solution "Update .env with actual values or use platform environment variables"
        Write-Host "Found these placeholders:"
        $envContent | Select-String "placeholder|your-project-id|your-supabase-anonymous-key"
    } else {
    Write-Success "Environment file has actual values"
    }
} else {
    Write-WarningMsg ".env file is missing"
    if (Test-Path ".env.example") {
    Write-Solution "Copy .env.example to .env and update values"
    } else {
    Write-Solution "Create .env file with required environment variables"
    }
}

# Deployment configs
$deploymentConfigs = @("vercel.json", "netlify.toml")
foreach ($config in $deploymentConfigs) {
    if (Test-Path $config) {
    Write-Success "$config exists"
    } else {
    Write-WarningMsg "$config is missing"
    Write-Solution "Create $config for optimal deployment configuration"
    }
}

Write-Header "DEPENDENCY ANALYSIS"

if (Test-Path "node_modules") {
    Write-Success "node_modules directory exists"
    if (Test-Path "package-lock.json") {
    Write-Success "package-lock.json exists (dependency versions locked)"
    } else {
    Write-WarningMsg "package-lock.json is missing"
    Write-Solution "Run 'npm install' to generate package-lock.json"
    }
} else {
    Write-Issue "node_modules directory is missing"
    Write-Solution "Run: npm install --legacy-peer-deps"
}

Write-Header "BUILD SYSTEM ANALYSIS"

Write-Host "Testing build process..."
try {
    npm run build | Out-Null
    Write-Success "Build process works"
    if (Test-Path "dist/index.html") {
    Write-Success "Build produces index.html"
    } else {
    Write-Issue "Build doesn't produce index.html"
    Write-Solution "Check Vite configuration and build process"
    }
    if (Test-Path "dist/assets") {
    Write-Success "Build produces assets directory"
    } else {
    Write-WarningMsg "No assets directory in build output"
    }
} catch {
    Write-Issue "Build process fails"
    Write-Solution "Check build errors above."
}

Write-Header "DEPLOYMENT PLATFORM READINESS"

$deploymentTools = @("vercel", "netlify")
foreach ($tool in $deploymentTools) {
    $toolPath = (Get-Command $tool -ErrorAction SilentlyContinue)
    if ($toolPath) {
    Write-Success "$tool CLI is available"
    } else {
    Write-WarningMsg "$tool CLI is not installed"
    Write-Solution "Install with: npm install -g $tool-cli or use npx $tool"
    }
}

# Git status
$gitPath = (Get-Command git -ErrorAction SilentlyContinue)
if ($gitPath) {
    $gitStatus = git status --porcelain
    if ($gitStatus) {
        Write-WarningMsg "There are uncommitted changes"
        Write-Solution "Commit changes before deployment: git add . && git commit -m 'Update'"
    } else {
        Write-Success "No uncommitted changes"
    }
} else {
    Write-WarningMsg "Git is not available"
    Write-Solution "Install Git for version control"
}

Write-Header "SECURITY ANALYSIS"

Write-Host "Checking for security vulnerabilities..."
try {
    npm audit --audit-level=high | Out-Null
    Write-Success "No high-severity security vulnerabilities"
} catch {
    Write-WarningMsg "Security vulnerabilities found"
    Write-Solution "Run: npm audit fix"
}

Write-Header "PERFORMANCE ANALYSIS"

if (Test-Path "dist") {
    $buildSize = (Get-ChildItem -Recurse -File dist | Measure-Object -Property Length -Sum).Sum / 1MB
    if ($buildSize -lt 50) {
    Write-Success "Build size is reasonable ($([math]::Round($buildSize,2)) MB)"
    } elseif ($buildSize -lt 100) {
    Write-WarningMsg "Build size is large ($([math]::Round($buildSize,2)) MB)"
    Write-Solution "Consider code splitting and bundle optimization"
    } else {
    Write-Issue "Build size is very large ($([math]::Round($buildSize,2)) MB)"
    Write-Solution "Optimize bundle size, remove unused dependencies"
    }

    # Check for large chunks in Vite output
    $chunkFiles = Get-ChildItem -Recurse -File dist | Where-Object { $_.Length -gt 500KB -and $_.Extension -eq ".js" }
    foreach ($chunk in $chunkFiles) {
    Write-WarningMsg "Chunk $($chunk.Name) is larger than 500kB after minification."
    Write-Solution "Consider using dynamic import() for code-splitting, or configure build.rollupOptions.output.manualChunks in vite.config.ts. See: https://rollupjs.org/configuration-options/#output-manualchunks"
    }
}

Write-Header "DEPLOYMENT RECOMMENDATIONS"
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

Write-Header "DIAGNOSTIC SUMMARY"
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
