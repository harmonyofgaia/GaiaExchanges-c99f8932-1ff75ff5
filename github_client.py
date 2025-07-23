"""
GitHub Client Module

This module provides a secure and reusable GitHub API client for automation tasks.
It loads the Personal Access Token from environment variables and provides
a configured GitHub API client instance.
"""

import os
from typing import Optional
from github import Github
from dotenv import load_dotenv


class GitHubClient:
    """
    A secure GitHub API client that loads configuration from environment variables.
    """

    def __init__(self, token: Optional[str] = None, repository: Optional[str] = None):
        """
        Initialize the GitHub client.

        Args:
            token: GitHub Personal Access Token. If not provided, will load from
                GITHUB_TOKEN env var.
            repository: Repository name in format 'owner/repo'. If not provided,
                will load from GITHUB_REPOSITORY env var.
        """
        # Load environment variables from .env file
        load_dotenv()

        self.token = token or os.getenv("GITHUB_TOKEN")
        self.repository_name = repository or os.getenv("GITHUB_REPOSITORY")

        if not self.token:
            raise ValueError(
                "GitHub token is required. Set GITHUB_TOKEN environment variable "
                "or pass token parameter."
            )

        if not self.repository_name:
            raise ValueError(
                "Repository name is required. Set GITHUB_REPOSITORY environment "
                "variable or pass repository parameter in format 'owner/repo'."
            )

        # Initialize GitHub client
        self.github = Github(self.token)
        self.repository = self.github.get_repo(self.repository_name)

    def get_client(self) -> Github:
        """
        Get the GitHub API client instance.

        Returns:
            Github: Configured GitHub API client
        """
        return self.github

    def get_repository(self):
        """
        Get the repository object.

        Returns:
            Repository: GitHub repository object
        """
        return self.repository

    def test_connection(self) -> bool:
        """
        Test the GitHub API connection and permissions.

        Returns:
            bool: True if connection is successful, False otherwise
        """
        try:
            # Test basic API access
            user = self.github.get_user()
            print(f"✅ Successfully connected to GitHub API as: {user.login}")

            # Test repository access
            repo = self.get_repository()
            print(f"✅ Successfully accessed repository: {repo.full_name}")

            # Check permissions
            permissions = repo.get_collaborator_permission(user.login)
            print(f"✅ Repository permissions: {permissions}")

            return True

        except Exception as e:
            print(f"❌ GitHub connection test failed: {str(e)}")
            return False

    def get_rate_limit_info(self) -> dict:
        """
        Get current rate limit information.

        Returns:
            dict: Rate limit information
        """
        rate_limit = self.github.get_rate_limit()
        return {
            "core": {
                "limit": rate_limit.core.limit,
                "remaining": rate_limit.core.remaining,
                "reset": rate_limit.core.reset,
            },
            "search": {
                "limit": rate_limit.search.limit,
                "remaining": rate_limit.search.remaining,
                "reset": rate_limit.search.reset,
            },
        }


def create_github_client(
    token: Optional[str] = None, repository: Optional[str] = None
) -> GitHubClient:
    """
    Factory function to create a GitHub client instance.

    Args:
        token: GitHub Personal Access Token
        repository: Repository name in format 'owner/repo'

    Returns:
        GitHubClient: Configured GitHub client instance
    """
    return GitHubClient(token=token, repository=repository)


if __name__ == "__main__":
    # Test the GitHub client connection
    try:
        client = create_github_client()
        if client.test_connection():
            print("\n📊 Rate limit information:")
            rate_info = client.get_rate_limit_info()
            print(
                f"Core API: {rate_info['core']['remaining']}/"
                f"{rate_info['core']['limit']} remaining"
            )
            print(
                f"Search API: {rate_info['search']['remaining']}/"
                f"{rate_info['search']['limit']} remaining"
            )
        else:
            print("❌ GitHub client test failed")

    except Exception as e:
        print(f"❌ Error creating GitHub client: {str(e)}")
        print("\n💡 Make sure to:")
        print("1. Copy .env.example to .env")
        print("2. Set your GITHUB_TOKEN in the .env file")
        print("3. Set your GITHUB_REPOSITORY in the .env file")
