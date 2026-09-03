-- 00018_add_images_to_events.sql
-- Etkinliklere birden fazla fotoğraf desteği eklemek için images kolonu

ALTER TABLE public.events ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}';
