-- Yönetim ve denetim kurulu ayrımı + authenticated admin CRUD policies

alter table public.board_members
  add column if not exists board_type text;

-- Mevcut kayıtları eski görev/unvan metnine göre uygun kurula taşı.
update public.board_members
set board_type = case
  when role ~* 'denetim' then 'audit'
  else 'management'
end
where board_type is null;

alter table public.board_members
  alter column board_type set default 'management',
  alter column board_type set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'board_members_board_type_check'
      and conrelid = 'public.board_members'::regclass
  ) then
    alter table public.board_members
      add constraint board_members_board_type_check
      check (board_type in ('management', 'audit'));
  end if;
end
$$;

create index if not exists board_members_type_order_idx
  on public.board_members (board_type, display_order);

drop policy if exists "Authenticated can insert board members" on public.board_members;
drop policy if exists "Authenticated can update board members" on public.board_members;
drop policy if exists "Authenticated can delete board members" on public.board_members;

create policy "Authenticated can insert board members"
  on public.board_members for insert
  to authenticated
  with check (true);

create policy "Authenticated can update board members"
  on public.board_members for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can delete board members"
  on public.board_members for delete
  to authenticated
  using (true);
