#!/usr/bin/env bash
set -euo pipefail

# Directories that contain your assets
DIRS=( "client/src/assets" "client/public/assets" )

# Verify we are in a git repo
if [ ! -d ".git" ]; then
  echo "❌ Run this from your repo root (where .git exists)."
  exit 1
fi

# Build a mapping of old_basename -> new_basename BEFORE renaming,
# so we can replace references accurately.
MAP_FILE="$(mktemp)"
echo "📝 Building rename map (spaces & %20 -> _)..."

for d in "${DIRS[@]}"; do
  [ -d "$d" ] || continue
  # Find files with spaces or %20
  while IFS= read -r -d '' f; do
    base="$(basename "$f")"
    newbase="${base// /_}"
    newbase="${newbase//%20/_}"
    if [[ "$base" != "$newbase" ]]; then
      echo "$base|$newbase" >> "$MAP_FILE"
    fi
  done < <(find "$d" -type f \( -name "* *" -o -name "*%20*" \) -print0 2>/dev/null)
done

# Deduplicate map entries
if [ -s "$MAP_FILE" ]; then
  sort -u "$MAP_FILE" -o "$MAP_FILE"
else
  echo "✅ No filenames with spaces or %20 found under ${DIRS[*]}."
  exit 0
fi

echo "🔁 Renaming files with git mv..."
# Perform renames using git mv so history is preserved
while IFS='|' read -r oldbase newbase; do
  # Find every file that matches the old basename (in our asset dirs) and rename it
  for d in "${DIRS[@]}"; do
    [ -d "$d" ] || continue
    while IFS= read -r -d '' match; do
      # Compute new full path
      dirpath="$(dirname "$match")"
      newpath="$dirpath/$newbase"
      if [[ "$match" != "$newpath" ]]; then
        echo "  • $match -> $newpath"
        git mv "$match" "$newpath"
      fi
    done < <(find "$d" -type f -name "$oldbase" -print0 2>/dev/null)
  done
done < "$MAP_FILE"

echo "🧹 Updating references in source files..."
# Replace old basenames with new basenames in code & public files
while IFS='|' read -r oldbase newbase; do
  # Find files that reference the old basename (exclude node_modules/.git/dist)
  files=$(grep -RIl --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=dist -- "$oldbase" client/src client/public 2>/dev/null || true)
  if [ -n "$files" ]; then
    echo "  • $oldbase -> $newbase"
    # BSD sed (macOS) in-place edit
    echo "$files" | xargs -I{} sed -i '' "s/$oldbase/$newbase/g" {}
  fi
done < "$MAP_FILE"

echo "✅ Done. Review changes with: git status"
echo "   If everything looks good: git add -A && git commit -m 'Rename asset files (spaces -> _) and update references'"
