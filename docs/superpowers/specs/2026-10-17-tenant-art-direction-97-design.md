# 97-Tenant Art Direction Design

## Goal
Replace the generic tenant fallback with a production-ready adaptive showcase while preserving existing verified flagship pages. Every one of the 97 exported tenant slugs receives an explicit art-direction fingerprint.

## Design principles
- Real brand/source data first; never fabricate photography, claims, addresses, contacts, or certifications.
- When imagery is unavailable, use typography, geometry, material texture, booth metadata, and verified brand marks instead of fake stock/AI imagery.
- Keep the existing high-information flagship/showcase pages where they are stronger than the adaptive fallback.
- Generic dynamic tenants use one renderer with explicit per-slug direction data, not a category-only theme.
- Fingerprints vary across archetype, layout, hero composition, typography, surface, motion, accent, and media treatment.
- Mobile composition is intentional and readable; reduced motion and reduced-data users retain full content.

## Architecture
1. `src/data/tenant-art-directions.mjs` is the explicit 97-slug registry.
2. `src/components/AdaptiveTenantShowcase.astro` renders non-flagship tenants using the registry and verified tenant data.
3. `src/pages/tenant/[slug].astro` keeps existing flagships/showcases and routes the remaining dynamic tenants to the adaptive renderer.
4. `src/styles/adaptive-tenant-showcase.css` contains renderer styling driven by semantic data attributes, with layout/palette/typography variants that combine into unique fingerprints.
5. Existing dedicated Tangsel pages remain dedicated but are included in the registry for complete auditability.

## Acceptance criteria
- 97/97 exported slugs have registry entries.
- At least 80 distinct full design fingerprints.
- Generic route no longer uses the old `TenantHeader` + link-card fallback.
- Existing flagship routes continue to render through their existing components.
- No guessed external links or synthetic brand claims.
- `npm test` and `npm run build` pass in CI.
