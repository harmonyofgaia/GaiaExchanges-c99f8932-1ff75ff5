# GitHub PR Automation System

An advanced automatic GitHub integration for managing Pull Requests with security, modularity, and extensibility in mind.

## Features

- **Secure Token Management**: Uses Personal Access Token (PAT) from environment variables
- **Configurable PR Range**: Check PRs in specified ranges (e.g., #22-#34)
- **Advanced PR Validation**: 
  - Check for required approvals
  - Validate required labels
  - Verify status checks
  - Ensure PR is mergeable
- **Automatic Merging**: Merge PRs that meet all criteria
- **Extensible Notifications**: Print notifications (easily extensible to email, Slack, Discord)
- **Dry Run Mode**: Test automation without making actual changes
- **GitHub Actions Integration**: Automated scheduling and manual triggers

## Setup

### 1. Environment Configuration

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```bash
# Required
GITHUB_TOKEN=your_github_personal_access_token_here
GITHUB_REPOSITORY=harmonyofgaia/GaiaExchanges-c99f8932

# Optional Configuration
PR_RANGE_START=22
PR_RANGE_END=34
ENABLE_AUTO_MERGE=true
ENABLE_NOTIFICATIONS=true
DRY_RUN=false
REQUIRED_LABELS=ready-to-merge,approved
MIN_REVIEWS=1
REQUIRE_STATUS_CHECKS=true
```

### 2. GitHub Token Setup

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Add the following scopes:
   - `repo` (Full control of private repositories)
   - `workflow` (Update GitHub Action workflows)
   - `write:org` (if working with organization repositories)
4. Copy the token and add it to your `.env` file

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

## Usage

### Local Testing

Test GitHub connection:
```bash
python github_client.py
```

Run automation (dry run mode):
```bash
export DRY_RUN=true
python automation.py
```

Run automation with actual merging:
```bash
export DRY_RUN=false
export ENABLE_AUTO_MERGE=true
python automation.py
```

### GitHub Actions

The automation can be triggered via GitHub Actions in three ways:

1. **Scheduled**: Automatically runs daily at 9 AM UTC
2. **Manual**: Trigger manually with custom parameters
3. **Workflow Dispatch**: Use GitHub's workflow dispatch feature

To trigger manually:
1. Go to Actions tab in your repository
2. Select "PR Automation" workflow
3. Click "Run workflow"
4. Configure parameters as needed

## Configuration Options

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `GITHUB_TOKEN` | Required | Personal Access Token for GitHub API |
| `GITHUB_REPOSITORY` | Required | Repository in format 'owner/repo' |
| `PR_RANGE_START` | 22 | Starting PR number to check |
| `PR_RANGE_END` | 34 | Ending PR number to check |
| `ENABLE_AUTO_MERGE` | true | Enable automatic merging of PRs |
| `DRY_RUN` | false | Run without making actual changes |
| `MIN_REVIEWS` | 1 | Minimum number of required approvals |
| `REQUIRED_LABELS` | empty | Comma-separated list of required labels |
| `REQUIRE_STATUS_CHECKS` | true | Require all status checks to pass |
| `ENABLE_NOTIFICATIONS` | true | Enable notification system |

## Architecture

### Core Components

1. **`github_client.py`**: Secure GitHub API client with token management
2. **`automation.py`**: Main automation logic with modular components:
   - `PRChecker`: Validates PR criteria
   - `NotificationManager`: Handles notifications
   - `PRAutomationManager`: Orchestrates the automation process

### Security Features

- Environment variable-based token management
- No hardcoded credentials
- Rate limit monitoring
- Error handling and logging
- Dry run mode for testing

### Extensibility

The system is designed for easy extension:

- **Notification channels**: Add email, Slack, Discord, etc.
- **Custom checks**: Add new PR validation criteria
- **Integration points**: Extend with webhooks, APIs, etc.
- **Reporting**: Add detailed reporting and analytics

## Testing

Run the test suite:
```bash
python -m pytest test_automation.py -v
```

Run linting:
```bash
python -m flake8 github_client.py automation.py --max-line-length=88
```

Format code:
```bash
python -m black github_client.py automation.py
```

## GitHub Actions Workflow

The included workflow (`.github/workflows/automation.yml`) provides:

- **Scheduled execution**: Daily at 9 AM UTC
- **Manual triggers**: With customizable parameters
- **Environment validation**: Checks for required secrets
- **Artifact upload**: Saves automation logs
- **Notification integration**: Slack notifications for completion

### Required GitHub Secrets

Set these in your repository settings > Secrets and variables > Actions:

- `GITHUB_TOKEN`: Personal Access Token (automatically provided by GitHub)
- `NOTIFICATION_EMAIL`: Email for notifications (optional)
- `SLACK_WEBHOOK_URL`: Slack webhook URL (optional)

## Example Use Cases

### Basic Auto-merge
```bash
# Merge PRs #22-#34 that have 1+ approval and required labels
export REQUIRED_LABELS="ready-to-merge"
export MIN_REVIEWS=1
python automation.py
```

### Quality Gate Enforcement
```bash
# Strict criteria: 2+ reviews, status checks, specific labels
export MIN_REVIEWS=2
export REQUIRE_STATUS_CHECKS=true
export REQUIRED_LABELS="approved,tested,documentation"
python automation.py
```

### Safe Testing
```bash
# Test automation without making changes
export DRY_RUN=true
export ENABLE_NOTIFICATIONS=true
python automation.py
```

## Troubleshooting

### Common Issues

1. **Token Permission Error**: Ensure your PAT has `repo` and `workflow` scopes
2. **Repository Access**: Verify the repository name format is correct (`owner/repo`)
3. **Rate Limiting**: Check rate limit status with `python github_client.py`
4. **PR Not Found**: Ensure PR numbers exist in the specified range

### Debug Mode

Enable detailed logging by running:
```bash
export ENABLE_NOTIFICATIONS=true
python automation.py
```

## Contributing

To extend the automation system:

1. Fork the repository
2. Create feature branch
3. Add tests for new functionality
4. Ensure linting passes
5. Submit pull request

## License

This automation system is part of the GaiaExchanges project and follows the same licensing terms.