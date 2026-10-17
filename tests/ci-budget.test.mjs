import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const ROOT = new URL('../', import.meta.url);
const read = (rel) => readFile(new URL(rel, ROOT), 'utf8');

test('CI avoids burning free minutes on every feature-branch push', async () => {
  const ci = await read('.github/workflows/ci.yml');
  assert.match(ci, /workflow_dispatch:/);
  assert.match(ci, /pull_request:/);
  assert.doesNotMatch(ci, /^\s*push:\s*$/m);
  assert.match(ci, /cancel-in-progress:\s*true/);
  assert.match(ci, /timeout-minutes:/);
  assert.match(ci, /cache:\s*['"]?npm['"]?/);
  assert.match(ci, /npm ci/);
});

test('Pages deploy builds only for production-relevant main changes and reuses npm cache', async () => {
  const deploy = await read('.github/workflows/deploy-pages.yml');
  assert.match(deploy, /branches:\s*\n\s*- main/);
  assert.match(deploy, /paths:/);
  assert.match(deploy, /cache:\s*['"]?npm['"]?/);
  assert.match(deploy, /npm ci/);
  assert.match(deploy, /cancel-in-progress:\s*true/);
  assert.match(deploy, /timeout-minutes:/);
});
