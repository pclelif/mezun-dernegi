-- Sprint 7: authenticated admin writes + public media reads

-- Duyuru formlarında görsel desteği
alter table public.announcements
  add column if not exists image_url text;

-- ---------------------------------------------------------------------------
-- Remove temporary anonymous write policies from Sprint 7 scaffold
-- ---------------------------------------------------------------------------

drop policy if exists "Temp public insert events" on public.events;
drop policy if exists "Temp public update events" on public.events;
drop policy if exists "Temp public delete events" on public.events;
drop policy if exists "Temp public insert announcements" on public.announcements;
drop policy if exists "Temp public update announcements" on public.announcements;
drop policy if exists "Temp public delete announcements" on public.announcements;
drop policy if exists "Temp public insert galleries" on public.galleries;
drop policy if exists "Temp public update galleries" on public.galleries;
drop policy if exists "Temp public delete galleries" on public.galleries;
drop policy if exists "Temp public insert gallery_images" on public.gallery_images;
drop policy if exists "Temp public update gallery_images" on public.gallery_images;
drop policy if exists "Temp public delete gallery_images" on public.gallery_images;

-- ---------------------------------------------------------------------------
-- Authenticated-only table writes
-- ---------------------------------------------------------------------------

create policy "Authenticated can insert events"
  on public.events for insert to authenticated with check (true);
create policy "Authenticated can update events"
  on public.events for update to authenticated using (true) with check (true);
create policy "Authenticated can delete events"
  on public.events for delete to authenticated using (true);

create policy "Authenticated can insert announcements"
  on public.announcements for insert to authenticated with check (true);
create policy "Authenticated can update announcements"
  on public.announcements for update to authenticated using (true) with check (true);
create policy "Authenticated can delete announcements"
  on public.announcements for delete to authenticated using (true);

create policy "Authenticated can insert galleries"
  on public.galleries for insert to authenticated with check (true);
create policy "Authenticated can update galleries"
  on public.galleries for update to authenticated using (true) with check (true);
create policy "Authenticated can delete galleries"
  on public.galleries for delete to authenticated using (true);

create policy "Authenticated can insert gallery_images"
  on public.gallery_images for insert to authenticated with check (true);
create policy "Authenticated can update gallery_images"
  on public.gallery_images for update to authenticated using (true) with check (true);
create policy "Authenticated can delete gallery_images"
  on public.gallery_images for delete to authenticated using (true);

-- ---------------------------------------------------------------------------
-- Storage policies for the existing public `media` bucket
-- ---------------------------------------------------------------------------

drop policy if exists "Public can read media" on storage.objects;
drop policy if exists "Authenticated can upload media" on storage.objects;
drop policy if exists "Authenticated can delete media" on storage.objects;

create policy "Public can read media"
  on storage.objects for select
  to public
  using (bucket_id = 'media');

create policy "Authenticated can upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

create policy "Authenticated can delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');
