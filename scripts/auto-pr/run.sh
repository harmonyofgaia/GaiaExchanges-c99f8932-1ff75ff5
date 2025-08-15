#!/usr/bin/env bash
set -euo pipefail

# Validate required tools
for tool in git gh jq python3; do
  if ! command -v "$tool" >/dev/null 2>&1; then
    echo "Error: Required tool '$tool' not found"
    exit 1
  fi
done

BASE_BRANCH="${BASE_BRANCH:-main}"
CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
REPO="${GITHUB_REPOSITORY:-$(git remote get-url origin | sed -E 's#.*/([^/]+/[^/]+)(\\.git)?$#\\1#')}"
ACTOR="${GITHUB_ACTOR:-local}"
TOPIC_CFG=".github/pr-bot/topics.yml"

echo "Auto-PR for ${REPO} on branch ${CURRENT_BRANCH} (actor: ${ACTOR}) base=${BASE_BRANCH}"

if [[ "${CURRENT_BRANCH}" == "${BASE_BRANCH}" ]]; then
  echo "On base branch; nothing to do."
  exit 0
fi

# Ensure we have the base branch locally
git fetch origin "${BASE_BRANCH}:${BASE_BRANCH}" || git fetch origin "${BASE_BRANCH}"

# List changed files vs base
mapfile -t FILES < <(git diff --name-only "${BASE_BRANCH}...HEAD" | grep -v '^$' || true)
if [[ ${#FILES[@]} -eq 0 ]]; then
  echo "No changes vs ${BASE_BRANCH}. Exiting."
  exit 0
fi

(
python3 - <<'PY' "${TOPIC_CFG}" "${BASE_BRANCH}" "${CURRENT_BRANCH}" "${REPO}" "${ACTOR}" "${FILES[@]}"
import sys, json, os, fnmatch, subprocess
try:
  import yaml
except Exception:
  subprocess.run([sys.executable, "-m", "pip", "install", "--user", "pyyaml"], check=True)
  import yaml

cfg_path = sys.argv[1]
base = sys.argv[2]
branch = sys.argv[3]
repo = sys.argv[4]
actor = sys.argv[5]
files = sys.argv[6:]

cfg = {"topics": [], "shared": []}
if os.path.exists(cfg_path):
  with open(cfg_path) as f:
    cfg = yaml.safe_load(f) or cfg

topics = cfg.get("topics", [])
shared_globs = cfg.get("shared", [])

def match_any(path, patterns):
  return any(fnmatch.fnmatch(path, p) for p in patterns)

groups = {}
unmatched = []
for f in files:
  grouped = False
  for t in topics:
    if match_any(f, t.get("globs", [])):
      groups.setdefault(t["name"], []).append(f)
      grouped = True
      break
  if not grouped:
    unmatched.append(f)

if unmatched:
  groups.setdefault("misc", []).extend(unmatched)

shared_only = all(match_any(f, shared_globs) for f in files) if shared_globs else False

# Decide whether to split
if len(groups) == 1:
  decision = "single"; reason = "only one topical group"
elif shared_only:
  decision = "single"; reason = "only shared files changed"
elif "misc" in groups and len(groups) == 2 and len(groups["misc"]) <= 2:
  decision = "single"; reason = "minor misc alongside one topic"
else:
  decision = "split"; reason = f"multiple topical groups: {', '.join(sorted(groups.keys()))}"

print(json.dumps({"decision": decision, "reason": reason, "groups": groups}))
PY
) | tee .auto-pr-decision.json

DECISION=$(jq -r '.decision' .auto-pr-decision.json)
REASON=$(jq -r '.reason' .auto-pr-decision.json)
echo "Decision: ${DECISION} (${REASON})"

create_or_update_pr() {
  local src_branch="$1"
  local title="$2"
  local body="$3"
  local draft="$4"

  echo "Checking for existing PR on branch: ${src_branch}"
  local prnum
  prnum=$(gh pr list --head "${src_branch}" --json number --jq '.[0].number' 2>/dev/null || echo "")
  
  if [[ -n "${prnum}" && "${prnum}" != "null" && "${prnum}" != "" ]]; then
    echo "Updating existing PR #${prnum} (${src_branch})"
    local draft_flag=""
    if [[ "${draft}" == "true" ]]; then
      draft_flag="--draft"
    else
      draft_flag="--ready"
    fi
    gh pr edit "${prnum}" --title "${title}" --body "${body}" ${draft_flag} 2>/dev/null || echo "Failed to update PR ${prnum}, but continuing..."
    echo "${prnum}"
  else
    echo "Creating new PR from ${src_branch} -> ${BASE_BRANCH}"
    local draft_flag=""
    [[ "${draft}" == "true" ]] && draft_flag="--draft"
    local pr_result
    pr_result=$(gh pr create -B "${BASE_BRANCH}" -H "${src_branch}" --title "${title}" --body "${body}" ${draft_flag} 2>/dev/null || echo "PR_CREATE_FAILED")
    if [[ "${pr_result}" == "PR_CREATE_FAILED" ]]; then
      echo "Failed to create PR, attempting to find existing PR again..."
      prnum=$(gh pr list --head "${src_branch}" --json number --jq '.[0].number' 2>/dev/null || echo "")
      if [[ -n "${prnum}" && "${prnum}" != "null" ]]; then
        echo "Found existing PR #${prnum}"
        echo "${prnum}"
      else
        echo "Could not create or find PR for ${src_branch}"
        return 1
      fi
    else
      echo "${pr_result}"
    fi
  fi
}

if [[ "${DECISION}" == "single" ]]; then
  TITLE="Auto PR: ${CURRENT_BRANCH}"
  BODY=$(cat <<EOF
Auto-created PR for branch ${CURRENT_BRANCH}

Reason: ${REASON}

This PR was opened automatically when you pushed from VS Code or GitHub UI.
EOF
)
  create_or_update_pr "${CURRENT_BRANCH}" "${TITLE}" "${BODY}" "false" >/dev/null
  exit 0
fi

# Split path
MAP_JQ='.groups | to_entries[] | {name: .key, files: .value}'
readarray -t TOPIC_JSON < <(jq -c "${MAP_JQ}" .auto-pr-decision.json)

declare -A CHILD_PRS
for entry in "${TOPIC_JSON[@]}"; do
  name=$(jq -r '.name' <<<"$entry")
  files=$(jq -r '.files[]' <<<"$entry" | tr '\n' ' ')
  topic_branch="auto/${CURRENT_BRANCH}/${name}"

  echo "Preparing topic branch: ${topic_branch}"
  git checkout -B "${topic_branch}" "${BASE_BRANCH}" 2>/dev/null || {
    echo "Failed to create topic branch ${topic_branch}, trying alternative approach..."
    git checkout "${BASE_BRANCH}" 2>/dev/null || true
    git branch -D "${topic_branch}" 2>/dev/null || true
    git checkout -b "${topic_branch}" 2>/dev/null || {
      echo "Could not create topic branch ${topic_branch}, skipping..."
      continue
    }
  }

  if [[ -n "${files}" ]]; then
    # Use a more robust approach to checkout files
    for file in ${files}; do
      if [[ -f "${file}" ]]; then
        git checkout "${CURRENT_BRANCH}" -- "${file}" 2>/dev/null || echo "Warning: Could not checkout ${file}"
      fi
    done
  if [[ ${#files[@]} -gt 0 ]]; then
    # Use a more robust approach to checkout files
    for file in "${files[@]}"; do
      if [[ -f "${file}" ]]; then
        git checkout "${CURRENT_BRANCH}" -- "${file}" 2>/dev/null || echo "Warning: Could not checkout ${file}"
      fi
    done
    git add "${files[@]}" 2>/dev/null || true
  fi

  if git diff --cached --quiet; then
    echo "No staged changes for ${name}; skipping."
    continue
  fi

  git commit -m "Split from ${CURRENT_BRANCH}: ${name}" || {
    echo "Commit failed for ${name}, skipping..."
    continue
  }
  
  git push -f origin "${topic_branch}" 2>/dev/null || {
    echo "Push failed for ${topic_branch}, retrying once..."
    sleep 2
    git push -f origin "${topic_branch}" 2>/dev/null || {
      echo "Push failed twice for ${topic_branch}, skipping..."
      continue
    }
  }

  TITLE="Split: ${name} from ${CURRENT_BRANCH}"
  BODY=$(cat <<EOF
This is an auto-split PR for the '${name}' topic derived from ${CURRENT_BRANCH}.

Reason to split: ${REASON}

Once child PRs are reviewed, the umbrella PR can be closed or converted to depend on merged children.
EOF
)
  pr_url=$(create_or_update_pr "${topic_branch}" "${TITLE}" "${BODY}" "true")
  pr_url=$(gh pr view --head "${topic_branch}" --json url --jq .url)
  CHILD_PRS["${name}"]="${pr_url}"

done

if [[ ${#CHILD_PRS[@]} -gt 0 ]]; then
  echo "Creating/updating umbrella PR on ${CURRENT_BRANCH}"
  LINKS=""
  for k in "${!CHILD_PRS[@]}"; do
    LINKS+="- ${k}: ${CHILD_PRS[$k]}"$'\n'
  done
  UTITLE="Umbrella PR: ${CURRENT_BRANCH} (split into child PRs)"
  UBODY=$(cat <<EOF
This umbrella PR tracks the following child PRs created from ${CURRENT_BRANCH}:

${LINKS}

Reason to split: ${REASON}

Notes:
- Child PRs are drafts; you can mark them ready individually.
- If you prefer a single PR, close the child PRs and mark this one ready.
EOF
)
  create_or_update_pr "${CURRENT_BRANCH}" "${UTITLE}" "${UBODY}" "true" >/dev/null
fi

echo "Done."