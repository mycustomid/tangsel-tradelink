# Cumulative patch manifest

Baseline: branch main, HEAD f505f4d. This is an overlay for the existing Tangsel TradeLink repository, not a new project. No commit, push, merge, remote deployment or publication is performed. Existing uncommitted SmartNfcShowcase/Lalisha gallery changes are preserved and included.

## Included

- Complete src/ and public/ snapshot, all tests, workflows, Astro config, Node version, package.json and exact package-lock.json.
- Immutable 154-URL lock, full pre-edit 167-output-route fixture, external CTA baseline, source-page inventory and protected Lalisha asset hashes.
- Public validation, browser QA, accessibility, packaging and checksum tools; modified existing asset/QA scripts.
- Explicit business design decisions for 151 directory entries and three legacy URLs; tenant review table and asset inventory.
- Windows and Unix installers, verification evidence, security review and unified diff proof.

## Behavioral changes

Homepage supports direct product discovery; directory search merges existing research and product highlights, matches all query words, normalizes accents and restores URL state. List/grid controls, invalid filters, empty state and keyboard reset remain available. Directory totals come from both datasets.

Hash-based visual assignment is replaced by auditable business-led composition choices, with tenant palettes retained where recorded. Dedicated flagship components retain their content and layouts. Shared typography, information hierarchy, responsive intrinsic sizing and contrast are hardened. Gallery zoom supports keyboard activation. Unverified remote website favicons are no longer rendered as brand logos. Every profile can return to the directory.

Build now verifies generated route equality, canonical shape, GitHub Pages base paths, internal resources, all prior external contact destinations and Lalisha bytes. The canonical URL bugs and missing synthetic PNG favicon fallbacks are corrected. Existing aliases keep their prior business destinations. No routing config hostname/base/trailingSlash setting is changed.

Astro is pinned to the required 5.x line and Tailwind v4 is integrated without a reset that would disrupt existing tenant styles. See SECURITY-REVIEW.md for the resulting unresolved upstream dependency blocker.

## Installation

Extract the ZIP into a separate directory. Run apply-patch.ps1 -Target D:\code\YOUR_EXISTING_PROJECT or bash apply-patch.sh /path/to/existing/project. Installers verify all file checksums and reject extra/unmanifested files before merging folders. They do not delete old files or execute installation/build commands automatically.

Then run npm ci --prefer-offline --no-audit --no-fund, node scripts/validate-permalinks.mjs, npm test, npm run validate:data and npm run build. For browser QA install Chromium with npx playwright install chromium; run node serve_local.cjs in a separate terminal, then npm run test:browser and npm run test:a11y. QA_ALL=1 expands Axe to all output routes. QA_CHROMIUM optionally selects an existing Chrome executable.

PATCH-SHA256SUMS.txt covers every archive file except itself. The external .zip.sha256 covers the final ZIP. The archive deliberately excludes node_modules, dist, private transcripts and unrelated operational scripts.

Required regression fixtures are included: audit_46_status.json and docs/OSINT-SOURCE-LEDGER.md. Both installers also install their own helpers so the delivered regression suite is self-contained. Filename references use the real lowercase installer paths for case-sensitive Unix filesystems.
