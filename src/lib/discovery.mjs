export function normalizeSearch(value = '') {
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/\s+/g, ' ');
}

export function buildDiscoveryProfiles(tenants, research = {}, showcases = {}) {
  return tenants.map((tenant) => {
    const evidence = research[tenant.slug] || {};
    const showcase = showcases[tenant.slug] || {};
    const description = showcase.tagline || evidence.description || tenant.description || '';
    const products = (showcase.highlights || []).map((item) => `${item.title || ''} ${item.body || ''}`).join(' ');
    return { ...tenant, description, searchable: normalizeSearch([tenant.name, tenant.category, `hall ${tenant.hall || ''}`, `booth ${tenant.booth || ''}`, description, evidence.description || '', products].join(' ')) };
  });
}

export function matchesDiscovery(profile, { q = '', sector = '', hall = '' } = {}) {
  return normalizeSearch(q).split(' ').every((word) => profile.searchable.includes(word))
    && (!sector || normalizeSearch(profile.category) === normalizeSearch(sector))
    && (!hall || normalizeSearch(profile.hall) === normalizeSearch(hall));
}
