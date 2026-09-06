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

export function getTenantLinks(tenant = {}) {
  const candidates = [
    ['whatsapp', 'WhatsApp', 'whatsapp', whatsappUrl(tenant.whatsapp)],
    ['instagram', 'Instagram', 'instagram', safeWebUrl(tenant.instagram)],
    ['facebook', 'Facebook', 'facebook', safeWebUrl(tenant.facebook)],
    ['linkedin', 'LinkedIn', 'linkedin', safeWebUrl(tenant.linkedin)],
    ['tiktok', 'TikTok', 'tiktok', safeWebUrl(tenant.tiktok)],
    ['youtube', 'YouTube', 'youtube', safeWebUrl(tenant.youtube)],
    ['website', 'Official Website', 'website', safeWebUrl(tenant.website)],
    ['linktree', 'Official Links', 'linktree', safeWebUrl(tenant.linktree)],
    ['maps', 'Google Maps', 'maps', safeWebUrl(tenant.maps)],
    ['catalog', 'Product Catalog', 'catalog', safeWebUrl(tenant.catalog)],
    ['email', 'Email', 'email', emailUrl(tenant.email)],
  ];
  return candidates.filter(([, , , href]) => Boolean(href)).map(([key, label, icon, href]) => ({ key, label, icon, href }));
}
