# Tangsel TradeLink — Final Performance Hardening RC3

Supersedes RC2. Apply this ZIP directly to a checkout of `mycustomid/tangsel-tradelink`; RC2 is not required first.

## What changes
- Global premium-showcase renderer: LCP hero high priority, all gallery media lazy + low priority, requestAnimationFrame throttling, content-visibility for below-the-fold chapters, reduced-data safeguards.
- Generic tenant cards: stable logo dimensions; directory cards skip offscreen painting.
- Roemah Koffie: same priority/lazy discipline and throttled scroll progress.
- Raja Freeze Dried: 636.7 KB JPEG hero replaced by 227.5 KB WebP; 24.65 MB product PNG removed from render and deleted by patch script; stale 4.28 MB extracted JPEG deleted because it is not referenced by repository code.
- SAMARA: 326.2 KB real-photo hero replaced by 17.3 KB WebP, preserving the authentic source photo.
- Previous RC2 OSINT/content/SEO hardening is included.

## Apply
Windows PowerShell:
```powershell
Expand-Archive .\tangsel-tradelink-final-performance-rc3.zip -DestinationPath .\ttl-rc3
.\ttl-rc3\tangsel-tradelink-final-performance-rc3\apply-patch.ps1 -Target C:\path\to\tangsel-tradelink
cd C:\path\to\tangsel-tradelink
npm test
npm run build
```

macOS/Linux:
```bash
unzip tangsel-tradelink-final-performance-rc3.zip
./tangsel-tradelink-final-performance-rc3/apply-patch.sh /path/to/tangsel-tradelink
cd /path/to/tangsel-tradelink
npm test
npm run build
```

## Hosting note
The site is static and well suited to bursty read traffic, but GitHub Pages documents a soft 100 GB/month bandwidth limit. If traffic becomes materially larger than an exhibition-directory workload, place a CDN/custom hosting layer in front rather than restoring oversized media.
