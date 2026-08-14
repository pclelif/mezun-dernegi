-- S.S.S. yönetimi: authenticated admin CRUD policies

drop policy if exists "Authenticated can insert faqs" on public.faqs;
drop policy if exists "Authenticated can update faqs" on public.faqs;
drop policy if exists "Authenticated can delete faqs" on public.faqs;

create policy "Authenticated can insert faqs"
  on public.faqs for insert
  to authenticated
  with check (true);

create policy "Authenticated can update faqs"
  on public.faqs for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can delete faqs"
  on public.faqs for delete
  to authenticated
  using (true);
