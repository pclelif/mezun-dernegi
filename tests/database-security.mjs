// Run with PGLITE_MODULE pointing to an installed @electric-sql/pglite module.
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const { PGlite } = await import(process.env.PGLITE_MODULE || '@electric-sql/pglite');
const db = new PGlite();
const member = '00000000-0000-0000-0000-000000000001';
const admin = '00000000-0000-0000-0000-000000000002';
const tables = ['events','announcements','galleries','gallery_images','faqs','board_members','site_content','contact_messages','membership_applications'];
await db.exec(`
  create role anon; create role authenticated;
  create schema auth; create schema storage;
  create table auth.users(id uuid primary key, raw_app_meta_data jsonb);
  create function auth.uid() returns uuid language sql stable as $$ select (current_setting('request.jwt.claims', true)::jsonb ->> 'sub')::uuid $$;
  create function auth.jwt() returns jsonb language sql stable as $$ select current_setting('request.jwt.claims', true)::jsonb $$;
  grant usage on schema public, auth, storage to anon, authenticated;
  insert into auth.users values ('${member}', '{}'), ('${admin}', '{"role":"admin"}');
  create table storage.objects(id integer primary key, bucket_id text);
  alter table storage.objects enable row level security;
  grant all on storage.objects to anon, authenticated;
  create policy "old permissive storage" on storage.objects for all to anon, authenticated using (true) with check (true);
`);
for (const table of tables) {
  await db.exec(`create table public.${table}(id integer primary key, title text, is_published boolean default true, is_read boolean default false);
    alter table public.${table} enable row level security;
    grant all on public.${table} to anon, authenticated;
    create policy "old permissive policy" on public.${table} for all to anon, authenticated using (true) with check (true);
    insert into public.${table}(id,title,is_published) values (1,'Real content',true),(2,'Private content',false);`);
}
await db.exec(await readFile(new URL('../supabase/migrations/00022_enforce_trusted_admin_roles.sql', import.meta.url), 'utf8'));
await db.exec(await readFile(new URL('../supabase/migrations/00023_protect_legacy_membership_applications.sql', import.meta.url), 'utf8'));
async function asUser(role, user, query, appRole) {
  await db.query("select set_config('request.jwt.claims', $1, false)", [JSON.stringify({ sub: user, app_metadata: appRole ? { role: appRole } : {}, user_metadata: { role: 'admin' } })]);
  await db.exec(`set role ${role}`);
  try { return await db.query(query); } finally { await db.exec('reset role'); }
}
for (const role of ['anon','authenticated']) {
  for (const table of tables.filter(x => x !== 'contact_messages')) {
    await assert.rejects(asUser(role, role === 'anon' ? null : member, `insert into public.${table}(id) values(99)`));
    assert.equal((await asUser(role, role === 'anon' ? null : member, `update public.${table} set title='attacker' returning id`)).rows.length, 0);
    assert.equal((await asUser(role, role === 'anon' ? null : member, `delete from public.${table} returning id`)).rows.length, 0);
  }
  assert.equal((await asUser(role, role === 'anon' ? null : member, 'select * from public.contact_messages')).rows.length, 0);
  assert.equal((await asUser(role, role === 'anon' ? null : member, 'select * from public.membership_applications')).rows.length, 0);
  assert.equal((await asUser(role, role === 'anon' ? null : member, 'select * from public.events')).rows.length, 1);
  assert.equal((await asUser(role, role === 'anon' ? null : member, 'select * from public.announcements')).rows.length, 1);
  await assert.rejects(asUser(role, role === 'anon' ? null : member, "insert into storage.objects values(1,'media')"));
}
for (const table of tables) {
  assert.equal((await asUser('authenticated', admin, `update public.${table} set title='admin edit' where id=1 returning id`, 'admin')).rows.length, 1);
}
await asUser('authenticated', admin, "insert into storage.objects values(1,'media')", 'admin');
await db.exec(`update auth.users set raw_app_meta_data='{}' where id='${admin}'`);
assert.equal((await asUser('authenticated', admin, 'delete from public.events returning id', 'admin')).rows.length, 0);
assert.equal((await asUser('authenticated', admin, 'delete from storage.objects returning id', 'admin')).rows.length, 0);
// Historical cleanup is harmless even with real titles containing test/deneme.
await db.exec("update public.events set title='Deneme sınavı ve protesto duyurusu'");
await db.exec(await readFile(new URL('../supabase/migrations/00017_cleanup_test_content.sql', import.meta.url), 'utf8'));
assert.equal((await db.query('select * from public.events')).rows.length, 2);
console.log('PASS: anon/member/forged metadata denied; admin writes allowed; drafts/messages private; storage protected; revocation immediate; cleanup preserves data.');
await db.close();
