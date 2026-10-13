# Tangsel TradeLink — 46 Tenant E2E Batch Patch

Baseline commit: `27d98a8452ef1ea6d84e7d167434fea770f08a9f`

## What this patch does
- Adds **38 new unique tenant routes** and showcase JSON files.
- Completes the official **46-row audit** as 45 canonical profiles because Ladifa Collection appears twice (#3 and #8) and is intentionally consolidated to `/tenant/ladifa-collection`.
- Preserves the 7 already-live official profiles and all previous extra showcases.
- Expands `SmartNfcShowcase.astro` with seven visual modes: fashion, food, craft, beauty, beverage, industrial and tech.
- Uses real repository assets for **Snapclean** and **Health Today**.
- Generates lightweight local editorial SVG hero art for tenants without verified product photography; these graphics are explicitly illustrative and do not impersonate product photos.
- Publishes only verified/handover-provided actions; missing channels stay missing instead of becoming guessed links.
- Does not copy WA Gateway infrastructure identifiers, server/database data, or payment-account details from `README_TASK.md`.

## Public-source checked profiles in this batch
- Fenda Iriani
- Shirudo Lab
- DANISCAKELICIO
- PT Cosmar
- Dapur Nanay
- Pempek Wak Ebot
- Jahe Hayatiqu
- FENNYCROCHE
- Snapclean
- Health Today
- Batinos Pastry
- Lalisha Food
- Datik Batik
- Dodol Betawi Haji Imang

## Profiles intentionally marked links-pending
- Ladifa Collection
- Eni Chandra Shanti

## Apply (Windows)
```powershell
Expand-Archive .\tangsel-tradelink-46-tenant-final-patch.zip -DestinationPath .\patch
.\patch\tangsel-tradelink-46-tenant-final-patch\apply-patch.ps1 -Target D:\code\tangsel-tradelink
cd D:\code\tangsel-tradelink
npm test
npm run build
```

## Important verification boundary
The patch regression suite validates profile completeness, duplicate consolidation, route/config registration, source-aware actions, asset references and secret leakage.
A full Astro production build still needs to run in the complete repository checkout because this ZIP is a patch, not a full clone with installed dependencies.


## Manual OSINT final pass
This revision supersedes the earlier batch draft. A second manual search pass upgraded profiles where specific public evidence exists, including Fenda/KEMANIA, Peyek Den Bagus, Lika Snack, DANISCAKELICIO, PT Cosmar, Dapur Nanay, Pempek Wak Ebot, PT Niaga Citra Mandiri, RHR Snack, Rosniati, Aliya's Cookies / Eni Chandra, Jahe Hayatiqu, OCHOKAT, FENNYCROCHE, Snapclean, Health Today, Batinos Pastry, Lalisha Food, Tokibi Coffee, Dapur Mba' Wanti, Datik Batik, Dodol Betawi Haji Imang, Larrisa Food, CV Makmur Jaya Sentosa and Shirudo Lab.

Where web results were ambiguous or conflicted with the project handover (for example Titik Kurniasih, Haira, Meraki, GiGa Tech and Peddler Indonesia), the patch deliberately retains a handover/pending verification state rather than binding an unrelated business.

A source ledger is included at `docs/OSINT-SOURCE-LEDGER.md`.
