"""
Basic tests for GitHub automation components.
"""

import os
import pytest
from unittest.mock import patch, MagicMock
from github_client import GitHubClient, create_github_client
from automation import PRChecker, NotificationManager, PRAutomationManager


def test_github_client_missing_token():
    """Test that GitHubClient raises error when token is missing."""
    with patch.dict(os.environ, {}, clear=True):
        with pytest.raises(ValueError, match="GitHub token is required"):
            GitHubClient()


def test_github_client_missing_repository():
    """Test that GitHubClient raises error when repository is missing."""
    with patch.dict(os.environ, {"GITHUB_TOKEN": "test_token"}, clear=True):
        with pytest.raises(ValueError, match="Repository name is required"):
            GitHubClient()


def test_create_github_client():
    """Test factory function for creating GitHub client."""
    with patch.dict(
        os.environ,
        {"GITHUB_TOKEN": "test_token", "GITHUB_REPOSITORY": "owner/repo"},
        clear=True,
    ):
        with patch("github_client.Github"):
            client = create_github_client()
            assert client.token == "test_token"
            assert client.repository_name == "owner/repo"


def test_notification_manager():
    """Test notification manager functionality."""
    with patch.dict(os.environ, {"ENABLE_NOTIFICATIONS": "true"}, clear=True):
        notifier = NotificationManager()
        assert notifier.notifications_enabled is True
        
        # Test that notification doesn't crash
        notifier.send_notification("Test message", "info")


def test_notification_manager_disabled():
    """Test notification manager when disabled."""
    with patch.dict(os.environ, {"ENABLE_NOTIFICATIONS": "false"}, clear=True):
        notifier = NotificationManager()
        assert notifier.notifications_enabled is False


def test_pr_checker_initialization():
    """Test PR checker initialization."""
    with patch.dict(
        os.environ,
        {"GITHUB_TOKEN": "test_token", "GITHUB_REPOSITORY": "owner/repo"},
        clear=True,
    ):
        with patch("github_client.Github"):
            github_client = GitHubClient()
            checker = PRChecker(github_client)
            assert checker.client == github_client


def test_automation_manager_configuration():
    """Test automation manager configuration loading."""
    env_vars = {
        "GITHUB_TOKEN": "test_token",
        "GITHUB_REPOSITORY": "owner/repo",
        "DRY_RUN": "true",
        "ENABLE_AUTO_MERGE": "false",
        "MIN_REVIEWS": "2",
        "REQUIRE_STATUS_CHECKS": "false",
        "REQUIRED_LABELS": "ready,approved",
    }
    
    with patch.dict(os.environ, env_vars, clear=True):
        with patch("github_client.Github"):
            github_client = GitHubClient()
            automation = PRAutomationManager(github_client)
            
            assert automation.dry_run is True
            assert automation.auto_merge_enabled is False
            assert automation.min_reviews == 2
            assert automation.require_status_checks is False
            assert automation.required_labels == ["ready", "approved"]


if __name__ == "__main__":
    pytest.main([__file__, "-v"])