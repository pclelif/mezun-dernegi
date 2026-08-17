-- İletişim formu telefonu ve çevrimiçi üyelik başvurusunun kaldırılması

alter table public.contact_messages
  add column if not exists phone text;

-- Üyelik yalnızca indirilen/ıslak imzalı form üzerinden yürütülür.
-- Eski başvurular kaybolmasın; yalnızca yeni çevrimiçi kayıtları kapat.
drop policy if exists "Public can submit membership applications" on public.membership_applications;
