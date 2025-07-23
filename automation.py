"""
GitHub PR Automation Module

This module provides advanced automatic GitHub integration for PR management.
It includes functionality to check PRs in a configurable range, merge PRs that
meet specific criteria, and send notifications.
"""

import os
import sys
from datetime import datetime
from typing import List, Dict, Any, Tuple
from github.PullRequest import PullRequest
from dotenv import load_dotenv

from github_client import create_github_client, GitHubClient


class PRChecker:
    """
    Handles PR validation and checks.
    """

    def __init__(self, github_client: GitHubClient):
        self.client = github_client
        self.repo = github_client.get_repository()

    def check_pr_approvals(
        self, pr: PullRequest, min_reviews: int = 1
    ) -> Tuple[bool, List[str]]:
        """
        Check if PR has sufficient approvals.

        Args:
            pr: PullRequest object
            min_reviews: Minimum number of required reviews

        Returns:
            Tuple[bool, List[str]]: (has_sufficient_approvals, list_of_approvers)
        """
        try:
            reviews = pr.get_reviews()
            approvers = []

            # Get latest review from each user
            user_reviews = {}
            for review in reviews:
                user_reviews[review.user.login] = review

            # Count approvals
            for user, review in user_reviews.items():
                if review.state == "APPROVED":
                    approvers.append(user)

            has_sufficient = len(approvers) >= min_reviews
            return has_sufficient, approvers

        except Exception as e:
            print(f"❌ Error checking PR approvals for #{pr.number}: {str(e)}")
            return False, []

    def check_required_labels(
        self, pr: PullRequest, required_labels: List[str]
    ) -> Tuple[bool, List[str]]:
        """
        Check if PR has all required labels.

        Args:
            pr: PullRequest object
            required_labels: List of required label names

        Returns:
            Tuple[bool, List[str]]: (has_all_labels, list_of_missing_labels)
        """
        try:
            pr_labels = [label.name for label in pr.labels]
            missing_labels = [
                label for label in required_labels if label not in pr_labels
            ]

            has_all_labels = len(missing_labels) == 0
            return has_all_labels, missing_labels

        except Exception as e:
            print(f"❌ Error checking PR labels for #{pr.number}: {str(e)}")
            return False, required_labels

    def check_status_checks(self, pr: PullRequest) -> Tuple[bool, List[str]]:
        """
        Check if all required status checks are passing.

        Args:
            pr: PullRequest object

        Returns:
            Tuple[bool, List[str]]: (all_checks_passing, list_of_failing_checks)
        """
        try:
            # Get the latest commit
            commits = list(pr.get_commits())
            if not commits:
                return False, ["No commits found"]

            latest_commit = commits[-1]

            # Get combined status
            combined_status = latest_commit.get_combined_status()

            failing_checks = []
            for status in combined_status.statuses:
                if status.state != "success":
                    failing_checks.append(f"{status.context}: {status.state}")

            # Check if overall state is success
            overall_passing = combined_status.state == "success"

            return overall_passing and len(failing_checks) == 0, failing_checks

        except Exception as e:
            print(f"❌ Error checking status checks for #{pr.number}: {str(e)}")
            return False, [f"Error checking status: {str(e)}"]

    def is_pr_mergeable(self, pr: PullRequest) -> Tuple[bool, List[str]]:
        """
        Check if PR is in a mergeable state.

        Args:
            pr: PullRequest object

        Returns:
            Tuple[bool, List[str]]: (is_mergeable, list_of_issues)
        """
        issues = []

        # Check if PR is open
        if pr.state != "open":
            issues.append(f"PR is {pr.state}, not open")

        # Check if PR is already merged
        if pr.merged:
            issues.append("PR is already merged")

        # Check if PR is draft
        if pr.draft:
            issues.append("PR is a draft")

        # Check mergeable state
        if pr.mergeable_state != "clean":
            if pr.mergeable_state == "unstable":
                issues.append("PR mergeable state is unstable and requires manual intervention")
            else:
                issues.append(f"PR mergeable state is {pr.mergeable_state}")

        return len(issues) == 0, issues


class NotificationManager:
    """
    Handles notifications for automation events.
    """

    def __init__(self):
        self.notifications_enabled = (
            os.getenv("ENABLE_NOTIFICATIONS", "true").lower() == "true"
        )

    def send_notification(self, message: str, notification_type: str = "info") -> None:
        """
        Send a notification (extensible for email, Slack, etc.).

        Args:
            message: Notification message
            notification_type: Type of notification (info, success, warning, error)
        """
        if not self.notifications_enabled:
            return

        # For now, use print (easily extensible to email, Slack, etc.)
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        icon = self._get_notification_icon(notification_type)

        print(f"🔔 [{timestamp}] {icon} {message}")

        # Future extensions:
        # self._send_email(message, notification_type)
        # self._send_slack(message, notification_type)
        # self._send_discord(message, notification_type)

    def _get_notification_icon(self, notification_type: str) -> str:
        """Get appropriate icon for notification type."""
        icons = {"info": "ℹ️", "success": "✅", "warning": "⚠️", "error": "❌"}
        return icons.get(notification_type, "📢")

    def _send_email(self, message: str, notification_type: str) -> None:
        """Send email notification (to be implemented)."""
        # Implementation for email notifications
        pass

    def _send_slack(self, message: str, notification_type: str) -> None:
        """Send Slack notification (to be implemented)."""
        # Implementation for Slack notifications
        pass


class PRAutomationManager:
    """
    Main automation manager for PR operations.
    """

    def __init__(self, github_client: GitHubClient):
        self.client = github_client
        self.repo = github_client.get_repository()
        self.checker = PRChecker(github_client)
        self.notifier = NotificationManager()

        # Load configuration
        load_dotenv()
        self.dry_run = os.getenv("DRY_RUN", "false").lower() == "true"
        self.auto_merge_enabled = (
            os.getenv("ENABLE_AUTO_MERGE", "true").lower() == "true"
        )
        self.min_reviews = int(os.getenv("MIN_REVIEWS", "1"))
        self.require_status_checks = (
            os.getenv("REQUIRE_STATUS_CHECKS", "true").lower() == "true"
        )
        self.required_labels = [
            label.strip()
            for label in os.getenv("REQUIRED_LABELS", "").split(",")
            if label.strip()
        ]

    def get_prs_in_range(self, start_pr: int, end_pr: int) -> List[PullRequest]:
        """
        Get PRs in the specified range.

        Args:
            start_pr: Starting PR number
            end_pr: Ending PR number

        Returns:
            List[PullRequest]: List of PR objects
        """
        prs = []
        for pr_number in range(start_pr, end_pr + 1):
            try:
                pr = self.repo.get_pull(pr_number)
                prs.append(pr)
            except Exception as e:
                print(f"⚠️ Could not fetch PR #{pr_number}: {str(e)}")

        return prs

    def check_pr_criteria(self, pr: PullRequest) -> Tuple[bool, Dict[str, Any]]:
        """
        Check if PR meets all criteria for auto-merge.

        Args:
            pr: PullRequest object

        Returns:
            Tuple[bool, Dict]: (meets_criteria, detailed_results)
        """
        results = {
            "pr_number": pr.number,
            "title": pr.title,
            "mergeable": False,
            "mergeable_issues": [],
            "has_approvals": False,
            "approvers": [],
            "has_labels": False,
            "missing_labels": [],
            "status_checks_pass": False,
            "failing_checks": [],
        }

        # Check if PR is mergeable
        (
            results["mergeable"],
            results["mergeable_issues"],
        ) = self.checker.is_pr_mergeable(pr)

        # Check approvals
        (
            results["has_approvals"],
            results["approvers"],
        ) = self.checker.check_pr_approvals(pr, self.min_reviews)

        # Check labels
        if self.required_labels:
            (
                results["has_labels"],
                results["missing_labels"],
            ) = self.checker.check_required_labels(pr, self.required_labels)
        else:
            results["has_labels"] = True  # No labels required

        # Check status checks
        if self.require_status_checks:
            (
                results["status_checks_pass"],
                results["failing_checks"],
            ) = self.checker.check_status_checks(pr)
        else:
            results["status_checks_pass"] = True  # Status checks not required

        # Overall criteria
        meets_criteria = (
            results["mergeable"]
            and results["has_approvals"]
            and results["has_labels"]
            and results["status_checks_pass"]
        )

        return meets_criteria, results

    def merge_pr(self, pr: PullRequest) -> bool:
        """
        Merge a PR if auto-merge is enabled.

        Args:
            pr: PullRequest object

        Returns:
            bool: True if merge was successful
        """
        if not self.auto_merge_enabled:
            self.notifier.send_notification(
                f"Auto-merge is disabled. PR #{pr.number} would be merged.", "warning"
            )
            return False

        if self.dry_run:
            self.notifier.send_notification(
                f"DRY RUN: Would merge PR #{pr.number} - {pr.title}", "info"
            )
            return True

        try:
            commit_message = f"Auto-merge PR #{pr.number}: {pr.title}"
            merge_result = pr.merge(commit_message=commit_message, merge_method="merge")

            if merge_result.merged:
                self.notifier.send_notification(
                    f"Successfully merged PR #{pr.number} - {pr.title}", "success"
                )
                return True
            else:
                self.notifier.send_notification(
                    f"Failed to merge PR #{pr.number}: {merge_result.message}", "error"
                )
                return False

        except Exception as e:
            self.notifier.send_notification(
                f"Error merging PR #{pr.number}: {str(e)}", "error"
            )
            return False

    def process_pr_range(self, start_pr: int, end_pr: int) -> Dict[str, Any]:
        """
        Process PRs in the specified range.

        Args:
            start_pr: Starting PR number
            end_pr: Ending PR number

        Returns:
            Dict: Summary of automation results
        """
        self.notifier.send_notification(
            f"Starting PR automation for range #{start_pr}-#{end_pr}", "info"
        )

        prs = self.get_prs_in_range(start_pr, end_pr)

        summary = {
            "total_prs": len(prs),
            "processed": 0,
            "merged": 0,
            "skipped": 0,
            "errors": 0,
            "details": [],
        }

        for pr in prs:
            try:
                summary["processed"] += 1

                meets_criteria, results = self.check_pr_criteria(pr)

                if meets_criteria:
                    if self.merge_pr(pr):
                        summary["merged"] += 1
                        results["action"] = "merged"
                    else:
                        summary["errors"] += 1
                        results["action"] = "merge_failed"
                else:
                    summary["skipped"] += 1
                    results["action"] = "skipped"

                    # Log why PR was skipped
                    reasons = []
                    if not results["mergeable"]:
                        reasons.extend(results["mergeable_issues"])
                    if not results["has_approvals"]:
                        needed = self.min_reviews - len(results["approvers"])
                        reasons.append(f"Needs {needed} more approval(s)")
                    if not results["has_labels"]:
                        missing = ", ".join(results["missing_labels"])
                        reasons.append(f"Missing labels: {missing}")
                    if not results["status_checks_pass"]:
                        reasons.extend(results["failing_checks"])

                    self.notifier.send_notification(
                        f"Skipped PR #{pr.number}: {', '.join(reasons)}", "info"
                    )

                summary["details"].append(results)

            except Exception as e:
                summary["errors"] += 1
                self.notifier.send_notification(
                    f"Error processing PR #{pr.number}: {str(e)}", "error"
                )

        # Send summary notification
        self.notifier.send_notification(
            f"Automation complete: {summary['merged']} merged, "
            f"{summary['skipped']} skipped, {summary['errors']} errors",
            "success" if summary["errors"] == 0 else "warning",
        )

        return summary


def main():
    """
    Main automation function.
    """
    try:
        # Load environment variables
        load_dotenv()

        # Get PR range from environment or use defaults
        start_pr = int(os.getenv("PR_RANGE_START", "22"))
        end_pr = int(os.getenv("PR_RANGE_END", "34"))

        print("🚀 Starting GitHub PR Automation")
        print("📊 Configuration:")
        print(f"   - Repository: {os.getenv('GITHUB_REPOSITORY')}")
        print(f"   - PR Range: #{start_pr}-#{end_pr}")
        print(f"   - Auto-merge: {os.getenv('ENABLE_AUTO_MERGE', 'true')}")
        print(f"   - Dry run: {os.getenv('DRY_RUN', 'false')}")
        print(f"   - Min reviews: {os.getenv('MIN_REVIEWS', '1')}")
        print(f"   - Required labels: {os.getenv('REQUIRED_LABELS', 'None')}")
        print()

        # Create GitHub client
        github_client = create_github_client()

        # Test connection
        if not github_client.test_connection():
            print("❌ Failed to connect to GitHub API")
            sys.exit(1)

        # Create automation manager
        automation = PRAutomationManager(github_client)

        # Process PR range
        summary = automation.process_pr_range(start_pr, end_pr)

        # Print final summary
        print("\n📈 Final Summary:")
        print(f"   - Total PRs processed: {summary['total_prs']}")
        print(f"   - Successfully merged: {summary['merged']}")
        print(f"   - Skipped (criteria not met): {summary['skipped']}")
        print(f"   - Errors: {summary['errors']}")

        # Exit with error code if there were errors
        if summary["errors"] > 0:
            sys.exit(1)

    except Exception as e:
        print(f"❌ Fatal error in automation: {str(e)}")
        sys.exit(1)


if __name__ == "__main__":
    main()
