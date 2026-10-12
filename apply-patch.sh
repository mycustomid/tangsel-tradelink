#!/usr/bin/env bash
set -euo pipefail
PATCH_DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET="${1:-$(pwd)}"
if [[ ! -d "$TARGET/src" || ! -f "$TARGET/package.json" ]]; then
  echo "ERROR: target tidak terlihat seperti root repo Tangsel TradeLink: $TARGET" >&2
  exit 1
fi
cp -a "$PATCH_DIR/src/." "$TARGET/src/"
mkdir -p "$TARGET/tests" "$TARGET/public/brand"
cp -a "$PATCH_DIR/tests/." "$TARGET/tests/"
cp -a "$PATCH_DIR/public/brand/." "$TARGET/public/brand/"
rm -f "$TARGET/public/brand/raja-freeze-dried-product.png"
rm -f "$TARGET/public/brand/raja-extracted-0.jpeg"
echo "RC3 performance hardening applied to: $TARGET"
echo "Removed obsolete heavy assets: raja-freeze-dried-product.png, raja-extracted-0.jpeg"
echo "Run: npm test && npm run build"
