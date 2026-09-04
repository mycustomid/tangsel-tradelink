# Tangsel TradeLink

Mobile-first NFC landing page directory for Trade Expo Indonesia 2026 tenants, built with Astro.

## Requirements

- Node.js 22.12.0+
- npm 10+

## Run locally

```bash
npm install
npm run dev
```

Production checks:

```bash
npm test
npm run build
```

## Tenant data

Tenant data lives in `src/data/tenants.json`. The repository intentionally starts with an empty array until verified TEI 2026 floorplan data is supplied.

Every tenant object must contain these string fields:

```json
{
  "name": "",
  "slug": "",
  "hall": "",
  "booth": "",
  "category": "",
  "description": "",
  "logo": "",
  "theme": "",
  "whatsapp": "",
  "instagram": "",
  "maps": "",
  "website": "",
  "catalog": "",
  "email": ""
}
```

Empty optional values are allowed. Buttons are only rendered when a safe value is available.

Supported theme values: `default`, `food`, `beauty`, `industrial`, `editorial`. If `theme` is empty, a conservative category-based fallback is used.

Run `npm run validate:data` after editing tenant data. Duplicate/invalid slugs and malformed records fail the build before Astro runs.
