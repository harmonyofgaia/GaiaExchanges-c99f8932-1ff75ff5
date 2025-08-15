#!/usr/bin/env bash
set -euo pipefail

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

git fetch origin "${BASE_BRANCH}:${BASE_BRANCH}"

# List changed files vs base
mapfile -t FILES < <(git diff --name-only "origin/${BASE_BRANCH}...HEAD" | grep -v '^$' || true)
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

  if gh pr list --head "${src_branch}" --json number --jq '.[0].number' >/dev/null 2>&1; then
    local prnum
    prnum=$(gh pr list --head "${src_branch}" --json number --jq '.[0].number')
    echo "Updating PR #${prnum} (${src_branch})"
    gh pr edit "${prnum}" --title "${title}" --body "${body}" $( [[ "${draft}" == "true" ]] && echo "--draft" || echo "--ready" )
    echo "${prnum}"
  else
    echo "Creating PR from ${src_branch} -> ${BASE_BRANCH}"
    gh pr create -B "${BASE_BRANCH}" -H "${src_branch}" --title "${title}" --body "${body}" $( [[ "${draft}" == "true" ]] && echo "--draft" )
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
  git checkout -B "${topic_branch}" "origin/${BASE_BRANCH}"

  if [[ -n "${files}" ]]; then
    git checkout "${CURRENT_BRANCH}" -- ${files} || true
    git add ${files} || true
  fi

  if git diff --cached --quiet; then
    echo "No staged changes for ${name}; skipping."
    continue
  fi

  git commit -m "Split from ${CURRENT_BRANCH}: ${name}"
  git push -f origin "${topic_branch}"

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