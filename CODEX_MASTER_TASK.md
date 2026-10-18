# CODEX MASTER TASK — TANGSEL TRADELINK ULTIMATE REDESIGN & PRODUCTION HARDENING

## ROLE & MISSION

Act as a multidisciplinary team consisting of:

- Principal Frontend Engineer (Astro / TypeScript / CSS)
- Awwwards-level Digital Art Director
- Senior Product Designer & UX Researcher
- Conversion Rate Optimization and Behavioral UX Specialist
- Technical SEO & Accessibility Engineer
- Senior QA / Test Automation Engineer
- Release & DevOps Engineer

Your mission is to transform an existing multi-tenant exhibition directory into a visually distinctive, exceptionally usable, production-ready digital experience.

**Repository Workspace:** `D:\code\tangsel-tradelink`
**Production:** https://mycustomid.github.io/tangsel-tradelink/
**Example NFC-embedded URL:** https://mycustomid.github.io/tangsel-tradelink/tenant/lika-snack/

This is an existing live project, NOT a greenfield project.
The website is a multi-business digital showcase for Trade Expo Indonesia 2026, with tenant information, products, contact channels, galleries, and business discovery.

The goal is not merely to make the site look attractive. The goal is to build a genuinely differentiated, usable, trustworthy, responsive digital exhibition platform capable of impressing both real users and experienced web designers.

**EXECUTE THE IMPLEMENTATION END-TO-END. DO NOT STOP AT ANALYSIS, PLANNING, OR RECOMMENDATIONS.**

---

## 1. ABSOLUTE PRIORITY — NFC URL IMMUTABILITY

THIS IS A RELEASE-BLOCKING REQUIREMENT.

Existing tenant URLs have already been programmed into physical NFC cards distributed to businesses.

Therefore:
- NEVER rename existing tenant slugs.
- NEVER change the existing hostname or project base path (`/tangsel-tradelink/`).
- NEVER delete an existing tenant route.
- NEVER change an NFC-linked path to a new naming convention.
- NEVER restructure `/tenant/{slug}/` routes.
- Preserve legacy pages, aliases, and previously published routes (`buminaeenk-freeze-dried`, `ninauka`, `shayfara`).
- Do not accidentally change routing through Astro configuration changes.
- Preserve the existing GitHub Pages deployment path.
- Do not change the actual destinations of contact/social links without evidence.

The Lika Snack URL MUST continue to work exactly as before:
`https://mycustomid.github.io/tangsel-tradelink/tenant/lika-snack/`

This also applies to every other existing NFC-linked tenant URL (all 154 locked permalinks in `src/data/tenant-permalinks.lock.json`).

Before editing anything:
1. Enumerate every route from the current source, including dynamic routes, dedicated `.astro` files, legacy aliases, and nested routes.
2. Read the existing tenant data files and inspect the generated routing behavior.
3. Establish a complete baseline URL manifest (`src/data/tenant-permalinks.lock.json`).
4. Account for both trailing-slash and non-trailing-slash behavior as currently deployed.
5. Save the baseline as a version-controlled regression fixture.
6. Build automated tests asserting that no existing published permalink disappears or silently changes destination.

Run `node scripts/validate-permalinks.mjs` before and after every modification. A successful build is insufficient unless every pre-existing NFC permalink is preserved.

---

## 2. REPOSITORY FORENSIC AUDIT

Start by inspecting the current branch, HEAD, git status, complete repository structure, dependency versions, existing tests, and deployment configuration.

Audit line by line:
- Astro page routing and `getStaticPaths()`
- `SmartNfcShowcase` and adaptive showcase renderers
- Shared components and layout composition
- Tenant data, configurations, and design registry (`src/data/tenant-art-directions.mjs`)
- Homepage (`src/pages/index.astro`) and directory (`src/pages/directory.astro`)
- Static/dynamic URL generation
- Images and asset references (`public/brand/`)
- Responsive CSS (`src/styles/`)
- Client-side search and filters
- Copywriting and metadata
- Canonical URLs and structured data
- GitHub Actions workflows (`.github/workflows/`)
- Patch installer scripts (`apply-patch.sh`, `apply-patch.ps1`)
- Existing regression tests (`tests/*.test.mjs`)

Keep displayed tenant counts data-driven and distinguish active directory entries (151) from legacy URL aliases (3) = 154 total locked URLs.
Document actual defects, root causes, and severity. Fix confirmed defects rather than merely listing them.

---

## 3. DESIGN PHILOSOPHY — ONE WORLD, MANY IDENTITIES

Use these award-winning references as a strategic benchmark:
- **Shop Local RI:** https://www.awwwards.com/inspiration/product-listings-filtering-shop-local-ri
- **Elektra Virtual Museum:** https://www.awwwards.com/inspiration/exhibition-page

Design principle:
**One World, Many Identities.**

TradeLink should have one recognizable product-level design language, but each tenant must retain its own brand character.

Consistent global elements:
- Navigation logic
- Search/discovery experience
- Back-to-directory navigation (`/directory/`)
- Contact-action semantics
- Accessibility
- Basic business identification
- Hall/booth information
- Predictable mobile interactions

Tenant-specific elements:
- Art direction
- Hero composition
- Typography treatment
- Color system
- Content hierarchy
- Grid architecture
- Editorial narrative
- Gallery composition
- Material/surface treatment
- Motion character
- CTA presentation

Do not generate superficially different designs by randomly assigning colors, radii, fonts, or CSS classes. Evaluate actual rendered outcomes.

---

## 4. TENANT-BY-TENANT ART DIRECTION

Audit EVERY existing tenant and assign a brand-appropriate design strategy in `src/data/tenant-art-directions.mjs`.

Examples:
- Coffee → editorial coffee culture / roastery publication
- Snacks → expressive product-led packaging editorial
- Fashion → fashion magazine / atelier lookbook
- Handicraft → artisan journal / material storytelling
- Furniture → architectural furniture catalogue
- Fragrance → luxury beauty editorial
- Industrial manufacturing → engineering portfolio / technical editorial
- Logistics → route/network/data-inspired interface
- Technology → restrained technical interface / product storytelling
- Hospitality → cinematic destination journal
- Agriculture → provenance and product-quality narrative
- Government → institutional/civic visual system

Do not force every tenant into the same repeated structure. Build a maintainable system of reusable composition primitives while allowing genuinely different page layouts.
Preserve dedicated flagship implementations when they are already stronger than the shared renderer.
Do not destroy working content in pursuit of visual novelty. (Crucially: preserve Lalisha Food's 17 authentic uncropped WebP photos, logo emblem, favicon, and retail outlets).

---

## 5. AUTHENTIC VISUAL CONTENT — STRICT ANTI-AI-SLOP

Use an evidence-first visual sourcing process.
Asset priority:
1. Official business website
2. Official Instagram/social accounts
3. Official product catalogue
4. Existing repository photographs
5. Licensed real photography with appropriate attribution
6. Typography-led fallback when authentic photography is unavailable

Avoid:
- Invented product images
- Fake customer testimonials
- Fake certifications
- Fake performance statistics
- Fake factory/production photos
- Unrelated product images presented as the tenant's actual products
- Unverified brand logos
- AI-generated stock-looking hero images
- Tiny favicons enlarged into massive hero images
- Identical visual placeholders across unrelated businesses

Maintain an asset provenance ledger (`ASSET-SOURCES.md`) listing source URL, tenant association, rights/usage status where known, and whether the image represents the actual business.

For Lika Snack, preserve the existing verified links (`@likasnack.id`, both Maps pins, WhatsApp `+6282210889077`) and authentic context visual (`public/brand/lika-snack/lika-snack-context.svg`).
For Lalisha Food, preserve all 17 authentic retail & certification WebP assets and transparent emblem logo.

---

## 6. HOMEPAGE & DIRECTORY — DISCOVERY-FIRST UX

Homepage (`src/pages/index.astro`) and directory (`src/pages/directory.astro`) must function as an actual discovery platform.
Prioritize:
- Immediate understanding of what TradeLink does
- Fast tenant discovery
- Search by tenant name, business sector, products, hall, and booth
- Clear filter states
- Shareable filter/search parameters
- Distinction between primary and secondary actions
- Useful tenant previews
- Accessible list/grid view where appropriate
- Featured brand storytelling
- Reliable empty states
- Clear navigation from directory to profile and back (`/directory/`)

Use editorial hierarchy, whitespace, precise typography, deliberate composition, and real imagery.

---

## 7. UX PSYCHOLOGY & CONVERSION

The principal user journey:
**Discover → Understand → Evaluate → Trust → Contact**

For each tenant page:
- Who is this business?
- What products or services does it actually provide?
- Why might it be relevant to a prospective buyer?
- What supporting information or visual evidence is available?
- How can a visitor contact or evaluate the business?

Use progressive disclosure. Each hero should have one clearly prioritized primary action. Secondary options (website, catalogue, Instagram, WhatsApp, email, Maps) must have clear hierarchy.
Ensure every CTA leads to the expected verified destination.

---

## 8. PROFESSIONAL COPYWRITING

Rewrite repetitive, artificial-sounding copy using specific information that is actually available for each tenant.
Avoid generic phrases (e.g., "innovative solutions", "empowering the future", "elevating excellence").
Use concise, precise, commercially useful copy. Support Indonesian and English where appropriate. If data is missing, omit the unsupported claim instead of fabricating content.

---

## 9. RESPONSIVENESS — MOBILE AND DESKTOP ARE BOTH FIRST-CLASS

Test compositions at: 320px, 360px, 390px, 430px, 768px, 1024px, 1280px, 1440px.
Check:
- Horizontal overflow
- Text clipping and truncation
- Unexpected overlap
- Contrast
- Long-name typography
- Navigation usability
- Keyboard support
- Mobile thumb-zone reachability
- Minimum 44×44 CSS pixel touch targets (prefer 48×48)
- Sticky CTAs and safe-area insets
- Reduced-motion behavior
- Focus visibility
- Layout stability

---

## 10. ACCESSIBILITY, SEO & PERFORMANCE

Target WCAG 2.2 AA.
Audit heading hierarchy, landmarks, labels, keyboard navigation, links, focus behavior, color contrast.
Technical SEO:
- Unique page titles
- Accurate descriptions
- Valid canonical URLs matching NFC permalink shape
- Proper Open Graph metadata
- Appropriate structured data
- Valid internal links

Performance targets: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1.

---

## 11. GITHUB ACTIONS & COST OPTIMIZATION

Review `.github/workflows/ci.yml` and `.github/workflows/deploy-pages.yml`:
- Workflow triggers (PR / manual dispatch / push to main)
- Path filters
- Dependency caching
- Concurrency cancellation
- Minimal permissions

---

## 12. TEST-DRIVEN QUALITY ASSURANCE

Automated tests covering:
1. Complete baseline-to-output NFC permalink equality (154 URLs)
2. Existing dynamic tenant routes
3. Dedicated tenant routes
4. Legacy aliases and redirects
5. Duplicate slug detection
6. Missing data or missing generated pages
7. Canonical and internal link integrity
8. GitHub Pages BASE_URL behavior
9. Search/filter functionality
10. Invalid query parameters
11. CTA destination mapping
12. Images and fallback behavior
13. Responsive composition
14. Keyboard accessibility
15. Long business names
16. Tenant-specific visual differentiation
17. Installer completeness
18. Build script consistency
19. Data-driven tenant counts
20. ZIP/package integrity

Must pass:
- `node scripts/validate-permalinks.mjs`
- `npm test`
- `npm run validate:data`
- `npm run build`

---

## 13. CHECKPOINTS FOR EXECUTION

- **Checkpoint A:** Repository audit and immutable URL baseline (verify 154 URLs).
- **Checkpoint B:** Shared discovery/navigation architecture (`index.astro`, `directory.astro`, `discovery-editorial.css`).
- **Checkpoint C:** Tenant-specific composition and visual system (`tenant-art-directions.mjs`, `AdaptiveTenantShowcase.astro`, `SmartNfcShowcase.astro`).
- **Checkpoint D:** Content, assets, copywriting (`ASSET-SOURCES.md`, verified tenant JSONs).
- **Checkpoint E:** Responsive, accessibility, and performance hardening.
- **Checkpoint F:** Full regression, build, and browser validation (`172+ tests`, `167 pages built`).
- **Checkpoint G:** Packaging and final verification (create cumulative ZIP patch, compute SHA256, verify installation scripts).

---

## 14. FINAL DELIVERABLE — ZIP PATCH ONLY

**IMPORTANT: DO NOT PUSH DIRECTLY TO GITHUB.**
Do not merge into main, trigger remote deployments, or publish changes.
Work locally in `D:\code\tangsel-tradelink`.

Prepare one cumulative, auditable ZIP patch named:
`D:\code\tangsel-tradelink-awwwards-final-rc.zip` (or similar clean auditable name).

The archive must include:
- All added or modified source files (`src/`, `public/`, `scripts/`, `.github/`, `.nvmrc`, `package.json`, `tests/`)
- Baseline/lock fixture (`src/data/tenant-permalinks.lock.json`)
- Necessary build/validation scripts (`scripts/validate-permalinks.mjs`, `scripts/validate-tenants.mjs`)
- Corrected patch installers for Windows and Unix (`apply-patch.ps1`, `apply-patch.sh`)
- `PATCH-MANIFEST.md` / `PATCH-MANIFEST.txt`
- `VERIFICATION-REPORT.md` / `VERIFICATION-REPORT.txt`
- `ASSET-SOURCES.md`
- `PATCH-INFO.txt`
- `SHA256SUMS.txt` / `PATCH-SHA256SUMS.txt`

Output the absolute path to the generated ZIP and its SHA-256 checksum in your final report.
Begin execution immediately.
