export type TenantTheme = 'default' | 'food' | 'beauty' | 'industrial' | 'editorial';
export type TenantResearchStatus = 'web-verified' | 'floorplan-only';

export interface Tenant {
  name: string;
  slug: string;
  hall: string;
  booth: string;
  category: string;
  description?: string;
  logo?: string;
  theme?: TenantTheme | string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  tiktok?: string;
  youtube?: string;
  linktree?: string;
  maps?: string;
  website?: string;
  catalog?: string;
  email?: string;
  sources?: string[];
  researchStatus?: TenantResearchStatus | string;
  verifiedAt?: string;
}
