#!/usr/bin/env bash
#
# setup-deps.sh — fetch all external dependencies and localize them.
#
# Downloads:
#   vendor/diff-match-patch.js      (Google's diff-match-patch v1.0.5)
#   fonts/fonts.css                 (self-hosted Google Fonts stylesheet)
#   fonts/font-*.woff2              (every referenced woff2 file)
#
# Run this once on a machine with internet access, from the project root:
#     bash setup-deps.sh
#
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p vendor fonts

UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

# ---------------------------------------------------------------------------
# 1. diff-match-patch
# ---------------------------------------------------------------------------
echo "==> Fetching diff-match-patch v1.0.5"
DMP_URL="https://cdn.jsdelivr.net/npm/diff-match-patch@1.0.5/index.js"
if ! curl -fsSL -A "$UA" "$DMP_URL" -o vendor/diff-match-patch.js; then
  echo "    jsdelivr failed, trying unpkg…"
  curl -fsSL -A "$UA" "https://unpkg.com/diff-match-patch@1.0.5/index.js" -o vendor/diff-match-patch.js
fi
echo "    saved vendor/diff-match-patch.js ($(wc -c < vendor/diff-match-patch.js) bytes)"

# Sanity check: the file must define diff_match_patch
if ! grep -q "diff_match_patch" vendor/diff-match-patch.js; then
  echo "ERROR: vendor/diff-match-patch.js does not look like the library. Aborting." >&2
  exit 1
fi

# ---------------------------------------------------------------------------
# 2. Google Fonts (Fraunces, DM Sans, JetBrains Mono)
# ---------------------------------------------------------------------------
echo "==> Fetching Google Fonts CSS"
CSS_URL="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
CSS="$(curl -fsSL -A "$UA" "$CSS_URL")"

# Pull every woff2 URL out of the CSS (deduped, so we don't re-download
# the same file Google serves for multiple weights/subsets)
mapfile -t URLS < <(printf '%s' "$CSS" | grep -oE 'https://fonts.gstatic.com/[^)]+\.woff2' | awk '!seen[$0]++' || true)
if [ "${#URLS[@]}" -eq 0 ]; then
  echo "ERROR: no woff2 URLs found in the fonts CSS." >&2
  exit 1
fi
echo "    found ${#URLS[@]} distinct font files"

i=0
for u in "${URLS[@]}"; do
  i=$((i+1))
  name=$(printf "font-%03d.woff2" "$i")
  curl -fsSL -A "$UA" "$u" -o "fonts/$name"
  # Rewrite the CSS to point at the local file
  CSS="${CSS//"$u"/"$name"}"
done

printf '%s\n' "$CSS" > fonts/fonts.css
echo "    saved fonts/fonts.css and ${#URLS[@]} woff2 files"

# ---------------------------------------------------------------------------
echo "==> All dependencies localized. You can now open index.html offline."
