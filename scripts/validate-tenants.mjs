import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const file = path.resolve('src/data/tenants.json');
const tenants = JSON.parse(fs.readFileSync(file, 'utf8'));
const requiredFields = ['name', 'slug', 'hall', 'booth', 'category'];
const optionalFields = ['description', 'logo', 'theme', 'whatsapp', 'instagram', 'maps', 'website', 'catalog', 'email'];

if (!Array.isArray(tenants)) {
  throw new Error('src/data/tenants.json must contain a JSON array.');
}

const slugs = new Set();
const errors = [];

tenants.forEach((tenant, index) => {
  if (!tenant || typeof tenant !== 'object' || Array.isArray(tenant)) {
    errors.push(`Tenant #${index + 1} must be an object.`);
    return;
  }

  for (const field of requiredFields) {
    if (!(field in tenant)) errors.push(`Tenant #${index + 1} is missing field: ${field}`);
    else if (typeof tenant[field] !== 'string') errors.push(`Tenant #${index + 1} field ${field} must be a string.`);
  }

  for (const field of optionalFields) {
    if (field in tenant && typeof tenant[field] !== 'string') {
      errors.push(`Tenant #${index + 1} optional field ${field} must be a string when provided.`);
    }
  }

  if (!tenant.name?.trim()) errors.push(`Tenant #${index + 1} requires a non-empty name.`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tenant.slug || '')) errors.push(`Tenant #${index + 1} has invalid slug: ${tenant.slug || '(empty)'}`);
  if (slugs.has(tenant.slug)) errors.push(`Duplicate slug: ${tenant.slug}`);
  slugs.add(tenant.slug);
});

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(`Tenant data valid: ${tenants.length} tenant(s).`);
