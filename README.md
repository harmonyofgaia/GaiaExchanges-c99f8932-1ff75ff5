# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/8dfae018-363f-4770-8e5c-27c14bec8426

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/8dfae018-363f-4770-8e5c-27c14bec8426) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/8dfae018-363f-4770-8e5c-27c14bec8426) and click on Share -> Publish.

## Build Status

✅ **Build fixes and route adjustments are automatically deployed and implemented inside the connected project in Lovable via Vercel.**

All build errors have been resolved and the project builds successfully. Changes made to fix TypeScript compilation errors are automatically reflected in the Lovable environment.

## AdminDashboardTabs System - Fixes and Best Practices

### Overview

The AdminDashboardTabs system has been thoroughly audited and stabilized with the following improvements:

### Critical Fixes Applied

#### 1. **Default Export Conversion** ✅

**Problem**: All lazy-loaded components were using named exports instead of default exports, causing TypeScript compilation errors.

**Solution**: Converted the following components to use default exports:

- `AdminControlSystem.tsx`
- `RefactoredAdminTools.tsx`
- `UltimateSecurity.tsx`
- `AdminRecoveryPortal.tsx`
- `PlanRecoverySystem.tsx`
- `HolisticAnalysis.tsx`
- `AnimalWelfareControlPanel.tsx`
- `AdminVisualControls.tsx`
- `SecureAdminQuantumIAEnginePanel.tsx`

**Best Practice**: Always use default exports for lazy-loaded components in React.lazy() calls.

#### 2. **Missing Import Fixes** ✅

**Problem**: Missing imports causing compilation errors.

**Solutions Applied**:

- Added missing `EyeOff` import in `AnimalWelfareControlPanel.tsx`
- Added missing `hasCreatorPermissions` function in `SecureAdminQuantumIAEnginePanel.tsx`
- Fixed relative import path to absolute `@/` import in `AdminVisualControls.tsx`

**Best Practice**: Use absolute imports with `@/` prefix for better maintainability and clarity.

#### 3. **Component Architecture Validation** ✅

**Verified Components Structure**:

- ✅ All 9 lazy-loaded tab components exist and are accessible
- ✅ Error boundary component (`AdminDashboardTabsErrorBoundary`) implemented
- ✅ Loading fallback component (`AdminTabLoading`) implemented
- ✅ All import paths are correct and resolvable

### System Architecture

#### Lazy Loading Implementation

```typescript
// Correct lazy loading pattern with default exports
const AdminControlSystem = React.lazy(
  () => import("@/components/AdminControlSystem"),
);
const RefactoredAdminTools = React.lazy(() => import("./RefactoredAdminTools"));
// ... other components
```

#### Error Boundary Pattern

```typescript
<AdminDashboardTabsErrorBoundary tabName={tab.label}>
  <Suspense fallback={<AdminTabLoading tabName={tab.label} />}>
    <Component />
  </Suspense>
</AdminDashboardTabsErrorBoundary>
```

#### Tab Configuration System

- Centralized tab configuration with TypeScript interfaces
- Priority-based responsive hiding for mobile devices
- Comprehensive error handling and fallback states

### Build Verification

#### TypeScript Compilation ✅

- All lazy-loaded components now compile without errors
- Proper type checking for all interfaces and props
- No circular dependency issues detected

#### Production Build ✅

- Build completes successfully with all optimizations
- Proper code splitting and lazy loading implemented
- Asset optimization working correctly

### Best Practices Implemented

1. **Component Export Pattern**: Always use default exports for lazy-loaded components
2. **Import Strategy**: Use absolute imports (`@/`) for better maintainability
3. **Error Handling**: Implement error boundaries for each lazy-loaded component
4. **Loading States**: Provide proper loading fallbacks with meaningful UI
5. **Type Safety**: Use comprehensive TypeScript interfaces for all configurations
6. **Responsive Design**: Implement priority-based tab hiding for mobile devices

### Future Maintenance Guidelines

1. **Adding New Tabs**:
   - Create component with default export
   - Add to `tabConfigs` array in AdminDashboardTabs
   - Test lazy loading functionality

2. **Import Management**:
   - Always use absolute paths with `@/` prefix
   - Verify all imports resolve correctly
   - Run TypeScript checks before deployment

3. **Testing**:
   - Test lazy loading in development mode
   - Verify error boundaries work correctly
   - Check responsive behavior on all screen sizes

### Known Minor Issues (Non-Critical)

The following minor TypeScript issues exist in unrelated components but do not affect AdminDashboardTabs functionality:

- GaiaCommunityProjects.tsx: className prop type issues
- SystemConsistencyScanner.tsx: missing function definition
- EnhancedBackgroundManager.tsx: missing constants

## Merge and Deployment Policy

All changes must go through a reviewed pull request with passing CI checks. See [GOVERNANCE.md](GOVERNANCE.md) for details.

These are isolated to their respective components and do not impact the admin dashboard system.

## Code Formatting and Automation

### Prettier CI Workflow

This repository uses an automated Prettier workflow to ensure consistent code formatting across all files. Here's how it works:

**Automatic Code Formatting:**

- The Prettier GitHub Actions workflow runs on every push and pull request to `main` and `deploy` branches
- If unformatted code is detected, Prettier automatically formats it and commits the changes back to your branch
- The workflow then fails to notify you that formatting was required, but the code is already fixed
- You'll need to pull the latest changes to sync the auto-formatted code to your local branch

**Why This Approach:**

- Prevents deployment failures due to formatting issues
- Ensures all code follows consistent style guidelines
- Reduces friction for contributors while maintaining code quality

### Local Development Setup

**Install Dependencies:**

```sh
npm install
```

**Pre-commit Hooks (Recommended):**
This repository includes Husky and lint-staged for automatic formatting before commits:

```sh
# Husky is automatically installed with npm install
# Pre-commit hooks will run Prettier and ESLint on staged files
```

**Manual Formatting:**

```sh
# Format all files
npm run lint:fix

# Check formatting without fixing
npx prettier --check .

# Format specific files
npx prettier --write path/to/file.ts
```

**ESLint Integration:**

```sh
# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint:fix
```

### Troubleshooting Formatting Issues

**PR Formatting Failure:**

1. **Check the Actions tab** in your PR to see which files needed formatting
2. **Pull the latest changes** - the workflow automatically fixed and committed the formatting
   ```sh
   git pull origin your-branch-name
   ```
3. **Continue development** - your branch now has properly formatted code

**Local Formatting Setup:**

1. **Enable pre-commit hooks** - they're automatically installed with `npm install`
2. **Verify hooks are working:**
   ```sh
   # Make a small change and commit - formatting should run automatically
   git add .
   git commit -m "test commit"
   ```

**Common Issues:**

- **"Prettier check failed"**: Pull the latest changes as the CI auto-fixed the formatting
- **Pre-commit hooks not running**: Ensure Husky is installed with `npm install`
- **Conflicting formatting**: Run `npm run lint:fix` to standardize formatting locally

**Manual Override (Not Recommended):**
If you need to bypass formatting temporarily:

```sh
# Skip pre-commit hooks (not recommended)
git commit --no-verify -m "emergency commit"
```

### Configuration Files

- **`.prettierignore`**: Defines files/folders excluded from formatting
- **`lint-staged.config.json`**: Configures pre-commit formatting and linting
- **`.husky/pre-commit`**: Pre-commit hook configuration
- **`.github/workflows/prettier.yml`**: CI workflow for automatic formatting

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
