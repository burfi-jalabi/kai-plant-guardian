-- Add location column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS location text;

-- Add avatar_url column for profile pictures
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url text;