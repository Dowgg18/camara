/*
  # Update Images Bucket Settings

  1. Changes
    - Set file size limit to 10MB
    - Set allowed MIME types for images only
    
  This ensures better control over uploads and prevents large files or wrong types.
*/

-- Update bucket settings
UPDATE storage.buckets
SET 
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg']::text[]
WHERE id = 'images';
