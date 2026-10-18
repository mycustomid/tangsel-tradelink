# Verification report — cumulative local RC

Verified 18 October 2026. Baseline: main / f505f4d. Validation host: Node v24.12.0, Windows; Unix installer exercised through Git Bash. No commit, push, merge or remote deployment was performed.

**Production approval remains blocked by one critical Astro dependency finding under the mandatory Astro 5 requirement.** See reports/SECURITY-REVIEW.md. Passing the checks below does not waive this dependency issue.

## Gates and measured results

| Gate | Observed result |
|---|---|
| node scripts/validate-permalinks.mjs | 154 immutable NFC URLs; original lock bytes unchanged |
| npm test | 188 passed, 0 failed |
| npm run validate:data | 151 active entries checked across both datasets |
| npm run build | 167 pages; 154 NFC profile outputs; 797 internal links; all baseline external destinations preserved |
| Asset protection | All 23 Lalisha files byte-identical, including 17 authentic WebP photographs; emblem, favicon, retail content and uncropped gallery preserved |
| Browser composition | Full sweep plus a targeted legacy-favicon retest: 167 pages × 8 widths = 1336 checks; 0 failures; 0 console errors |
| Browser interaction | Product search, invalid sector normalization, empty results, reset to 151 entries, list/grid, skip link, keyboard gallery opening and Escape closing passed |
| Axe WCAG AA rules | 167 routes verified, 0 violations; full sweep followed by retesting the five affected pages after final contrast fixes |
| Syntax | Astro compiler, ast-grep / Tree-sitter ERROR-node checks, JavaScript parser, PowerShell parser and Bash syntax checks passed |
| SAST | Semgrep auto: 0 findings, 0 parser errors; coverage limitations and reviewed local-tool suppressions documented |
| Windows installer | Clean f505f4d checkout overlaid; old marker retained; no nested src/src; initial overlay file hashes matched |
| Unix installer | Minimal target overlaid via Git Bash; complete final fixtures/installers included; 188 tests passed |
| Clean dependency/build | npm ci installed 306 packages; installed Windows target passed 188 tests, data/permalink validation and all 167 build/output checks |

Required viewport widths: 320, 360, 390, 430, 768, 1024, 1280 and 1440 CSS pixels. Shared layouts, long names and the ten nested commodity routes are included. Screenshots were produced for eight representative pages on mobile/desktop; visual sampling is not a claim of manual inspection of every pixel on all tenants.

## Performance evidence

Lighthouse simulated mobile homepage: Performance 100, Accessibility 100, SEO 100; LCP 1.3 s, CLS 0, TBT 50 ms. Removing unused tenant CSS from discovery and deferring below-fold imagery improved the earlier LCP 2.6s / TBT 210ms result.

Local unthrottled samples of homepage, directory, Lika and Lalisha recorded LCP 0.44–0.81s and CLS 0. Directory synthetic event samples were 72ms. These measurements are lab observations, not field INP or a production-wide Core Web Vitals guarantee. TBT is not INP. Lighthouse evidence covers the homepage, not every tenant.

## Confirmed defects fixed

| Severity | Cause | Correction / evidence |
|---|---|---|
| Release blocking | Source-only permalink guard could miss deleted build outputs | Complete pre-edit 167-route fixture plus build equality and negative mutation tests |
| High | Several canonical strings omitted the separator after BASE_URL | Canonicals normalized to locked shape; known aliases retain their prior canonical business |
| High | Asset/gallery links escaped the GitHub Pages prefix; inferred PNG favicons did not exist | Local resource guard; fixed NAA gallery URL, redirect favicon, and synthetic missing PNG requests |
| High | Intrinsic hero sizing widened small screens; long eyebrows/panels overflowed | Measured browser bounds and minimum-size/wrapping fixes; all eight widths pass |
| High | Shared accent/opacity styles failed contrast; horizontal galleries lacked keyboard focus | Context-aware ink on light/dark sections, focusable galleries and keyboard zoom; Axe sweep/retests |
| Medium | Data validator ignored 61 extra directory entries | Both datasets, duplicate and required-field validation |
| Medium | Search omitted existing product research | Evidence-backed search corpus, token matching, accent normalization and URL restoration |
| Medium | Random slug hashes substituted for art direction | Explicit semantic decisions/rationales for all 154 identities; existing flagship implementations preserved |
| Medium | Installers omitted lock/config and test fixtures; case-sensitive paths were inconsistent | Both real installers exercised; lock/config, audit fixture, source ledger and self-installers included |
| Medium | Mutable Action tags and overbroad deployment permissions | Official commit SHAs, path filters, npm cache, concurrency, build read permissions, deploy-only write permissions |

## Integrity and limits

src/data/routes-baseline.lock.json records every initial source page and generated route, nested products, aliases and prior external destinations. Lika with and without the trailing slash was checked live: both returned HTTP 200 at the exact slash-terminated NFC URL. Hostname, project base and Astro trailingSlash configuration remain unchanged.

ASSET-SOURCES.md inventories 682 brand assets plus 18 other published resources. Unknown origin/licensing is explicitly unknown; retention from the repository is not treated as a fresh permission grant. No new generated product photography or fabricated proof was introduced.

Axe also reports incomplete/manual-review cases for aria-prohibited-attr and color-contrast. Automated absence of violations is not WCAG certification. Focus, gallery/skip-link interactions and representative rendered pages were checked in Chromium. Other browser engines and field telemetry were not tested.

The ZIP is an existing-project source overlay. PATCH-SHA256SUMS.txt verifies all archive payload files, and its verifier rejects tampering and unmanifested additions. ZIP CRC verification and a SHA-256 digest are produced after staging. No newly introduced credentials, node_modules, dist or unrelated private operational scripts are packaged. reports/CHANGE-PROOF.diff provides the cumulative line/diff proof, including preserved pre-existing local changes.
