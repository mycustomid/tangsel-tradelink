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

Tenant data lives in `src/data/tenants.json` and is sourced from the official TEI 2026 floorplan supplied for this project.

Current MVP dataset includes verified exhibitor/tenant entries across the available TEI 2026 halls. Hall and category values follow the floorplan; booth numbers are only filled when the mapping can be made with sufficient confidence. Unknown contact/link fields remain empty and are hidden by the UI.

Every tenant object uses these string fields:

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

## MVP scope

- Astro static site
- Tenant directory homepage
- Search and simple category/hall filters
- Unique `/tenant/[slug]` pages
- Category-aware visual themes
- Conditional WhatsApp, Instagram, Maps, Website, Catalog and Email buttons
- Data validation tests
- GitHub Actions test + production build

Out of scope for this MVP: AI, n8n, CRM, dashboard, authentication and other backend workflows.
