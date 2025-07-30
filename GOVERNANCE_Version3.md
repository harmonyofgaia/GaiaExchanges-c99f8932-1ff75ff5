# GaiaExchanges Governance and Merge Policy

## Branch Protection

- All merges to `main` and `deploy` branches require at least one human code review (not a bot).
- All required status checks (CI, lint, tests) must pass before merging.
- Squash merges are recommended for all feature branches.

## Pull Requests

- Every PR must be linked to a tracked GitHub issue.
- Changelog updates are mandatory for any user-facing change.
- PRs should be small and atomic; avoid combining unrelated changes.

## Deployment

- Deployments to production are only performed from protected branches.
- In case of failure, use GitHub's revert mechanism or deployment fallback.

## Modern Integrations

- For sensitive admin or backend logic, consider Edge Functions (Vercel, Netlify, or GitHub Edge).
- Monitor deployments with GitHub Actions, preview environments, and notifications.

## Security

- All dependency updates must be reviewed and pass security scans.