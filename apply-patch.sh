#!/usr/bin/env bash
set -euo pipefail
PATCH_DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET="${1:-.}"
for item in .github .nvmrc docs package.json public src tests; do
  if [ -e "$PATCH_DIR/$item" ]; then
    cp -a "$PATCH_DIR/$item" "$TARGET/"
  fi
done
echo "Patch overlay copied to: $TARGET"
echo "Run: npm ci --prefer-offline --no-audit --no-fund && npm test && npm run build"
