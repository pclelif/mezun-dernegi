-- Eksiksiz CMS: yayın durumları, galeri sırası, mesajlar ve merkezi marka ayarları

alter table public.events add column if not exists is_published boolean not null default true;
alter table public.announcements add column if not exists is_published boolean not null default true;
alter table public.galleries add column if not exists description text;
alter table public.gallery_images add column if not exists display_order integer not null default 0;

create index if not exists events_published_date_idx on public.events (is_published, date desc);
create index if not exists announcements_published_date_idx on public.announcements (is_published, date desc);
create index if not exists gallery_images_gallery_order_idx on public.gallery_images (gallery_id, display_order);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;
create policy "Public can submit contact messages" on public.contact_messages
  for insert to anon, authenticated with check (is_read = false);
create policy "Authenticated can read contact messages" on public.contact_messages
  for select to authenticated using (true);
create policy "Authenticated can update contact messages" on public.contact_messages
  for update to authenticated using (true) with check (true);
create policy "Authenticated can delete contact messages" on public.contact_messages
  for delete to authenticated using (true);
create index if not exists contact_messages_read_created_idx on public.contact_messages (is_read, created_at desc);

alter table public.site_content drop constraint if exists site_content_section_check;
alter table public.site_content add constraint site_content_section_check
  check (section in ('ana-sayfa', 'hakkimizda', 'uyelik', 'aidat-bagis', 'iletisim', 'marka'));

insert into public.site_content (section, content) values
  ('marka', '{"logo_url":"/mezunderlogo.jpg","favicon_url":"/logo-dernek.svg"}'::jsonb),
  ('aidat-bagis', '{}'::jsonb)
on conflict (section) do nothing;

create policy "Authenticated can delete site content" on public.site_content
  for delete to authenticated using (true);

-- Var olan public select politikaları yayın filtresi uygulamıyorsa yenile.
drop policy if exists "Public can read events" on public.events;
create policy "Public can read events" on public.events for select to anon, authenticated
  using (is_published or auth.role() = 'authenticated');
drop policy if exists "Public can read announcements" on public.announcements;
create policy "Public can read announcements" on public.announcements for select to anon, authenticated
  using (is_published or auth.role() = 'authenticated');

