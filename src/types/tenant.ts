export type TenantTheme = 'default' | 'food' | 'beauty' | 'industrial' | 'editorial';

export interface Tenant {
  name: string;
  slug: string;
  hall: string;
  booth: string;
  category: string;
  description: string;
  logo: string;
  theme: string;
  whatsapp: string;
  instagram: string;
  maps: string;
  website: string;
  catalog: string;
  email: string;
}
