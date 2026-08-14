-- Sprint 5: Initial schema + public read-only RLS
-- Requires: pgcrypto for gen_random_uuid()

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  date date,
  time text,
  location text,
  status text,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text,
  date date,
  created_at timestamptz not null default now()
);

create table if not exists public.galleries (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  date date,
  cover_image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  gallery_id uuid not null references public.galleries (id) on delete cascade,
  image_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.board_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  image_url text,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Indexes (slug lookups + gallery image joins)
-- ---------------------------------------------------------------------------

create index if not exists events_slug_idx on public.events (slug);
create index if not exists announcements_slug_idx on public.announcements (slug);
create index if not exists galleries_slug_idx on public.galleries (slug);
create index if not exists gallery_images_gallery_id_idx on public.gallery_images (gallery_id);
create index if not exists board_members_display_order_idx on public.board_members (display_order);
create index if not exists faqs_display_order_idx on public.faqs (display_order);

-- ---------------------------------------------------------------------------
-- Row Level Security: enable on all tables
-- ---------------------------------------------------------------------------

alter table public.events enable row level security;
alter table public.announcements enable row level security;
alter table public.board_members enable row level security;
alter table public.faqs enable row level security;
alter table public.galleries enable row level security;
alter table public.gallery_images enable row level security;

-- ---------------------------------------------------------------------------
-- Policies: public/anon read-only (SELECT). No INSERT/UPDATE/DELETE for anon.
-- ---------------------------------------------------------------------------

create policy "Public can read events"
  on public.events
  for select
  to anon, authenticated
  using (true);

create policy "Public can read announcements"
  on public.announcements
  for select
  to anon, authenticated
  using (true);

create policy "Public can read galleries"
  on public.galleries
  for select
  to anon, authenticated
  using (true);

create policy "Public can read gallery_images"
  on public.gallery_images
  for select
  to anon, authenticated
  using (true);

create policy "Public can read board_members"
  on public.board_members
  for select
  to anon, authenticated
  using (true);

create policy "Public can read faqs"
  on public.faqs
  for select
  to anon, authenticated
  using (true);
