/*
  # Make image_url nullable

  1. Changes
    - Make image_url nullable to allow articles without images
    
  This allows saving draft articles without images.
*/

-- Make image_url nullable
ALTER TABLE articles 
  ALTER COLUMN image_url DROP NOT NULL;
