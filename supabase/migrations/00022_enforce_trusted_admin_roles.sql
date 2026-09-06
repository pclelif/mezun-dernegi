-- Applies to databases that already ran 00021; does not delete application data.
-- Assign app_metadata.role = admin to the intended account before deployment.
begin;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  -- Read the current server-managed role, so revocation also affects existing JWTs.
  select exists (
    select 1 from auth.users
    where id = auth.uid()
      and raw_app_meta_data ->> 'role' = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated, anon;

-- ---------------------------------------------------------------------------
-- events
-- ---------------------------------------------------------------------------
drop policy if exists "Temp public insert events" on public.events;
drop policy if exists "Temp public update events" on public.events;
drop policy if exists "Temp public delete events" on public.events;
drop policy if exists "Authenticated can insert events" on public.events;
drop policy if exists "Authenticated can update events" on public.events;
drop policy if exists "Authenticated can delete events" on public.events;
drop policy if exists "Admins can insert events" on public.events;
drop policy if exists "Admins can update events" on public.events;
drop policy if exists "Admins can delete events" on public.events;

create policy "Admins can insert events"
  on public.events for insert to authenticated
  with check (public.is_admin());
create policy "Admins can update events"
  on public.events for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete events"
  on public.events for delete to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- announcements
-- ---------------------------------------------------------------------------
drop policy if exists "Temp public insert announcements" on public.announcements;
drop policy if exists "Temp public update announcements" on public.announcements;
drop policy if exists "Temp public delete announcements" on public.announcements;
drop policy if exists "Authenticated can insert announcements" on public.announcements;
drop policy if exists "Authenticated can update announcements" on public.announcements;
drop policy if exists "Authenticated can delete announcements" on public.announcements;
drop policy if exists "Admins can insert announcements" on public.announcements;
drop policy if exists "Admins can update announcements" on public.announcements;
drop policy if exists "Admins can delete announcements" on public.announcements;

create policy "Admins can insert announcements"
  on public.announcements for insert to authenticated
  with check (public.is_admin());
create policy "Admins can update announcements"
  on public.announcements for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete announcements"
  on public.announcements for delete to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- galleries / gallery_images
-- ---------------------------------------------------------------------------
drop policy if exists "Temp public insert galleries" on public.galleries;
drop policy if exists "Temp public update galleries" on public.galleries;
drop policy if exists "Temp public delete galleries" on public.galleries;
drop policy if exists "Authenticated can insert galleries" on public.galleries;
drop policy if exists "Authenticated can update galleries" on public.galleries;
drop policy if exists "Authenticated can delete galleries" on public.galleries;
drop policy if exists "Admins can insert galleries" on public.galleries;
drop policy if exists "Admins can update galleries" on public.galleries;
drop policy if exists "Admins can delete galleries" on public.galleries;

create policy "Admins can insert galleries"
  on public.galleries for insert to authenticated
  with check (public.is_admin());
create policy "Admins can update galleries"
  on public.galleries for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete galleries"
  on public.galleries for delete to authenticated
  using (public.is_admin());

drop policy if exists "Temp public insert gallery_images" on public.gallery_images;
drop policy if exists "Temp public update gallery_images" on public.gallery_images;
drop policy if exists "Temp public delete gallery_images" on public.gallery_images;
drop policy if exists "Authenticated can insert gallery_images" on public.gallery_images;
drop policy if exists "Authenticated can update gallery_images" on public.gallery_images;
drop policy if exists "Authenticated can delete gallery_images" on public.gallery_images;
drop policy if exists "Admins can insert gallery_images" on public.gallery_images;
drop policy if exists "Admins can update gallery_images" on public.gallery_images;
drop policy if exists "Admins can delete gallery_images" on public.gallery_images;

create policy "Admins can insert gallery_images"
  on public.gallery_images for insert to authenticated
  with check (public.is_admin());
create policy "Admins can update gallery_images"
  on public.gallery_images for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete gallery_images"
  on public.gallery_images for delete to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- faqs
-- ---------------------------------------------------------------------------
drop policy if exists "Authenticated can insert faqs" on public.faqs;
drop policy if exists "Authenticated can update faqs" on public.faqs;
drop policy if exists "Authenticated can delete faqs" on public.faqs;
drop policy if exists "Admins can insert faqs" on public.faqs;
drop policy if exists "Admins can update faqs" on public.faqs;
drop policy if exists "Admins can delete faqs" on public.faqs;

create policy "Admins can insert faqs"
  on public.faqs for insert to authenticated
  with check (public.is_admin());
create policy "Admins can update faqs"
  on public.faqs for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete faqs"
  on public.faqs for delete to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- board_members
-- ---------------------------------------------------------------------------
drop policy if exists "Authenticated can insert board members" on public.board_members;
drop policy if exists "Authenticated can update board members" on public.board_members;
drop policy if exists "Authenticated can delete board members" on public.board_members;
drop policy if exists "Admins can insert board members" on public.board_members;
drop policy if exists "Admins can update board members" on public.board_members;
drop policy if exists "Admins can delete board members" on public.board_members;

create policy "Admins can insert board members"
  on public.board_members for insert to authenticated
  with check (public.is_admin());
create policy "Admins can update board members"
  on public.board_members for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete board members"
  on public.board_members for delete to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- site_content
-- ---------------------------------------------------------------------------
drop policy if exists "Authenticated can insert site content" on public.site_content;
drop policy if exists "Authenticated can update site content" on public.site_content;
drop policy if exists "Authenticated can delete site content" on public.site_content;
drop policy if exists "Admins can insert site content" on public.site_content;
drop policy if exists "Admins can update site content" on public.site_content;
drop policy if exists "Admins can delete site content" on public.site_content;

create policy "Admins can insert site content"
  on public.site_content for insert to authenticated
  with check (public.is_admin());
create policy "Admins can update site content"
  on public.site_content for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete site content"
  on public.site_content for delete to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- contact_messages: public INSERT kalır; okuma/güncelleme/silme yalnızca admin
-- ---------------------------------------------------------------------------
drop policy if exists "Authenticated can read contact messages" on public.contact_messages;
drop policy if exists "Authenticated can update contact messages" on public.contact_messages;
drop policy if exists "Authenticated can delete contact messages" on public.contact_messages;
drop policy if exists "Admins can read contact messages" on public.contact_messages;
drop policy if exists "Admins can update contact messages" on public.contact_messages;
drop policy if exists "Admins can delete contact messages" on public.contact_messages;

create policy "Admins can read contact messages"
  on public.contact_messages for select to authenticated
  using (public.is_admin());
create policy "Admins can update contact messages"
  on public.contact_messages for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete contact messages"
  on public.contact_messages for delete to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- storage.media: yazma yalnızca admin
-- ---------------------------------------------------------------------------
drop policy if exists "Authenticated can upload media" on storage.objects;
drop policy if exists "Authenticated can delete media" on storage.objects;
drop policy if exists "Admins can upload media" on storage.objects;
drop policy if exists "Admins can delete media" on storage.objects;
drop policy if exists "Admins can update media" on storage.objects;

create policy "Admins can upload media"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and public.is_admin());

create policy "Admins can update media"
  on storage.objects for update to authenticated
  using (bucket_id = 'media' and public.is_admin())
  with check (bucket_id = 'media' and public.is_admin());

create policy "Admins can delete media"
  on storage.objects for delete to authenticated
  using (bucket_id = 'media' and public.is_admin());

alter table public.events enable row level security;
create policy "Require admin insert" on public.events as restrictive for insert to anon, authenticated with check (public.is_admin());
create policy "Require admin update" on public.events as restrictive for update to anon, authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Require admin delete" on public.events as restrictive for delete to anon, authenticated using (public.is_admin());

alter table public.announcements enable row level security;
create policy "Require admin insert" on public.announcements as restrictive for insert to anon, authenticated with check (public.is_admin());
create policy "Require admin update" on public.announcements as restrictive for update to anon, authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Require admin delete" on public.announcements as restrictive for delete to anon, authenticated using (public.is_admin());

alter table public.galleries enable row level security;
create policy "Require admin insert" on public.galleries as restrictive for insert to anon, authenticated with check (public.is_admin());
create policy "Require admin update" on public.galleries as restrictive for update to anon, authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Require admin delete" on public.galleries as restrictive for delete to anon, authenticated using (public.is_admin());

alter table public.gallery_images enable row level security;
create policy "Require admin insert" on public.gallery_images as restrictive for insert to anon, authenticated with check (public.is_admin());
create policy "Require admin update" on public.gallery_images as restrictive for update to anon, authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Require admin delete" on public.gallery_images as restrictive for delete to anon, authenticated using (public.is_admin());

alter table public.faqs enable row level security;
create policy "Require admin insert" on public.faqs as restrictive for insert to anon, authenticated with check (public.is_admin());
create policy "Require admin update" on public.faqs as restrictive for update to anon, authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Require admin delete" on public.faqs as restrictive for delete to anon, authenticated using (public.is_admin());

alter table public.board_members enable row level security;
create policy "Require admin insert" on public.board_members as restrictive for insert to anon, authenticated with check (public.is_admin());
create policy "Require admin update" on public.board_members as restrictive for update to anon, authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Require admin delete" on public.board_members as restrictive for delete to anon, authenticated using (public.is_admin());

alter table public.site_content enable row level security;
create policy "Require admin insert" on public.site_content as restrictive for insert to anon, authenticated with check (public.is_admin());
create policy "Require admin update" on public.site_content as restrictive for update to anon, authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Require admin delete" on public.site_content as restrictive for delete to anon, authenticated using (public.is_admin());

alter table public.contact_messages enable row level security;
create policy "Require admin update" on public.contact_messages as restrictive for update to anon, authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Require admin delete" on public.contact_messages as restrictive for delete to anon, authenticated using (public.is_admin());

drop policy if exists "Public can read events" on public.events;
create policy "Public can read events" on public.events for select to anon, authenticated using (is_published or public.is_admin());
create policy "Protect unpublished content" on public.events as restrictive for select to anon, authenticated using (is_published or public.is_admin());

drop policy if exists "Public can read announcements" on public.announcements;
create policy "Public can read announcements" on public.announcements for select to anon, authenticated using (is_published or public.is_admin());
create policy "Protect unpublished content" on public.announcements as restrictive for select to anon, authenticated using (is_published or public.is_admin());

create policy "Protect private messages" on public.contact_messages as restrictive
  for select to anon, authenticated using (public.is_admin());
create policy "Require media admin insert" on storage.objects as restrictive for insert to anon, authenticated with check (bucket_id = 'media' and public.is_admin());
create policy "Require media admin update" on storage.objects as restrictive for update to anon, authenticated using (bucket_id = 'media' and public.is_admin()) with check (bucket_id = 'media' and public.is_admin());
create policy "Require media admin delete" on storage.objects as restrictive for delete to anon, authenticated using (bucket_id = 'media' and public.is_admin());

commit;
