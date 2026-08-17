alter table public.faqs
  add column if not exists category text not null default 'general';

alter table public.faqs
  drop constraint if exists faqs_category_check;

alter table public.faqs
  add constraint faqs_category_check
  check (category in ('general', 'membership', 'dues'));

create index if not exists faqs_category_display_order_idx
  on public.faqs (category, display_order);
