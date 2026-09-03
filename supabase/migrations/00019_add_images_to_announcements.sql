-- Duyurular tablosuna etkinlikler gibi çoklu fotoğraf desteği ekleniyor
ALTER TABLE announcements
  ADD COLUMN IF NOT EXISTS images text[] DEFAULT NULL;
