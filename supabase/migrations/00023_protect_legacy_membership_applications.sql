-- Legacy membership data must remain private even if permissive historical policies exist.
begin;
alter table public.membership_applications enable row level security;
create policy "Require admin membership access"
  on public.membership_applications as restrictive for all to anon, authenticated
  using (public.is_admin()) with check (public.is_admin());
commit;
