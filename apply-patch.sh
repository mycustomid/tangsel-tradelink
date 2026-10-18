#!/usr/bin/env bash
set -euo pipefail
PATCH_DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET="${1:?Usage: apply-patch.sh EXISTING_PROJECT_ROOT}"
test -f "$TARGET/package.json" || { echo 'Target must be an existing project root.' >&2; exit 1; }
test "$(cd "$TARGET" && pwd)" != "$PATCH_DIR" || { echo 'Extract patch separately from target.' >&2; exit 1; }
node "$PATCH_DIR/scripts/verify-package.mjs" "$PATCH_DIR"
for item in .github .nvmrc package.json package-lock.json astro.config.mjs public scripts src tests .gitignore serve_local.cjs apply-patch.sh apply-patch.ps1 ASSET-SOURCES.md PATCH-MANIFEST.md VERIFICATION-REPORT.md PATCH-INFO.txt reports docs audit_46_status.json; do
  if [ -e "$PATCH_DIR/$item" ]; then
    if [ -d "$PATCH_DIR/$item" ]; then
      mkdir -p "$TARGET/$item"
      cp -a "$PATCH_DIR/$item/." "$TARGET/$item/"
    else
      cp -a "$PATCH_DIR/$item" "$TARGET/$item"
    fi
  else
    echo "Missing patch item: $item" >&2; exit 1
  fi
done
echo "Patch overlay copied to: $TARGET"
echo "Run: npm ci --prefer-offline --no-audit --no-fund && npm test && npm run build"
