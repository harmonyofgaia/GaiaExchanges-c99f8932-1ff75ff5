# GaiaExchanges

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/your-org/GaiaExchanges.git

## Development Commands

```sh
# Development
npm run dev          # Start development server

# Building & Testing
npm run build        # Build for production
npm run preview      # Preview production build
npm run typecheck    # Run TypeScript type checking
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm test             # Run tests
```

## Project Structure

This project uses an npm workspace structure:

- **Root workspace**: Main application with unified toolchain
- **lovable/**: Frontend components and logic
- **src/**: Core application source code

## Technology Stack

- **Node.js**: 20.x (LTS)
- **Vite**: 7.x (build tool)
- **TypeScript**: 5.9.x
- **React**: 18.x with React Router 7.x
- **Tailwind CSS**: v3 (design system)
- **ESLint**: Code linting with React Hooks rules

## How can I deploy this project?

Primary: Netlify (recommended)

- CI/CD to Netlify is configured via GitHub Actions on pushes to `main`.
- Set the following repository secrets:
  - `NETLIFY_AUTH_TOKEN`
  - `NETLIFY_SITE_ID`
- Or deploy manually:
  - `npm run build`
  - `npm run deploy:netlify`

## Build Status

✅ Builds and route handling are configured for Netlify (SPA redirects via `netlify.toml`).

## Notes

- Environment variables follow Vite's `VITE_...` pattern. Set them in your Netlify site settings for production.
- For local testing of the production build: `npm run preview`.