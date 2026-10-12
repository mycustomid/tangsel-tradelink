import { defineConfig } from 'astro/config';

const isDev = process.argv.includes('dev') || process.env.NODE_ENV === 'development';

export default defineConfig({
  site: 'https://mycustomid.github.io',
  base: isDev ? '/' : '/tangsel-tradelink',
  output: 'static',
  trailingSlash: 'never',
});
