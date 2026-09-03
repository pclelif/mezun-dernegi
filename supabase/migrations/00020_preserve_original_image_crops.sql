-- Keep the uploaded file untouched. These values only describe its card crop.
ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS image_crops jsonb NOT NULL DEFAULT '[]'::jsonb;

ALTER TABLE public.announcements
  ADD COLUMN IF NOT EXISTS image_crops jsonb NOT NULL DEFAULT '[]'::jsonb;

ALTER TABLE public.gallery_images
  ADD COLUMN IF NOT EXISTS crop jsonb;

ALTER TABLE public.board_members
  ADD COLUMN IF NOT EXISTS image_crop jsonb;
