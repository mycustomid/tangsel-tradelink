# Security review — local release candidate

The release is a static GitHub Pages build. No server runtime, database or authentication service is added.

- Semgrep `scan --config=auto`: 0 findings, 0 parser errors in the completed scan. Rules do not fully analyze Astro templates; Astro compilation, safe text rendering, generated-link validation and browser checks provide additional coverage.
- GitHub Actions are pinned to official tag commit SHAs resolved from their repositories. Build gets contents/read and pages/read; deployment alone gets pages/write and id-token/write. No remote workflow was dispatched.
- QA HTTP serving is loopback-only. The shared server rejects invalid percent encoding, traversal segments, wrong project-prefix matches and real paths outside the output directory. Tests exercise the boundary. The local HTTP rule and an allowlisted asset download path are documented inline review suppressions, not production transport exemptions.
- Query state is written with textContent and URLSearchParams; no search text is inserted with innerHTML. Tenant contact destinations are compared against the pre-edit rendered fixture.
- Public release packaging uses an explicit file allowlist. Private research transcripts, operational scripts, credentials, .env files, node_modules and build output are excluded.

## Unresolved dependency risk — production approval blocked

Bos explicitly requires Astro 5. The latest available 5.x release selected is 5.18.2. The registry audit reports one critical Astro package finding covering multiple advisories. The suggested official resolution requires Astro 7.4.0, conflicting with that requirement. This archive therefore remains an RC and is **not represented as vulnerability-free or unconditionally production-ready**.

The project builds trusted local content to static HTML. That removes a deployed Node/SSR attack surface, but it does not establish that every listed Astro vulnerability is inapplicable. Build/development and future untrusted content remain relevant. Do not expose the development server publicly. A separate decision to permit a patched major version or an upstream 5.x backport is required to clear this release blocker.

Transitive sharp and esbuild vulnerabilities were resolved with exact overrides (sharp 0.35.5, esbuild 0.28.2), followed by successful build verification. Other fixable transitive dependencies were updated without forcing an Astro major upgrade.

Official advisory examples: https://github.com/advisories/GHSA-26w7-cxv4-gfx2 and https://github.com/advisories/GHSA-j687-52p2-xcff . Complete audit evidence is included alongside this report.
