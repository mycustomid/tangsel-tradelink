import tenants from './tenants.json';
import extras from './tenants-extra.json';
import { buildDiscoveryProfiles } from '../lib/discovery.mjs';

const research = Object.assign({}, ...Object.values(import.meta.glob('./research-*.json', { eager: true, import: 'default' })));
const showcases = Object.fromEntries(Object.entries(import.meta.glob('./showcases/*.json', { eager: true, import: 'default' })).map(([file, config]) => [file.split('/').pop().replace('.json', ''), config]));
export const discoveryProfiles = buildDiscoveryProfiles([...tenants, ...extras], research, showcases);
