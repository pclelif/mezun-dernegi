-- Temporary write access for admin panel until auth (Sprint 6) is implemented.
-- Service role bypasses RLS; these policies allow anon/authenticated writes via the browser client as a fallback.

create policy "Temp public insert events"
  on public.events for insert to anon, authenticated with check (true);

create policy "Temp public update events"
  on public.events for update to anon, authenticated using (true) with check (true);

create policy "Temp public delete events"
  on public.events for delete to anon, authenticated using (true);

create policy "Temp public insert announcements"
  on public.announcements for insert to anon, authenticated with check (true);

create policy "Temp public update announcements"
  on public.announcements for update to anon, authenticated using (true) with check (true);

create policy "Temp public delete announcements"
  on public.announcements for delete to anon, authenticated using (true);

create policy "Temp public insert galleries"
  on public.galleries for insert to anon, authenticated with check (true);

create policy "Temp public update galleries"
  on public.galleries for update to anon, authenticated using (true) with check (true);

create policy "Temp public delete galleries"
  on public.galleries for delete to anon, authenticated using (true);

create policy "Temp public insert gallery_images"
  on public.gallery_images for insert to anon, authenticated with check (true);

create policy "Temp public update gallery_images"
  on public.gallery_images for update to anon, authenticated using (true) with check (true);

create policy "Temp public delete gallery_images"
  on public.gallery_images for delete to anon, authenticated using (true);
