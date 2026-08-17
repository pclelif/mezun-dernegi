-- Yönetilebilir site içerikleri, üyelik başvuruları ve eksik içerik alanları
create table if not exists public.site_content (
  section text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint site_content_section_check check (section in ('ana-sayfa', 'hakkimizda', 'uyelik', 'iletisim'))
);
alter table public.site_content enable row level security;
drop policy if exists "Public can read site content" on public.site_content;
drop policy if exists "Authenticated can insert site content" on public.site_content;
drop policy if exists "Authenticated can update site content" on public.site_content;
create policy "Public can read site content" on public.site_content for select to anon, authenticated using (true);
create policy "Authenticated can insert site content" on public.site_content for insert to authenticated with check (true);
create policy "Authenticated can update site content" on public.site_content for update to authenticated using (true) with check (true);

alter table public.board_members add column if not exists bio text;

create table if not exists public.membership_applications (
  id uuid primary key default gen_random_uuid(), first_name text not null, last_name text not null,
  email text not null, phone text not null, graduation_year integer, school_number text, message text,
  status text not null default 'new' check (status in ('new', 'reviewing', 'approved', 'rejected')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
alter table public.membership_applications enable row level security;
drop policy if exists "Public can submit membership applications" on public.membership_applications;
drop policy if exists "Authenticated can read membership applications" on public.membership_applications;
drop policy if exists "Authenticated can update membership applications" on public.membership_applications;
create policy "Public can submit membership applications" on public.membership_applications for insert to anon, authenticated with check (status = 'new');
create policy "Authenticated can read membership applications" on public.membership_applications for select to authenticated using (true);
create policy "Authenticated can update membership applications" on public.membership_applications for update to authenticated using (true) with check (true);
