const fs = require('fs');
const path = require('path');

const dir = 'D:/code/tangsel-tradelink/src/pages/tenant';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro') && f !== '[slug].astro');

let patched = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Check if resolveTenantFavicon is already imported
  if (!content.includes('resolveTenantFavicon')) {
    content = content.replace(
      "import BaseLayout from '../../layouts/BaseLayout.astro';",
      "import BaseLayout from '../../layouts/BaseLayout.astro';\nimport { resolveTenantFavicon } from '../../lib/tenant-utils.mjs';"
    );
  }

  // Check if favicon prop is in BaseLayout
  if (!content.includes('favicon=')) {
    content = content.replace(
      '<BaseLayout',
      '<BaseLayout favicon={resolveTenantFavicon(tenant, config)}'
    );
    fs.writeFileSync(filePath, content, 'utf-8');
    patched++;
  }
}

console.log(`Successfully patched favicon across ${patched} tenant pages!`);
