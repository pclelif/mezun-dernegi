import test from 'node:test';
import assert from 'node:assert/strict';
import { isAdminUser } from '../src/lib/supabase/admin-auth.ts';
import { parseAdminMutation } from '../src/lib/supabase/admin-validation.ts';

const id = '00000000-0000-0000-0000-000000000001';
test('only verified users with server-managed admin metadata qualify', () => {
  assert.equal(isAdminUser(null), false);
  assert.equal(isAdminUser({ id, user_metadata: { role: 'admin' }, app_metadata: {} }), false);
  assert.equal(isAdminUser({ id, email: 'admin@example.com', app_metadata: {} }), false);
  assert.equal(isAdminUser({ id, user_metadata: { role: 'admin' }, app_metadata: { role: 'member' } }), false);
  assert.equal(isAdminUser({ id, app_metadata: { role: 'admin' } }), true);
});
test('destructive operations must select one exact record', () => {
  for (const match of [undefined, {}, { id: null }, { id: '' }, { title: 'test' }, { id, title: 'test' }, { id: 'not-a-uuid' }]) {
    assert.throws(() => parseAdminMutation({ table: 'events', action: 'delete', match }));
  }
  assert.doesNotThrow(() => parseAdminMutation({ table: 'events', action: 'delete', match: { id } }));
});
test('reject unknown tables, mass assignment and malformed payloads', () => {
  for (const body of [null, [], { table: 'users', action: 'delete', match: { id } }, { table: '__proto__', action: 'insert', data: {} },
    { table: 'events', action: 'insert', data: [] }, { table: 'events', action: 'update', match: { id }, data: { id } },
    { table: 'events', action: 'insert', data: { role: 'admin' } }, { table: 'events', action: 'insert', data: { is_published: 'true' } },
    { table: 'events', action: 'upsert', data: { title: 'x' }, onConflict: 'title' },
    { table: 'contact_messages', action: 'update', match: { id }, data: { email: 'attacker@example.com' } }]) {
    assert.throws(() => parseAdminMutation(body));
  }
});
test('legitimate editor payloads remain valid', () => {
  for (const body of [
    { table: 'events', action: 'insert', data: { title: 'Etkinlik', slug: 'etkinlik', description: null, images: [], image_crops: [], is_published: true } },
    { table: 'site_content', action: 'upsert', onConflict: 'section', data: { section: 'iletisim', content: { email: 'test@example.com' }, updated_at: new Date().toISOString() } },
    { table: 'gallery_images', action: 'insert', data: [{ gallery_id: id, image_url: '/test.jpg', crop: null, display_order: 0 }] },
    { table: 'contact_messages', action: 'update', data: { is_read: true }, match: { id } },
  ]) assert.doesNotThrow(() => parseAdminMutation(body));
});
// Exercise the actual HTTP handler independently of Proxy; only the auth/database boundary is mocked.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
const require = createRequire(import.meta.url);
const ts = require('typescript');
function loadHandler(auth) {
  const source = readFileSync(new URL('../src/app/api/admin/db/route.ts', import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const testModule = { exports: {} };
  vm.runInNewContext(compiled, { exports: testModule.exports, module: testModule, URL, require: name => {
    if (name === '@/lib/supabase/require-admin') return { requireAdmin: async () => auth };
    if (name === '@/lib/supabase/admin-validation') return { parseAdminMutation };
    return require(name);
  } });
  return testModule.exports.POST;
}
const request = (body, headers = {}) => new Request('https://example.com/api/admin/db', {
  method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body),
});
test('HTTP handler denies unauthenticated and non-admin callers even without Proxy', async () => {
  for (const status of [401, 403]) {
    const post = loadHandler({ ok: false, status });
    assert.equal((await post(request({ table: 'events', action: 'delete', match: { id } }))).status, status);
  }
});
test('HTTP handler blocks cross-site, malformed and unfiltered admin mutations before database access', async () => {
  let writes = 0;
  const post = loadHandler({ ok: true, supabase: { from() { writes++; throw new Error('unexpected write'); } } });
  assert.equal((await post(request({ table: 'events', action: 'delete', match: {} }))).status, 400);
  assert.equal((await post(request({}, { origin: 'https://attacker.example' }))).status, 403);
  assert.equal((await post(request({}, { 'sec-fetch-site': 'cross-site' }))).status, 403);
  assert.equal((await post(request({}, { 'content-type': 'text/plain' }))).status, 415);
  assert.equal((await post(new Request('https://example.com/api/admin/db', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{broken' }))).status, 400);
  assert.equal(writes, 0);
});
test('HTTP handler performs a validated administrator write with the session client', async () => {
  const calls = [];
  const post = loadHandler({ ok: true, supabase: { from(table) {
    calls.push(table);
    return { insert(data) { calls.push(data); return { select: async () => ({ data: [{ id }], error: null }) }; } };
  } } });
  const response = await post(request({ table: 'events', action: 'insert', data: { title: 'Etkinlik', slug: 'etkinlik' } }, { origin: 'https://example.com' }));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { data: [{ id }] });
  assert.equal(calls.length, 2);
});
