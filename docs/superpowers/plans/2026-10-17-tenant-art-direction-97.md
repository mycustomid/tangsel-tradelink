# 97-Tenant Art Direction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give all 97 exported tenant profiles explicit art direction and replace the generic dynamic fallback with an adaptive, verified-data-first renderer.

**Architecture:** Preserve existing flagship/showcase routes, add a 97-slug design registry, and route non-flagship tenants through a semantic adaptive component. CSS is driven by multiple orthogonal data dimensions rather than a handful of category skins.

**Tech Stack:** Astro 7.3, Node 22.12 test runner, CSS.

**Spec:** `docs/superpowers/specs/2026-10-17-tenant-art-direction-97-design.md`

## Global Constraints
- No invented photography, company claims, social links, contacts, certifications, or addresses.
- Existing verified flagship/showcase components remain functional.
- 97 exported slugs must be covered explicitly.
- At least 80 distinct design fingerprints.
- Reduced-motion and mobile behavior must remain usable.

## Review Focus
- Floorplan-only tenants still look intentional without fake imagery.
- Very long organization names do not overflow.
- Zero-link tenants still have a useful booth/discovery page.
- Remote logos or images failing do not collapse the hero.
- Existing premium tenant routing takes precedence over adaptive fallback.

---

### Task 1: Lock coverage contract
**Files:** Create `tests/tenant-art-direction-97.test.mjs`.
- [x] Add failing coverage/renderer contract tests.
- [ ] Confirm CI fails because registry/component are missing.

### Task 2: Build explicit direction registry
**Files:** Create `src/data/tenant-art-directions.mjs`.
- [ ] Add all 97 slugs with eight art-direction dimensions.
- [ ] Verify uniqueness threshold and coverage test.

### Task 3: Build adaptive renderer
**Files:** Create `src/components/AdaptiveTenantShowcase.astro`; create `src/styles/adaptive-tenant-showcase.css`.
- [ ] Render verified metadata, actions, source status, and booth context.
- [ ] Implement semantic art-direction attributes and media fallbacks.
- [ ] Add responsive/reduced-motion/performance hardening.

### Task 4: Replace generic route fallback
**Files:** Modify `src/pages/tenant/[slug].astro`.
- [ ] Keep Roemah Koffie and existing showcase configs first.
- [ ] Route all remaining dynamic tenants to AdaptiveTenantShowcase.
- [ ] Remove obsolete generic TenantHeader/LinkButton fallback.

### Task 5: Final verification
- [ ] Run full CI tests.
- [ ] Run Astro production build.
- [ ] Secret-scan changed source.
- [ ] Read back branch diff and verify only intended files changed.
