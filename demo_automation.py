#!/usr/bin/env python3
"""
Demo script to showcase GitHub automation capabilities.
This script demonstrates the automation system without requiring a real GitHub token.
"""

import os
import sys
from unittest.mock import Mock, patch
from github_client import GitHubClient, create_github_client
from automation import PRAutomationManager, NotificationManager


def demo_github_client():
    """Demonstrate GitHub client functionality."""
    print("🔧 GitHub Client Demo")
    print("=" * 50)
    
    # Test error handling
    print("1. Testing error handling (no token):")
    try:
        GitHubClient()
    except ValueError as e:
        print(f"   ✅ Correctly caught error: {e}")
    
    # Test with mock token
    print("\n2. Testing with mock credentials:")
    with patch.dict(os.environ, {
        'GITHUB_TOKEN': 'mock_token_12345',
        'GITHUB_REPOSITORY': 'owner/test-repo'
    }):
        with patch('github_client.Github') as mock_github:
            mock_repo = Mock()
            mock_repo.full_name = 'owner/test-repo'
            mock_github.return_value.get_repo.return_value = mock_repo
            
            client = create_github_client()
            print(f"   ✅ Client created successfully")
            print(f"   ✅ Repository: {client.repository_name}")
            print(f"   ✅ Token configured: {'*' * 10}{'12345'}")


def demo_notification_system():
    """Demonstrate notification system."""
    print("\n🔔 Notification System Demo")
    print("=" * 50)
    
    with patch.dict(os.environ, {'ENABLE_NOTIFICATIONS': 'true'}):
        notifier = NotificationManager()
        
        print("Testing different notification types:")
        notifier.send_notification("System startup", "info")
        notifier.send_notification("Operation successful", "success")
        notifier.send_notification("Potential issue detected", "warning")
        notifier.send_notification("Critical error occurred", "error")


def demo_configuration():
    """Demonstrate configuration loading."""
    print("\n⚙️ Configuration Demo")
    print("=" * 50)
    
    # Test different configurations
    configs = [
        {
            'name': 'Development Mode',
            'env': {
                'DRY_RUN': 'true',
                'ENABLE_AUTO_MERGE': 'false',
                'MIN_REVIEWS': '1',
                'REQUIRED_LABELS': 'ready-for-review'
            }
        },
        {
            'name': 'Production Mode',
            'env': {
                'DRY_RUN': 'false',
                'ENABLE_AUTO_MERGE': 'true',
                'MIN_REVIEWS': '2',
                'REQUIRED_LABELS': 'approved,tested,documentation'
            }
        },
        {
            'name': 'Strict Quality Gate',
            'env': {
                'DRY_RUN': 'false',
                'ENABLE_AUTO_MERGE': 'true',
                'MIN_REVIEWS': '3',
                'REQUIRE_STATUS_CHECKS': 'true',
                'REQUIRED_LABELS': 'approved,security-review,qa-tested'
            }
        }
    ]
    
    base_env = {
        'GITHUB_TOKEN': 'mock_token',
        'GITHUB_REPOSITORY': 'owner/repo'
    }
    
    for config in configs:
        print(f"\n{config['name']}:")
        env_vars = {**base_env, **config['env']}
        
        with patch.dict(os.environ, env_vars, clear=True):
            with patch('github_client.Github'):
                try:
                    client = GitHubClient()
                    automation = PRAutomationManager(client)
                    
                    print(f"   • Dry run: {automation.dry_run}")
                    print(f"   • Auto-merge: {automation.auto_merge_enabled}")
                    print(f"   • Min reviews: {automation.min_reviews}")
                    print(f"   • Status checks: {automation.require_status_checks}")
                    print(f"   • Required labels: {automation.required_labels}")
                    
                except Exception as e:
                    print(f"   ❌ Configuration error: {e}")


def demo_pr_range():
    """Demonstrate PR range functionality."""
    print("\n📋 PR Range Demo")
    print("=" * 50)
    
    # Mock PR range processing
    pr_ranges = [
        (22, 25),
        (30, 34),
        (100, 105)
    ]
    
    for start, end in pr_ranges:
        print(f"\nProcessing PR range #{start}-#{end}:")
        
        # Simulate PR processing
        total_prs = end - start + 1
        merged = total_prs // MERGE_RATIO
        skipped = total_prs // SKIP_RATIO
        errors = total_prs - merged - skipped
        
        print(f"   • Total PRs in range: {total_prs}")
        print(f"   • Would merge: {merged}")
        print(f"   • Would skip: {skipped}")
        print(f"   • Potential errors: {errors}")


def demo_security_features():
    """Demonstrate security features."""
    print("\n🔒 Security Features Demo")
    print("=" * 50)
    
    print("Security features implemented:")
    print("   ✅ Environment variable-based token management")
    print("   ✅ No hardcoded credentials in source code")
    print("   ✅ Input validation for all parameters")
    print("   ✅ Error handling for API failures")
    print("   ✅ Rate limit monitoring capability")
    print("   ✅ Dry run mode for safe testing")
    print("   ✅ Configurable permission requirements")
    
    print("\nToken security demonstration:")
    token_examples = [
        "",  # Empty token
        "invalid",  # Invalid format
        "ghp_1234567890abcdef",  # Valid format
    ]
    
    for token in token_examples:
        if not token:
            print("   ❌ Empty token rejected")
        elif len(token) < 16:
            print("   ❌ Short token rejected")
        else:
            masked_token = token[:4] + "*" * (len(token) - 8) + token[-4:]
            print(f"   ✅ Valid token format accepted: {masked_token}")


def main():
    """Run all demonstrations."""
    print("🚀 GitHub PR Automation System Demo")
    print("=" * 60)
    print("This demo showcases the automation system capabilities")
    print("without requiring actual GitHub credentials.\n")
    
    try:
        demo_github_client()
        demo_notification_system()
        demo_configuration()
        demo_pr_range()
        demo_security_features()
        
        print("\n✅ Demo completed successfully!")
        print("\nNext steps:")
        print("1. Copy .env.example to .env")
        print("2. Configure your GitHub token and repository")
        print("3. Run: python automation.py")
        print("4. Or use GitHub Actions for automated scheduling")
        
    except Exception as e:
        print(f"\n❌ Demo failed: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()