import decisions from './tenant-design-decisions.json' with { type: 'json' };
// Auditable business-led decisions. No slug hashing or random visual assignment.
export const TENANT_ART_DIRECTIONS = Object.freeze(Object.fromEntries(Object.entries(decisions).map(([slug, decision]) => [slug, Object.freeze(decision)])));
export function getTenantArtDirection(slug) { return TENANT_ART_DIRECTIONS[slug] || null; }
export function getTenantArtDirectionForAnySlug(slug) {
 return getTenantArtDirection(slug) || Object.freeze({archetype:'editorial',layout:'ledger',hero:'typographic',type:'grotesk',surface:'paper',motion:'reveal',media:'type-led',accent:'#285d62',rationale:'Unclassified profile: restrained typography until business context is available.'});
}
