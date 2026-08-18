-- Add display_order column to events and announcements tables for custom sorting
ALTER TABLE events ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE announcements ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
