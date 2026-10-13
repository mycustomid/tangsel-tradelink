const ALLOWED_THEMES = new Set(['default', 'food', 'beauty', 'industrial', 'editorial']);

export function resolveTheme(tenant = {}) {
  const explicit = String(tenant.theme || '').trim().toLowerCase();
  if (ALLOWED_THEMES.has(explicit)) return explicit;

  const category = String(tenant.category || '').toLowerCase();
  if (/food|beverage|f&b|coffee|snack|culinary|agri/.test(category)) return 'food';
  if (/beauty|cosmetic|personal care|wellness|skincare|pharma/.test(category)) return 'beauty';
  if (/industrial|manufactur|machinery|engineering|automotive|technology/.test(category)) return 'industrial';
  if (/fashion|textile|home decor|furniture|craft|handicraft|interior/.test(category)) return 'editorial';
  return 'default';
}

export function uniqueValues(tenants, key) {
  return [...new Set(tenants.map((tenant) => String(tenant?.[key] || '').trim()).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, 'id'));
}

export function filterTenants(tenants, { query = '', category = '', hall = '' } = {}) {
  const normalizedQuery = String(query).trim().toLowerCase();
  const normalizedCategory = String(category).trim().toLowerCase();
  const normalizedHall = String(hall).trim().toLowerCase();

  return tenants.filter((tenant) => {
    const haystack = [tenant.name, tenant.category, tenant.hall, tenant.booth, tenant.description]
      .map((value) => String(value || '').toLowerCase()).join(' ');
    return (!normalizedQuery || haystack.includes(normalizedQuery))
      && (!normalizedCategory || String(tenant.category || '').toLowerCase() === normalizedCategory)
      && (!normalizedHall || String(tenant.hall || '').toLowerCase() === normalizedHall);
  });
}

function safeWebUrl(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  if (raw.startsWith('/')) return raw;
  try {
    const parsed = new URL(raw);
    return ['http:', 'https:'].includes(parsed.protocol) ? parsed.toString() : '';
  } catch { return ''; }
}

function whatsappUrl(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  const asUrl = safeWebUrl(raw);
  if (asUrl) return asUrl;
  const digits = raw.replace(/\D/g, '');
  return digits.length >= 8 ? `https://wa.me/${digits}` : '';
}

function mapsUrl(tenant = {}) {
  const explicit = safeWebUrl(tenant.maps);
  if (explicit) return explicit;
  const query = String(tenant.address || tenant.name || '').trim();
  if (!query) return '';
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function emailUrl(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  const email = raw.replace(/^mailto:/i, '');
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? `mailto:${email}` : '';
}

export function getTenantLogo(tenant = {}) {
  const explicitLogo = safeWebUrl(tenant.logo);
  if (explicitLogo) return explicitLogo;
  const website = safeWebUrl(tenant.website);
  if (!website || website.startsWith('/')) return '';
  try {
    const hostname = new URL(website).hostname;
    return hostname ? `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(`https://${hostname}`)}` : '';
  } catch { return ''; }
}

export function makeMonogramFavicon(label = '', background = '#1e3a8a', foreground = '#ffffff') {
  const letters = String(label || '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] || '')
    .join('')
    .toUpperCase() || 'TL';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${background}"/><text x="32" y="41" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="26" font-weight="700" fill="${foreground}" text-anchor="middle">${letters}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function resolveTenantFavicon(tenant = {}, config = {}) {
  if (config.favicon) return config.favicon;
  if (config.logo) return config.logo;
  if (tenant.favicon) return tenant.favicon;
  if (tenant.logo) return tenant.logo;

  const website = safeWebUrl(tenant.website || config.website);
  if (website && !website.startsWith('/')) {
    try {
      const hostname = new URL(website).hostname;
      if (hostname && !hostname.includes('github.io') && !hostname.includes('canva.site') && !hostname.includes('google.com')) {
        return `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(`https://${hostname}`)}`;
      }
    } catch {}
  }

  if (config.heroImage && (/\.(png|webp|svg|jpg|jpeg)$/i.test(config.heroImage)) && !config.heroImage.includes('tei-batch')) {
    return config.heroImage;
  }

  const bg = config.palette?.accent || '#1e3a8a';
  return makeMonogramFavicon(tenant.name || config.brandLabel, bg, '#ffffff');
}

export function getTenantLinks(tenant = {}) {
  const candidates = [
    ['whatsapp', 'WhatsApp', 'whatsapp', whatsappUrl(tenant.whatsapp)],
    ['instagram', 'Instagram', 'instagram', safeWebUrl(tenant.instagram)],
    ['facebook', 'Facebook', 'facebook', safeWebUrl(tenant.facebook)],
    ['linkedin', 'LinkedIn', 'linkedin', safeWebUrl(tenant.linkedin)],
    ['tiktok', 'TikTok', 'tiktok', safeWebUrl(tenant.tiktok)],
    ['youtube', 'YouTube', 'youtube', safeWebUrl(tenant.youtube)],
    ['website', 'Official Website', 'website', safeWebUrl(tenant.website)],
    ['maps', 'Google Maps', 'maps', mapsUrl(tenant)],
    ['catalog', 'Product Catalog', 'catalog', safeWebUrl(tenant.catalog)],
    ['email', 'Email', 'email', emailUrl(tenant.email)],
  ];
  return candidates.filter(([, , , href]) => Boolean(href)).map(([key, label, icon, href]) => ({ key, label, icon, href }));
}